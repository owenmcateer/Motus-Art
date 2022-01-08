/**
 * Genuary Day 7
 * "Sol LeWitt Wall Drawing"
 *
 * @motus_art
 *
 */
const numOfPoints = 12;
const markers = [];
const margin = 30;
let delay = 0;


// Setup
function setup() {
  createCanvas(540, 540);

  // Create marker points
  for (let i = 0; i < numOfPoints; i++) {
    markers.push(new Marker());
  }
}


// Draw tick
function draw() {
  background(39);
  stroke(239);

  // Process markers
  markers.forEach((m) => {
    m.update();
    m.render();
  });
}

// Marker class
class Marker {
  constructor() {
    this.pos = this.randomPosition();
    this.delay = delay * numOfPoints * 2;
    this.progress = 0;
    delay++;
  }

  update() {
    if ((this.delay) > frameCount) return;
    this.progress += 0.01;
  }

  randomPosition(attempt = 0) {
    attempt++;

    let selection = createVector(random(margin, width - margin), random(margin, height - margin));

    // Break out
    if (attempt > 50) {
      return selection;
    }

    // Check neighbour distance
    markers.forEach((m) => {
      if (m === this) return;

      if (p5.Vector.dist(selection, m.pos) < 100) {
        selection = this.randomPosition(attempt);
        return;
      }
    });

    return selection;
  }

  render() {
    // Lines
    markers.forEach((m, i) => {
      if (m === this) return;

      const progress = this.progress - (i / numOfPoints / 3);
      const v3 = p5.Vector.lerp(this.pos, m.pos, constrain(progress, 0, 1));
      line(this.pos.x, this.pos.y, v3.x, v3.y);
    });
  }
}
