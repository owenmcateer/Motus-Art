// Sand particles
class GrainParticle {
  constructor(pixels) {
    this.pos = this.pickPosition(pixels);
    this.windX = random(-1, 1);
    this.windY = random(6, 8);
    this.colour = random(['#624a3c', '#e7b865', '#a9804e', '#e8c496', '#e8bf61', '#6f7175']);
    this.maxY = this.restingPos();
    this.size = random(3.5, 6.5);
    this.stopped = false;
  }

  pickPosition(pixels) {
    const d = pixelDensity();
    const randomX = round(random(width));
    const randomY = round(random(height));
    const index = ((randomY * width * d) + (randomX * d)) * 4;

    if (pixels[index] < 127) {
      return createVector(randomX, randomY);
    }
    return this.pickPosition(pixels);
  }

  restingPos() {
    let side;

    if (this.pos.x < width / 2) {
      side = 1 - (this.pos.x / (width * 2));
    }
    else {
      side = (this.pos.x / (width * 2)) - 1;
    }
    const pileTop = easeInOutQuad(side, 0, 1, 1) * pileHeight + (height - pileHeight - 3);

    return random(max(pileTop, this.pos.y), height);
  }

  update() {
    if (this.stopped) return;

    this.pos.x += this.windX;
    this.pos.y += this.windY;

    // Max height
    if (this.pos.y > this.maxY) {
      this.pos.y = this.maxY;
      this.stopped = true;
    }
  }

  render() {
    fill(this.colour);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

// Easing function
function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
