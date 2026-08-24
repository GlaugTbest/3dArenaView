import * as THREE from "three";
import { FENCE_HALF_X, FENCE_HALF_Z, FENCE_HEIGHT, FENCE_KICK_WALL_HEIGHT, COLORS } from "./constants.js";

const POST_SPACING = 4;

/**
 * Tall ball-containment net that wraps the whole free zone (the low
 * barrier real beach volleyball arenas use behind/around the court so
 * balls don't fly into the surrounding area), built from a procedural
 * knotted-net texture rather than a solid wall.
 */
export function buildFence(scene) {
  const group = new THREE.Group();
  group.name = "court-net";

  const postMaterial = new THREE.MeshStandardMaterial({ color: COLORS.fencePost, roughness: 0.45, metalness: 0.65 });
  const netMaterial = buildNetMaterial();
  const kickWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c332c,
    roughness: 0.85,
    metalness: 0.05,
  });

  // Two entrances left open: one on the +Z side, one on the -X side.
  const gates = [
    { side: "z+", center: 0, width: 3 },
    { side: "x-", center: 0, width: 3 },
  ];

  addPerimeterSide(group, "x+", FENCE_HALF_X, FENCE_HALF_Z, postMaterial, netMaterial, kickWallMaterial, gates);
  addPerimeterSide(group, "x-", FENCE_HALF_X, FENCE_HALF_Z, postMaterial, netMaterial, kickWallMaterial, gates);
  addPerimeterSide(group, "z+", FENCE_HALF_X, FENCE_HALF_Z, postMaterial, netMaterial, kickWallMaterial, gates);
  addPerimeterSide(group, "z-", FENCE_HALF_X, FENCE_HALF_Z, postMaterial, netMaterial, kickWallMaterial, gates);

  scene.add(group);
  return group;
}

function buildNetMaterial() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(20, 26, 22, 0.85)";
  ctx.lineWidth = 2.2;

  // Diamond mesh pattern, like a knotted ball-containment net.
  const cell = size / 4;
  ctx.beginPath();
  for (let x = -size; x <= size * 2; x += cell) {
    ctx.moveTo(x, -size);
    ctx.lineTo(x + size * 2, size * 2);
  }
  for (let x = -size; x <= size * 2; x += cell) {
    ctx.moveTo(x, size * 2);
    ctx.lineTo(x + size * 2, -size);
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xdfe6df,
    roughness: 0.9,
    metalness: 0,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    alphaTest: 0.05,
  });
}

function addPerimeterSide(group, side, halfX, halfZ, postMaterial, netMaterial, kickWallMaterial, gates) {
  const isXSide = side === "x+" || side === "x-";
  const fixedCoord = side === "x+" ? halfX : side === "x-" ? -halfX : side === "z+" ? halfZ : -halfZ;
  const span = isXSide ? halfZ * 2 : halfX * 2;
  const gate = gates.find((g) => g.side === side);

  const segments = Math.ceil(span / POST_SPACING);
  const start = -span / 2;
  const netHeight = FENCE_HEIGHT - FENCE_KICK_WALL_HEIGHT;

  for (let i = 0; i < segments; i++) {
    const a = start + i * POST_SPACING;
    const b = Math.min(a + POST_SPACING, span / 2);
    const segLen = b - a;
    if (segLen <= 0.01) continue;

    const mid = (a + b) / 2;

    if (gate && Math.abs(mid) < gate.width / 2) continue; // leave gate opening

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, FENCE_HEIGHT, 10), postMaterial);
    const kickWall = new THREE.Mesh(new THREE.PlaneGeometry(segLen, FENCE_KICK_WALL_HEIGHT), kickWallMaterial);

    // Each panel gets its own texture instance so per-panel repeat tiling
    // doesn't overwrite the tiling of every other panel sharing the material.
    const segNetMaterial = netMaterial.clone();
    segNetMaterial.map = netMaterial.map.clone();
    segNetMaterial.map.needsUpdate = true;
    segNetMaterial.map.repeat.set(segLen / 1.4, netHeight / 1.4);
    const net = new THREE.Mesh(new THREE.PlaneGeometry(segLen, netHeight, 1, 1), segNetMaterial);

    const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, segLen, 6), postMaterial);
    const midRail = topRail.clone();

    if (isXSide) {
      post.position.set(fixedCoord, FENCE_HEIGHT / 2, a);
      kickWall.position.set(fixedCoord, FENCE_KICK_WALL_HEIGHT / 2, mid);
      kickWall.rotation.y = Math.PI / 2;
      net.position.set(fixedCoord, FENCE_KICK_WALL_HEIGHT + netHeight / 2, mid);
      net.rotation.y = Math.PI / 2;
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(fixedCoord, FENCE_HEIGHT - 0.05, mid);
      midRail.rotation.z = Math.PI / 2;
      midRail.position.set(fixedCoord, FENCE_KICK_WALL_HEIGHT, mid);
    } else {
      post.position.set(a, FENCE_HEIGHT / 2, fixedCoord);
      kickWall.position.set(mid, FENCE_KICK_WALL_HEIGHT / 2, fixedCoord);
      net.position.set(mid, FENCE_KICK_WALL_HEIGHT + netHeight / 2, fixedCoord);
      topRail.rotation.z = Math.PI / 2;
      topRail.rotation.y = Math.PI / 2;
      topRail.position.set(mid, FENCE_HEIGHT - 0.05, fixedCoord);
      midRail.rotation.z = Math.PI / 2;
      midRail.rotation.y = Math.PI / 2;
      midRail.position.set(mid, FENCE_KICK_WALL_HEIGHT, fixedCoord);
    }

    post.castShadow = true;
    kickWall.receiveShadow = true;
    net.receiveShadow = true;

    group.add(post, kickWall, net, topRail, midRail);
  }

  // Closing post at the far end of the side.
  const endPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, FENCE_HEIGHT, 10), postMaterial);
  if (isXSide) endPost.position.set(fixedCoord, FENCE_HEIGHT / 2, span / 2);
  else endPost.position.set(span / 2, FENCE_HEIGHT / 2, fixedCoord);
  endPost.castShadow = true;
  group.add(endPost);
}
