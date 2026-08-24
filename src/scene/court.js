import * as THREE from "three";
import {
  COURT_LENGTH,
  COURT_WIDTH,
  LINE_WIDTH,
  NET_TOP_HEIGHT,
  NET_BAND_HEIGHT,
  POST_HEIGHT,
  POST_OFFSET,
  SAND_HALF_X,
  SAND_HALF_Z,
  ARENA_HALF_X,
  ARENA_HALF_Z,
  COLORS,
} from "./constants.js";

export function buildCourt(scene) {
  const group = new THREE.Group();
  group.name = "court";

  group.add(buildArenaGround());
  group.add(buildSandBed());
  group.add(buildBoundaryLines());
  group.add(buildNetAndPosts());

  scene.add(group);
  return group;
}

function buildArenaGround() {
  const geometry = new THREE.PlaneGeometry(ARENA_HALF_X * 2, ARENA_HALF_Z * 2);
  const material = new THREE.MeshStandardMaterial({
    color: COLORS.ground,
    roughness: 0.95,
    metalness: 0.02,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

function buildSandBed() {
  const group = new THREE.Group();

  const geometry = new THREE.PlaneGeometry(SAND_HALF_X * 2, SAND_HALF_Z * 2, 64, 32);
  // Gentle procedural undulation so the sand doesn't read as a flat plane.
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const bump = Math.sin(x * 1.3) * Math.cos(y * 1.7) * 0.015 + (Math.random() - 0.5) * 0.01;
    pos.setZ(i, bump);
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: COLORS.sand,
    roughness: 1,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Subtle border to separate sand from surrounding ground.
  const border = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-SAND_HALF_X, 0.02, -SAND_HALF_Z),
      new THREE.Vector3(SAND_HALF_X, 0.02, -SAND_HALF_Z),
      new THREE.Vector3(SAND_HALF_X, 0.02, SAND_HALF_Z),
      new THREE.Vector3(-SAND_HALF_X, 0.02, SAND_HALF_Z),
    ]),
    new THREE.LineBasicMaterial({ color: COLORS.sandDark })
  );
  group.add(border);

  return group;
}

function lineMesh(width, depth) {
  const geometry = new THREE.BoxGeometry(width, 0.015, depth);
  const material = new THREE.MeshStandardMaterial({
    color: COLORS.line,
    roughness: 0.6,
    emissive: 0x222222,
    emissiveIntensity: 0.15,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.02;
  mesh.receiveShadow = true;
  return mesh;
}

function buildBoundaryLines() {
  const group = new THREE.Group();
  const halfL = COURT_LENGTH / 2;
  const halfW = COURT_WIDTH / 2;

  // Sidelines (run along X, at z = ±halfW)
  [-halfW, halfW].forEach((z) => {
    const line = lineMesh(COURT_LENGTH + LINE_WIDTH, LINE_WIDTH);
    line.position.set(0, 0, z);
    group.add(line);
  });

  // End lines (run along Z, at x = ±halfL)
  [-halfL, halfL].forEach((x) => {
    const line = lineMesh(LINE_WIDTH, COURT_WIDTH + LINE_WIDTH);
    line.position.set(x, 0, 0);
    group.add(line);
  });

  // Center line reference under the net.
  const centerLine = lineMesh(LINE_WIDTH, COURT_WIDTH);
  centerLine.position.set(0, 0, 0);
  group.add(centerLine);

  return group;
}

function buildNetAndPosts() {
  const group = new THREE.Group();
  const halfW = COURT_WIDTH / 2;
  const postZ = halfW + POST_OFFSET;

  const poleMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.pole,
    roughness: 0.4,
    metalness: 0.75,
  });

  [-postZ, postZ].forEach((z) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, POST_HEIGHT, 12), poleMaterial);
    post.position.set(0, POST_HEIGHT / 2, z);
    post.castShadow = true;
    group.add(post);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.08, 12), poleMaterial);
    base.position.set(0, 0.04, z);
    base.castShadow = true;
    group.add(base);

    // Tension winder detail.
    const winder = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.08), poleMaterial);
    winder.position.set(0, POST_HEIGHT * 0.55, z);
    group.add(winder);
  });

  // Net mesh band, represented as a semi-transparent grid plane.
  const netHeight = NET_BAND_HEIGHT;
  const netGeometry = new THREE.PlaneGeometry(COURT_WIDTH + POST_OFFSET * 1.6, netHeight, 24, 6);
  const netMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.net,
    roughness: 0.9,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  const net = new THREE.Mesh(netGeometry, netMaterial);
  net.rotation.y = Math.PI / 2;
  net.position.set(0, NET_TOP_HEIGHT - netHeight / 2, 0);
  group.add(net);

  // Top and bottom border tape of the net.
  [NET_TOP_HEIGHT, NET_TOP_HEIGHT - netHeight].forEach((y) => {
    const tape = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, COURT_WIDTH + POST_OFFSET * 1.6),
      new THREE.MeshStandardMaterial({ color: COLORS.netBorder, roughness: 0.6 })
    );
    tape.position.set(0, y, 0);
    tape.castShadow = true;
    group.add(tape);
  });

  return group;
}
