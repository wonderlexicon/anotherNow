  
AFRAME.registerComponent('enter-world', {


  init: function () {
    var data = this.data;
    var el = this.el;
    this.el.addEventListener('click', function () {
      var videosphere = document.getElementById("videosphere");
      videosphere.setAttribute("src", el.getAttribute("src"));
     var startingElements= document.getElementsByClassName("starting");
     startingElements.forEach(element => {
       element.setAttribute("visible",false);
     });
    });
  }
});
  



