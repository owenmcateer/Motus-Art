/**
 * Genuary Day 23
 * "Abstract vegetation."
 *
 * @motus_art
 */
const colours = [
  '#4f8d2f',
  '#3a7c25',
  '#136321',
  '#166336',
  '#08583a',

  '#144220',
  '#196b2f',
  '#48893e',
  '#564d40',
  '#423d36',
];

function setup() {
  createCanvas(540, 540);
  background('#E8F3DD');
  noStroke();
  blendMode(SOFT_LIGHT);

  for (let i = 0; i < 5000; i++) {
    const x = random();
    const y = random();

    push();
    translate(x * width, y * height);
    rotate((x * y) * PI);
    fill(random(colours));
    ellipse(0, 0, random(45, 75), random(5, 25));
    pop();
  }
}
