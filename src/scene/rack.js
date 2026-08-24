import * as THREE from "three";
import { COLORS } from "./constants.js";
import { createLabel } from "./labels.js";

const CABINET_W = 1.1;
const CABINET_D = 0.9;
const CABINET_H = 1.5;

/**
 * Builds a protected technical cabinet containing the PoE switch,
 * NVR/server, storage, and PSU, with a partially transparent door so
 * the internal wiring stays visible. Also builds a small separate
 * enclosure for the Raspberry Pi mounted beside the cabinet.
 */
export function buildRack(position) {
  const group = new THREE.Group();
  group.position.set(position.x, 0, position.z);

  // Small roof/shelter protecting the rack from rain and sand.
  const shelterMaterial = new THREE.MeshStandardMaterial({ color: 0x2b323c, roughness: 0.7, metalness: 0.3 });
  const roof = new THREE.Mesh(new THREE.BoxGeometry(CABINET_W + 0.4, 0.06, CABINET_D + 0.4), shelterMaterial);
  roof.position.set(0, CABINET_H + 0.35, 0);
  roof.castShadow = true;
  group.add(roof);

  const postMat = new THREE.MeshStandardMaterial({ color: COLORS.poleDark, roughness: 0.5, metalness: 0.6 });
  const roofPostGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.35, 8);
  [
    [CABINET_W / 2 + 0.15, CABINET_D / 2 + 0.15],
    [-(CABINET_W / 2 + 0.15), CABINET_D / 2 + 0.15],
    [CABINET_W / 2 + 0.15, -(CABINET_D / 2 + 0.15)],
    [-(CABINET_W / 2 + 0.15), -(CABINET_D / 2 + 0.15)],
  ].forEach(([x, z]) => {
    const p = new THREE.Mesh(roofPostGeo, postMat);
    p.position.set(x, CABINET_H + 0.175, z);
    p.castShadow = true;
    group.add(p);
  });

  // Cabinet body (back + sides solid, front open with a door).
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: COLORS.rackBody, roughness: 0.5, metalness: 0.4 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(CABINET_W, CABINET_H, CABINET_D), bodyMaterial);
  body.position.set(0, CABINET_H / 2, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Transparent door on the +Z face so internals are visible.
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(CABINET_W * 0.94, CABINET_H * 0.94),
    new THREE.MeshStandardMaterial({
      color: COLORS.rack,
      transparent: true,
      opacity: 0.18,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    })
  );
  door.position.set(0, CABINET_H / 2, CABINET_D / 2 + 0.01);
  group.add(door);

  const frameMat = new THREE.MeshStandardMaterial({ color: COLORS.rack, roughness: 0.3, metalness: 0.6 });
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(CABINET_W * 0.98, 0.04, 0.02),
    frameMat
  );
  [0.03, CABINET_H - 0.03].forEach((y) => {
    const f = frame.clone();
    f.position.set(0, y, CABINET_D / 2 + 0.015);
    group.add(f);
  });

  // --- Internal equipment, stacked like a real rack ---
  const innerX = 0;
  let y = 0.12;

  const psu = boxUnit(CABINET_W * 0.85, 0.14, CABINET_D * 0.7, 0x333a44, "Fonte PSU");
  psu.position.set(innerX, y + 0.07, -0.02);
  group.add(psu);
  y += 0.16;

  const switchPoe = boxUnit(CABINET_W * 0.85, 0.16, CABINET_D * 0.7, 0x1c2a3a, "Switch PoE");
  switchPoe.position.set(innerX, y + 0.08, -0.02);
  addPortLeds(switchPoe, 8, CABINET_D * 0.35);
  group.add(switchPoe);
  const switchWorldY = y + 0.08;
  y += 0.2;

  const storage = boxUnit(CABINET_W * 0.85, 0.1, CABINET_D * 0.7, 0x22262e, "SSD/HDD");
  storage.position.set(innerX, y + 0.05, -0.02);
  group.add(storage);
  y += 0.14;

  const nvr = boxUnit(CABINET_W * 0.85, 0.22, CABINET_D * 0.7, 0x141922, "Servidor / NVR");
  nvr.position.set(innerX, y + 0.11, -0.02);
  addFrontVents(nvr, CABINET_D * 0.35);
  group.add(nvr);
  const nvrWorldY = y + 0.11;
  y += 0.26;

  // Cable management bar near the bottom.
  const cableBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, CABINET_W * 0.85, 8),
    new THREE.MeshStandardMaterial({ color: 0x111318 })
  );
  cableBar.rotation.z = Math.PI / 2;
  cableBar.position.set(0, 0.06, CABINET_D * 0.3);
  group.add(cableBar);

  const rackLabel = createLabel("Rack técnico · Switch PoE + NVR", { accent: "#4ea1ff" });
  rackLabel.position.set(0, CABINET_H + 0.6, 0);
  group.add(rackLabel);

  const cableEntryPoint = new THREE.Vector3(position.x - CABINET_W / 2, 0.15, position.z);
  const switchPortPoint = new THREE.Vector3(position.x, switchWorldY, position.z + CABINET_D / 2);
  const nvrPortPoint = new THREE.Vector3(position.x, nvrWorldY, position.z + CABINET_D / 2);

  return { group, cableEntryPoint, switchPortPoint, nvrPortPoint };
}

