const options = {
  w: 540,
  h: 540,
  webgl: true, // comment for 2D (rect / circle / …)
  numFrames: 90,
  fps: 60,
  record: true,
  video: true, // generate .mp4 instead of .gif
  shutterAngle: 2.7,
  samplesPerFrame: 8,
  chromaticAberration: 1.2,
  magicAngle: 0,
  cx: 0,

  setup: (p5, g) => {
    g.magicAngle = p5.atan(1 / p5.sqrt(2));
    g.cx = g.w / 2;
  },

  // p5: p5js instance
  // t: time from 0 to 1
  // g: object used to hold global variables
  draw: (p5, t, g) => {
    p5.colorMode(p5.RGB, 255, 255, 255, 1);

    const rotateAxis = (r) => {
      switch (r) {
        case 'x':
          p5.rotateX(t * p5.HALF_PI);
          break;
        case 'y':
          p5.rotateY(t * p5.HALF_PI);
          break;
        case 'z':
          p5.rotateZ(t * -p5.HALF_PI);
          break;
        default:
      }
    };
    const drawCube = (size, o, r) => {
      const s = (g.w / 2) * size;
      const sS = 5;
      p5.push();
      p5.stroke(239 * o);
      p5.noFill();
      rotateAxis(r);

      p5.box(s);
      p5.fill(239, o);
      p5.translate(s / 2, s / 2, s / 2);
      p5.sphere(sS, sS, sS);
      p5.translate(0, 0, -s);
      p5.sphere(sS, sS, sS);
      p5.translate(0, -s, 0);
      p5.sphere(sS, sS, sS);
      p5.translate(0, 0, s);
      p5.sphere(sS, sS, sS);

      p5.translate(-s, 0, 0);
      p5.sphere(sS, sS, sS);
      p5.translate(0, 0, -s);
      p5.sphere(sS, sS, sS);
      p5.translate(0, s, 0);
      p5.sphere(sS, sS, sS);
      p5.translate(0, 0, s);
      p5.sphere(sS, sS, sS);
      p5.pop();
    };

    // Styles
    p5.background(39);
    p5.stroke(239);
    p5.strokeWeight(8);

    // Set viewing angle
    p5.ortho(-g.cx, g.cx, g.cx, -g.cx, -g.w, g.h * 2);
    p5.rotateX(g.magicAngle);
    p5.rotateY(p5.QUARTER_PI);
    p5.noFill();

    // Draw cubes
    drawCube(1.1, 0.8, 'y');
    drawCube(0.71, 0.9, 'x');
    drawCube(0.41, 1, 'z');
  },
};
