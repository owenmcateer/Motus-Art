//
// Flow Field Void
//
// Shifting two tone particles on a moving flow field.
// Based on the flowfield code by Daniel Shiffman
// http://youtube.com/thecodingtrain
//
FlowField flowfield;
ArrayList<Particle> particles;

color c_one = color(83, 110, 255, 3);
color c_two = color(255, 51, 236, 3);
// color c_one = color(42, 219, 215, 3);
// color c_two = color(240, 70, 58, 3);
boolean debug = false;

void setup() {
  size(960, 540);
  pixelDensity(2);
  smooth();

  flowfield = new FlowField(30);
  flowfield.update();

  particles = new ArrayList<Particle>();
  for (int i = 0; i < 14000; i++) {
    PVector start = new PVector(random(width), random(height));
    particles.add(new Particle(start, random(2, 8)));
  }
  background(0);
}


void draw() {
  flowfield.update();

  if (debug) flowfield.display();

  // Blend
  blendMode(ADD);

  // Stroke color
  color strokeColor = lerpColor(c_one, c_two, map(sin(frameCount / 50.0), -1, 1, 0, 1));
  stroke(strokeColor);
  strokeWeight(1);

  // Draw particles
  for (Particle p : particles) {
    p.follow(flowfield);
    p.run();
  }

  // The Void
  blendMode(BLEND);
  noStroke();
  fill(0);
  rectMode(CENTER);
  push();
  translate(width * 0.5, height * 0.5);

  // Cross
  rotate(HALF_PI / 2);
  rect(0, 0, height * 0.25, height * 0.8);
  rect(0, 0, height * 0.8, height * 0.25);

  // Circle
  // ellipse(0, 0, height * 0.6, height * 0.6);
  pop();
}
