function LoadSoundFiles() {
  SOUNDS_DICT["start_game"] = new Sound(STARG_GAME_SOUND);
  SOUNDS_DICT["rules"] = new Sound(RULES_SONG);
  SOUNDS_DICT["easy_questions"] = new Audio(EASY_QUESTIONS_SONG);
  SOUNDS_DICT["medium_questions"] = new Audio(MEDIUM_QUESTIONS_SONG);
  SOUNDS_DICT["hard_questions"] = new Audio(HARD_QUESTIONS_SONG);
  SOUNDS_DICT["lets_play"] = new Audio(LETS_PLAY_SONG);
  SOUNDS_DICT["cut_5050"] = new Audio(CUT_5050_SOUND);
  SOUNDS_DICT["easy_right_answer"] = new Audio(EASY_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["medium_right_answer"] = new Audio(MEDIUM_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["hard_right_answer"] = new Audio(HARD_RIGHT_ANSWER_SOUND);
  SOUNDS_DICT["lose"] = new Audio(LOSE_SOUND);
  SOUNDS_DICT["final_medium_answer"] = new Audio(FINAL_MEDIUM_ANSWER_SOUND);
  SOUNDS_DICT["final_hard_answer"] = new Audio(FINAL_HARD_ANSWER_SOUND);
  SOUNDS_DICT["phone_clock"] = new Audio(PHONE_CLOCK_SOUND);
}

function PlayTheme() {
  SOUNDS_DICT["rules"].Play();
}

function ShowRules() {
  console.log("Show rules");
  document.getElementById("img_cover").style.opacity = 0.1;
  document.getElementById("btn-rules").style.visibility = false;
  document.getElementById("btn-back").style.visibility = true;
}

function BackToMain() {
  console.log("Back to main");
  document.getElementById("img_cover").style.opacity = 1;
  document.getElementById("btn-rules").style.visibility = true;
  document.getElementById("btn-back").style.visibility = false;
  document.getElementById("btn-play").style.visibility = true;
}

function PlayGame() {
  console.log("Play game");
  document.getElementById("img_cover").style.opacity = 0.1;
  document.getElementById("btn-rules").style.visibility = false;
}

LoadSoundFiles();
