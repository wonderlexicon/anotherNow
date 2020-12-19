console.log(document.querySelector('a-assets').fileLoader);
console.log(THREE.Cache);


let express = require('express');
let app = express();
let path = require ("path");


app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// app.use("/", express.static("."));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT ||5000;
server.listen(port,() =>{
    console.log("server listening");
});


 app.use("/", express.static("."));


 AFRAME.registerComponent('query-selector-example', {
  init: function () {
    this.entities = document.querySelectorAll('.box');
  },
  
  tick: function () {
    // Don't call query selector in here, query beforehand.
    for (let i = 0; i < this.entities.length; i++) {
      // Do something with entities.
    }
  }
});

AFRAME.registerComponent('layout', {
  schema: {
    columns: {default: 1, min: 0, if: {type: ['box']}},
    margin: {default: 1, min: 0, if: { type: ['box', 'line']}},
    radius: {default: 1, min: 0, if: {
      type: ['circle', 'cube', 'dodecahedron', 'pyramid']
    }},
    type: {default: 'line', oneOf: [
      'box', 'circle', 'cube', 'dodecahedron', 'line', 'pyramid'
    ]}
  },

/**
   * Store initial positions in case need to reset on component removal.
   */
  init: function () {
    var self = this;
    var el = this.el;

    this.children = el.getChildEntities();
    this.initialPositions = [];

    this.children.forEach(function getInitialPositions (childEl) {
      if (childEl.hasLoaded) { return _getPositions(); }
      childEl.addEventListener('loaded', _getPositions);
      function _getPositions () {
        var position = childEl.getAttribute('position');
        self.initialPositions.push([position.x, position.y, position.z]);
      }
    });

    el.addEventListener('child-attached', function (evt) {
      // Only update if direct child attached.
      if (evt.detail.el.parentNode !== el) { return; }
      self.children.push(evt.detail.el);
      self.update();
    });

    el.addEventListener('child-detached', function (evt) {
      // Only update if direct child detached.
      if (self.children.indexOf(evt.detail.el) === -1) { return; }
      self.children.splice(self.children.indexOf(evt.detail.el), 1);
      self.initialPositions.splice(self.children.indexOf(evt.detail.el), 1);
      self.update();
    });
  },

  /**
   * Update child entity positions.
   */

  update: function (oldData) {
    var children = this.children;
    var data = this.data;
    var el = this.el;
    var numChildren = children.length;
    var positionFn;
    var positions;
    var startPosition = el.getAttribute('position');

// Calculate different positions based on layout shape.
switch (data.type) {

case 'dodecahedron': {
  positionFn = getDodecahedronPositions;
  break;
}
default: {
        // Line.
        positionFn = getLinePositions;
      }
    }
positions = positionFn(data, numChildren, startPosition);
setPositions(children, positions);
},

  /**
   * Reset positions.
   */

  remove: function () {
    this.el.removeEventListener('child-attached', this.childAttachedCallback);
    setPositions(this.children, this.initialPositions);
  }
});

/**
 * Get positions for `dodecahedron` layout.
 */
function getDodecahedronPositions (data, numChildren, startPosition) {
  var PHI = (1 + Math.sqrt(5)) / 2;
  var B = 1 / PHI;
  var C = 2 - PHI;
  var NB = -1 * B;
  var NC = -1 * C;

  return transform([
    [-1, C, 0],
    [-1, NC, 0],
    [0, -1, C],
    [0, -1, NC],
    [0, 1, C],
    [0, 1, NC],
    [1, C, 0],
    [1, NC, 0],
    [B, B, B],
    [B, B, NB],
    [B, NB, B],
    [B, NB, NB],
    [C, 0, 1],
    [C, 0, -1],
    [NB, B, B],
    [NB, B, NB],
    [NB, NB, B],
    [NB, NB, NB],
    [NC, 0, 1],
    [NC, 0, -1],
  ], startPosition, data.radius / 2);
}
module.exports.getDodecahedronPositions = getDodecahedronPositions;

/**
 * Multiply all coordinates by a scale factor and add translate.
 *
 * @params {array} positions - Array of coordinates in array form.
 * @returns {array} positions
 */
function transform (positions, translate, scale) {
  translate = [translate.x, translate.y, translate.z];
  return positions.map(function (position) {
    return position.map(function (point, i) {
      return point * scale + translate[i];
    });
  });
};


/**
 * Set position on child entities.
 *
 * @param {array} els - Child entities to set.
 * @param {array} positions - Array of coordinates.
 */
function setPositions (els, positions) {
  els.forEach(function (el, i) {
    var position = positions[i];
    el.setAttribute('position', {
      x: position[0],
      y: position[1],
      z: position[2]
    });
  });
}




window.addEventListener("wheel", event=>{
    let myCamera = document.getElementById("camera");
    const delta=Math.sign(event.wheelDelta);
    const currentZoom = Number(myCamera.getAttribute("zoom"));
    const zoomRate = 0.01;
    let newZoom = delta * zoomRate + currentZoom;
   
    const closestZoom = 5; 
    const farthestZoom =0.01;

    if (newZoom > closestZoom){
        newZoom= closestZoom
    }
    if (newZoom < farthestZoom){
        newZoom = farthestZoom
    }

    myCamera.setAttribute("zoom", newZoom);
    console.log({newZoom})
})


  // var boxEl = document.querySelector('a-box');
  // boxEl.addEventListener('mouseenter', function () {
  //   boxEl.setAttribute('scale', {x: 2, y: 2, z: 2});

  
// AFRAME.registerComponent('scale-on-mouseenter', {
//   schema: {
//     to: {type:'vec3'}
//   },

//   init: function () {
//     var data = this.data;
//     var el = this.el;
//     this.el.addEventListener('mouseenter', function () {
//       el.object3D.scale.copy(data.to);
//     });
//   }
// });
//   }

//   global.window = require('jsdom').jsdom().defaultView;
//   var aframe = require('aframe/src');
//   console.log(aframe.version);
