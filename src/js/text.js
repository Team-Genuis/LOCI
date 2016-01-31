var textGeometry = (str) => {
  var text3d = new THREE.TextGeometry(str, {
    size: 1,
    height: 1,
    curveSegments: 2,
    font: "helvetiker"

  });

  text3d.computeBoundingBox();
  var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x);
  var centerOffsetY = -0.5 * (text3d.boundingBox.max.y - text3d.boundingBox.min.y);
  centerOffsetY;
  var material = new THREE.MeshFaceMaterial([
    new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
      overdraw: 0.5
    }),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      overdraw: 0.5
    })
  ]);

  var text = new THREE.Mesh(text3d, material);
  text.rotation.x = -1.5708;
  //testText.rotation.z = 1.5708;
  text.rotation.z = 1.5708;
  text.position.x = centerOffset;
  //text.position.z = -1 * centerOffsetY;
  //text.position.y = 5;
  //text.position.z = 0;

  return text;
};
module.exports = textGeometry;
