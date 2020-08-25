async function LoadGame() {
  console.log("Load game");
  LoadSoundFiles();
  document.getElementById("img_cover").style.opacity = 0.1;
  SOUNDS_DICT["start_game"].SetCallback(LoadFirstQuestion);
  SOUNDS_DICT["start_game"].Play();
  // await Sleep(SOUNDS_DICT["start_game"].GetDuration() * 1000);
}

function LoadFirstQuestion() {
  console.log("Load first question");
  questionText =
    "A flashing red traffic light signifies that a driver should do what?";
  document.getElementById("question_area").value = questionText;
  console.log("Question loaded");
}
