/**
 * Genuary 2025: Day 04
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */

let canvasScale = 1;

function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

  // Update canvas scale
  canvasScale = width / 1080;
}

// Easing effect InOutExpo
function easeInOutExpo(t) {
  if (t==0) return 0;
  if (t==1) return 1;
  if ((t/=0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
  return 0.5 * (-Math.pow(2, -10 * --t) + 2);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);
  background(0);
  fill(19);
  noStroke();

  // Lighting
  ambientLight(255);
  directionalLight(255, 255, 255, 0, 1, -0.8);
  specularMaterial(30);
  shininess(5);
  metalness(20);

  // Blocks
  const pills = 23;
  const radius = (1080 * 0.8) * 0.5;
  const pillWidth = (radius * 2) / pills;
  const pillSizeW = pillWidth * 0.6;
  const t = frameCount * 0.01;

  // Center frame
  translate(pillWidth * pills * -0.5, 0, 0);

  // Draw the pills
  for (let i = 0; i <= pills; i++) {
    const s = (i * pillWidth) + (pillWidth * 0.5);
    const phase = easeInOutExpo(sin(t + (i / (PI * 5))) * 0.5 + 0.5);
    const pillSizeH = (Math.sqrt((2 * s * radius) - Math.pow(s, 2)) * 2);

    push();
    translate(i * pillWidth, 0);
    rotateX(phase * PI);
    rotateY(t);
    box(pillSizeW, pillSizeH, pillSizeW);
    pop();
  }
}
