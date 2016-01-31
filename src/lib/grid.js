/*var createGrid = (size) => {
  return new Promise((resolve) => {
    require('./lib/textures').then((buildingTextures) => {
      var keys = Object.keys(buildingTextures);
      console.log(keys);

    });
    console.log(size);
    var grid = [];
    var gridGroup = new THREE.Group();
    if (!size) size = 5;
    //var texxtureLoader =
    var texture = new THREE.TextureLoader().load('/img/ground.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    var geometry = new THREE.BoxGeometry(1, 0.2, 1);
    var material = new THREE.MeshLambertMaterial();
    material.map = texture;
    var tile;

    for (let i = -1 * Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
      for (let j = -1 * Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
        tile = new THREE.Mesh(geometry, material);
        tile.position.set(i * 1.05, 0, j * 1.05);
        grid.push(tile);
        gridGroup.add(grid[grid.length - 1]);
      }
    }
  });
};*/

var grid = [];
var gridGroup = new THREE.Group();

var createGrid = (size) => {
  if (!size) {
    size = 5;
  }
  return new Promise(function(resolve) {
    require('./textures').then((buildingTextures) => {
      var keys = Object.keys(buildingTextures);
      console.log(keys);
      var getTexture = () => {
        return new Promise(function(resolve) {
          //var randomTexture = buildingTextures[Math.floor(Math.random() * keys.length)];
          //resolve(randomTexture);
          resolve(buildingTextures['Archives']);
        });
      };
      var textures = [];
      for (let i = 0; i < 25; ++i) {
        textures.push(getTexture());
      }

      var geometry = new THREE.BoxGeometry(1, 0.2, 1);
      var material = new THREE.MeshLambertMaterial();
      var tile;

      var num = 0;
      for (let i = -1 * Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
        for (let j = -1 * Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
          material.map = textures[num++];
          tile = new THREE.Mesh(geometry, material);
          tile.position.set(i * 1.05, 0, j * 1.05);
          grid.push(tile);
          gridGroup.add(grid[grid.length - 1]);
        }
      }
      resolve({
        tiles: grid,
        threeGroup: gridGroup
      });
    });
  });
};

module.exports = createGrid;
