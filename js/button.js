class Button {
  constructor(x, y, r, caption, borderSize) {
    this.pos = createVector(x, y);
    this.r = r;
    this.caption = caption;
    this.borderSize = borderSize;
    this.chosen = false;
    this.enabled = true;
    this.visible = true;
    this.backcolor = DARKBLUE;
  }

  Draw() {
    if (!this.visible) {
      return;
    }

    stroke(WHITE);
    strokeWeight(this.borderSize);
    if (this.chosen) {
      fill(ORANGE);
    } else {
      fill(this.backcolor);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);

    fill(WHITE);
    noStroke();
    textFont(FONT_FAMILY2);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(FONT_SIZE[3]);
    text(this.caption, this.pos.x, this.pos.y + this.r / 5);
  }

  SetBackground(backcolor) {
    this.backcolor = backcolor;
  }

  IsChosen() {
    return this.chosen;
  }

  SetChosen(value) {
    this.chosen = value;
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

  SetVisible(value) {
    this.visible = value;
  }

  IsFocus(mouseX, mouseY) {
    return (
      (mouseX - this.pos.x) * (mouseX - this.pos.x) +
        (mouseY - this.pos.y) * (mouseY - this.pos.y) <=
      this.r * this.r
    );
  }

  IsClicked(mouseX, mouseY) {
    return (
      (mouseX - this.pos.x) * (mouseX - this.pos.x) +
        (mouseY - this.pos.y) * (mouseY - this.pos.y) <=
      this.r * this.r
    );
  }
}
