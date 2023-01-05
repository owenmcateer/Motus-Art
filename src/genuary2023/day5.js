/**
/**
 * Genuary 2023: Day 5
 * "Debug view"
 *
 * Messy, ugly code as this is just a debug view test.
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 *
 * Big thanks for Jeffrey Thompson and his book
 * Collision Detection where a lot of this code came form.
 * http://www.jeffreythompson.org/collision-detection/poly-poly.php
 *
 * https://www.instagram.com/jeffkthompson/
 * https://github.com/jeffthompson
 */

// array of PVectors for each shape
const pentagons = [];
const randomPoly = [];

// Setup
function setup() {
  createCanvas(960, 700);

  for (let j = 0; j < 3; j++) {
    pentagons[j] = [];
    const xPos = j * 280 + 200;
    // set position of the pentagon's vertices
    const angle = TWO_PI / 5;
    for (let i = 0; i < 5; i++) {
      const a = angle * i;
      const x = xPos + cos(a) * 150;
      const y = j * 100 + 230 + sin(a) * 150;
      pentagons[j].push(x);
      pentagons[j].push(y);
    }
  }

  pentagons[1] = [330.0, 285.0, 300.0, 500.0, 600.0, 560.0, 570.0, 275.0, 540.0, 260.0, 540.0, 425.0, 397.5, 425.0, 390.0, 275.0];

  // and create the random polygon
  let a = 0;
  let i = 0;
  while (a < 360) {
    const x = cos(radians(a)) * random(30, 50) + 150;
    const y = sin(radians(a)) * random(30, 50) + 120;
    randomPoly.push(x);
    randomPoly.push(y);
    a += random(15, 40);
    i += 1;
  }
}

// Draw tick
function draw() {
  background(0);
  textSize(12);
  textAlign(LEFT);

  stroke(50);
  strokeWeight(1);
  for (let x = 0; x < width; x += 15) {
    for (let y = 0; y < height; y += 15) {
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  // update random polygon to mouse position
  const movement = sin(frameCount / 75) * 4;
  for (let i = 0; i < randomPoly.length; i += 2) {
    randomPoly[i] += movement;
    randomPoly[i + 1] += movement / 2;
  }

  // Wanderer
  const t = frameCount / 100;
  const wanderer = {
    x: width * 0.4 * cos(t) + cos(t) + width / 2,
    y: height * 0.4 * sin(t) * cos(t) + height / 2
  }

  // draw the pentagon
  pentagons.forEach(pentagon => {
    let hit = false;
    if (polyPoly(pentagon, randomPoly)) {
      hit = true;
    }
    if (polyCircle(pentagon, wanderer.x, wanderer.y, 25)) {
      hit = true;
    }

    // Shapes hit!
    if (hit) fill(237, 32, 247, map(sin(frameCount / 4), -1, 1, 90, 100));
    else fill(0);

    stroke(237, 32, 247);
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < pentagon.length; i += 2) {
      vertex(pentagon[i], pentagon[i + 1]);
    }
    endShape(CLOSE);
    stroke(200);
    strokeWeight(10);
    for (let i = 0; i < pentagon.length; i += 2) {
      point(pentagon[i], pentagon[i + 1]);
    }
  });

  // draw the random polygon
  fill(0);
  stroke(255);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < randomPoly.length; i += 2) {
    vertex(randomPoly[i], randomPoly[i+1]);
  }
  endShape(CLOSE);
  fill(255);
  noStroke();
  text(`${round(randomPoly[0])}x${round(randomPoly[1])}`, randomPoly[0] - 65, randomPoly[1]+4);

  // Draw the circle
  fill(0);
  stroke(255);
  strokeWeight(3);
  ellipse(wanderer.x, wanderer.y, 40);
  fill(255);
  noStroke();
  text(`${round(wanderer.x)}x${round(wanderer.y)}px`, wanderer.x + 26, wanderer.y+4);

  // Points
  pentagons.forEach((pentagon, i) => {
    text(pentagon.join(','), 20, i * 20 + 640);
  });

  // Title
  textAlign(RIGHT);
  textSize(20);
  text('DEBUG MODE\n---\nCollision detection tests', width - 20, 40);
}


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
    const vcx = p1[current];    // c for "current"
    const vcy = p1[current+1];    // c for "current"
    const vnx = p1[next];       // n for "next"
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


// POLYGON/POINT
// used only to check if the second polygon is
// INSIDE the first
function polyPoint(vertices, px, py) {
  let collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    const vc = vertices[current];    // c for "current"
    const vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}




////


// POLYGON/CIRCLE
function polyCircle(vertices, cx, cy, r) {

  // go through each of the vertices, plus
  // the next vertex in the list
  let next = 0;
  for (let current=0; current<vertices.length; current+=2) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+2;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    const vcx = vertices[current];    // c for "current"
    const vcy = vertices[current+1];    // c for "current"
    const vnx = vertices[next];       // n for "next"
    const vny = vertices[next+1];       // n for "next"

    // check for collision between the circle and
    // a line formed between the two vertices
    const collision = lineCircle(vcx,vcy, vnx,vny, cx,cy,r);
    if (collision) return true;
  }

  // the above algorithm only checks if the circle
  // is touching the edges of the polygon – in most
  // cases this is enough, but you can un-comment the
  // following code to also test if the center of the
  // circle is inside the polygon

  const centerInside = polygonPoint(vertices, cx,cy);
  if (centerInside) return true;

  // otherwise, after all that, return false
  return false;
}


// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // is either end INSIDE the circle?
  // if so, return true immediately
  const inside1 = pointCircle(x1,y1, cx,cy,r);
  const inside2 = pointCircle(x2,y2, cx,cy,r);
  if (inside1 || inside2) return true;

  // get length of the line
  let distX = x1 - x2;
  let distY = y1 - y2;
  const len = sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  const dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

  // find the closest point on the line
  const closestX = x1 + (dot * (x2-x1));
  const closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  const onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) return false;


  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  const distance = sqrt( (distX*distX) + (distY*distY) );

  // optionally, draw a circle at the closest point
  // on the line
  fill('red');
  noStroke();
  ellipse(closestX, closestY, 20, 20);
  stroke(150);
  strokeWeight(1);
  line(closestX, closestY, cx, cy);
  fill(255);
  noStroke();
  text(`${round(closestX)}x${round(closestY)}, ${round(cx)}x${round(cy)}`, closestX, closestY);
  text(`${distance}`, closestX, closestY + 13);

  // is the circle on the line?
  if (distance <= r) {
    return true;
  }
  return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  const d1 = dist(px, py, x1, y1);
  const d2 = dist(px, py, x2, y2);

  // get the length of the line
  const lineLen = dist(x1,y1, x2,y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  const buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range, rather
  // than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  const distX = px - cx;
  const distY = py - cy;
  const distance = sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}


// POLYGON/POINT
// only needed if you're going to check if the circle
// is INSIDE the polygon
function polygonPoint(vertices, px, py) {
  let collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current=0; current < vertices.length; current += 2) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+2;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    const vcx = vertices[current];    // c for "current"
    const vcy = vertices[current+1];    // c for "current"
    const vnx = vertices[next];       // n for "next"
    const vny = vertices[next+1];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vcy > py && vny < py) || (vcy < py && vny > py)) &&
         (px < (vnx-vcx)*(py-vcy) / (vny-vcy)+vcx)) {
            collision = !collision;
    }
  }
  return collision;
}
