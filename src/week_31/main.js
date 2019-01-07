/**
 * Motus: Entity cycle
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const speed = 70;
const rotation = Math.PI / (speed * 30);
const baseInner = canvas * 0.23;
const baseOuter = canvas * 0.88;

const entities = [];
const entityCount = 27;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [25];

  // Create init entities
  for (let i = 0; i < entityCount; i++) {
    entities.push(new Entity(i));
  }
}


// Draw tick
function draw() {
  // BG
  background(colours.bg);

  // Render entities
  entities.forEach((e) => {
    e.update();
    e.render();
  });
}


/**
 * Entity class
 */
class Entity {
  constructor(i) {
    this.i = i;
    this.angle = i * (TWO_PI / entityCount);
    this.phase = i % 3;
  }

  // Get moving
  update() {
    this.angle += rotation;
    const dCos = cos((frameCount / speed) + (this.phase));
    const pos = map(dCos, -1, 1, baseInner, baseOuter);
    this.x = cos(this.angle) * (pos / 2) + cx;
    this.y = sin(this.angle) * (pos / 2) + cx;
    this.size = map(dCos, -1, 1, 23, 58);
    this.strength = map(dCos, -1, 1, 225, 80);
  }

  // Return current X&Y
  getXY() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  // Finds the next entity X&Y
  getNext(num) {
    // Return next entity if exists
    if (entities[this.i + num]) {
      return entities[this.i + num].getXY();
    }
    return entities[(this.i + num) - entities.length].getXY();
  }

  // Render dots & lines
  render() {
    // Render dot
    fill(this.strength);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);

    // Render lines
    noFill();
    stroke(this.strength, 0.5);
    for (let i = 1; i <= 3; i++) {
      const nextEntity = this.getNext(i);
      line(this.x, this.y, nextEntity.x, nextEntity.y);
    }
  }
}
