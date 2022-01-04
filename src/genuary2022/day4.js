/**
 * Genuary Day 4
 * "The next next Fidenza"
 *
 * @motus_art
 */
const canvasSize = 540;
const gridCount = 20;
const gridSize = canvasSize / gridCount;
const noiseScale = 0.1;
const colours = [
  [38, 149, 212],
  [227, 17, 111],
];
const particles = [];
const flowfield = new Array(gridCount * gridCount);


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  // colorMode(RGB, 255, 255, 255, 1);
  colorMode(HSL, 360, 100, 100, 1);

  // Background
  background(224, 16, 18);
  fill(0);
  const bg = drawingContext.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, 'rgba(114, 99, 61, 1)');
  bg.addColorStop(1, 'rgba(38, 42, 53, 1)');
  drawingContext.fillStyle = bg;
  noStroke();
  rect(0, 0, width, height);

  // Fill with particles
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(i));
  }
}


// Draw tick
function draw() {
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      const noiseAngle = noise(x * noiseScale, y * noiseScale, frameCount / 200) * TWO_PI;
      const v = p5.Vector.fromAngle(noiseAngle);
      v.setMag(0.1);
      const index = x + y * gridCount;
      flowfield[index] = v;

      // See flow field
      // stroke(0);
      // strokeWeight(1);
      // push();
      // translate(x * gridSize, y * gridSize);
      // rotate(v.heading());
      // line(gridSize * -0.5, 0, gridSize * 0.5, 0);
      // pop();
    }
  }

  // Render walkers
  particles.forEach((p) => {
    p.follow(flowfield);
    p.update();
    p.render();
  });
}
