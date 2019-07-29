/**
 * Motus: The Edge
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let phase = 0;
const speed = 0.01;
const lines = 6;
const trangleShape = {
  top: 80,
  bottom: canvasSize - 80,
  center: cx,
  left: 60,
  right: canvasSize - 60,
};


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  strokeJoin(MITER);
}


function draw() {
  background(40);

  // Trangle
  noFill();
  stroke(255);
  stroke(map(sin(PI * phase), -1, 1, 155, 255));
  strokeWeight(13);
  triangle(
    trangleShape.center, trangleShape.top,
    trangleShape.left, trangleShape.bottom,
    trangleShape.right, trangleShape.bottom,
  );

  // Lines
  strokeWeight(5);
  const distance = trangleShape.bottom - trangleShape.top;
  const gap = (distance / lines);

  for (let i = 0; i < lines; i++) {
    const y = (gap * i) + (gap * phase) + trangleShape.top;
    beginShape();
    vertex(trangleShape.left, trangleShape.bottom);
    vertex(trangleShape.center, y);
    vertex(trangleShape.right, trangleShape.bottom);
    endShape();
  }

  // Control movement
  phase += speed;
  if (phase >= 1) {
    phase = 0;
  }
}
