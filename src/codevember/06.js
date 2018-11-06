/**
 * Motus:
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const sMin = 40;
const sMax = canvas - sMin;

const entities = [];

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [76, 75, 80];
  colours.points = [226, 106, 80];
  colours.lines = [226, 106, 80, 0.5];

  // Add new entities
  for (let e = 0; e < 20; e++) {
    let linked = null;
    if (e > 0) {
      linked = entities[(e - 1)];
    }
    entities.push(new Entity(random(sMin, sMax), random(sMin, sMax), linked));
  }
  entities[0].setLinked(entities[entities.length - 1]);


  //  Move entities
  setInterval(moveEntities, 1500);
}

// Draw tick
function draw() {
  background(colours.bg);

  // Render each entity
  for (let e = 0; e < entities.length; e++) {
    entities[e].update();
    entities[e].display();
  }
}

// Every xseconds update locations
function moveEntities() {
  for (let e = 0; e < entities.length; e++) {
    entities[e].move(random(sMin, sMax), random(sMin, sMax), random(20, 45));
  }
}


/**
 * Entities class
 *
 * @param {int} x
 * @param {int} y
 * @param {Entity} linked
 */
class Entity {
  constructor(x, y, linked) {
    this.x = x;
    this.y = y;
    this.linked = linked;

    this.pos = createVector(cx, cx);
    this.target = createVector(x, y);
    this.size = random(20, 45);

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 20;
    this.maxforce = 30;
  }

  // Update tick
  update() {
    const desired = p5.Vector.sub(this.target, this.pos);
    const d = desired.mag();

    // Slow down easing
    if (d < 100) {
      const m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // New vector
    const newVector = p5.Vector.sub(desired, this.vel);
    newVector.limit(this.maxforce);
    this.acc.add(newVector);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  // Render entity
  display() {
    // Line
    noFill();
    stroke(colours.lines);
    strokeWeight(3);
    const friend = this.linked.current();
    line(this.pos.x, this.pos.y, friend.x, friend.y);

    // Ball
    noStroke();
    fill(colours.points);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  // Set new target vector
  move(x, y, size) {
    this.target = createVector(x, y);
    this.size = size;
  }

  current() {
    return createVector(this.pos.x, this.pos.y);
  }

  setLinked(e) {
    this.linked = e;
  }
}
