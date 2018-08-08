/**
 * Motus: Back Soon
 * I'm taking a short break over the summer.
 * Motus Art will be back soon.
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
let testCard;
let yLineBlack = 0;
let yLineWhite = 400;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  // TV 24fps
  frameRate(24);

  // Colours
  colours.bg = [185, 188, 185];

  // Create test image
  testCard = drawTestCard();
}

// Draw tick
function draw() {
  background(colours.bg);

  // Test card
  translate(cx, cx);
  const anim = map(cos(frameCount) * 2, -1, 1, 0, 1);

  if (anim < 0.39) {
    // Just wait
  }
  else if (anim < 0.4) {
    // 40%
    scale(1, 1);
    shearX(0, 0);
  }
  else if (anim < 0.41) {
    // 41%
    scale(1, 1.2);
    shearX(25, 0);
  }
  else if (anim < 0.5) {
    // 42%
    scale(1, 1.2);
    shearX(-40, 0);
  }
  else if (anim < 0.63) {
    // 43%
    scale(1, 1);
    shearX(0, 0);
  }
  // Output test card image
  image(testCard, width * -0.5, height * -0.5);

  // Reset position
  translate(width * -0.5, height * -0.5);

  // Moving lines
  noStroke();
  fill(0, 0, 0, 0.1);
  rect(0, yLineBlack, width, 100);
  yLineBlack += 3;
  if (yLineBlack > (height * 1.3)) {
    yLineBlack = -100;
  }
  noStroke();
  fill(255, 255, 255, 0.2);
  rect(0, yLineWhite, width, 40);
  yLineWhite += 5;
  if (yLineWhite > (height * 1.3)) {
    yLineWhite = -40;
  }

  // TV static
  let tvSnow = createImage(200, 200);
  tvSnow.loadPixels();
  const tvSnowColours = [
    color(255, 255, 255, 0.08),
    color(0, 0, 0, 0.08),
  ];
  for (let x = 0; x < tvSnow.width; x++) {
    for (let y = 0; y < tvSnow.height; y++) {
      tvSnow.set(x, y, tvSnowColours[Math.round(random(2))]);
    }
  }
  tvSnow.updatePixels();
  image(tvSnow, 0, 0, width, height);
}

function drawTestCard() {
  const bg = createGraphics(width, height);
  bg.background('#5c5d65');
  bg.noStroke();
  const bars1 = [
    '#ffffff',
    '#e2e416',
    '#16dcdc',
    '#15d716',
    '#be14ba',
    '#bd1414',
    '#1513bc',
  ];
  const barWidth = width / bars1.length;
  // Draw bars
  for (let i = 0; i < bars1.length; i++) {
    bg.fill(bars1[i]);
    bg.rect(i * barWidth, 0, barWidth, 700);
  }

  // 2nd bar
  const bars2 = [
    '#201feb',
    '#eb2423',
    '#eb29ea',
    '#151515',
    '#43e9ea',
    '#25221e',
    '#b9bcb9',
  ];
  // Draw 2nd bars
  for (let i = 0; i < bars2.length; i++) {
    bg.fill(bars2[i]);
    bg.rect(i * barWidth, 710, barWidth, 120);
  }

  // 3rd bar
  const bars3 = [
    '#16284b',
    '#edefee',
    '#38176b',
    '#222220',
    '#333333',
    '#444444',
  ];
  // Draw 3rd bars
  for (let i = 0; i < bars3.length; i++) {
    bg.fill(bars3[i]);
    bg.rect(i * (width / bars3.length), 833, (width / bars3.length), 248);
  }

  // Text box
  const textBox = {
    w: 600,
    h: 320,
  };
  bg.fill(0);
  bg.rect((width - textBox.w) / 2, 300, textBox.w, textBox.h);

  bg.textFont('VT323');
  bg.fill(255);
  bg.textAlign(CENTER);
  bg.textSize(150);
  bg.textLeading(150);
  bg.text("Motus Art\nback soon", cx, 420);

  return bg;
}
