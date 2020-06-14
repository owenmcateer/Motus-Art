/**
 * Box class
 */
class Box {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rx = 0;
    this.ry = 0;
    this.rz = 0;
    this.speed = 0;
  }

  // Set rotation
  setRotation(axis, amount) {
    switch (axis) {
      case 'x':
        this.rx = amount;
        break;

      case 'y':
        this.ry = amount;
        break;

      case 'z':
        this.rz = amount;
        break;
      default:
        throw new Error('Wrong axis');
    }
  }

  // Set speed
  setSpeed(speed) {
    this.speed = speed;
  }

  // Update box
  update() {
    // X axis
    if (this.rx > 0) {
      this.rx -= this.speed;
    } else {
      this.rx = 0;
    }
    // Y axis
    if (this.ry > 0) {
      this.ry -= this.speed;
    } else {
      this.ry = 0;
    }
    // Z axis
    if (this.rz > 0) {
      this.rz -= this.speed;
    } else {
      this.rz = 0;
    }
  }

  // Set rotation
  rotate() {
    rotateX(this.rx);
    rotateY(this.ry);
    rotateZ(this.rz);
  }

  // Render box
  render() {
    push();
    translate(this.x, this.y, 0);
    this.rotate();
    box(this.size);
    pop();
  }
}
