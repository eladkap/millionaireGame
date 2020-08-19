class Speaker {
  constructor(voice) {
    this.speech = new p5.Speech();
    this.speech.setVoice(voice);
    this.speech.setVolume(1);
    this.speech.setRate(1);
    this.speech.setPitch(1);
  }

  SetVoice(voice) {
    this.speech.setVoice(voice);
  }

  SetRandomVoice() {
    let voices = this.speech.voices;
    return random(voices);
  }

  SetVolume(volume) {
    this.speech.setVolume(volume);
  }

  SetRate(rate) {
    this.speech.setRate(rate);
  }

  SetPitch(pitch) {
    this.speech.setPitch(pitch);
  }

  SetCallback(action) {
    this.speech.ended(action);
  }

  Say(text) {
    if (ALLOW_SPEECH) {
      this.speech.speak(text);
    }
  }

  Stop() {
    this.speech.stop();
  }
}
