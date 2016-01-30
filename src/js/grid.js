var grid = [];
var gridGroup = new THREE.Group();
var numRow = 5,
  numCol = 5;

var geometry = new THREE.BoxGeometry(1, 0.2, 1);
var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 1
});
var cube;

for (let i = -1 * Math.floor(numRow / 2); i <= Math.floor(numRow / 2); i++) {
  for (let j = -1 * Math.floor(numCol / 2); j <= Math.floor(numCol / 2); j++) {
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(i * 1.05, 0, j * 1.05);
    grid.push(cube);
    gridGroup.add(grid[grid.length-1]);
  }
}

module.exports = {
  tiles: grid,
  threeGroup: gridGroup
};
