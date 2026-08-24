import * as THREE from "three";
import { COLORS } from "./constants.js";
import { createLabel } from "./labels.js";

/**
 * Builds a metal pole with an articulated arm holding an IP camera,
 * angled toward `target`. Returns the group plus key world points used
 * for routing conduit/cable (top of pole and camera lens exit).
 */
export function createCameraTower({ position, poleHeight, target, label }) {
  const group = new THREE.Group();
  group.position.set(position.x, 0, position.z);

  const poleMaterial = new THREE.MeshStandardMaterial({ color: COLORS.pole, roughness: 0.35, metalness: 0.8 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: COLORS.poleDark, roughness: 0.4, metalness: 0.7 });

  // Base plate anchored to the ground.
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.1, 16), darkMaterial);
  base.position.y = 0.05;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // Main pole.
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, poleHeight, 14), poleMaterial);
  pole.position.y = poleHeight / 2;
  pole.castShadow = true;
  group.add(pole);

  // Articulated mount: a short arm bending outward + downward from the pole top.
  const armGroup = new THREE.Group();
  armGroup.position.set(0, poleHeight - 0.05, 0);
  group.add(armGroup);

  const armPivot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), darkMaterial);
  armPivot.castShadow = true;
  armGroup.add(armPivot);

  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 10), poleMaterial);
  arm.position.set(0.25, -0.02, 0);
  arm.rotation.z = Math.PI / 2;
  arm.castShadow = true;
  armGroup.add(arm);

  // Camera housing, mounted at the end of the arm, oriented toward target.
  const cameraGroup = new THREE.Group();
  cameraGroup.position.set(0.52, -0.1, 0);
  armGroup.add(cameraGroup);

  const cameraMaterial = new THREE.MeshStandardMaterial({ color: COLORS.camera, roughness: 0.35, metalness: 0.4 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.16), cameraMaterial);
  body.castShadow = true;
  cameraGroup.add(body);

  const lensMount = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.08, 16), darkMaterial);
  lensMount.rotation.x = Math.PI / 2;
  lensMount.position.set(0.15, 0, 0);
  cameraGroup.add(lensMount);

  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: COLORS.cameraLens, roughness: 0.1, metalness: 0.9 })
  );
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0.2, 0, 0);
  cameraGroup.add(lens);

  const statusLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 8, 8),
    new THREE.MeshStandardMaterial({ color: COLORS.led, emissive: COLORS.led, emissiveIntensity: 1.2 })
  );
  statusLed.position.set(0.05, 0.09, 0.06);
  cameraGroup.add(statusLed);

  // Small mounting bracket connecting camera to arm end.
  const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.05), darkMaterial);
  bracket.position.set(-0.09, 0.08, 0);
  cameraGroup.add(bracket);

  // Orient the camera group so its lens (local +X) points at the target.
  const worldCameraOrigin = new THREE.Vector3(
    position.x + 0.52,
    poleHeight - 0.05 - 0.1,
    position.z
  );
  const dirToTarget = new THREE.Vector3(target.x, target.y, target.z).sub(worldCameraOrigin).normalize();
  const lensAxis = new THREE.Vector3(1, 0, 0);
  const quat = new THREE.Quaternion().setFromUnitVectors(lensAxis, dirToTarget);
  cameraGroup.quaternion.copy(quat);

  // Also angle the arm itself slightly toward target for a natural look.
  const yaw = Math.atan2(target.z - position.z, target.x - position.x);
  armGroup.rotation.y = yaw;
  cameraGroup.quaternion.identity();
  const localDir = dirToTarget.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
  const localQuat = new THREE.Quaternion().setFromUnitVectors(lensAxis, localDir);
  cameraGroup.quaternion.copy(localQuat);

  if (label) {
    const sprite = createLabel(label, { accent: "#ff5f5f" });
    sprite.position.set(0.3, 0.35, 0);
    cameraGroup.add(sprite);
  }

  const lensWorldPosition = new THREE.Vector3(position.x, poleHeight - 0.15, position.z);
  const poleTopPosition = new THREE.Vector3(position.x, poleHeight - 0.05, position.z);
  const poleBasePosition = new THREE.Vector3(position.x, 0, position.z);

  return { group, lensWorldPosition, poleTopPosition, poleBasePosition };
}
