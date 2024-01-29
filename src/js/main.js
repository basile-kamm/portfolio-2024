import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const treeUrl = new URL("../asset/3d-model/tree.glb", import.meta.url);
const birdUrl = new URL("../asset/3d-model/bird.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

document.querySelector(".head-canva").appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40, //field of view
  window.innerWidth / window.innerHeight, //aspect ration
  0.1, //nearest point
  500 //further point
);

let cameraTarget = new THREE.Vector3(0, 10, 0);

camera.position.set(0, 10, 70); // set(x, y, z)

// RESPONSIVE CANVA
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const setupAnimation = () => {};

const LoadingManager = new THREE.LoadingManager(() => {
  setupAnimation();
});

const assetLoader = new GLTFLoader(LoadingManager);
let tree;
let bird;

assetLoader.load(
  treeUrl.href,
  function (gltf) {
    tree = gltf.scene;
    scene.add(tree);
    tree.position.set(0, 0, 0);
    tree.rotation.set(0, 5, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

assetLoader.load(
  birdUrl.href,
  function (gltf) {
    bird = gltf.scene;
    scene.add(bird);
    bird.position.set(0, 0, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// ambient light
const ambientLight = new THREE.AmbientLight(0x333333);
ambientLight.intensity = 80;
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-10, 10, 10);
spotLight.castShadow = true;
spotLight.intensity = 1000;

function animate() {
  requestAnimationFrame(animate);

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}

animate();
