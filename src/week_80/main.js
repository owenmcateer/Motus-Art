/**
 * Motus: Low-res ocean
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
let easingFall;
const water = [];


function setup() {
  createCanvas(canvasSize, canvasSize);

  // Easing curve
  easingFall = BezierEasing(1.00, 0.26, 0.85, 0.06);

  // Create water elements
  for (let x = 0; x < 24; x++) {
    for (let y = 0; y < 20; y++) {
      water.push(new Water(x, (y * 5) / 100));
    }
  }

  // Styling
  background(40);
  textFont('Roboto Mono');
  textAlign(CENTER);
  textSize(15);
  fill(10, 139, 30);
  fill(239);
  noStroke();
}


function draw() {
  background(40, 100);

  // Animate water
  water.forEach((drop) => {
    drop.update();
    drop.render();
  });

  // Timer
  timer += 0.0015;
  if (timer >= 1) {
    timer = 0;
  }
}
