var createGrid = (size) => {
  console.log(size);
  var grid = [];
  var gridGroup = new THREE.Group();
  if (!size) size = 5;
  //var texxtureLoader =
  var texture = new THREE.TextureLoader().load("img/ground.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  var geometry = new THREE.BoxGeometry(1, 0.2, 1);
  var material = new THREE.MeshLambertMaterial();
  material.map = texture;
  var cube;

  for (let i = -1 * Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
    for (let j = -1 * Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
      cube = new THREE.Mesh(geometry, material);
      cube.position.set(i * 1.05, 0, j * 1.05);
      grid.push(cube);
      gridGroup.add(grid[grid.length - 1]);
    }
  }
  return {
    tiles: grid,
    threeGroup: gridGroup
  };
};

module.exports = createGrid;
