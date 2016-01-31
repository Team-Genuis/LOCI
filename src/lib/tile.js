


class Tile {
  //static buildingTextures () {
    //return buildingTextures || getBuildingTextures();
  //};

  constructor(position, type) {
    //this._image = tileImages[0];
    this._type = type;
    //this._player = player;
  }

  get type() {
    return this._type;
  }

  get object() {
    return this._type;
  }

  modify(type, player) {
    return `${type} ${player}`;
  }

  toString() {
    return `${this.type} ${this.player}`;
  }
}

module.exports = Tile;
