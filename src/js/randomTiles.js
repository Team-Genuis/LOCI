var numRow = 5,
  numCol = 5;

var geometry = new THREE.BoxGeometry(1, 0.2, 1);

var randomTiles = (num, color) => {
  var material = new THREE.MeshPhongMaterial({
    color: color === 2 ? 0x0043ff : 0xfe0000,
    transparent: true,
    opacity: 1
  });

  let tiles = [];
  let tileGroup = new THREE.Group();
  for (let j = -1 * Math.floor(numCol / 2); j <= Math.floor(numCol / 2); j++) {
    let tile = new THREE.Mesh(geometry, material);
    if(color === 2) {
      tile.position.set(numRow * 1.05 - 0.5, 1, j * 1.2);
    } else {
      tile.position.set(j * 1.2, 1, numRow * 1.05 - 0.5);
    }
    tiles.push(tile);
    tileGroup.add(tiles[tiles.length - 1]);
  }
  return {
    tiles: tiles,
    threeGroup: tileGroup
  };
};

module.exports = randomTiles;
