class MoneyTable {
  constructor(x, y, w, rowHeight) {
    this.pos = createVector(x, y);
    this.w = w;
    this.rowHeight = rowHeight;
    this.current = -1;
    this.visible = true;
  }

  Draw() {
    /* Frame */
    noFill();
    stroke(WHITE);
    strokeWeight(1);
    rect(
      this.pos.x - 10,
      this.pos.y - this.rowHeight,
      this.w,
      this.rowHeight * MONEY_VALUES.length + 10
    );

    fill(ORANGE);
    stroke(GRAY3);
    strokeWeight(0.5);
    textAlign(LEFT);
    textStyle(NORMAL);
    textFont("Copperplate Gothic");
    textSize(FONT_SIZE[1]);

    let x = this.pos.x;
    let y = this.pos.y;
    let n = MONEY_VALUES.length;
    for (let i = 0; i < n; i++) {
      let j = n - i - 1;
      if ((i + 1) % 5 == 0 || i == 0) {
        fill(WHITE);
      } else {
        fill(ORANGE);
      }
      let d = " ";
      if (j <= this.current) {
        d = "♦";
      }
      if (this.visible) {
        text(j + 1 + "\t\t" + d + "\t\t" + CURRENCY + MONEY_VALUES[j], x, y);
      }

      y += this.rowHeight;
    }
  }

  IsVisible() {
    return this.visible;
  }

  SetVisible(value) {
    this.visible = value;
  }
}
