import THREE from "three";

//Camera
const camera = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
  );
  
  camera.position.z = 5;
  
  //Lights
  const light = new THREE.AmbientLight( 0x404040 );
  
  //Geometry
  const voxelResolution = 1;
  
  class Voxel extends THREE.Mesh {
    constructor(options = {material: { color: 0x00fff6 }}) {
      const geometry = new THREE.BoxGeometry(
        voxelResolution, 
        voxelResolution, 
        voxelResolution
      );
      const voxelMaterial = new THREE.MeshBasicMaterial( options.material );
      super(geometry, voxelMaterial);
    }
  }
  
  const voxel1 = new Voxel();
  
  function generateVoxels( options = {
      postionX: 0, 
      positionY: 0, 
      lengthX: 1, 
      lengthY: 1
  }) {
    const voxels = [];
    for (var x = options.postionX; x < options.lengthX; x++) {
      for (var y = options.positionY; y < options.lengthY; y++) {
        const vox = new Voxel();
        vox.position = {
          x,
          y,
          z: 0
        }
        voxels.push(vox)
      }
    }
    return voxels;
  }
  
  var manyVoxels = generateVoxels({
    postionX: 0, 
    positionY: 0, 
    lengthX: 2, 
    lengthY: 2
  })
  
  //demo cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const demoCube = new THREE.Mesh( geometry, material );
  
  //Scene
  const scene = new THREE.Scene();
  
  scene.add( light );
  scene.add( voxel1 );
  scene.add( manyVoxels );
  manyVoxels.forEach(vox => scene.add( vox ))
  
  //scene.add( demoCube );
  
  
  //Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement )
  
  function _RENDER() {
    
    requestAnimationFrame(_RENDER);
    renderer.render( scene, camera );
      
  }
  
  _RENDER()