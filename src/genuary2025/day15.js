/**
 * Genuary 2025: Day 15
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let circleMath;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  pixelDensity(1);
  scale(canvasScale);
  background(0);

  // Gen settings
  const tasselLength = random(40, 100);
  const tasselCount = tasselLength * 25;
  const tasselBobbles = random(100, 220);
  const noiseStrength = random(0.005, 0.1);
  let triangleCount = round(random(10, 50));
  const triangleSize = random(10, 40);
  let squareCount = round(random(12, 60));
  let ringsCount = round(random(6));

  if (random() > 0.8) {
    triangleCount = 0;
  }
  if (random() > 0.9) {
    squareCount /= 2;
  }
  if (random() > 0.8) {
    ringsCount = 0;
  }

  // Tassels
  for (let a = 0; a < TWO_PI; a += TWO_PI / tasselCount) {
    strokeWeight(random(3));
    stroke(random(100, 255));
    push();
    translate(540, 540);
    rotate(a);
    translate(circleMath.radius - tasselLength, 0);
    rotate(random(0.1));
    line(0, 0, tasselLength * random(0.75, 1), 0);
    pop();
  }

  // Triangles
  if (triangleCount > 1) {
    fill(random(50, 200));
    for (let a = 0; a < TWO_PI; a += TWO_PI / triangleCount) {
      push();
      translate(540, 540);
      rotate(a);
      triangle(
        0, 0,
        circleMath.radius -tasselLength, -triangleSize,
        circleMath.radius -tasselLength, triangleSize
      );
      pop();
    }
  }

  // Squares
  if (ringsCount > 1) {
    noFill();
    for (let ring = 0; ring < ringsCount; ring++) {
      strokeWeight(random(20));
      stroke(random(100, 200));
      for (let a = 0; a < TWO_PI; a += TWO_PI / squareCount) {
        let radius = circleMath.radius/1.2 - tasselLength;
        radius *= ring / ringsCount;
        const x = cos(a) * radius + 540;
        const y = sin(a) * radius + 540;

        push();
        translate(x, y);
        rotate(a);
        square(0, 0, 50);
        pop();
      }
    }
  }

  // Tassel Bobbles
  for (let a = 0; a < TWO_PI; a += TWO_PI / tasselBobbles) {
    noStroke();
    fill(200, 150);
    circle(
      cos(a) * (circleMath.radius -tasselLength) + 540,
      sin(a) * (circleMath.radius -tasselLength) + 540,
      20
    );
  }

  // Effects
  translate(circleMath.offsetX-10, circleMath.offsetY-10);

  // Random Fibers
  stroke(250, 50);
  for(let i = 0; i < 100_000; i++) {
    strokeWeight(random(2));
    const x = random(0, 1080);
    const y = random(0, 1080);
    if (!circleMath.isPointInCircle(x, y, tasselLength)) continue;

    const fiberLength = random(2, 8);

    line(
      x + random(-fiberLength, fiberLength),
      y + random(-fiberLength, fiberLength),
      x + random(-fiberLength, fiberLength),
      y + random(-fiberLength, fiberLength)
    );
  }

  // Noise fiber waves
  for(let i = 0; i < 10_000; i++) {
    strokeWeight(random(2));
    stroke(random(100, 255), 50);
    const x = random(0, 1080);
    const y = random(0, 1080);
    if (!circleMath.isPointInCircle(x, y, tasselLength)) continue;
    const ang = noise(x * noiseStrength, y * noiseStrength) * PI;
    const rad = random(5, 15);

    line(
      cos(ang) * rad + x,
      sin(ang) * rad + y,
      cos(ang + PI) * rad + x,
      sin(ang + PI) * rad + y,
    );
  }

  // Add some noise
  loadPixels();
  for (let i = 0; i < width * height * 4; i+=4) {
    const noiseValue = random(-20, 20);
    pixels[i] += noiseValue;
    pixels[i + 1] += noiseValue;
    pixels[i + 2] += noiseValue;
  }
  updatePixels();
}
