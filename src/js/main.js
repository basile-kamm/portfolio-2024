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

var headCanva = document.querySelector(".head-canva");
if (headCanva) {
  headCanva.appendChild(renderer.domElement);
}

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

  updateScrollTrigger();
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

// Setup for squares
var squares = document.getElementsByClassName("square-container");
var squaresArr = Array.from(squares);

var squareTriggers = [];

squaresArr.forEach(function (square) {
  var link = square.querySelector(".square-link");

  var trigger = ScrollTrigger.create({
    trigger: square,
    // markers: true,
    start: "top 70%",
    end: "bottom 70% ",
    onEnter: () => link.classList.add("is-active"),
    onLeave: () => link.classList.remove("is-active"),
    onEnterBack: () => link.classList.add("is-active"),
    onLeaveBack: () => link.classList.remove("is-active"),
  });

  squareTriggers.push(trigger);
});

// Function to update square ScrollTriggers based on window size
function updateScrollTrigger() {
  if (window.innerWidth <= 767) {
    squareTriggers.forEach((trigger) => trigger.enable());
  } else {
    squareTriggers.forEach((trigger) => trigger.disable());
  }
}

// Initial setup
updateScrollTrigger();

// Update on window resize
window.addEventListener("resize", updateScrollTrigger);

// Setup for cards
var cards = document.getElementsByClassName("card-container");
var cardsArr = Array.from(cards);

cardsArr.forEach(function (card) {
  var trigger = ScrollTrigger.create({
    // markers: true,
    trigger: card,
    start: "top bottom",
    end: "bottom center ",
    onEnter: () => card.classList.remove("is-out"),
    onLeaveBack: () => card.classList.add("is-out"),
  });
});

// burger menu
const hamburger = document.querySelector(".burger-icon");
const background = document.querySelector(".burger-background");
const burger = document.querySelector(".burger-container");

hamburger.addEventListener("click", isActive);
background.addEventListener("click", isActive);

function isActive() {
  burger.classList.toggle("is-active");
}

// CURSOR POINTER //
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".cursor-circle");

const cursor = document.querySelector(".cursor-container");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
