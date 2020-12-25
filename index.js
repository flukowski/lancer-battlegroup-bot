const Commando = require('discord.js-commando')
const { search, getDetails } = require('./search')
const format = require('./format')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const client = new Commando.Client({
  owner: process.env.OWNER,
  commandPrefix: 'bg::'
})

client.on('ready', () => console.log('Battlespace CIC is ready!'))

class SearchCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'search-compendium',
      group: 'battlegroup',
      memberName: 'search',
      aliases: ['search', 'compendium'],
      description: 'Searches the Battlegroup compendium.',
      patterns: [/\{\{(.+?)\}\}/],
      defaultHandling: false,
      throttling: false
    })
  }
  async run(msg) {
    console.log(msg.content)
    let targets = [];
    const re = /\{\{(.+?)\}\}/g
    let matches;
    while ((matches = re.exec(msg.content)) != null) {
      targets.push(matches[1])
    }
    const results = targets.map((tgt, i) => {
      const results = search(tgt)
      if (results.length === 0) return `No results found for *${targets[i].replace(/@/g, '\\@')}*.`
      else return format(results[0].item)
    }).join('\n--\n')

    await msg.reply('\n' + results, { split: true })
  }
}

class InviteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'battlegroup',
      memberName: 'invite',
      description: 'Get an invite link for Battlespace CIC',
    })
    client.on('ready', () => this.userID = client.user.id)
  }
  async run(msg) {
    await msg.reply(`Invite me to your server: https://discordapp.com/api/oauth2/authorize?client_id=${this.userID}&permissions=0&scope=bot`)
  }
}

class StartCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'start',
      group: 'battlegroup',
      memberName: 'start',
      description: 'Starting with Lancer Battlegroup',
    })
  }
  async run(msg) {
    await msg.reply(`\nGoogle Sheet character sheet: https://docs.google.com/spreadsheets/d/1yFVzdFeOxXCIE_9unYfpEvbhuwuLZaEDKC4-W9g5IW0/edit?usp=sharing\nCurrent ruleset: https://cdn.discordapp.com/attachments/711270320723591259/755883954191597687/Lancer_Battlegroup_1.4_BookmarkedCYAN.pdf`)
  }
}

class CreditsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'credits',
      group: 'battlegroup',
      memberName: 'credits',
      description: 'Credits for the bot',
    })
  }
  async run(msg) {
    await msg.reply(`Credits:\n\nLancer Battlegroup is created by Miguel Lopez and Kai Tave for Massif Press.\n\nThe bot is presented by Fluke.\n\nWith special thanks to Rick and the 7th Fleet server.`)
  }
}

class VersionCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'version',
      group: 'battlegroup',
      memberName: 'version',
      description: 'Version for the bot',
    })
  }
  async run(msg) {
    await msg.reply(`Version:\n\nUpdated to version 1.6`)
  }
}

client.registry
  .registerDefaults()
  .registerGroup('battlegroup', 'Battlegroup commands')
  .registerCommand(SearchCommand)
  .registerCommand(InviteCommand)
  .registerCommand(StartCommand)
  .registerCommand(CreditsCommand)
  .registerCommand(VersionCommand)

client.login(process.env.TOKEN)

client.on('ready', () => {
  client.user.setPresence({ activity: { name: 'BATTLEGROUP | use {{brackets}}' }, status: 'online' })
})
