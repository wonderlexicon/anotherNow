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


  var boxEl = document.querySelector('a-box');
  boxEl.addEventListener('mouseenter', function () {
    boxEl.setAttribute('scale', {x: 2, y: 2, z: 2});

  
AFRAME.registerComponent('scale-on-mouseenter', {
  schema: {
    to: {type:'vec3'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    this.el.addEventListener('mouseenter', function () {
      el.object3D.scale.copy(data.to);
    });
  }
});
  }

  global.window = require('jsdom').jsdom().defaultView;
  var aframe = require('aframe/src');
  console.log(aframe.version);
