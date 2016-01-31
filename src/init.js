var canvas = document.getElementById('loci');
var scene = new THREE.Scene();

var w = window.innerWidth,
  h = window.innerHeight;
//////////////
// RENDERER //
//////////////
var renderer;
// create and start the renderer; choose antialias setting.
if (Detector.webgl) {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
} else {
  renderer = new THREE.CanvasRenderer({
    canvas: canvas
  });
}

var adjustSize = () => {
  console.log('wtf');
  renderer.setSize(w, h);
};

var degToRad = (deg) => {
  return Math.PI / 180 * deg;
};

// STATS
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = 100;
document.body.appendChild(stats.domElement);

////////////
// CAMERA //
////////////
var VIEW_ANGLE = 45,
  ASPECT = w / h,
  NEAR = 0.1,
  FAR = 20000;
// set up camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.rotation.z = -1.5708;

// add the camera to the scene
scene.add(camera);

var createGrid = require('./lib/grid');
var board = createGrid(5);
board.threeGroup.rotation.x = degToRad(0);
board.threeGroup.rotation.y = degToRad(45);
board.threeGroup.rotation.z = degToRad(20);
board.threeGroup.position.y = 1;
scene.add(board.threeGroup);

var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
camera.position.z = 0;
camera.position.y = 15;
camera.position.x = 0;

camera.lookAt(scene.position);
//camera.rotation.z = 0.785398;

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 5, 0);
lights[1].position.set(50, 100, 50);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var createCards = require('./lib/cards'); // from './grid';
createCards().then((cards) => {
  cards.threeGroup.rotation.z = degToRad(10);
  //tiles.threeGroup.position.z = - 1.25;
  //tiles.threeGroup.rotation.z = -0.5;
  scene.add(cards.threeGroup);
});

var testText = require('./lib/text')('LOCI');
//testText.rotation.z += 1.5708/2;
//testText.rotation.z = -1.5708;
testText.rotation.y = degToRad(20);
testText.position.x = -4.5;
testText.position.z = 1.5;
scene.add(testText);

//var axes = require('./lib/axes')();
//testText.rotation.y = camera.rotation.y;
//testText.rotation.z = camera.rotation.z;
//scene.add(axes);

var render = function() {
  requestAnimationFrame(render);
  //testText.rotation.x += 0.1;
  //testText.rotation.y += 0.1;
  //testText.rotation.z += 0.1;
  renderer.render(scene, camera);
};

adjustSize();
render();

window.addEventListener("resize", () => {
  adjustSize();
});
