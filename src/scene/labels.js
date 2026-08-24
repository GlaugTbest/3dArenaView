import * as THREE from "three";

/**
 * Creates a billboard sprite with rendered text, used to label
 * infrastructure components directly in the 3D scene.
 */
export function createLabel(text, { color = "#e8edf4", accent = "#4ea1ff", scale = 1 } = {}) {
  const paddingX = 28;
  const fontSize = 34;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `600 ${fontSize}px -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
  const textWidth = ctx.measureText(text).width;

  canvas.width = Math.ceil(textWidth + paddingX * 2);
  canvas.height = 96;

  // Re-apply font after resizing (canvas resets context state on resize).
  ctx.font = `600 ${fontSize}px -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
  ctx.textBaseline = "middle";

  const w = canvas.width;
  const h = canvas.height;
  const radius = 18;

  ctx.fillStyle = "rgba(10, 14, 20, 0.78)";
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  roundedRect(ctx, 2, 2, w - 4, h - 4, radius);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(26, h / 2, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillText(text, paddingX + 14, h / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);

  const aspect = w / h;
  const baseHeight = 0.5 * scale;
  sprite.scale.set(baseHeight * aspect, baseHeight, 1);

  return sprite;
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
