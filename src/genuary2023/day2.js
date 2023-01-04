/**
 * Genuary 2023: Day 2
 * "Made in 10 minutes"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let t= 0;
const tSpeed = 0.005;


function setup() {
  createCanvas(660, 660, WEBGL);
}

function draw() {
  background(39);
  stroke(239);
  fill(0);


  const boxSize = 25;
  rotateX(0.5);
  rotateZ(t * TWO_PI / 8);
  translate(0, 0, boxSize * 3);
  sphere(boxSize * 2);

  for (let a = 0; a < TWO_PI; a += TWO_PI / 8) {
    push();
    rotateZ(a);
    translate(boxSize*4, 0, 0);

    for (let l = 0; l < 20; l++) {
      push();
      translate(l * boxSize, 0, 0);

      for (let i = 0; i < TWO_PI; i += TWO_PI / 6) {
        push();
        rotateX(i);
        const radius = map(sin(-t * 2 * TWO_PI + l/5 + a / TWO_PI), -1, 1, boxSize * 0.2, boxSize * 2);
        translate(0, radius, 0);
        box(boxSize * 0.8);
        pop();
      }
      pop();
    }
    pop();
  }


  // Timer
  t += tSpeed;
  if (t >= 1) {
    t = 0;
  }
}
