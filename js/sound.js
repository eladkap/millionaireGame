class Sound {
  constructor(filepath) {
    this.audio = new Audio(filepath);
  }

  Play() {
    this.audio.play();
  }

  Pause() {
    this.audio.pause();
  }

  Stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
