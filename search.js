const data = require('./data');
const Fuse = require('fuse.js')

const {
  battleships, carriers, frigates,
  weapons,
  systems,
  escorts,
  wings
} = data

const searchable = [
  ...battleships.map(x => ({ ...x, data_type: 'battleship' })),
  ...carriers.map(x => ({ ...x, data_type: 'carrier' })),
  ...frigates.map(x => ({ ...x, data_type: 'frigate' })),
  ...weapons.map(x => ({ ...x, data_type: 'weapon' })),
  ...systems.map(x => ({ ...x, data_type: 'system' })),
  ...escorts.map(x => ({ ...x, data_type: 'escort' })),
  ...wings.map(x => ({ ...x, data_type: 'wing' })),
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
    "name",
    "ranknames",
    "integrated.name",
    "active_name",
    "passive_name",
    "alt_names"
  ]
};

const fuse = new Fuse(searchable, options);

module.exports = {
  search(term) {
    return fuse.search(term)
  }
}
