class MessageBox {
  constructor(x, y, txt) {
    this.pos = createVector(x, y);
    this.txt = txt;
    this.forecolor = WHITE;
  }

  Draw() {
    fill(this.forecolor);
    noStroke();
    textFont(FONT_FAMILY2);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(FONT_SIZE[3]);
    text(this.txt, this.pos.x, this.pos.y);
  }

  SetText(txt) {
    this.txt = txt;
  }
}
