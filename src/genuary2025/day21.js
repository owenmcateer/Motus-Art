/**
 * Genuary 2025: Day 21
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const objectShapes = [];
const triggerPoint = [];
const triggerPosition = [];

// p5 setup
function setup() {
  createCanvas(540, 540);

  // Create abstract shapes
  objectShapes.push([262,181,340,139,455,175,403,85,348,101,289,41,305,108]);
  objectShapes.push([318,340,358,342,361,439,437,360,475,371,433,419,406,452,371,471,333,462]);
  objectShapes.push([391,185,424,199,447,226,461,260,460,317,442,322,397,321,363,320,330,311,315,299,327,282,346,283,386,293,411,289,418,264,410,219,386,208,351,204,336,206,310,212,300,247,322,259,297,284,268,267,268,219,272,202,306,181,348,177,367,177]);
  objectShapes.push([238,324,238,95,207,93,209,342]);
  objectShapes.push([182,321,93,329,150,132,157,285,187,183]);
  objectShapes.push([182,380,118,344,106,423,171,465,250,486,304,487,296,448,296,361,270,349,263,441,231,404,199,439,163,410]);

  // Generate random trigger poly shape
  for (let a = 0; a < TWO_PI; a += TWO_PI / 16) {
    const pointRadius = random(30, 90);
    const x = cos(a) * pointRadius + width / 2;
    const y = sin(a) * pointRadius + width / 2;
    triggerPoint.push(x);
    triggerPoint.push(y);
  }
}

// Draw tick
function draw() {
  background(0);

  // Move it
  translate(width * 0.5, height * 0.5);
  rotate(frameCount * -0.005);
  translate(width * -0.5, height * -0.5);

  // Update trigger position
  for (let i = 0; i < triggerPoint.length; i += 2) {
    const t = frameCount * 0.03;
    const orbitRadius = width * 0.3;
    triggerPosition[i + 0] = triggerPoint[i + 0] + cos(t) * orbitRadius;
    triggerPosition[i + 1] = triggerPoint[i + 1] + sin(t) * orbitRadius;
  }

  // Check for collisions
  objectShapes.forEach((objectShape) => {
    let hit = false;
    if (polyPoly(objectShape, triggerPosition)) {
      hit = true;
    }

    // Colour and draw shape
    fill((hit) ? 239 : 15);
    stroke(239);
    strokeWeight(3);
    beginShape();
    for (let i = 0; i < objectShape.length; i += 2) {
      vertex(objectShape[i], objectShape[i + 1]);
    }
    endShape(CLOSE);
  });

  // Draw the trigger polygon
  fill(239);
  stroke(15);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < triggerPosition.length; i += 2) {
    vertex(triggerPosition[i], triggerPosition[i + 1]);
  }
  endShape(CLOSE);

  // Mask
  noFill();
  stroke(255);
  strokeWeight(width * 0.011);
  circle(width * 0.5, height * 0.5, width * 0.9);
}

/**
 * Collision detection code
 *
 * A lot of the math and code here comes
 * from Jeffreyt Thompson book collision detection
 * Go check it out.
 * http://www.jeffreythompson.org/collision-detection/poly-poly.php
 */
// POLYGON/POLYGON
function polyPoly(p1, p2) {
  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current=0; current<p1.length; current+=2) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+2;
    if (next == p1.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    const vcx = p1[current];      // c for "current"
    const vcy = p1[current+1];    // c for "current"
    const vnx = p1[next];         // n for "next"
    const vny = p1[next+1];       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    let collision = polyLine(p2, vcx,vcy,vnx,vny);
    if (collision) return true;

    // optional: check if the 2nd polygon is INSIDE the first
    // collision = polyPoint(p1, p2[0].x, p2[0].y);
    // if (collision) return true;
  }

  return false;
}

// POLYGON/LINE
function polyLine(vertices, x1, y1, x2, y2) {
  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current=0; current<vertices.length; current+=2) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+2;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // extract X/Y coordinates from each
    const x3 = vertices[current];
    const y3 = vertices[current+1];
    const x4 = vertices[next];
    const y4 = vertices[next+1];

    // do a Line/Line comparison
    // if true, return 'true' immediately and
    // stop testing (faster)
    let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true;
    }
  }

  // never got a hit
  return false;
}

// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  // calculate the direction of the lines
  const uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  const uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}
