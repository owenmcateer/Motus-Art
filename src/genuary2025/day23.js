/**
 * Genuary 2025: Day 23
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
// p5 setup
function setup() {
  createCanvas(800, 800, WEBGL);
  frameRate(1);
}

// Draw tick
function draw() {
  background(0);
  randomSeed(144266);noLoop();

  const c = color(255, 255, 255);
  directionalLight(c, -1, 1.5, -1.5);
  ambientLight(55, 55, 55);

  // Style the sphere.
  noStroke();
  const numOfFloors = 22;
  const numOfBlocks = 40;

  // Back floors
  rotateX(0.8);
  rotateY(-0.2);
  translate(numOfBlocks * -50, numOfFloors * -90, -600);

  for (let floors = 0; floors < numOfFloors; floors++) {
    let prev = 0;
    push();
    translate(0, 100 * floors, 0);

    translate(numOfBlocks * 50, 0, -100);
    box(100 * numOfBlocks, 70, 100);
    translate(numOfBlocks * -50, 0, 100);

    for (let i = 0; i < numOfBlocks; i++) {
      let depth = prev;
      if (random() > 0.96 && floors > 0) {
        depth = abs(depth - 1);
      }

      if (depth === prev) {
        // Normal
        translate(100, 0, 0);
        box(100, 70, 100);
      }
      else if (depth > prev) {
        // Going back
        translate(100, 0, -100);
        rotateY(QUARTER_PI);
        box(200 * sqrt(2), 70, 100 * sqrt(2));
        rotateY(-QUARTER_PI);
      }
      else if (depth < prev) {
        // Going forward
        translate(100, 0, 0);
        rotateY(-QUARTER_PI);
        box(200 * sqrt(2), 70, 100 * sqrt(2));
        rotateY(QUARTER_PI);
        translate(0, 0, 100);
      }

      prev = depth;
    }
    pop();
  }
}
