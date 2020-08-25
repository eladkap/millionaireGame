function LoadGame() {
  console.log("Load game");
  LoadSoundFiles();
  document.getElementById("img_cover").style.opacity = 0.1;
  // SOUNDS_DICT["start_game"].SetCallback(LoadFirstQuestion); todo: uncomment
  // SOUNDS_DICT["start_game"].Play(); todo: uncomment
  LoadFirstQuestion(); // todo: comment
}

function LoadFirstQuestion() {
  console.log("Load first question");
  let questionText =
    "A flashing red traffic light signifies that a driver should do what?";
  let answerA = "Answer A";
  let answerB = "Answer B";
  let answerC = "Answer C";
  let answerD = "Answer D";

  document.getElementById("question_area").innerHTML = questionText;
  document.getElementById("answerA_area").innerHTML = "<h2>♦A: answerA </h2>";
  document.getElementById("answerB_area").innerHTML = "<h2>♦B: answerB </h2>";
  document.getElementById("answerC_area").innerHTML = "<h2>♦C: answerC </h2>";
  document.getElementById("answerD_area").innerHTML = "<h2>♦D: answerD </h2>";

  console.log("Question loaded");
}
