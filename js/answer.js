class Answer {
  constructor(x, y, w, h, xOffset, letter, txt, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.xOffset = xOffset;
    this.letter = letter;
    this.txt = txt;
    this.borderSize = borderSize;
  }

  Draw() {
    noFill();
    stroke(LIGHTBLUE);
    strokeWeight(this.borderSize);
    line(this.xOffset, this.pos.y, this.pos.x, this.pos.y);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.h / 2,
      this.pos.y - this.h / 2
    );
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.h / 2,
      this.pos.y + this.h / 2
    );
    line(
      this.pos.x + this.h / 2,
      this.pos.y - this.h / 2,
      this.pos.x + this.w,
      this.pos.y - this.h / 2
    );
    line(
      this.pos.x + this.h / 2,
      this.pos.y + this.h / 2,
      this.pos.x + this.w,
      this.pos.y + this.h / 2
    );
    line(
      this.pos.x + this.w,
      this.pos.y - this.h / 2,
      this.pos.x + this.w + this.h / 2,
      this.pos.y
    );
    line(
      this.pos.x + this.w,
      this.pos.y + this.h / 2,
      this.pos.x + this.w + this.h / 2,
      this.pos.y
    );
    line(
      this.pos.x + this.w + this.h / 2,
      this.pos.y,
      this.pos.x + this.w + this.h,
      this.pos.y
    );

    let wordsCount = this.txt.split(" ").length;
    let yOffset = 0;
    if (wordsCount <= 10) {
      textSize(FONT_SIZE1);
      yOffset = 5;
    } else {
      textSize(FONT_SIZE1);
      yOffset = -5;
    }

    noStroke();
    textFont(FONT_FAMILY);
    textAlign(LEFT);
    textStyle(NORMAL);

    fill(DARKYELLOW);
    text(this.letter, this.pos.x + this.h / 2, this.pos.y + yOffset);

    fill(WHITE);

    text(this.txt, this.pos.x + this.h, this.pos.y + yOffset);
  }

  IsClicked(mouseX, mouseY) {
    let xAxis = mouseX > this.pos.x && mouseX < this.pos.x + this.w;
    let yAxis = mouseY > this.pos.y && mouseY < this.pos.y + this.h;
    return xAxis && yAxis;
  }
}
