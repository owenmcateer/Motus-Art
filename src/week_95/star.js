// Render 2D stars.
function renderStars() {
  resetMatrix();
  fill(39);
  background(255);

  const timing = constrain(timer * 1.5, 0, 1);
  const rotateAmount = easeOutBack(timing, 0, 1, 1) * (TWO_PI / 6);

  for (let starY = 0; starY < starRows.length; starY++) {
    for (let starX = 0; starX < starColumns.length / 2; starX++) {
      push();
      translate(starColumns[(starX * 2) + (starY % 2)], starRows[starY]);
      rotate(rotateAmount);
      star(0, 0, 66, 114, 6);
      pop();
    }
  }
}


// Draw a single star.
function star(x, y, radius1, radius2, npoints) {
  const angle = TWO_PI / npoints;
  const halfAngle = angle / 2.0;
  beginShape(TESS);
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape();
}
