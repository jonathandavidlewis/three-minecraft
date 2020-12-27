const leftButton = "a";
const downButton = "w";
const rightButton = "d";
const upButton = "s";

let selectedCamera;

let cameraFreeLook = false;


const moveLeft = function () {
  selectedCamera.position.x -= 0.05;
}

const moveUp = function () {
  selectedCamera.position.y += 0.05;
}

const moveRight = function () {
  selectedCamera.position.x += 0.05;
}

const moveDown = function () {
  selectedCamera.position.y -= 0.05;
}

const moveFoward = function () {
  selectedCamera.position.z += 0.05;
}

const moveBackward = function() {
  selectedCamera.position.z -= 0.05;
}

document.addEventListener('mousedown', function(e) {
  
  if (e.which == 2) {
     e.preventDefault();
     cameraFreeLook = true;
     console.log("Free look on");
  }
});

document.addEventListener('mouseup', function(e) {
  
  if (e.which == 2) {
     e.preventDefault();
     cameraFreeLook = false;
     console.log("Free look off");
  }
});

document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  switch (event.key) {
    case leftButton:
      moveLeft();
      break;
    case rightButton:
      moveRight();
      break;
    case upButton:
      moveFoward()
      break;
    case downButton:
      moveBackward();
      break;
    default:
      console.log("default")
  }
});
