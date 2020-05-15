/**
 * Motus: Oscillating interactions
 */
const canvasSize = 540;
const cx = canvasSize / 2;

const outerCount = 6;
const outerRadius = 210;
const innerCount = 6;
const innerRadius = 150;

let timer = 0;
const speed = 0.003;

let entities = [];
const minDistance = 100;
const minCenterDistance = 134;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);
  background(39);
}


// Draw tick
function draw() {
  background(39, 0.3);
  noFill();

  // Calculate entities
  entities = [];
  for (let i = 0; i < TWO_PI; i += TWO_PI / outerCount) {
    const ix = cos(i + (timer / outerCount) * 2) * innerRadius + cx;
    const iy = sin(i + (timer / outerCount) * 2) * innerRadius + cx;
    noFill();
    stroke(239);
    strokeWeight(1);
    ellipse(ix, iy, outerRadius);

    for (let j = 0; j < TWO_PI; j += TWO_PI / innerCount) {
      const jx = cos(j + timer) * (outerRadius / 2) + ix;
      const jy = sin(j + timer) * (outerRadius / 2) + iy;
      fill(239);
      entities.push({
        x: jx,
        y: jy,
      });
    }
  }

  // Draw entities
  const copyOfEntities = [...entities];
  for (let e = 0; e < entities.length; e++) {
    const entity = entities[e];
    const centerDistance = dist(entity.x, entity.y, cx, cx);

    if (centerDistance < minCenterDistance) {
      for (let ee = 0; ee < copyOfEntities.length; ee++) {
        if (e === ee) continue;

        const otherEntity = entities[ee];
        const distance = dist(entity.x, entity.y, otherEntity.x, otherEntity.y);

        if (distance <= minDistance) {
          strokeWeight(3);
          stroke(239, easeInOutQuad(map(distance, 0, minDistance, 1, 0), 0, 1, 1));
          line(entity.x, entity.y, otherEntity.x, otherEntity.y);
        }
      }
    }

    // Draw entity
    noStroke();
    fill(239);
    ellipse(entity.x, entity.y, 12);
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}


// Easing
function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
