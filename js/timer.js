class Timer {
  constructor(x, y, r, value) {
    this.pos = createVector(x, y);
    this.r = r;
    this.value = value;
    this.running = false;
    this.visible = true;
  }

  IsRunning() {
    return this.running;
  }

  Run() {
    this.running = true;
  }

  Stop() {
    this.running = false;
  }

  IsVisible() {
    return this.visible;
  }

  SetVisible(value) {
    this.visible = value;
  }

  Draw() {
    if (this.visible) {
      // Inner ring
      fill(BLACK);
      stroke(WHITE);
      strokeWeight(1);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);

      // Outer ring
      fill(DARKBLUE);
      stroke(WHITE);
      strokeWeight(1);
      ellipse(this.pos.x, this.pos.y, this.r * 0.8, this.r * 0.8);

      noFill();
      if (this.value >= 10) {
        stroke(ORANGE);
      } else {
        stroke(RED);
      }
      strokeWeight(4);
      let angle = map(this.value, 0, 30, 0, 2 * Math.PI);
      arc(this.pos.x, this.pos.y, this.r, this.r, 0, angle);

      fill(WHITE);
      stroke(WHITE);
      strokeWeight(1);
      textAlign(CENTER);
      textStyle(BOLD);
      textFont("Copperplate Gothic");
      textSize(FONT_SIZE_BIG);
      text(this.value, this.pos.x, this.pos.y + this.r / 8);
    }
  }

  Update() {
    if (this.running && frameCount % FPS == 0) {
      this.value--;
    }
    if (this.value <= 0) {
      this.value = 0;
    }
  }

  IsRunning() {
    return this.running;
  }

  SetRunning(value) {
    this.running = value;
  }
}
