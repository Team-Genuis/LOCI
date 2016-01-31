const cardImages = [
  '/img/Cards/ArchiveCard.jpg',
  '/img/Cards/ChapelCard.jpg',
  '/img/Cards/FortressCard.jpg',
  '/img/Cards/GuildHallCard.jpg',
  '/img/Cards/TavernCard.jpg'
];
var cardTextures = [];

var createCards = () => {
  return new Promise(function(resolve) {
    var tiles = [];
    var tileGroup = new THREE.Group();
    function createTexture(url) {
      return new Promise(function(resolve) {
        let canvas = document.createElement("canvas");
        canvas.height = 512;
        canvas.width = 512;
        let context = canvas.getContext('2d');
        let imageObj = new Image();
        imageObj.src = url;
        let index = cardImages.indexOf(url);
        imageObj.onload = function() {
          console.log("IMAGE");
          context.drawImage(imageObj, 0, 0);
          cardTextures[index] = new THREE.Texture(canvas);
          cardTextures[index].needsUpdate = true;
          cardTextures[index].wrapS = THREE.RepeatWrapping;
          cardTextures[index].wrapT = THREE.RepeatWrapping;
          cardTextures[index].repeat.set(1, 1);
          resolve(cardTextures);
        };
      });
    }

    Promise
    .all(cardImages.map(createTexture))
    .then(()=>{
      let index = 0;
      for (let j = -1 * Math.floor(cardTextures.length / 2); j <= Math.floor(cardTextures.length / 2); j++) {
        var geometry = new THREE.BoxGeometry(1, 0.2, 1);
        var material = new THREE.MeshLambertMaterial();
        material.map = cardTextures[index++];
        let tile = new THREE.Mesh(geometry, material);
        tile.position.set(5 * 1.05 - 0.5, 1, j * 1.2);
        tile.rotation.y = Math.PI / 180 * 90;
        tiles.push(tile);
        tileGroup.add(tiles[tiles.length - 1]);
      }
      resolve({
        tiles: tiles,
        threeGroup: tileGroup
      });
    });
  });
};

module.exports = createCards;
