//import THREE from "three";
import { FlyControls } from "./node_modules/three/examples/jsm/controls/FlyControls.js";
import { FirstPersonControls } from "./node_modules/three/examples/jsm/controls/FirstPersonControls.js";
import Stats from "./node_modules/stats.js/src/Stats.js";
debugger;
//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//custom controlls
// selectedCamera = camera;

const controls = new FlyControls(camera, document.body);
controls.dragToLook = true;
controls.movementSpeed = 0.2;


camera.position.x = 20;
camera.position.y = 20;
camera.position.z = 20;

camera.rotateX(-1);



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
  positionZ: 0,
  lengthX: 1,
  lengthY: 1,
  lengthZ: 1
}) {
  const voxels = [];
  const lastX = options.positionX + options.lengthX - voxelResolution;
  const lastY = options.positionY + options.lengthY - voxelResolution;
  const lastZ = options.positionZ + options.lengthZ - voxelResolution;
  debugger;
  for (let x = options.positionX; x <= lastX; x += voxelResolution) {
    for (let y = options.positionY; y <= lastY; y += voxelResolution) {
      for (let z = options.positionZ; z <= lastZ; z += voxelResolution) {
        
        const vox = new Voxel();
        vox.position.x = x;
        vox.position.y = y;
        vox.position.z = z;
        voxels.push(vox)
      }
    }
  }
  return voxels;
}

var manyVoxels = generateVoxels({
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  lengthX: 16,
  lengthY: 1,
  lengthZ: 16
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


var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function _RENDER() {

  stats.begin();
  requestAnimationFrame(_RENDER);
  controls.update(2)
  renderer.render(scene, camera);
  stats.end();

}

_RENDER();

