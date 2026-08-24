import * as THREE from "three";
import { COLORS } from "./constants.js";

/**
 * Builds a conduit/cable run through a polyline of 3D points.
 * Straight cylinder segments joined by spheres so bends (corners,
 * pole risers, entries into cabinets) look continuous.
 */
export function buildConduitPath(points, { radius = 0.045, color = COLORS.conduit, emissive = 0x000000 } = {}) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.2,
    emissive,
    emissiveIntensity: emissive ? 0.6 : 0,
  });

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const segment = makeSegment(a, b, radius, material);
    group.add(segment);
  }

  // Joint spheres to hide seams at bends.
  points.forEach((p) => {
    const joint = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.15, 10, 10), material);
    joint.position.copy(p);
    joint.castShadow = true;
    group.add(joint);
  });

  return group;
}

function makeSegment(a, b, radius, material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 8, 1, true);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;

  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  mesh.position.copy(mid);

  const axis = new THREE.Vector3(0, 1, 0);
  const dirNorm = dir.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dirNorm);
  mesh.quaternion.copy(quaternion);

  return mesh;
}
