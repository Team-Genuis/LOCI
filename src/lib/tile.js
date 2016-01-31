const tileImages = [
  '/img/ground.jpg',
  '/img/BasicBuildings/Archives.jpg',
  '/img/BasicBuildings/Archives_DarkPath.jpg',
  '/img/BasicBuildings/Archives_GoldPath.jpg',
  '/img/BasicBuildings/Chapel.jpg',
  '/img/BasicBuildings/Chapel_DarkPath.jpg',
  '/img/BasicBuildings/Chapel_GoldPath.jpg',
  '/img/BasicBuildings/Fortress.jpg',
  '/img/BasicBuildings/Fortress_Dark Path.jpg',
  '/img/BasicBuildings/Fortress_Gold Path.jpg',
  '/img/BasicBuildings/Guild Hall.jpg',
  '/img/BasicBuildings/Guild Hall_GoldPath.jpg',
  '/img/BasicBuildings/GuildHall_DarkPath.jpg',
  '/img/BasicBuildings/Tavern.jpg',
  '/img/BasicBuildings/Tavern_DarkPath.jpg',
  '/img/BasicBuildings/Tavern_GoldPath.jpg'
];

class Tile {
  constructor(type, player) {
    this._image = tileImages[0];
    this._type = type;
    this._player = player;
  }

  get type() {
    return this._type;
  }

  get player() {
    return this._player;
  }

  modify(type, player) {
    return `${type} ${player}`;
  }

  toString() {
    return `${this.type} ${this.player}`;
  }
}

module.exports = Tile;
