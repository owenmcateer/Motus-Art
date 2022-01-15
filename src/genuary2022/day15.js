/**
 * Genuary Day 15
 * "Sand."
 *
 * @motus_art
 */
let sandCastleImg;
const sand = [];
const grainsOfSand = 2000;
const pileHeight = 100;


function preload() {
  sandCastleImg = loadImage('./assets/sand-castle-silhouette.jpg');
}

function setup() {
  createCanvas(540, 540);

  // Sand castle template
  image(sandCastleImg, 0, 0, width, height);
  loadPixels();

  // Create particles
  for (let i = 0; i < grainsOfSand; i++) {
    sand.push(new GrainParticle(pixels));
  }
  background('#b19637');
}

function draw() {
  background('#b19637');
  const bg = drawingContext.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#cab06e');
  bg.addColorStop(0.5, '#e0cba4');
  bg.addColorStop(1, '#f4e7db');
  drawingContext.fillStyle = bg;
  rect(0, 0, width, height);

  // Sand
  sand.forEach((grain) => {
    grain.update();
    grain.render();
  });
}
