import * as THREE from "three"
import gsap from 'gsap';

import { GLTFLoader, OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";

let click = 0;
let data;
const progressBar = document.getElementById("progress-bar");
progressBar.value = 0;
const render = new THREE.WebGLRenderer({ canvas: document.querySelector('#logo') })
render.outputColorSpace = THREE.SRGBColorSpace;
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);

render.clearColor(0x000000);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-7, 1, 0);
camera.lookAt(6, 0, 0);


const controls = new OrbitControls(camera, render.domElement);
controls.enableDamping = true;
controls.enablePan = false;
//controls.enableZoom = false;
controls.minDistance = -10;
controls.maxDistance = 20;
//controls.maxPolarAngle = 1.6;
/*controls.autoRotate = true;
controls.autoRotateSpeed = -0.5;*/
controls.target = new THREE.Vector3(0, 1, 0);



const groundTexture = new THREE.TextureLoader().load('ground.jpg')
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);

const groundMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture
})
const grounMesh = new THREE.Mesh(groundGeometry, groundMaterial);
grounMesh.receiveShadow = true;
scene.add(grounMesh);

const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xBEBEBE, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03
});
const spotLight = new THREE.SpotLight(0xBEBEBE, 200, 100, 0.3, 0.5, 1.8);
spotLight.position.set(0, 15, 0);
scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0xBEBEBE, 0.3);
scene.add(ambientLight)


// const gltfLoader = new GLTFLoader();
// gltfLoader.load("911.glb", (gltf) => {
//   const car = gltf.scene;
//   car.position.y = 0.65

//   const carModel = gltf.scene.children[0];

//   carModel.getObjectByName('carExternal1').material = bodyMaterial;
//   carModel.getObjectByName('carExternal2').material = bodyMaterial;

//   scene.add(car);
// })
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '911.glb',
  function (gltf) {
    const car = gltf.scene;
    car.position.y = 0.65
    const carModel = gltf.scene.children[0];
    carModel.getObjectByName('carExternal1').material = bodyMaterial;
    carModel.getObjectByName('carExternal2').material = bodyMaterial;
    const progressBarContainer = document.querySelector(".progress-bar-conrtainer")
    progressBarContainer.style.display = 'none';
    scene.add(car);
  },
  function (xhr) {
    /*let progress = (xhr.loaded / xhr.total * 100);
    if (progress > 1) {
      progressBar.value = (xhr.loaded / xhr.total * 100);
    }*/
    console.log((xhr.loaded / xhr.total * 100));
  }
)

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  //console.log(camera.position)
  render.render(scene, camera);
}

animate();
document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('#rotateButton');
  button.addEventListener('click', carRotation);
});



async function carRotation() {
  click++;
  switch (click) {
    case 1:
      await gsap.to(camera.position, {
        x: 5,
        z: 8.5,
        duration: 2,
      });

      data = document.getElementById("speed");
      data.style.opacity = 1;
      data.style.animation = "fadeIn 1s ,move 2s";
      break;

    case 2:
      data = document.getElementById("speed");
      data.style.opacity = 0;

      await gsap.to(camera.position, {
        x: 0,
        z: -8,
        y: 1,
        duration: 2,
      });

      data = document.getElementById("ZeroToHundred");
      data.style.opacity = 1;

      data.style.animation = "fadeIn 1s ,move 2s";

      break;



    case 3:
      data.style.opacity = 0;

      await gsap.to(camera.position, {
        x: -3.5,
        z: -6,
        y: 1,
        duration: 2,
      });
      break;

    case 4:
      data.style.opacity = 0;

      camera.lookAt(-5, -5, 0)
      await gsap.to(camera.position, {
        x: 0,
        y: -1,
        z: 0,
        duration: 1,
      });
      data = document.getElementById("title");
      data.style.opacity = 0;

      data = document.getElementById("porscheLogo");
      data.style.display = "flex";
      data.style.opacity = 1;
      data.style.animation = "fadeIn 3s";
      break;
  }


}


// 3 1 -6