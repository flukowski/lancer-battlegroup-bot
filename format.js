const data = require('./data');
const emoji = require('./emoji.json')
const turndownService = new require('turndown')()

function itemTypeFormat(object) {
  switch (object.data_type) {
    case 'battleship':
      return 'Battleship'
    case 'carrier':
      return 'Carrier'
    case 'frigate':
      return 'Frigate'
    case 'weapon':
      return 'Weapon'
    case 'system':
      return 'System'
    case 'escort':
      return 'Escort'
    case 'wing':
      return 'Wing'
    case 'accolade':
      return 'Accolade'
    case 'legacy':
      return 'Legacy'
    case 'maneuver':
      return 'Maneuver'
    case 'tactic':
      return 'Tactic'
    case 'npc_flagship':
      return 'NPC Flagship'
    case 'npc_escort':
      return 'NPC Escort'
    default:
      return '';
  }
}

function hullFormat(object) {
  let points_text = object.points ? `[${object.points}] ` : ''
  let out = `${points_text}**${object.name}**\n`
  out += `${itemTypeFormat(object)}`
  if (object.hp || object.defense) {
    let health_line = []
    if (object.hp) health_line.push(`${object.hp} HP`)
    if (object.defense) health_line.push(`${object.defense} Def`)
    if (object.interdiction) health_line.push(`${object.interdiction} Intd`)
    out += ` | ${health_line.join(', ')}\n`
  } else {
    out += `\n`
  }
  if (object.tags && object.tags.length > 0) out += `${object.tags.join(', ')}\n`
  if (object.effect) out += `\n${object.effect}`
  if (object.traits && object.traits.length > 0) {
    out += `${object.traits.map( trait => `\n**${trait.name}**${trait.tags && trait.tags.length > 0 ? `\n_${trait.tags.join(', ')}_` : ''}${trait.description ? `\n${trait.description}` : ''}` ).join('\n')}`
  }
  return out
}

function weaponFormat(object) {
  let out = `[${object.points}] **${object.name}** (${object.mount})\n`
  if (object.tags && object.tags.length > 0) out += `${object.tags.join(', ')}\n`
  let attack_line = []
  if (object.range) attack_line.push(`Range ${object.range}`)
  if (object.damage) attack_line.push(`Damage ${object.damage}`)
  out += `${attack_line.join(' | ')}\n`
  if (object.effect) out += `\n${object.effect}`
  return out
}

function systemFormat(object) {
  let out = `[${object.points}] **${object.name}** (${itemTypeFormat(object)})\n`
  if (object.tags && object.tags.length > 0) out += `${object.tags.join(', ')}\n`
  if (object.effect) out += `\n${object.effect}`
  if (object.traits && object.traits.length > 0) {
    out += `${object.traits.map( trait => `\n**${trait.name}${trait.tags && trait.tags.length > 0 ? ` [${trait.tags.join(', ')}]` : ''}**: ${trait.description}` ).join('')}`
  }
  return out
}

function simpleFormat(object) {
  let out = `**${object.name}** (${itemTypeFormat(object)})\n`
  if (object.effect) out += `\n${object.effect}`
  return out
}

module.exports = function (object) {
  console.log(object)
  switch (object.data_type) {
    case 'npc_flagship':
      return hullFormat(object);
    case 'npc_escort':
      return hullFormat(object);
    case 'battleship':
      return hullFormat(object);
    case 'carrier':
      return hullFormat(object);
    case 'frigate':
      return hullFormat(object);
    case 'weapon':
      return weaponFormat(object);
    case 'escort':
      return hullFormat(object);
    case 'wing':
      return hullFormat(object);
    case 'system':
      return systemFormat(object);
    case 'accolade':
      return simpleFormat(object);
    case 'legacy':
      return simpleFormat(object);
    case 'maneuver':
      return simpleFormat(object);
    case 'tactic':
      return simpleFormat(object);
  }
}