function boxUnit(w, h, d, color, name) {
  const g = new THREE.Group();
  g.name = name;
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.5 })
  );
  mesh.castShadow = true;
  g.add(mesh);
  return g;
}

function addPortLeds(unitGroup, count, spanZ) {
  const ledMat = new THREE.MeshStandardMaterial({ color: COLORS.led, emissive: COLORS.led, emissiveIntensity: 1 });
  for (let i = 0; i < count; i++) {
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 6), ledMat);
    const z = -spanZ / 2 + (spanZ / (count - 1)) * i;
    led.position.set(0.2, 0.05, z);
    unitGroup.add(led);
  }
}

function addFrontVents(unitGroup, spanZ) {
  const ventMat = new THREE.MeshStandardMaterial({ color: 0x05070a, roughness: 0.9 });
  for (let i = 0; i < 4; i++) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.03, spanZ * 0.7), ventMat);
    vent.position.set(0.2, -0.04 + i * 0.025, 0);
    unitGroup.add(vent);
  }
}

/**
 * Small weatherproof enclosure for the Raspberry Pi, mounted beside the
 * rack cabinet with the GPIO cable exiting toward the REPLAY button.
 */
export function buildPiBox(position) {
  const group = new THREE.Group();
  group.position.set(position.x, 0, position.z);

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.9, 10),
    new THREE.MeshStandardMaterial({ color: COLORS.poleDark, roughness: 0.5, metalness: 0.6 })
  );
  pole.position.y = 0.45;
  pole.castShadow = true;
  group.add(pole);

  const enclosure = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.16, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x1b1f26, roughness: 0.5, metalness: 0.3 })
  );
  enclosure.position.set(0, 0.9, 0.03);
  enclosure.castShadow = true;
  group.add(enclosure);

  // Translucent front so the board is visible.
  const window_ = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x88e0ff, transparent: true, opacity: 0.25 })
  );
  window_.position.set(0, 0.9, 0.091);
  group.add(window_);

  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.09, 0.01),
    new THREE.MeshStandardMaterial({ color: COLORS.raspberryBoard, roughness: 0.6 })
  );
  board.position.set(0, 0.9, 0.06);
  group.add(board);

  const chip = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.03, 0.015),
    new THREE.MeshStandardMaterial({ color: 0x151515 })
  );
  chip.position.set(0, 0.9, 0.07);
  group.add(chip);

  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.008, 6, 6),
    new THREE.MeshStandardMaterial({ color: COLORS.led, emissive: COLORS.led, emissiveIntensity: 1.2 })
  );
  led.position.set(0.05, 0.93, 0.07);
  group.add(led);

  const label = createLabel("Raspberry Pi", { accent: "#7fffab" });
  label.position.set(0, 1.15, 0);
  group.add(label);

  const gpioExitPoint = new THREE.Vector3(position.x, 0.86, position.z + 0.06);
  const networkPortPoint = new THREE.Vector3(position.x, 0.05, position.z);

  return { group, gpioExitPoint, networkPortPoint };
}
