/**
 * Motus: Factorisation
 * https://owenmcateer.github.io/Motus-Art
 *
 * https://mathlesstraveled.com/2012/10/05/factorization-diagrams/
 */
const canvas = 1080;
const colours = [];
let cx;
let cy;
let size = 0;
let number = 0;
let lastFactor = [];
let factorsReadable = [];
const entities = [];
let background;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB);

  cx = width / 2;
  cy = height / 2;
  size = (width / 2) - 100;

  // Colours
  colours[0] = color(180, 8, 19.6);
  colours[1] = color(180, 7.5, 31.4);

  background = createGraphics(width, height);
  setGradient(background, 0, 0, width, height, colours[1], colours[0]);
}

function factoriseReadable(n) {
  if (n <= 1) return [1];
  const factors = [];
  for (let i = 2; i <= n; i++) {
    while ((n % i) === 0) {
      factors.push(i);
      n /= i;
    }
  }
  return factors.reverse();
}

// Caluculate prime factorizations. Thanks Nayuki
// @see https://www.nayuki.io/page/calculate-prime-factorization-javascript
function factorise(n) {
  if (n <= 1) return [1];
  const factors = [];
  while (n !== 1) {
    const factor = smallestFactor(n);
    factors.push(factor);
    n /= factor;
  }
  return factors;
}
function smallestFactor(n) {
  if (n < 2) {
    return 1;
  }
  // Obviously 4 isn't a prime
  // but this hack corrects the layout
  // to make for much nicer layouts.
  if (n % 4 === 0) {
    return 4;
  }
  if (n % 2 === 0) {
    return 2;
  }
  const end = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= end; i += 2) {
    if (n % i === 0) {
      return i;
    }
  }
  return n;
}

// @see https://www.jasondavies.com/factorisation-diagrams/
function polygon(n, depth, s, x, y, f) {
  const step = (2 * Math.PI) / n;
  let init;
  if (n === 2) {
    init = Math.PI;
  } else if (n === 4) {
    init = Math.PI / 4;
  } else {
    init = (3 * Math.PI) / 2;
  }

  const dotRadius = (2 * s) / (n + 2);
  const radius = (n * s) / (n + 2);
  let deltaY;
  if (n % 2 === 0) {
    deltaY = 0;
  } else {
    deltaY = (radius / 2) * (1 - Math.cos(Math.PI / n));
  }

  for (let i = 0; i < n; ++i) {
    f(
      x + (Math.cos(init + (step * i)) * radius),
      y + ((Math.sin(init + (step * i)) * radius) + deltaY),
      dotRadius,
    );
  }
}

let entityItem = 0;
function drawEntities(x, y, s, depth, list) {
  if (depth < 0) {
    entities[entityItem].newEnd(x, y, s);
    entityItem++;
  } else {
    polygon(list[depth], depth, s, x, y, (dx, dy, ds) => {
      drawEntities(dx, dy, ds, depth - 1, list);
    });
  }
}


function setGradient(e, x, y, w, h, c1, c2) {
  e.noFill();
  for (let i = y; i <= y + h; i++) {
    const inter = map(i, y, y + h, 0, 1);
    const c = lerpColor(c1, c2, inter);
    e.stroke(c);
    e.line(x, i, x + w, i);
  }
}

// Draw tick
function draw() {
  // Background
  image(background, 0, 0);

  // New step
  if (frameCount % 80 === 0 || frameCount === 1) {
    // Add new entity
    entities.push(new Entity(cx, cy));

    // Next Factor
    number++;
    const factors = factorise(number);
    lastFactor = factors;
    factorsReadable = factoriseReadable(number);

    // Draw entities
    drawEntities(cx, cy, size, factors.length - 1, factors);

    // Reset entity number count
    entityItem = 0;
  }

  // Render each entity
  for (let e = 0; e < entities.length; e++) {
    entities[e].update();
    entities[e].display();
  }

  // Print current number
  fill(colours[1]);
  textSize(64);
  textFont('Montserrat');
  textAlign(RIGHT);
  text(`${number} = ${(factorsReadable.length === 1) ? 'prime' : factorsReadable.join('x')}`, width - 30, height - 30);

  // How far can you go?!
  if (number === 10000) {
    // eslint-disable-next-line
    console.log('Good luck! 💻🔥');
  }
}
