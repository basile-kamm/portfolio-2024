import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
