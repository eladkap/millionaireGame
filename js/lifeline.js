class LifeLine {
  constructor(x, y, w, h, type, borderSize) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.type = type;
    this.borderSize = borderSize;
    this.chosen = true;
    this.enabled = true;
  }

  Draw() {
    stroke(LIGHTBLUE);
    strokeWeight(this.borderSize);
    if (!this.chosen) {
      fill(BLUE);
    } else {
      fill(BLACK);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.w, 2 * this.h);

    if (!this.enabled) {
      noFill();
      stroke(RED);
      strokeWeight(this.borderSize);
      line(
        this.pos.x - this.w,
        this.pos.y - this.h,
        this.pos.x + this.w,
        this.pos.y + this.h
      );
      line(
        this.pos.x + this.w,
        this.pos.y - this.h,
        this.pos.x - this.w,
        this.pos.y + this.h
      );
    }

    if (this.type == "50:50") {
      fill(WHITE);
      noStroke();
      textFont(FONT_FAMILY);
      textAlign(CENTER);
      textStyle(NORMAL);
      textSize(FONT_SIZE[4]);
      text("50:50", this.pos.x, this.pos.y + this.h / 3);
    } else if (this.type == "audience") {
      strokeWeight(2);
      stroke(WHITE);

      let a = 20;
      let b = 5;

      ellipse(this.pos.x - a, this.pos.y - 10 - b, 15, 15);
      ellipse(this.pos.x + a, this.pos.y - 10 - b, 15, 15);
      ellipse(this.pos.x, this.pos.y - 10, 15, 15);

      beginShape();
      vertex(this.pos.x - a, this.pos.y - b);
      vertex(this.pos.x - 20 - a, this.pos.y + 10 - b);
      vertex(this.pos.x - 25 - a, this.pos.y + 25 - b);
      vertex(this.pos.x + 25 - a, this.pos.y + 25 - b);
      vertex(this.pos.x + 20 - a, this.pos.y + 10 - b);
      vertex(this.pos.x - a, this.pos.y - b);
      endShape();

      beginShape();
      vertex(this.pos.x + a, this.pos.y - b);
      vertex(this.pos.x - 20 + a, this.pos.y + 10 - b);
      vertex(this.pos.x - 25 + a, this.pos.y + 25 - b);
      vertex(this.pos.x + 25 + a, this.pos.y + 25 - b);
      vertex(this.pos.x + 20 + a, this.pos.y + 10 - b);
      vertex(this.pos.x + a, this.pos.y - b);
      endShape();

      beginShape();
      vertex(this.pos.x, this.pos.y);
      vertex(this.pos.x - 20, this.pos.y + 10);
      vertex(this.pos.x - 25, this.pos.y + 25);
      vertex(this.pos.x + 25, this.pos.y + 25);
      vertex(this.pos.x + 20, this.pos.y + 10);
      vertex(this.pos.x, this.pos.y);
      endShape();
    }
  }

  IsChosen() {
    return this.chosen;
  }

  SetChosen(value) {
    this.chosen = value;
  }

  ChooseUnchoose() {
    this.chosen = !this.chosen;
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

  IsClicked(mouseX, mouseY) {
    return (
      ((mouseX - this.pos.x) * (mouseX - this.pos.x)) / (this.w * this.w) +
        ((mouseY - this.pos.y) * (mouseY - this.pos.y)) / (this.h * this.h) <=
      1
    );
  }
}
