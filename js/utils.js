function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ReadTextFile(file) {
  var allText = "";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

function CheckPointPrize(questionIndex) {
  let currPrize = parseInt(MONEY_VALUES[questionIndex].replace(",", ""));
  if (currPrize < 1000) {
    return 0;
  }
  if (currPrize < 32000) {
    return 1000;
  }
  if (currPrize < 1000000) {
    return 32000;
  }
}

function LoadSoundFiles() {
  SOUNDS_DICT["start_game"] = new Sound(STARG_GAME_SOUND);
  SOUNDS_DICT["rules"] = new Sound(RULES_SONG);
  SOUNDS_DICT["easy_questions"] = new Sound(EASY_QUESTIONS_SONG);
  SOUNDS_DICT["medium_questions"] = new Sound(MEDIUM_QUESTIONS_SONG);
  SOUNDS_DICT["hard_questions"] = new Sound(HARD_QUESTIONS_SONG);
  SOUNDS_DICT["lets_play"] = new Sound(LETS_PLAY_SONG);
  SOUNDS_DICT["cut_5050"] = new Sound(CUT_5050_SOUND);
  SOUNDS_DICT["easy_right_answer"] = new Sound(EASY_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["medium_right_answer"] = new Sound(MEDIUM_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["hard_right_answer"] = new Sound(HARD_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["lose"] = new Sound(LOSE_SOUND);
  SOUNDS_DICT["final_medium_answer"] = new Sound(FINAL_MEDIUM_ANSWER_SOUND);
  SOUNDS_DICT["final_hard_answer"] = new Sound(FINAL_HARD_ANSWER_SOUND);
  SOUNDS_DICT["phone_clock"] = new Sound(PHONE_CLOCK_SOUND);
  SOUNDS_DICT["start_game"] = new Sound(START_GAME_SOUND);
}
