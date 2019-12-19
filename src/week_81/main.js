/**
 * Motus: Chain Linked
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const rings = {
  rows: 10,
  offset: 60,
  cols: 11,
  radius: 92,
  stroke: 4,
};
rings.maxHeight = rings.radius * rings.rows;
rings.triggerGap = 1 / rings.cols;

let timer = 0;
const speed = 0.002;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  background(40);
  noFill();
  strokeWeight(rings.stroke);

  // Columns
  for (let c = 0; c < rings.cols; c++) {
    const x = (width / (rings.cols - 1)) * c;
    const cc = rings.cols - c;

    let movement = (timer + (cc / (rings.cols * 2)) + 1) % 1;
    movement = cos(movement * TWO_PI);
    movement = map(movement, -1, 1, 0, 1);
    movement = easeOutSine(movement, 0, 1, 1);

    // Loop rings
    for (let i = 0; i < rings.rows; i++) {
      const pos = i / rings.rows;
      const y = (pos * movement * rings.maxHeight) + rings.offset;

      // Draw rings
      stroke(map(i, 1, rings.rows, 80, 239));
      ellipse(x, y, rings.radius);
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing easeOutSine
function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}
