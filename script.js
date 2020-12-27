//import THREE from "three";
import { FlyControls } from "./node_modules/three/examples/jsm/controls/FlyControls.js";
import { FirstPersonControls } from "./node_modules/three/examples/jsm/controls/FirstPersonControls.js";

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//custom controlls
// selectedCamera = camera;

const controls = new FlyControls(camera, document.body);
controls.dragToLook = true;
controls.movementSpeed = 0.2;


camera.position.z = 5;

//Lights
const light = new THREE.AmbientLight(0x404040);

//Geometry
const voxelResolution = 1;

class Voxel extends THREE.Mesh {
  constructor(options = { material: { color: 0x00fff6 } }) {
    const geometry = new THREE.BoxGeometry(
      voxelResolution,
      voxelResolution,
      voxelResolution
    );
    const voxelMaterial = new THREE.MeshBasicMaterial(options.material);
    super(geometry, voxelMaterial);
  }
}

function generateVoxels(options = {
  positionX: 0,
  positionY: 0,
  lengthX: 1,
  lengthY: 1
}) {
  const voxels = [];
  const lastX = options.positionX + options.lengthX - 1;
  const lastY = options.positionY + options.lengthY - 1

  for (var x = options.positionX; x <= lastX; x++) {
    for (var y = options.positionY; y <= lastY; y++) {
      const vox = new Voxel();
      vox.position.x = x;
      vox.position.y = y;
      vox.position.z = 0;
      voxels.push(vox)
    }
  }
  return voxels;
}

var manyVoxels = generateVoxels({
  positionX: 0,
  positionY: 0,
  lengthX: 5,
  lengthY: 2
})

//demo cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const demoCube = new THREE.Mesh(geometry, material);

//Scene
const scene = new THREE.Scene();

scene.add(light);

manyVoxels.forEach(vox => scene.add(vox))

//scene.add( demoCube );


//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function _RENDER() {

  requestAnimationFrame(_RENDER);
  controls.update(2)
  renderer.render(scene, camera);

}

_RENDER()
