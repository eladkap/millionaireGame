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
  document.getElementById("error_msg").style.visibility = "hidden";
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

function ShowErrorMessage(playerName) {
  var error = document.getElementById("error_msg");
  if (playerName.length == 0) {
    error.style.visibility = "visible";
  } else {
    error.style.visibility = "hidden";
  }
}

function StartGame() {
  console.log("Start game");
  let playerName = document.getElementById("player_name").value;
  ShowErrorMessage(playerName);
  if (playerName.length > 0) {
    LoadGame();
  }
}
