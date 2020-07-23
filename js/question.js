class Question {
  constructor(x, y, w, h, xOffset, txt, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.xOffset = xOffset;
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

    fill(WHITE);
    noStroke();
    let wordsCount = this.txt.split(" ").length;
    let yOffset = 0;
    if (wordsCount <= 10) {
      textSize(FONT_SIZE4);
      yOffset = 5;
    } else {
      textSize(FONT_SIZE2);
      yOffset = -5;
    }

    textFont(FONT_FAMILY);
    textAlign(CENTER);
    textStyle(NORMAL);
    text(this.txt, this.pos.x + SCREEN_WIDTH / 2.5, this.pos.y + yOffset);
  }
}
