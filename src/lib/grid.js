
//const imagePath = '/img/BasicBuildings/';

/*const buildingTypes = [
  'Archives',
  'Chapel',
  'Fortress',
  'GuildHall',
  'Tavern'
];*/

/*function buildUrl(type){
  return imagePath + type + '.jpg';
}*/

var groundUrl = '/img/ground.jpg';

var createGrid = (size) => {
  console.log(size);
  var grid = [];
  var gridGroup = new THREE.Group();
  if (!size) size = 5;
  // /console.log(buildingTypes[Math.floor(Math.random()*buildingTypes.length)]);
  //let url = buildUrl(buildingTypes[Math.floor(Math.random()*buildingTypes.length)]);


  for (let i = -1 * Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
    for (let j = -1 * Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
      let texture = new THREE.TextureLoader().load(groundUrl);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);

      let geometry = new THREE.BoxGeometry(1, 0.2, 1);
      let material = new THREE.MeshLambertMaterial();
      material.map = texture;
      let cube;
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
