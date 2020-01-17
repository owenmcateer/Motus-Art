/**
 * MotusArt: Coding
 * https://owenmcateer.github.io/Motus-Art
 */
class Line {
  constructor() {
    // Create line
    this.y = (currentLine * lineHeight) + lineHeight;
    this.indent = null;
    this.setIndent();

    this.words = [];
    this.generateWords();
    scrollPage();
    deleteOldLines();
  }

  // Indent
  setIndent() {
    if (random() < chance.indent && currentLine > 0) {
      currentIndent++;
    }

    // Reset indent
    if (random() < chance.indent_reset) {
      currentIndent = 0;
    }
    this.indent = currentIndent;
  }

  generateWords() {
    // Line break?
    if (lineBreak()) return;

    const words = [];
    let wordX = (this.indent * indentSize) + indentSize;

    for (let word = 0; word < random(1, 5); word++) {
      const wordLength = random(1, 5) * characterSize;

      // Break if too long
      if (wordX + wordLength > (width - indentSize)) {
        break;
      }

      // Create new work
      words.push(new Word(wordX, wordLength));

      // Update line_x
      wordX += wordLength + space;
    }

    // Assign words
    this.words = words;
  }

  render() {
    push();
    translate(0, this.y);
    // Render words in this line
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];

      if (word.anim < 1) {
        word.update();
        word.render();
        break;
      } else {
        word.render();
      }
    }
    pop();
  }

  isFinished() {
    return this.words.reduce((sum, x) => sum + x.anim, 0) === this.words.length;
  }
}
