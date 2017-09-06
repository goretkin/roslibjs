/**
 * @fileOverview 
 * @author David V. Lu!!  davidvlu@gmail.com
 */

var UrdfParse = require('./UrdfParse');
var Transform = require('../math/Transform');

/**
 * A Joint element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfJoint(options) {
  this.name = options.xml.getAttribute('name');
  this.type = options.xml.getAttribute('type');

  var limits = options.xml.getElementsByTagName('limit');
  if (limits.length > 0) {
    this.minval = parseFloat( limits[0].getAttribute('lower') );
    this.maxval = parseFloat( limits[0].getAttribute('upper') );
  }

  var axis = options.xml.getElementsByTagName('axis');
  if (axis.length > 0) {
    this.axis = UrdfParse.parseVector3(axis[0].getAttribute('xyz'));
  }

  this.origin = UrdfParse.parseOriginTransform(options.xml);

  this.parent_link = options.xml.getElementsByTagName('parent')[0].getAttribute('link');
  this.child_link = options.xml.getElementsByTagName('child')[0].getAttribute('link');
}

module.exports = UrdfJoint;
