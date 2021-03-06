const maneuvers = require("./battlegroup/actions/maneuvers.json");
const tactics = require("./battlegroup/actions/tactics.json");

const battleships = require("./battlegroup/hulls/battleships.json");
const carriers = require("./battlegroup/hulls/carriers.json");
const frigates = require("./battlegroup/hulls/frigates.json");

const weapons = require("./battlegroup/weapons.json");
const systems = require("./battlegroup/systems.json");
const escorts = require("./battlegroup/escorts.json");
const wings = require("./battlegroup/wings.json");
const aces = require("./battlegroup/aces.json");

const accolades = require("./battlegroup/progression/accolades.json");
const legacies = require("./battlegroup/progression/legacies.json");

const npc_flagships = require("./battlegroup/npcs/flagships.json");
const npc_escorts = require("./battlegroup/npcs/escorts.json");

let data = {
  battleships: battleships,
  carriers: carriers,
  frigates: frigates,
  weapons: weapons,
  systems: systems,
  escorts: escorts,
  wings: wings,
  aces: aces,
  npc_flagships: npc_flagships,
  npc_escorts: npc_escorts,
  accolades: accolades,
  legacies: legacies,
  maneuvers: maneuvers,
  tactics: tactics,
}

// const altNamesTransform = require('./altNames')
// data = altNamesTransform(data)

module.exports = data
