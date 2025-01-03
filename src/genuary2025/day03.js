const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
window.addEventListener("resize", resizeCanvas);
const map = (value, inMin, inMax, outMin, outMax) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
} resizeCanvas();
function draw() {
  const circleMath_radius = Math.min(canvas.width, canvas.height) * 0.45;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, circleMath_radius, 0, Math.PI * 2);
  ctx.fill();
  const yangSize = map(Math.sin((performance.now() * 0.001)), -1, 1, 100, circleMath_radius * 1.5); // Yang
  const yangRad = circleMath_radius - yangSize * 0.5;
  const yangX = Math.cos(performance.now() * 0.001 - (Math.PI / 2)) * (circleMath_radius - yangRad) + (canvas.width / 2);
  const yangY = Math.sin(performance.now() * 0.001 - (Math.PI / 2)) * (circleMath_radius - yangRad) + (canvas.height / 2);
  const yinSize = (circleMath_radius * 2) - yangSize; // Yin
  const yinRad = circleMath_radius - yinSize * 0.5;
  const yinX = Math.cos((performance.now() * 0.001) - (Math.PI / 2) - Math.PI) * (circleMath_radius - yinRad) + (canvas.width / 2);
  const yinY = Math.sin((performance.now() * 0.001) - (Math.PI / 2) - Math.PI) * (circleMath_radius - yinRad) + (canvas.height / 2);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, circleMath_radius, (performance.now() * 0.001) - (Math.PI / 2) - Math.PI, (performance.now() * 0.001) - (Math.PI / 2));
  ctx.fill();
  ctx.beginPath();
  ctx.arc(yangX, yangY, yangRad, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(yangX, yangY, yangRad * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(yinX, yinY, yinRad, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(yinX, yinY, yinRad * 0.15, 0, Math.PI * 2);
  ctx.fill();
  window.requestAnimationFrame(draw);
} draw();