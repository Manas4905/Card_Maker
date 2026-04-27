const canvas = document.getElementById("card");
const ctx = canvas.getContext("2d");
const input = document.getElementById("nameInput");

// Internal canvas resolution (aspect ratio 420×260)
canvas.width = 420;
canvas.height = 260;

function drawCard(name) {
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  //Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1a73e8");
  bg.addColorStop(1, "#0d47a1");
  roundRect(0, 0, W, H, 16);
  ctx.fillStyle = bg;
  ctx.fill();

  //Card label (top-left)
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `bold 13px sans-serif`;
  ctx.fillText("SMART CARD", 25, 35);

  //Chip
  ctx.fillStyle = "#d4af37";
  roundRect(25, 55, 40, 30, 4);
  ctx.fill();

  // Chip lines/details
  ctx.strokeStyle = "rgba(120,90,20,0.6)";
  ctx.lineWidth = 1;

  // Vertical center inner line
  ctx.beginPath();
  ctx.moveTo(45, 56);
  ctx.lineTo(45, 84);
  ctx.stroke();

  //inner lines horizontal
  ctx.beginPath();
  ctx.moveTo(24, 62);
  ctx.lineTo(65, 62);

  ctx.moveTo(24, 70);
  ctx.lineTo(65, 70);

  ctx.moveTo(24, 78);
  ctx.lineTo(65, 78);
  ctx.stroke();

  //CARDHOLDER NAME
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `12px sans-serif`;
  ctx.fillText("CARDHOLDER NAME", 25, 190);

  //Name text(Input)
  const displayName = name.trim() ? name.toUpperCase() : "YOUR NAME";
  const zoneLeft = 25;
  const zoneRight = W - 25;
  const zoneWidth = zoneRight - zoneLeft;

  let fontSize = 26;
  ctx.font = `bold ${fontSize}px sans-serif`;
  while (ctx.measureText(displayName).width > zoneWidth && fontSize > px(18)) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px sans-serif`;
  }

  const textWidth = ctx.measureText(displayName).width;
  const textX = zoneLeft + (zoneWidth - textWidth) / 2;

  ctx.fillStyle = name.trim() ? "#ffffff" : "rgba(255,255,255,0.3)";
  ctx.fillText(displayName, textX, 230);
}

//rounded rectangle path
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Initial draw
drawCard("");

// Real-time update
input.addEventListener("input", () => drawCard(input.value));
