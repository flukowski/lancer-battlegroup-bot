const data = require('./data');
const Fuse = require('fuse.js')

const {
  maneuvers, tactics,
  battleships, carriers, frigates,
  weapons,
  systems,
  escorts,
  wings,
  aces,
  accolades, legacies,
  npc_flagships, npc_escorts,
} = data

const searchable = [
  ...battleships.map(x => ({ ...x, data_type: 'battleship' })),
  ...carriers.map(x => ({ ...x, data_type: 'carrier' })),
  ...frigates.map(x => ({ ...x, data_type: 'frigate' })),
  ...weapons.map(x => ({ ...x, data_type: 'weapon' })),
  ...systems.map(x => ({ ...x, data_type: 'system' })),
  ...escorts.map(x => ({ ...x, data_type: 'escort' })),
  ...wings.map(x => ({ ...x, data_type: 'wing' })),
  ...aces.map(x => ({ ...x, data_type: 'ace' })),
  ...accolades.map(x => ({ ...x, data_type: 'accolade' })),
  ...legacies.map(x => ({ ...x, data_type: 'legacy' })),
  ...maneuvers.map(x => ({ ...x, data_type: 'maneuver' })),
  ...tactics.map(x => ({ ...x, data_type: 'tactic' })),
  ...npc_flagships.map(x => ({ ...x, data_type: 'npc_flagship' })),
  ...npc_escorts.map(x => ({ ...x, data_type: 'npc_escort' })),
]

const options = {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  keys: [
    {
      name: 'name',
      weight: 0.75
    },
    {
      name: 'traits.name',
      weight: 0.25
    }
  ]
};

const fuse = new Fuse(searchable, options);

module.exports = {
  search(term) {
    return fuse.search(term)
  }
}
