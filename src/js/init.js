var scene = new THREE.Scene();
////////////
	// CAMERA //
	////////////

	// set the view size in pixels (custom or according to window size)
	// var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	// set up camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	// add the camera to the scene
	scene.add(camera);
	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);

  	//////////////
  	// RENDERER //
  	//////////////

  	// create and start the renderer; choose antialias setting.
  	if ( Detector.webgl )
  		renderer = new THREE.WebGLRenderer( {antialias:true} );
  	else
  		renderer = new THREE.CanvasRenderer();

  	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild( renderer.domElement );
var numRow = 5, numCol = 5;

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ffFF } );
var cube;

for(var i = -1*Math.floor(numRow/2); i < Math.floor(numRow/2); i++){
  for(var j = -1*Math.floor(numCol/2); j < Math.floor(numCol/2); j++){
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(i*1.2, 0, j*1.2);
    scene.add( cube );
    console.log(i,j);
  }
}

camera.position.z = 5;
var render = function () {
  requestAnimationFrame( render );
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  camera.rotation.x += 0.1;
  camera.rotation.y += 0.1;
  renderer.render(scene, camera);
};
render();
