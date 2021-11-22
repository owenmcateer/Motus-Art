const canvasSize = 540;
const gridCount = 14;
const elements = [];
const radius = canvasSize / gridCount;

const maxSize = radius * 2; // Try *2*3
const elementSpeed = 0.2;
const affectRadius = radius * 1.5;

let timer = 0;
const speed = 0.004;

const effector = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  data: { y: -200 },
};


function setup() {
  createCanvas(canvasSize, canvasSize);

  // Create grid of entities
  for (let x = 0; x < gridCount + 1; x++) {
    for (let y = 0; y < gridCount + 3; y++) {
      const posx = x * radius;
      const posy = y * radius * sin(PI / 3);

      if (y % 2 === 0) {
        elements.push(new Entity(posx + (radius / 2), posy));
      }
      else {
        elements.push(new Entity(posx, posy));
      }
    }
  }
}

function draw() {
  background(39);
  noFill();
  stroke(239);
  strokeWeight(1);

  // Global offset
  translate(0, 12);

  // Render elements
  elements.forEach((element) => {
    element.update();
    element.render();
  });

  // Effector
  const y = map(timer, 0, 1, -height * 3, height * 4);
  setEffector(0, y, width, height * 8);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


function setEffector(x, y, w, h) {
  effector.x = x;
  effector.y = y;
  effector.w = w;
  effector.h = h;
}

// Easing function
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
