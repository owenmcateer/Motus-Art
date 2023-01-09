/**
 * Genuary 2023: Day 6
 * "Steal like an artist"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const words = ['STEAL', 'REMIX', 'COLLAB', 'EDIT', 'COMBINE', 'REWORD', 'DESTROY', 'CREATE', 'BREAK', 'THINK', 'PLAY'];

// Setup
function setup() {
  createCanvas(400, 400);
  frameRate(6);
}

// Draw tick
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255);

  textFont('Caveat');
  textAlign(CENTER, CENTER);

  textSize(90);
  text(random(words), width / 2, 100);

  textSize(80);
  text('LIKE AN', width / 2, 190);

  textSize(90);
  text('ARTIST', width / 2, 280);

  textSize(30);
  text('Stolen by Motus Art', width / 2, 370);

  translate(360, 350);
  rotate(0.22);
  fill(222, 16, 16);
  ellipse(0, 0, 80);
  fill(255);
  textSize(20);
  text('Genuary', 0, -10);
  text('2023 6th', 0, 10);
}
