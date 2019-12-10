// Water class
class Water {
  constructor(x, phase) {
    this.type = round(random(1));
    this.x = x + random(0.5);
    this.phase = phase + random(0.04);
  }

  update() {
    const timerOffset = (timer + 1 + this.phase) % 1;
    this.xPos = constrain(timerOffset, 0, 0.94) * 300 - 200 + (this.x * 20);
    this.yPos = easingFall(timerOffset) * 575 - (this.x * 5) + 50;
  }

  render() {
    text(this.type, this.xPos, this.yPos);
  }
}
