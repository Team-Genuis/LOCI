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


// STATS
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
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
// add the camera to the scene
scene.add(camera);

import grid from './grid';
scene.add(grid.threeGroup);

var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
camera.position.z = 3;
camera.position.y = 15;
camera.position.x = 5;

camera.lookAt(scene.position);
//camera.rotation.z = 0.785398;

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var tiles = require('./playerTiles')(5, 2); // from './grid';
tiles.threeGroup.rotation.x = -0.25;
tiles.threeGroup.position.z = -1.25;
tiles.threeGroup.rotation.z = -0.5;
scene.add(tiles.threeGroup);

var tiles = require('./playerTiles')(5, 1); // from './grid';
tiles.threeGroup.rotation.x = 0.5;
tiles.threeGroup.position.y = 1;
scene.add(tiles.threeGroup);

// material meashes saving
//var materials = {};
//var new_material = new THREE.MeshLambertMaterial({
//  opacity: 0.85
//});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var lastIntersects = [];
adjustSize();

window.addEventListener("resize", () => {
  adjustSize();
});

var update = function() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  //console.log(scene.children);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children, true);

  for (let i = 0; i < lastIntersects.length; i++) {

    lastIntersects[i].object.material.opacity = 1.0;

  }
  for (let i = 0; i < intersects.length; i++) {

    intersects[i].object.material.opacity = 0.7;

  }
  lastIntersects = intersects;

};

var render = function() {
  renderer.render(scene, camera);
};

var loop = function() {
  update();
  render();
  requestAnimationFrame(loop, renderer.canvas);
};
loop();
