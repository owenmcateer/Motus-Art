/**
 * Motus: Y-curve fidelity
 * https://owenmcateer.github.io/Motus-Art
 *
 * Scaling up and down the fidelity using the Ramer-Douglas-Peucker algorithm
 * on a curve to plot Y-axis lines.
 * Inspired by the @the.coding.train coding challenge. Daniel Shiffman
 * https://thecodingtrain.com/CodingChallenges/152-rdp-algorithm.html
 */
const canvasSize = 540;
let epsilon = 10;
let timer = 0;
const speed = 0.01;


function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  pixelDensity(2);
}

function scalarProjection(p, a, b) {
  const ap = p5.Vector.sub(p, a);
  const ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  ab.mult(ap.dot(ab));
  const normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}

function lineDist(c, a, b) {
  const norm = scalarProjection(c, a, b);
  return p5.Vector.dist(c, norm);
}

function findFurthest(points, a, b) {
  let recordDistance = -1;
  const start = points[a];
  const end = points[b];
  let furthestIndex = -1;
  for (let i = a + 1; i < b; i++) {
    const currentPoint = points[i];
    const d = lineDist(currentPoint, start, end);
    if (d > recordDistance) {
      recordDistance = d;
      furthestIndex = i;
    }
  }
  if (recordDistance > epsilon) {
    return furthestIndex;
  }
  return -1;
}

function rdp(startIndex, endIndex, allPoints, rdpPoints) {
  const nextIndex = findFurthest(allPoints, startIndex, endIndex);
  if (nextIndex > 0) {
    if (startIndex !== nextIndex) {
      rdp(startIndex, nextIndex, allPoints, rdpPoints);
    }
    rdpPoints.push(allPoints[nextIndex]);
    if (endIndex !== nextIndex) {
      rdp(nextIndex, endIndex, allPoints, rdpPoints);
    }
  }
}


function draw() {
  background(40, 100);
  translate(10, 0);

  // Calculate wave
  const allPoints = [];
  for (let x = 0; x < width; x++) {
    const xval = map(x, 0, width, 0, 5);
    const yval = exp(-xval) * cos(TWO_PI * (xval + timer));
    const y = map(yval, -1, 1, height, 0);
    allPoints.push(createVector(x, y));
  }

  // Calculate Ramer–Douglas–Peucker
  const rdpPoints = [];
  const total = allPoints.length;
  const start = allPoints[0];
  const end = allPoints[total - 1];
  rdpPoints.push(start);
  rdp(0, total - 1, allPoints, rdpPoints);
  rdpPoints.push(end);


  // Draw lines
  rdpPoints.forEach((v) => {
    const position = 1 - (v.x / width);
    strokeWeight(position * 4);
    stroke(position * 230);
    const lx = width;
    const ly = v.y;
    line(lx, ly, v.x, v.y);
  });


  // Draw wave
  stroke(230);
  strokeWeight(4);
  noFill();
  beginShape();
  allPoints.forEach((v) => {
    vertex(v.x, v.y);
  });
  endShape();

  // Animate epsilon
  epsilon = map(sin(TWO_PI * timer), -1, 1, 0, 1);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
