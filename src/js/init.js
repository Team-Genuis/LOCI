var scene = new THREE.Scene();
////////////
// CAMERA //
////////////

// set the view size in pixels (custom or according to window size)
// var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45,
  ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
  NEAR = 0.1,
  FAR = 20000;
// set up camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);

//////////////
// RENDERER //
//////////////
var renderer;
// create and start the renderer; choose antialias setting.
if (Detector.webgl){
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
}else{
  renderer = new THREE.CanvasRenderer();
}

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);
var numRow = 5,
  numCol = 5;

var geometry = new THREE.BoxGeometry(1, 0.2, 1);
var material = new THREE.MeshPhongMaterial( { color:0xff0000, transparent:true, opacity:1 } );
var cube;

for (var i = -1 * Math.floor(numRow / 2); i <= Math.floor(numRow / 2); i++) {
  for (var j = -1 * Math.floor(numCol / 2); j <= Math.floor(numCol / 2); j++) {
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(i * 1.5, 0, j * 1.5);
    scene.add(cube);
    console.log(i, j);
  }
}

var ambientLight = new THREE.AmbientLight( 0xFFF000 );
			scene.add( ambientLight );

camera.position.z = 0;
camera.position.y = 15;
camera.position.x = 5;

camera.lookAt(scene.position);
camera.rotation.z = 0.785398;

var lights = [];
			lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[0].position.set( 0, 200, 0 );
			lights[1].position.set( 100, 200, 100 );
			lights[2].position.set( -100, -200, -100 );

			scene.add( lights[0] );
			scene.add( lights[1] );
			scene.add( lights[2] );

var render = function() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;
  scene.rotation.x += 0.05;
  scene.rotation.y += 0.05;
  renderer.render(scene, camera);
};
render();
