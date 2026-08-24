import * as THREE from "three";
import { COLORS } from "./constants.js";

const SHIRT_COLORS = [0xf05454, 0x4a90d9, 0xf2c14e, 0x53c68c];

/**
 * Simple low-poly human figures (~1.8m tall) used purely as scale
 * references for the court and equipment heights.
 */
export function addPeople(scene, positions) {
  const group = new THREE.Group();
  group.name = "people";

  positions.forEach((p, i) => {
    const person = buildPerson(SHIRT_COLORS[i % SHIRT_COLORS.length]);
    person.position.set(p.x, 0, p.z);
    if (p.rotationY !== undefined) person.rotation.y = p.rotationY;
    group.add(person);
  });

  scene.add(group);
  return group;
}

function buildPerson(shirtColor) {
  const group = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: COLORS.skin, roughness: 0.7 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.8 });
  const shortsMat = new THREE.MeshStandardMaterial({ color: 0x2b3038, roughness: 0.8 });

  const legHeight = 0.75;
  const torsoHeight = 0.55;
  const headRadius = 0.11;

  const legs = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, legHeight - 0.26, 4, 8), shortsMat);
  legs.position.y = legHeight / 2;
  legs.castShadow = true;
  group.add(legs);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, torsoHeight - 0.32, 4, 8), shirtMat);
  torso.position.y = legHeight + torsoHeight / 2 - 0.05;
  torso.castShadow = true;
  group.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(headRadius, 12, 12), skinMat);
  head.position.y = legHeight + torsoHeight + headRadius + 0.02;
  head.castShadow = true;
  group.add(head);

  const armGeo = new THREE.CapsuleGeometry(0.045, 0.4, 4, 8);
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(armGeo, shirtMat);
    arm.position.set(side * 0.22, legHeight + torsoHeight - 0.18, 0);
    arm.rotation.z = side * 0.12;
    arm.castShadow = true;
    group.add(arm);
  });

  return group;
}
