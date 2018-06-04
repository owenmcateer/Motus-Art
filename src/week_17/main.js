/**
 * Motus: Sunset strip
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const sky = {
  img: null,
  speed: -0.3,
  position: 0,
};
const palmTrees = [];
const trees = [];
const inset = 330;
let planeImg;
let plane;
const speed = 1.6;

function preload() {
  planeImg = loadImage('../assets/img/week_17/Airplane_silhouette.svg');
  palmTrees.push(loadImage('../assets/img/week_17/palm-tree-1.svg'));
  palmTrees.push(loadImage('../assets/img/week_17/palm-tree-2.svg'));
  // Sky photo by Rúben Marques https://unsplash.com/photos/DUxJSaANcWs
  sky.img = loadImage('../assets/img/week_17/red-sky.jpg');
}

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  rectMode(CENTER);

  // Sky image props
  sky.h = sky.img.height;

  // Colours
  colours.bg = [0];

  // Palm trees
  for (let i = 0; i < 4; i++) {
    trees.push(new PalmTree((i * 400) + 100));
  }

  // Create plane
  plane = new Plane();
}

// Draw tick
function draw() {
  background(255);

  // Draw clouds
  image(sky.img, 0, sky.position);
  image(sky.img, 0, sky.position - (sky.h * -1));
  sky.position += sky.speed;
  if (sky.position <= (sky.h * -1)) {
    sky.position = 0;
  }

  // Loop over trees
  for (let i = 0; i < trees.length; i++) {
    trees[i].update();
    trees[i].render();
  }

  // Plane
  plane.update();
  plane.render();
}

class PalmTree {
  constructor(offset) {
    // Set starting values
    this.offset = offset;
    this.init();
  }

  init() {
    this.base = null;
    this.l_size = random(0.9, 1);
    this.l_rotate = random(TWO_PI);
    this.l_tree = palmTrees[Math.floor(random(palmTrees.length))];
    this.l_xOffset = random(-10, 60);
    this.r_size = random(0.9, 1);
    this.r_rotate = random(TWO_PI);
    this.r_tree = palmTrees[Math.floor(random(palmTrees.length))];
    this.r_xOffset = random(-10, 60);
  }

  update() {
    this.offset -= speed;
    this.updateBase();

    if (this.offset < -inset) {
      this.reset();
    }
  }

  updateBase() {
    this.base = this.offset * 1.7;
  }

  reset() {
    this.init();
    this.offset = canvas + 100;
    this.updateBase();
  }

  render() {
    stroke(0);
    strokeWeight(10);
    fill(0);
    // Left tree
    push();
    translate(inset + this.l_xOffset, this.offset);
    imageMode(CENTER);
    rotate(this.l_rotate);
    scale(this.l_size);
    image(this.l_tree, 0, 0);
    pop();
    quad(
      -20, this.base - 30,
      inset + this.l_xOffset, this.offset,
      inset + this.l_xOffset, this.offset,
      -20, this.base + 30
    );

    // Right side
    push();
    translate((canvas - inset) + this.r_xOffset, this.offset);
    imageMode(CENTER);
    rotate(this.r_rotate);
    scale(this.r_size);
    image(this.r_tree, 0, 0);
    pop();
    quad(
      canvas + 20, this.base - 30,
      (canvas - inset) + this.r_xOffset, this.offset,
      (canvas - inset) + this.r_xOffset, this.offset,
      canvas + 20, this.base + 30
    );
  }
}

class Plane {
  constructor() {
    this.speed = canvas * 2;
    this.reset();
  }

  reset() {
    // Pick a new start point & destination
    this.start = createVector(-300, random(canvas));
    this.destination = createVector(canvas + 200, random(cx, canvas));
    this.pos = this.start;
    // Calculate heading
    const headingX = this.destination.x - this.start.x;
    const headingY = this.destination.y - this.start.y;
    this.angle = atan2(headingY, headingX);
    // Fly
    this.movementX = (this.destination.x - this.start.x) / this.speed;
    this.movementY = ((this.destination.y - this.start.y) / this.speed) + sky.speed;
  }

  update() {
    // Check bounds
    if (this.pos.x > canvas + 200) {
      this.reset();
    }
    // Update position
    this.pos.x += this.movementX;
    this.pos.y += this.movementY;
  }

  render() {
    // Render plane
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + HALF_PI);
    image(planeImg, -12, -12, 25, 25);
    pop();
  }
}
