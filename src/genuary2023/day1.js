// Coming 2023!
function setup() {
  createCanvas(540, 540, WEBGL);
}

function draw() {
  background(40);
  stroke(239);
  strokeWeight(2);
  noFill();
  rotateX(frameCount * 0.005);
  rotateZ(frameCount * 0.005);
  box(200);
}
