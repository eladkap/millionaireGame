class Timer {
  constructor(x, y, r, value) {
    this.pos = createVector(x, y);
    this.r = r;
    this.value = value;
  }

  Draw() {
    // Inner ring
    fill(PURPLE);
    stroke(WHITE);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.r * 0.8, this.r * 0.8);

    // Osuter ring
    fill(DARKBLUE);
    stroke(WHITE);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    fill(WHITE);
    stroke(WHITE);
    strokeWeight(1);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont("Copperplate Gothic");
    textSize(FONT_SIZE_BIG);
    text(this.value, this.pos.x, this.pos.y + this.r / 8);
  }

  Update() {
    if (frameCount % FPS == 0) {
      this.value--;
    }
    if (this.value <= 0) {
      this.value = 0;
    }
  }
}
