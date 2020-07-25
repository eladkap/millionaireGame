class Question {
  constructor(x, y, w, h, xOffset, txt, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.xOffset = xOffset;
    this.txt = txt;
    this.borderSize = borderSize;
    this.visible = false;
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
      this.xOffset + this.w + 2 * this.h + this.xOffset,
      this.pos.y
    );

    if (this.visible) {
      fill(WHITE);
      noStroke();
      let wordsCount = this.txt.split(" ").length;
      let yOffset = 0;
      if (wordsCount <= 10) {
        textSize(FONT_SIZE[3]);
        yOffset = 5;
      } else {
        textSize(FONT_SIZE[1]);
        yOffset = -5;
      }

      textFont(FONT_FAMILY);
      textAlign(CENTER);
      textStyle(NORMAL);
      text(this.txt, this.pos.x + SCREEN_WIDTH / 2.5, this.pos.y + yOffset);
    }
  }

  SetVisible(value) {
    this.visible = value;
  }

  IsVisible() {
    return this.visible;
  }
}
