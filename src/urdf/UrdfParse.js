var Vector3 = require('../math/Vector3');
var Quaternion = require('../math/Quaternion');
var Transform = require('../math/Transform');

function parseArray(string) {
  return string.trim().split(/\s+/).map(parseFloat);
}

function parseVector3(string) {
  var a = parseArray(string);
  return new Vector3({
    x : a[0],
    y : a[1],
    z : a[2]
  });
}

function parseRpyAsQuaternion(string) {
  var rpy = parseArray(string);

  var roll = rpy[0];
  var pitch = rpy[1];
  var yaw = rpy[2];
  var phi = roll / 2.0;
  var the = pitch / 2.0;
  var psi = yaw / 2.0;
  var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the)
      * Math.sin(psi);
  var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the)
      * Math.sin(psi);
  var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the)
      * Math.cos(psi);
  var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the)
      * Math.sin(psi);

  var orientation = new Quaternion({
    x : x,
    y : y,
    z : z,
    w : w
  });
  orientation.normalize();

  return orientation;
}

function parseOriginTransform(xml) {
  var origin = xml.getElementsByTagName('origin');
  if (origin.length > 0) {
    var xyz = origin[0].getAttribute('xyz');
    var rpy = origin[0].getAttribute('rpy');

    return new Transform({
      translation : xyz ? parseVector3(xyz) : new Vector3(),
      orientation : rpy ? parseRpyAsQuaternion(rpy) : new Quaternion()
    });
  }
  else {
    return new Transform();
  }
}

module.exports.parseVector3 = parseVector3;
module.exports.parseRpyAsQuaternion = parseRpyAsQuaternion;
module.exports.parseOriginTransform = parseOriginTransform;
