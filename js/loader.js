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
  document.getElementById("btn_rules").style.visibility = "hidden";
  document.getElementById("btn_back").style.visibility = "visible";
  document.getElementById("rules_para").style.visibility = "visible";
  document.getElementById("btn_back").style.visibility = "visible";
  document.getElementById("btn_play").style.visibility = "hidden";
}

function BackToMain() {
  console.log("Back to main");
  document.getElementById("img_cover").style.opacity = 1;
  document.getElementById("btn_rules").style.visibility = "visible";
  document.getElementById("btn_back").style.visibility = "hidden";
  document.getElementById("btn_play").style.visibility = "visible";
  document.getElementById("btn_start").style.visibility = "hidden";
  document.getElementById("player_name").style.visibility = "hidden";
  document.getElementById("rules_para").style.visibility = "hidden";
}

function PlayGame() {
  console.log("Play game");
  document.getElementById("img_cover").style.opacity = 0.1;
  document.getElementById("btn_rules").style.visibility = "hidden";
  document.getElementById("btn_play").style.visibility = "hidden";
  document.getElementById("btn_start").style.visibility = "visible";
  document.getElementById("btn_back").style.visibility = "visible";
  document.getElementById("player_name").style.visibility = "visible";
}

LoadSoundFiles();
