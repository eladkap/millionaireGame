class Button {
  constructor(x, y, w, h, caption, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.caption = caption;
    this.borderSize = borderSize;
    this.chosen = false;
    this.enabled = true;
    this.visible = true;
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
      fill(DARKBLUE);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.w, 2 * this.h);

    fill(WHITE);
    noStroke();
    textFont(FONT_FAMILY2);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(FONT_SIZE[3]);
    text(this.caption, this.pos.x, this.pos.y + this.h / 3);
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

  IsClicked(mouseX, mouseY) {
    // if (this.enabled) {
    //   return false;
    // }
    return (
      ((mouseX - this.pos.x) * (mouseX - this.pos.x)) / (this.w * this.w) +
        ((mouseY - this.pos.y) * (mouseY - this.pos.y)) / (this.h * this.h) <=
      1
    );
  }
}
