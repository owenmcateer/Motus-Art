/**
 * Motus: School of fish
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const blips = [];
let circleSize;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  for (let i = 0; i < 300; i++) {
    blips.push(new Blip());
  }
}


// Draw tick
function draw() {
  background(239);
  noFill();

  // Animate ring size
  circleSize = map(sin(frameCount / 100), -1, 1, 100, 180);

  // Render all blips
  blips.forEach((b) => {
    b.render();
  });
}


// Blip class
class Blip {
  constructor() {
    this.stroke = random(30, 90);
    this.strokeWeight = round(random(4, 12));
    this.speed = random(40, 50);
    this.offsetCenter = random(35);
    this.offsetAngle = random(TWO_PI);
    this.wobbleSpeed = random(30, 50);
    this.wobbleAmount = random(30);
    this.size = random(10, 40);
  }

  render() {
    push();
    stroke(this.stroke, 0.6);
    strokeWeight(this.strokeWeight);

    translate(cx, cx);

    rotate(frameCount / this.speed + this.offsetAngle);
    translate(circleSize + this.offsetCenter + sin(frameCount / this.wobbleSpeed + this.offsetAngle + PI) * this.wobbleAmount, 0);
    line(0, this.size * -0.5, 0, this.size * 0.5);
    pop();
  }
}
