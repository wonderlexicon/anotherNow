


// init: function () {
//   var self = this;
//   var el = this.el;

//   this.children = el.getChildEntities();
//   this.initialPositions = [];

//   this.children.forEach(function getInitialPositions (childEl) {
//     if (childEl.hasLoaded) { return _getPositions(); }
//     childEl.addEventListener('loaded', _getPositions);
//     function _getPositions () {
//       var position = childEl.getAttribute('position');
//       self.initialPositions.push([position.x, position.y, position.z]);
//     }
//   });

//   el.addEventListener('child-attached', function (evt) {
//     // Only update if direct child attached.
//     if (evt.detail.el.parentNode !== el) { return; }
//     self.children.push(evt.detail.el);
//     self.update();
//   });

//   el.addEventListener('child-detached', function (evt) {
//     // Only update if direct child detached.
//     if (self.children.indexOf(evt.detail.el) === -1) { return; }
//     self.children.splice(self.children.indexOf(evt.detail.el), 1);
//     self.initialPositions.splice(self.children.indexOf(evt.detail.el), 1);
//     self.update();
//   });
// },

// /**
//  * Update child entity positions.
//  */

// update: function (oldData) {
//   var children = this.children;
//   var data = this.data;
//   var el = this.el;
//   var numChildren = children.length;
//   var positionFn;
//   var positions;
//   var startPosition = el.getAttribute('position');

// // Calculate different positions based on layout shape.
// switch (data.type) {

// case 'dodecahedron': {
// positionFn = getDodecahedronPositions;
// break;
// }
// default: {
//       // Line.
//       positionFn = getLinePositions;
//     }
//   }
// positions = positionFn(data, numChildren, startPosition);
// setPositions(children, positions);
// },

// /**
//  * Reset positions.
//  */

// remove: function () {
//   this.el.removeEventListener('child-attached', this.childAttachedCallback);
//   setPositions(this.children, this.initialPositions);
// }
// });

// /**
// * Get positions for `dodecahedron` layout.
// */
// function getDodecahedronPositions (data, numChildren, startPosition) {
// var PHI = (1 + Math.sqrt(5)) / 2;
// var B = 1 / PHI;
// var C = 2 - PHI;
// var NB = -1 * B;
// var NC = -1 * C;

// return transform([
//   [-1, C, 0],
//   [-1, NC, 0],
//   [0, -1, C],
//   [0, -1, NC],
//   [0, 1, C],
//   [0, 1, NC],
//   [1, C, 0],
//   [1, NC, 0],
//   [B, B, B],
//   [B, B, NB],
//   [B, NB, B],
//   [B, NB, NB],
//   [C, 0, 1],
//   [C, 0, -1],
//   [NB, B, B],
//   [NB, B, NB],
//   [NB, NB, B],
//   [NB, NB, NB],
//   [NC, 0, 1],
//   [NC, 0, -1],
// ], startPosition, data.radius / 2);
// }
// module.exports.getDodecahedronPositions = getDodecahedronPositions;

// /**
// * Multiply all coordinates by a scale factor and add translate.
// *
// * @params {array} positions - Array of coordinates in array form.
// * @returns {array} positions
// */
// function transform (positions, translate, scale) {
// translate = [translate.x, translate.y, translate.z];
// return positions.map(function (position) {
//   return position.map(function (point, i) {
//     return point * scale + translate[i];
//   });
// });
// };


// /**
// * Set position on child entities.
// *
// * @param {array} els - Child entities to set.
// * @param {array} positions - Array of coordinates.
// */
// function setPositions (els, positions) {
// els.forEach(function (el, i) {
//   var position = positions[i];
//   el.setAttribute('position', {
//     x: position[0],
//     y: position[1],
//     z: position[2]
//   });
// });
// }
  
AFRAME.registerComponent('enter-world', {


  init: function () {
    var data = this.data;
    var el = this.el;
    this.el.addEventListener('click', function () {
      var videosphere = document.getElementById("videosphere");
      videosphere.setAttribute("src", el.getAttribute("src"));
     var startingElements= document.getElementsByClassName("starting");
    //  startingElements.forEach(element => {
    //    element.setAttribute("visible",false);
    //  });
    });
  }
});
  