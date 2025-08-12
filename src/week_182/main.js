/**
 * Sinking ellipses
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
function setup() {
  createCanvas(540, 540);
}

// Draw tick
function draw() {
  background(39);
  fill(239);
  noStroke();

  const y_num = 10;
  const cell_width = 50;
  const t = -frameCount * 0.01;
  stroke(239);

  for (let x = 0; x < width + cell_width; x += cell_width) {
    // line(x, 0, x, height);

    const p = t % 1;
    for (let y = 0; y <= y_num; y++) {
      const offset = (x % (cell_width * 2) === 0) ? 0.5 : 0;
      const progress = 1 - easeInCubic((y + offset + p) / 5);
      const progress_next = 1 - easeInExpo((y + offset + p + 1) / 5);
      const this_y = progress * height / 2;
      const next_y = progress_next * height / 2;

      const this_rad = (next_y - this_y) * 0.8;
      ellipse(x, (this_rad / 2) + this_y, cell_width * 0.8, this_rad);
      ellipse(x, height - ((this_rad / 2) + this_y), cell_width * 0.8, this_rad);
    }
  }
}

function easeInExpo(i) {
  return i === 0 ? 0 : pow(2, 10 * i - 10);
}

function easeInCubic(i) {
  return i * i * i;
}
