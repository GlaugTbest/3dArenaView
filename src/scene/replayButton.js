import * as THREE from "three";
import { COLORS } from "./constants.js";
import { createLabel } from "./labels.js";

const MOUNT_HEIGHT = 1.05; // adult hand height
const ARM_LENGTH = 0.22;

/**
 * Large, clearly visible physical REPLAY button clamped directly onto
 * one of the net posts, at adult hand height, wired to the Raspberry
 * Pi via GPIO. `outwardZ` is +1 or -1: which way the post's open side
 * (away from the court) faces, so the box mounts away from the net.
 */
export function buildReplayButton(postPosition, { postRadius = 0.06, outwardZ = -1 } = {}) {
  const group = new THREE.Group();
  group.position.set(postPosition.x, 0, postPosition.z);

  const metalMat = new THREE.MeshStandardMaterial({ color: COLORS.pole, roughness: 0.35, metalness: 0.75 });

  // Clamp bracket wrapping the net post.
  const clamp = new THREE.Mesh(new THREE.TorusGeometry(postRadius + 0.02, 0.018, 8, 20), metalMat);
  clamp.rotation.x = Math.PI / 2;
  clamp.position.set(0, MOUNT_HEIGHT, 0);
  clamp.castShadow = true;
  group.add(clamp);

  // Arm extending outward from the post toward the free zone.
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, ARM_LENGTH, 10), metalMat);
  arm.rotation.x = Math.PI / 2;
  arm.position.set(0, MOUNT_HEIGHT, outwardZ * (ARM_LENGTH / 2 + postRadius));
  arm.castShadow = true;
  group.add(arm);

  const boxGroup = new THREE.Group();
  boxGroup.position.set(0, MOUNT_HEIGHT, outwardZ * (ARM_LENGTH + postRadius + 0.06));
  boxGroup.rotation.y = outwardZ > 0 ? 0 : Math.PI;
  group.add(boxGroup);

  const controlBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.2, 0.14),
    new THREE.MeshStandardMaterial({ color: COLORS.buttonBase, roughness: 0.5, metalness: 0.3 })
  );
  controlBox.castShadow = true;
  boxGroup.add(controlBox);

  // Big red mushroom-style button on the top face.
  const buttonBezel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.02, 20),
    new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.4, metalness: 0.5 })
  );
  buttonBezel.position.set(0, 0.1, 0);
  boxGroup.add(buttonBezel);

  const button = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.065, 0.05, 24),
    new THREE.MeshStandardMaterial({
      color: COLORS.button,
      roughness: 0.35,
      metalness: 0.15,
      emissive: COLORS.button,
      emissiveIntensity: 0.25,
    })
  );
  button.position.set(0, 0.135, 0);
  button.castShadow = true;
  boxGroup.add(button);

  // Status LED indicator beside the button.
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 8, 8),
    new THREE.MeshStandardMaterial({ color: COLORS.led, emissive: COLORS.led, emissiveIntensity: 1.4 })
  );
  led.position.set(0.09, 0.11, 0.05);
  boxGroup.add(led);

  // "REPLAY" text plate on the front of the control box.
  const plate = makeTextPlate("REPLAY");
  plate.position.set(0, 0, 0.071);
  boxGroup.add(plate);

  const label = createLabel("Botão REPLAY", { accent: "#ff3b3b" });
  label.position.set(0, 0.45, 0);
  boxGroup.add(label);

  const gpioEntryPoint = new THREE.Vector3(
    postPosition.x,
    MOUNT_HEIGHT + 0.02,
    postPosition.z + outwardZ * (ARM_LENGTH + postRadius + 0.12)
  );

  return { group, gpioEntryPoint };
}

function makeTextPlate(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#111318";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff3b3b";
  ctx.font = "700 48px -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6 });
  const geometry = new THREE.PlaneGeometry(0.22, 0.08);
  return new THREE.Mesh(geometry, material);
}
