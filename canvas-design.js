const palette = {
  ink: "#f5f5f5",
  dark: "#0a0a0a",
  panel: "#111111",
  green: "#22c55e",
  emerald: "#059669",
  teal: "#14b8a6",
  white: "#e2e8f0",
  muted: "#888888",
  gray: "#6b7280",
  darkGreen: "#064e3b",
  black: "#1a1a1a",
};

function scaleCanvas(canvas, logicalWidth, logicalHeight) {
  const ratio = window.devicePixelRatio || 1;
  const w = Math.round(logicalWidth * ratio);
  const h = Math.round(logicalHeight * ratio);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function drawOthelloLogo(ctx, x, y, size) {
  const unit = size / 72;
  ctx.save();
  ctx.translate(x, y);

  const cx = 36 * unit;
  const cy = 36 * unit;
  const radius = 34 * unit;

  // Outer ring - dark circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = palette.dark;
  ctx.fill();

  // Gradient ring border
  const grad = ctx.createLinearGradient(0, 0, 72 * unit, 72 * unit);
  grad.addColorStop(0, palette.green);
  grad.addColorStop(0.5, palette.emerald);
  grad.addColorStop(1, palette.teal);
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5 * unit;
  ctx.stroke();

  // Inner decorative ring
  ctx.beginPath();
  ctx.arc(cx, cy, 26 * unit, 0, Math.PI * 2);
  ctx.strokeStyle = palette.gray;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1 * unit;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 8x8 grid lines
  const gridSize = 18 * unit;
  const gridX = cx - gridSize / 2;
  const gridY = cy - gridSize / 2;

  // Board grid
  ctx.strokeStyle = palette.green;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 0.8 * unit;
  for (let i = 0; i <= 4; i++) {
    const pos = gridX + (i * gridSize) / 4;
    ctx.beginPath();
    ctx.moveTo(pos, gridY);
    ctx.lineTo(pos, gridY + gridSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gridX, pos);
    ctx.lineTo(gridX + gridSize, pos);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Place 4 center discs on the grid
  const cellSize = gridSize / 4;
  const centerOffset = cellSize / 2;

  // Disc positions: center 2x2
  const discs = [
    { col: 1, row: 1, color: palette.white }, // white
    { col: 2, row: 1, color: palette.black }, // black
    { col: 1, row: 2, color: palette.black }, // black
    { col: 2, row: 2, color: palette.white }, // white
  ];

  for (const disc of discs) {
    const dx = gridX + disc.col * cellSize + centerOffset;
    const dy = gridY + disc.row * cellSize + centerOffset;
    const discR = cellSize * 0.38;

    // Shadow
    ctx.beginPath();
    ctx.arc(dx + 0.5 * unit, dy + 0.5 * unit, discR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill();

    // Disc
    const grad2 = ctx.createRadialGradient(
      dx - discR * 0.3,
      dy - discR * 0.3,
      discR * 0.1,
      dx,
      dy,
      discR
    );
    if (disc.color === palette.white) {
      grad2.addColorStop(0, "#ffffff");
      grad2.addColorStop(1, "#94a3b8");
    } else {
      grad2.addColorStop(0, "#333333");
      grad2.addColorStop(1, "#000000");
    }
    ctx.beginPath();
    ctx.arc(dx, dy, discR, 0, Math.PI * 2);
    ctx.fillStyle = grad2;
    ctx.fill();
  }

  // "O" letter shape - stylized arc on top
  ctx.beginPath();
  ctx.arc(cx, cy - 2 * unit, 14 * unit, Math.PI * 0.15, Math.PI * 0.85);
  ctx.strokeStyle = palette.green;
  ctx.lineWidth = 3.5 * unit;
  ctx.globalAlpha = 0.7;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Small decorative dots around the ring
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8 + Math.PI / 8;
    const dotR = 30 * unit;
    const dx = cx + Math.cos(angle) * dotR;
    const dy = cy + Math.sin(angle) * dotR;
    ctx.beginPath();
    ctx.arc(dx, dy, 1.2 * unit, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? palette.green : palette.teal;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawBrandLogo() {
  const canvas = document.getElementById("brand-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 22, 22);
  ctx.clearRect(0, 0, 22, 22);
  drawOthelloLogo(ctx, 0, 0, 22);
}

function drawBrandLogoFooter() {
  const canvas = document.getElementById("brand-canvas-footer");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 20, 20);
  ctx.clearRect(0, 0, 20, 20);
  drawOthelloLogo(ctx, 0, 0, 20);
}

function drawHeroLogo() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 96, 96);
  ctx.clearRect(0, 0, 96, 96);
  drawOthelloLogo(ctx, 0, 0, 96);
}

function installCanvasFavicon() {
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 72;
  const ctx = canvas.getContext("2d");
  drawOthelloLogo(ctx, 0, 0, 72);

  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = canvas.toDataURL("image/png");
  document.head.appendChild(link);
}

function drawAll() {
  drawBrandLogo();
  drawBrandLogoFooter();
  drawHeroLogo();
}

function initCanvas() {
  drawAll();
  installCanvasFavicon();
}

function safeInit() {
  const brandCanvas = document.getElementById("brand-canvas");
  if (brandCanvas && brandCanvas.getContext) {
    initCanvas();
  } else {
    requestAnimationFrame(safeInit);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInit);
} else {
  safeInit();
}
