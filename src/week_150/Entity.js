class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.target = this.r;
  }

  grow() {
    this.target = maxSize;
  }

  srink() {
    this.target = radius;
  }

  update() {
    if (this.isInRange()) {
      this.grow();
    }
    else {
      this.srink();
    }

    this.r += (this.target - this.r) * easeInOutCubic(elementSpeed, 0, 1, 1);
  }

  isInRange() {
    return (
      this.x > effector.x && this.x < effector.x + effector.w
      &&
      this.y > effector.y && this.y < effector.y + effector.h
    );
  }

  render() {
    ellipse(this.x, this.y, this.r);
  }
}
