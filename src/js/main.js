import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const treeUrl = new URL("../asset/3d-model/tree.glb", import.meta.url);
const birdUrl = new URL("../asset/3d-model/bird.glb", import.meta.url);
