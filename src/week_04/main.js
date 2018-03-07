/**
 * Motus: Noir nights
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const rain = [];
let umbrella = {};
let man;
let flash = false;
let lightingImg;
let lightingTick = false;
let bgImg;

// PReload
function preload() {
  man = loadImage('../assets/img/week_04/smoking-man.svg');
}

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours and umbrella settings
  colours[0] = color(0);
  colours[1] = color(255, 255, 255, 0.7);
  colours[2] = color(150);
  colours[3] = color(186, 26, 18);
  colours[4] = color(224, 96, 22);
  colours[5] = color(15);

  umbrella = {
    x: width / 2,
    y: 600,
    w: 600,
    h: 250,
  };
  bgImg = gradient(0, 0, width, height, colours[0], colours[5]);
  lightingImg = gradient(0, 0, width, height, colours[0], colours[1]);

  // Create rain drops
  for (let i = 0; i < 1000; i++) {
    rain.push(new Rain(true));
  }
}

function draw() {
  background(0);
  image(bgImg, 0, 0);

  // Lighting
  if (frameCount % 240 === 0) {
    lightingTick = 1;
  }
  lighting();

  // Draw man
  image(man, 430, 550, man.width * 1.3, man.height * 1.3);
  cigarette(434, 801, 6);

  // Umbrella
  fill(0);
  stroke(0);
  curve(
    umbrella.x - (umbrella.w / 10), umbrella.y + (umbrella.w * 1.6),
    umbrella.x - (umbrella.w / 2), umbrella.y,
    umbrella.x + (umbrella.w / 2), umbrella.y,
    umbrella.x + (umbrella.w / 10), umbrella.y + (umbrella.w * 1.6)
  );

  for (let i = 0; i < rain.length; i++) {
    rain[i].update();
    if (rain[i].alive) {
      rain[i].render();
    } else {
      // Remove and create a new rain drop
      rain.splice(i, 1);
      rain.push(new Rain(false));
    }
  }
}

// Lighting
function lighting() {
  if (!lightingTick) {
    return;
  }
  const animastion = [1, 6, 20, 24, 29, 33];
  if (animastion.includes(lightingTick)) {
    flash = !flash;
  }

  if (flash) {
    image(lightingImg, 0, 0);
  }
  lightingTick++;
}

function cigarette(x, y, r) {
  const phase = map(cos(frameCount * 0.03), -1, 1, 0, 1);
  fill(lerpColor(colours[3], colours[4], phase));
  noStroke();
  ellipse(x, y, r, r);
}


class Rain {
  constructor(first) {
    // Set starting values/movement
    this.firstRun(first);
    this.acc = createVector(0, 0);
    this.mass = random(3, 5) / 100;
    this.vel = createVector(0, 5);
    this.boucing = false;
    this.alive = true;
  }

  // On the first run we need to randomly place rain drops
  // but not on or under the umbrella.
  firstRun(first) {
    if (first) {
      let startY = random(height);
      const umbrellaBreakPoint = umbrella.y - (umbrella.h / 2);
      let startX;
      if (startY < umbrellaBreakPoint) {
        startX = random(width);
      } else {
        // Divide into 3 groups, left, right and top
        const split = random();
        if (split < 0.3) {
          startX = random(0, umbrella.x - (umbrella.w / 2));
        } else if (split < 0.6) {
          startX = random(umbrella.x + (umbrella.w / 2), width);
        } else {
          startY = random(0, umbrellaBreakPoint);
          startX = random(width);
        }
      }
      this.pos = createVector(startX, startY);
    } else {
      // If drop has lived before place at top
      this.pos = createVector(random(width), 0);
    }
  }

  // Update tick
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.checkCollision();
    this.checkBounds();
    this.applyForce(createVector(0, this.mass));
  }

  // Render rain drops
  render() {
    noStroke();
    fill(colours[1]);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  // Physics, apply forces
  applyForce(force) {
    const f = force.copy();
    f.div(this.mass);
    this.acc.add(force);
  }

  // Check collision with umbrella
  checkCollision() {
    if (!this.boucing
      && this.pos.x >= umbrella.x - (umbrella.w / 2)
      && this.pos.x <= umbrella.x + (umbrella.w / 2)
      && umbrellaCollision(this.pos.x, this.pos.y)) {
      // Randomly delete some rain drops
      if (random() > 0.6) {
        this.alive = false;
      }

      // Hit!
      this.boucing = true;
      this.vel.set(0, 0);
      this.acc.set(0, 0);
      this.pos.y = this.pos.y;

      // Bounce left/right
      if (this.pos.x > umbrella.x) {
        this.applyForce(createVector(3, this.mass * -1));
      } else {
        this.applyForce(createVector(-3, this.mass * -1));
      }
    } else {
      // This allows it to bounce again
      this.boucing = false;
    }
  }

  checkBounds() {
    if (this.pos.y > height
      || this.pos.x < 0
      || this.pos.x > width) {
      this.alive = false;
    }
  }
}

function umbrellaCollision(x, y) {
  const a = umbrella.w / 2;
  const b = umbrella.h / 2;
  const dx = x - umbrella.x;
  const dy = y - umbrella.y;
  return ((dx * dx) / (a * a) + (dy * dy) / (b * b) <= 1);
}

function gradient(x, y, w, h, c1, c2) {
  const grad = createGraphics(w, h);
  grad.background(c1);

  // Draw gradient sky
  grad.noFill();
  for (let i = 0; i <= h; i++) {
    const inter = map(i, 0, h, 0, 1);
    const c = lerpColor(c1, c2, inter);
    grad.stroke(c);
    grad.line(0, i, w, i);
  }
  return grad;
}
