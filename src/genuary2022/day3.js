/**
 * Genuary Day 3
 * "Space"
 *
 * @motus_art
 */
const planets = [
  {
    name: 'Sun',
    diameter: 696340,
    year: 0,
    color: [254, 190, 47],
    days: 0,
  },
  {
    name: 'Mercury',
    diameter: 4879.4,
    year: 0.415,
    color: [248, 246, 195],
  },
  {
    name: 'Venus',
    diameter: 12104,
    year: 0.616,
    color: [173, 55, 51],
  },
  {
    name: 'Earth',
    diameter: 12742,
    year: 1,
    color: [140, 195, 78],
    colours: [
      [0.2, 124, 209, 219, 1],
      [0.3, 105, 190, 129, 1],
      [0.4, 105, 190, 129, 1],
      [0.6, 124, 209, 219, 1],
      [0.8, 105, 190, 129, 1],
      [0.9, 124, 209, 219, 1],
    ],
  },
  {
    name: 'Mars',
    diameter: 6779,
    year: 1.88,
    color: [239, 139, 113],
  },
  {
    name: 'Jupiter',
    diameter: 139820,
    year: 12,
    color: [242, 181, 100],
    colours: [
      [0, 237, 154, 75, 1],
      [0.08, 239, 236, 221, 1], // White
      [0.2, 237, 154, 75, 1],
      [0.25, 212, 109, 88, 1], // Red
      [0.35, 237, 154, 75, 1],
      [0.4, 239, 236, 221, 1], // White
      [0.5, 237, 154, 75, 1],
      [0.55, 248, 215, 120, 1], // Yellow
      [0.65, 237, 154, 75, 1],
      [0.7, 211, 107, 88, 1], // Red
      [0.8, 237, 154, 75, 1],
      [0.85, 248, 215, 120, 1], // Yellow
      [0.92, 237, 154, 75, 1],
      [0.94, 239, 236, 221, 1], // White
      [0.98, 237, 154, 75, 1],
    ],
  },
  {
    name: 'Saturn',
    diameter: 116460,
    year: 29,
    color: [255, 201, 104],
    colours: [
      [0, 242, 238, 184, 1],
      [0.2, 229, 202, 116, 1],
      [0.5, 242, 238, 184, 1],
      [0.7, 229, 202, 116, 1],
      [1, 242, 238, 184, 1],
    ],
  },
  {
    name: 'Uranus',
    diameter: 50724,
    year: 84,
    color: [63, 193, 245],
    colours: [
      [0, 78, 186, 174, 1],
      [0.5, 105, 232, 217, 1],
      [1, 78, 186, 174, 1],
    ],
  },
  {
    name: 'Neptune',
    diameter: 49244,
    year: 165,
    color: [110, 166, 240],
    colours: [
      [0, 43, 152, 197, 1],
      [0.2, 34, 115, 176, 1],
      [0.5, 43, 152, 197, 1],
      [0.7, 34, 115, 176, 1],
      [1, 43, 152, 197, 1],
    ],
  },
];
const scale = 0.0013;
const planetGap = 10;
const canvasSize = 540;
let timer = -0.4;
const speed = 0.01;
const orbitOffset = 0.4;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
}


// Draw tick
function draw() {
  background(0);
  noStroke();

  const ssCenterX = (planets[0].diameter * scale) * -0.45;
  const ssCenterY = height * 0.8;

  let distance = 0;

  // Render each planet
  planets.forEach((p, i) => {
    // The Sun
    if (p.name !== 'Sun') {
      distance += ((planets[i - 1].diameter * scale) / 2);
      distance += ((planets[i].diameter * scale) / 2) + planetGap;
    }

    // Orbit lines
    noFill();
    stroke(60);
    ellipse(ssCenterX, ssCenterY, distance * 2);

    // Planet
    let orbitX = (cos((timer / p.year) - orbitOffset) * distance) + ssCenterX;
    let orbitY = (sin((timer / p.year) - orbitOffset) * distance) + ssCenterY;

    // If sun, set center
    if (p.name === 'Sun') {
      orbitX = ssCenterX;
      orbitY = ssCenterY;
    }

    // Draw it
    noStroke();
    fill(p.color);
    const planetSize = p.diameter * scale;

    if (p.colours) {
      const planetTexture = drawingContext.createLinearGradient(0, planetSize * -0.5, 0, planetSize * 0.5);
      p.colours.forEach((c) => {
        planetTexture.addColorStop(c[0], `rgba(${c[1]}, ${c[2]}, ${c[3]}, ${c[4]})`);
      });
      drawingContext.fillStyle = planetTexture;
    }
    push();
    translate(orbitX, orbitY);
    ellipse(0, 0, planetSize);
    pop();

    // If Earth, add our moon
    if (p.name === 'Earth') {
      const moonOrbitX = (cos(timer * 12) * 10) + orbitX;
      const moonOrbitY = (sin(timer * 12) * 10) + orbitY;
      fill(200);
      ellipse(moonOrbitX, moonOrbitY, 1737.1 * scale);
    }
  });

  timer += speed;
}
