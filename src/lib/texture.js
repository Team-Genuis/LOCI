const imagePath = '/img/BasicBuildings/';

const buildingTypes = [
  'Archives',
  'Chapel',
  'Fortress',
  'GuildHall',
  'Tavern'
];

var waiting = false;
var resolveCbs = [];
var buildingTextures = null;

var createBuildingTextures = () => {
  waiting = true;
  buildingTextures = {};
  return new Promise(function(resolve) {
    function createTexture(url, type) {
      return new Promise(function(resolve) {
        let canvas = document.createElement("canvas");
        canvas.height = 512;
        canvas.width = 512;
        let context = canvas.getContext('2d');
        let imageObj = new Image();
        imageObj.src = url;
        imageObj.onload = function() {
          console.log("IMAGE");
          context.drawImage(imageObj, 0, 0);
          buildingTextures[type] = new THREE.Texture(canvas);
          buildingTextures[type].needsUpdate = true;
          buildingTextures[type].wrapS = THREE.RepeatWrapping;
          buildingTextures[type].wrapT = THREE.RepeatWrapping;
          buildingTextures[type].repeat.set(1, 1);
          resolve(buildingTextures);
        };
      });
    }

    /*function createBuildingTextures(type) {
      let urls = {
        normal: imagePath,
        gold: imagePath,
        dark: imagePath
      };
      return Promise
        .all(Object.keys(buildingTextures).map(createTexture))
        new Promise(function(resolve) {
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
    }*/

    Promise
      .all(buildingTypes.map((type) => {
        return createTexture(imagePath + type + '.jpg', type);
      }))
      .then(() => {
        resolve(buildingTextures);
        if (resolveCbs.length > 0) {
          waiting = false;
          resolveCbs.map((resolve) => {
            resolve(buildingTextures);
          });
        }
      });
  });
};
var getBuildingTextures = () => {
  return new Promise((resolve) => {
    if (buildingTextures !== null) {
      resolve(buildingTextures);
    } else if (waiting) {
      resolveCbs.append(resolve);
    } else {
      waiting = true;
      resolve(createBuildingTextures());
    }
  });
};

module.exports = getBuildingTextures();
