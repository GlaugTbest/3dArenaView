import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { buildCourt } from "./scene/court.js";
import { buildFence } from "./scene/fence.js";
import { createCameraTower } from "./scene/cameraRig.js";
import { buildRack, buildPiBox } from "./scene/rack.js";
import { buildReplayButton } from "./scene/replayButton.js";
import { addPeople } from "./scene/people.js";
import { buildConduitPath } from "./scene/cabling.js";
import { createLabel } from "./scene/labels.js";
import { FENCE_HALF_X, FENCE_HALF_Z, COURT_WIDTH, POST_OFFSET, COLORS } from "./scene/constants.js";

const app = document.getElementById("app");

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fc4e0);
scene.fog = new THREE.Fog(0x9fc4e0, 55, 130);

// --- Camera ---
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(30, 24, 32);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 6;
controls.maxDistance = 90;
controls.maxPolarAngle = Math.PI * 0.49;
controls.update();

// --- Lighting ---
scene.add(new THREE.HemisphereLight(0xdcebff, 0x8a7a5a, 0.65));

const sun = new THREE.DirectionalLight(0xfff4e0, 2.1);
sun.position.set(-24, 34, 18);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -34;
sun.shadow.camera.right = 34;
sun.shadow.camera.top = 34;
sun.shadow.camera.bottom = -34;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 90;
sun.shadow.bias = -0.0015;
scene.add(sun);

const fill = new THREE.DirectionalLight(0xbcd8ff, 0.35);
fill.position.set(20, 16, -15);
scene.add(fill);

// --- Court + perimeter ---
buildCourt(scene);
buildFence(scene);

// --- Camera towers (opposite corners, diagonal coverage) ---
const target = new THREE.Vector3(0, 1.1, 0);
const poleHeight = 4.3;

const cam1 = createCameraTower({
  position: { x: FENCE_HALF_X + 1.5, z: FENCE_HALF_Z + 1 },
  poleHeight,
  target,
  label: "Câmera 1",
});
scene.add(cam1.group);

const cam2 = createCameraTower({
  position: { x: -(FENCE_HALF_X + 1.5), z: -(FENCE_HALF_Z + 1) },
  poleHeight,
  target,
  label: "Câmera 2",
});
scene.add(cam2.group);

// --- Technical rack + Raspberry Pi enclosure (protected area, outside sand) ---
const rackPosition = { x: 6, z: -(FENCE_HALF_Z + 3) };
const rack = buildRack(rackPosition);
scene.add(rack.group);

const piPosition = { x: rackPosition.x + 1.35, z: rackPosition.z };
const pi = buildPiBox(piPosition);
scene.add(pi.group);

// --- Physical REPLAY button, clamped onto the net post nearest the rack ---
const buttonPostZ = -(COURT_WIDTH / 2 + POST_OFFSET);
const buttonPosition = { x: 0, z: buttonPostZ };
const replay = buildReplayButton(buttonPosition, { outwardZ: -1 });
scene.add(replay.group);

// --- Cabling: cameras -> switch (never crossing the sand) ---
const railZ = rackPosition.z; // shared cable-tray line along the back of the arena

scene.add(
  buildConduitPath([cam1.poleTopPosition, cam1.poleBasePosition], { radius: 0.045 })
);
scene.add(
  buildConduitPath(
    [
      cam1.poleBasePosition,
      new THREE.Vector3(cam1.poleBasePosition.x, 0.05, railZ),
      new THREE.Vector3(rack.cableEntryPoint.x, 0.05, railZ),
      rack.cableEntryPoint,
    ],
    { radius: 0.045 }
  )
);

scene.add(
  buildConduitPath([cam2.poleTopPosition, cam2.poleBasePosition], { radius: 0.045 })
);
scene.add(
  buildConduitPath(
    [
      cam2.poleBasePosition,
      new THREE.Vector3(cam2.poleBasePosition.x, 0.05, railZ),
      new THREE.Vector3(rack.cableEntryPoint.x, 0.05, railZ),
      rack.cableEntryPoint,
    ],
    { radius: 0.045 }
  )
);

// --- GPIO cable: Raspberry Pi -> REPLAY button ---
scene.add(
  buildConduitPath(
    [
      pi.gpioExitPoint,
      new THREE.Vector3(pi.gpioExitPoint.x, 0.05, railZ),
      new THREE.Vector3(replay.gpioEntryPoint.x, 0.05, railZ),
      new THREE.Vector3(replay.gpioEntryPoint.x, 0.05, buttonPosition.z),
      replay.gpioEntryPoint,
    ],
    { radius: 0.03, color: COLORS.raspberry, emissive: COLORS.raspberry }
  )
);

// --- Human figures for scale ---
addPeople(scene, [
  { x: -3, z: -1.5, rotationY: 0.4 },
  { x: 2.5, z: 1.8, rotationY: -2.1 },
  { x: -5.5, z: 2.5, rotationY: 1.1 },
  { x: 0.35, z: buttonPostZ - 0.55, rotationY: Math.PI }, // pressing the replay button
]);

// --- Architecture overview label near the rack for context ---
const overviewLabel = createLabel("Câmera 1 + Câmera 2 → Switch PoE → Servidor/NVR", { accent: "#4ea1ff", scale: 1.1 });
overviewLabel.position.set(rackPosition.x - 2.5, 3.4, rackPosition.z);
scene.add(overviewLabel);

// --- Resize handling ---
// Also checked every frame below: some embedding contexts (e.g. a preview
// pane that mounts before it has a real layout size) fire no resize event
// once the container becomes visible, so a live size check is the reliable path.
let lastWidth = 0;
let lastHeight = 0;
function syncSize() {
  const width = app.clientWidth || window.innerWidth;
  const height = app.clientHeight || window.innerHeight;
  if (width === lastWidth && height === lastHeight) return;
  lastWidth = width;
  lastHeight = height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, true);
}
window.addEventListener("resize", syncSize);

// --- Render loop ---
function animate() {
  requestAnimationFrame(animate);
  syncSize();
  controls.update();
  renderer.render(scene, camera);
}
animate();

const loading = document.getElementById("loading");
if (loading) {
  loading.style.opacity = "0";
  setTimeout(() => loading.remove(), 400);
}
