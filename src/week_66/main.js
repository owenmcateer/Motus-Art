/**
 * Motus: Hidden love
 * The love is there, you just need to
 * be at the right angle to see it.
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const heartSize = 460;

const entities = [];
let swing = 0;
let timer = 0.35;
const speed = 0.003;
const a = 10;
let oxx;
let oyy;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, canvasSize * 2);
  colorMode(RGB, 255, 255, 255, 1);
  frameRate(30);

  // Build heart array
  for (let x = -1.8; x <= 1.8; x += 0.006) {
    const item = graph(x);
    if (item) {
      entities.push(new Entity(item));
    }
  }
}


function draw() {
  background(40);

  // Swing camera
  swing = map(sin(timer * TWO_PI), -1, 1, 0, 1);
  swing = easeInOutCubic(swing, 0, 1, 1);
  rotateY(swing * HALF_PI);

  // Styles
  noFill();
  stroke(255);

  // Loop entities
  entities.forEach((e) => {
    e.update();
    e.render();
  });

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


class Entity {
  constructor(pos) {
    this.x = pos.x;
    this.y = pos.y;
    this.z = pos.z;
    this.animated = random() > 0.8;

    if (this.animated) {
      this.animOffset = random();
      this.animLoops = round(random(4)) + 1;
    }
  }

  update() {
    this.renderX = this.x + ((this.z) * swing);
  }

  render() {
    if (this.animated) {
      const timerOffset = ((timer + 1) + this.animOffset) % 1;
      let size = map(sin((timerOffset * TWO_PI) * this.animLoops), -1, 1, 0, 1);
      size = easeInOutCubic(size, 0, 1, 1);
      strokeWeight((size * 8) + 5);
    } else {
      strokeWeight(6);
    }

    push();
    translate(
      this.x * heartSize,
      this.y * heartSize,
      this.z * heartSize,
    );
    point(0, 0, 0);
    pop();
  }
}


/**
 * Plot graph
 *
 * @param {int} x
 */
function graph(x) {
  // The maths
  // f = abs(x).^(2/3)+ 0.9*sqrt(abs(3.3 -x.^2)).*sin(a*3.14.*x);
  const f = pow(abs(x), 2 / 3) + 0.9 * sqrt(abs(3.3) - pow(x, 2)) * sin(a * PI * x);

  // Calculate position
  const xx = map(x, -1.8, 1.8, -1, 1);
  const yy = map(1.8 - f, -1.8, 1.8, 1.4, -0.25);
  let returnPos;

  // Don't draw first point
  if (x !== -1.8) {
    returnPos = {
      x: random(oxx, xx),
      y: random(yy, oyy),
      z: random(-1, 1),
    };
  } else {
    returnPos = false;
  }

  // Store previous points
  oxx = xx;
  oyy = yy;

  // Return result
  return returnPos;
}


function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
