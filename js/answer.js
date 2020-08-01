class Answer {
  constructor(x, y, w, h, xOffset, letter, txt, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.xOffset = xOffset;
    this.letter = letter;
    this.txt = txt;
    this.borderSize = borderSize;
    this.chosen = false;
    this.visible = false;
    this.enabled = true;
    this.marked = false;
    this.backcolor = BLACK;
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
    let l =
      this.letter == "B" || this.letter == "D" ? this.h * 3 : this.h * 0.8;
    line(
      this.pos.x + this.w + this.h / 2,
      this.pos.y,
      this.pos.x + this.w + l,
      this.pos.y
    );

    let wordsCount = this.txt.split(" ").length;
    let yOffset = 0;
    if (wordsCount <= 10) {
      textSize(FONT_SIZE[0]);
      yOffset = 5;
    } else {
      textSize(FONT_SIZE[0]);
      yOffset = -5;
    }

    // backcolor
    if (this.marked) {
      fill(AQUA);
    } else {
      fill(this.backcolor);
    }

    noStroke();
    rect(
      this.pos.x + this.h / 2,
      this.pos.y - this.h / 2,
      this.w - this.h / 2,
      this.h
    );
    triangle(
      this.pos.x + this.h / 2,
      this.pos.y - this.h / 2,
      this.pos.x + this.h / 2,
      this.pos.y + this.h / 2,
      this.pos.x,
      this.pos.y
    );

    triangle(
      this.pos.x + this.h / 2 + this.w,
      this.pos.y,
      this.pos.x + this.w,
      this.pos.y - this.h / 2,
      this.pos.x + this.w,
      this.pos.y + this.h / 2
    );

    if (this.visible) {
      noStroke();
      textFont(FONT_FAMILY);
      textAlign(LEFT);
      textStyle(NORMAL);

      fill(DARKYELLOW);
      text(this.letter + ": ", this.pos.x + this.h / 2, this.pos.y + yOffset);

      fill(WHITE);

      text(this.txt, this.pos.x + this.h, this.pos.y + yOffset);
    }
  }

  SetChosen(value) {
    this.chosen = value;
  }

  ChooseUnchoose() {
    this.chosen = !this.chosen;
  }

  IsChosen() {
    return this.chosen;
  }

  SetVisible(value) {
    this.visible = value;
  }

  IsVisible() {
    return this.visible;
  }

  SetBackcolor(backcolor) {
    this.backcolor = backcolor;
  }

  IsClicked(mouseX, mouseY) {
    if (!this.enabled) {
      return false;
    }
    let xAxis = mouseX > this.pos.x && mouseX < this.pos.x + this.w;
    let yAxis =
      mouseY > this.pos.y - this.h / 2 && mouseY < this.pos.y + this.h / 2;
    return xAxis && yAxis;
  }

  IsEnabled() {
    return this.enabled;
  }

  Enable() {
    this.enabled = true;
  }

  Disable() {
    this.enabled = false;
  }

  IsFocus(mouseX, mouseY) {
    let xAxis = mouseX > this.pos.x && mouseX < this.pos.x + this.w;
    let yAxis =
      mouseY > this.pos.y - this.h / 2 && mouseY < this.pos.y + this.h / 2;
    return xAxis && yAxis;
  }

  SetMarked(value) {
    this.marked = value;
  }
}
