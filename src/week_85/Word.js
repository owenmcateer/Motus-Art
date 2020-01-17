/**
 * MotusArt: Coding
 * https://owenmcateer.github.io/Motus-Art
 */
class Word {
  constructor(x, size) {
    this.x = x;
    this.size = size;
    this.colour = currentColour;
    this.speed = random(settings.speed_min, settings.speed_max);
    this.anim = 0;
    this.changeColour();
  }

  changeColour() {
    if (random() < chance.change_colour) {
      this.colour = setRandomColour();
    }
  }

  render() {
    stroke(...this.colour);
    line(this.x, 0, this.x + (this.size * this.anim), 0);
  }

  update() {
    if (this.anim < 1) {
      this.anim += this.speed;
      this.anim = min(this.anim, 1);
    }
  }
}
