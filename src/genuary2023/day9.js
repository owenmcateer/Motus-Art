/**
 * Genuary 2023: Day 9
 * "Plants"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
function setup() {
  createCanvas(1080, 1080);
  colorMode(HSB, 360, 100, 100, 1);

  const col = random(180, 360);
  const n = round(random(4, 12));
  const flowerSize = random(400, 1000);
  const d = 1;
  const k = n / d;

  background(col, 20, 100);
  translate(width / 2, height / 2);
  rotate(TWO_PI);

  // Blob BG
  noStroke();
  fill(col, 40, 40, 0.1);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 30) {
    const radius = random(width * 0.4, height * 0.6);
    curveVertex(
      cos(angle) * radius,
      sin(angle) * radius,
    );
  }
  endShape(CLOSE);

  // Perlin noise blobs
  noStroke();
  fill(col, 40, 42, 0.3);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 200) {
    const offset = (noise(cos(angle) + 30, sin(angle) + 30, frameCount) * 2 - 1) * 100;
    const r = 400 + offset;
    const x = r * cos(angle);
    const y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Stem
  translate(random(-50, 50), random(-50, 50));
  stroke(21, 80, 23, 0.5);
  const stemXpos = random(-200, 200);
  noFill();
  for (let i = 0; i < 40; i++) {
    strokeWeight(random(4, 6));
    bezier(
      0, 0,
      random(75), random(75),
      stemXpos + random(100), random(200, 300),
      stemXpos, height,
    );
  }

  // Rhodonea curve
  // Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
  noStroke();
  fill(col, 90, 90, 0.5);
  for (let i = 0; i < 4; i++) {
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += TWO_PI / random(150, 1000)) {
      let thisAngle = angle;
      thisAngle = angle + random(-0.1, 0.1);
      const r = 0.5 * Math.cos(k * thisAngle + random(0.1));
      const x = r * Math.cos(thisAngle) + random(0.01);
      const y = r * Math.sin(thisAngle) + random(0.01);
      vertex(x * flowerSize, y * flowerSize);
    }
    endShape(CLOSE);
  }
}
