var createGrid = (size) => {
  console.log(size);
  var grid = [];
  var gridGroup = new THREE.Group();
  var tileImages = ['img/ground.jpg','img/BasicBuildings/Archives.jpg',
    'img/BasicBuildings/Archives_DarkPath.jpg','img/BasicBuildings/Archives_GoldPath.jpg',
    'img/BasicBuildings/Chapel.jpg','img/BasicBuildings/Chapel_DarkPath.jpg',
    'img/BasicBuildings/Chapel_GoldPath.jpg','img/BasicBuildings/Fortress.jpg',
    'img/BasicBuildings/Fortress_Dark Path.jpg','img/BasicBuildings/Fortress_Gold Path.jpg',
    'img/BasicBuildings/Guild Hall.jpg','img/BasicBuildings/Guild Hall_GoldPath.jpg',
    'img/BasicBuildings/GuildHall_DarkPath.jpg','img/BasicBuildings/Tavern.jpg',
    'img/BasicBuildings/Tavern_Dark Path.jpg','img/BasicBuildings/Tavern_Gold Path.jpg'];
  if (!size) size = 5;
//var texxtureLoader =
  var texture = new THREE.TextureLoader().load( tileImages[0] );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 1 );

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
