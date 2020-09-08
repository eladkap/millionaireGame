var game;
var timer;

class Game {
  constructor() {
    this.gameState = GAME_START;
    this.questionIndex = 0;
    this.chosenAnswer = null;
  }

  IncrementQuestion() {
    this.questionIndex++;
  }

  SetChosenAnswer(chosenAnswer) {
    this.chosenAnswer = chosenAnswer;
  }
}

class Timer {
  constructor(timerElement, initValue) {
    this.timerElement = timerElement;
    this.timerDiv = this.timerElement.getElementsByTagName("div")[0];
    this.timerDiv.innerHTML = initValue;
    this.initValue = initValue;
    this.value = initValue;
    this.running = false;
  }

  Update() {
    if (this.running) {
      this.value--;
      if (this.value >= 0) {
        this.timerDiv.innerHTML = this.value;
      } else if (this.value == 0) {
        this.timerDiv.innerHTML = 0;
      }
    }
  }

  Start() {
    console.log("Timer started.");
    this.running = true;
  }

  Stop() {
    console.log("Timer stopped.");
    this.running = false;
  }

  Reset() {
    console.log("Timer reset.");
    this.value = this.initValue;
  }
}

function LoadGame() {
  console.log("Load game");
  timer = new Timer(document.getElementById("timer"), 30);
  game = new Game();
  LoadSoundFiles();
  document.getElementById("img_cover").style.opacity = 0.1;
  // SOUNDS_DICT["start_game"].SetCallback(LoadFirstQuestion);
  // SOUNDS_DICT["start_game"].Play();
  LoadMoneyTable();
}

function UpdateTimer() {
  timer.Update();
}

function StartGame() {
  setInterval(UpdateTimer, 1000);
  timer.Start();
  SetCurrentMoneyIndex(1);
  LoadFirstQuestion();
}

/* Question and Answers */
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

/* Money Table */
function CreateTable(tableData) {
  var table = document.createElement("table");
  table.setAttribute("id", "money_table");
  var tableBody = document.createElement("tbody");

  let len = tableData.length;
  for (let i = 0; i < len; i++) {
    var row = document.createElement("tr");
    row.setAttribute("id", "row" + String(len - i));
    if (i % 5 == 0) {
      row.setAttribute("style", "color:white");
    } else {
      row.setAttribute("style", "color:orange");
    }
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    cell1.appendChild(document.createTextNode(String(len - i)));
    cell2.appendChild(document.createTextNode(tableData[i] + " " + CURRENCY));
    row.appendChild(cell1);
    row.appendChild(cell2);
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function LoadMoneyTable() {
  let moneyTable = MONEY_VALUES;
  CreateTable(moneyTable.reverse());
}

function SetCurrentMoneyIndex(index) {
  let row = document.getElementById("row" + index);
  row.style.backgroundColor = "orange";
  row.style.color = "black";
  for (let i = 1; i <= index; i++) {
    let row = document.getElementById("row" + i);
    let cell1 = row.getElementsByTagName("td")[0];
    cell1.innerHTML = cell1.innerHTML + " ♦";
  }
}

function LoadNextQuestion() {
  timer.Stop();
  timer.Reset();
  game.IncrementQuestion();
}

/* Lifelines*/
function PerformLifeline5050() {
  console.log("Lifeline 50:50 was taken.");
}

function PerformLifelinePhone() {
  console.log("Lifeline phone was taken.");
}

function PerformLifelineAudience() {
  console.log("Lifeline audience was taken.");
}

/* Key Events */
document.addEventListener(
  "keypress",
  (event) => {
    let keyName = event.key;
    if (keyName === "Enter") {
      StartGame();
    }
    if (keyName === "s") {
      timer.Stop();
    }
  },
  false
);

/* Mouse events */
document.addEventListener("mousedown", (event) => {
  let clickedElement = event.srcElement;
  let elementId = clickedElement.id;
  console.log(elementId);

  // Lifeline was chosen
  if (elementId == "lifeline_5050") {
    PerformLifeline5050();
  }
  if (elementId == "lifeline_phone") {
    PerformLifelinePhone();
  }
  if (elementId == "lifeline_audience") {
    PerformLifelineAudience();
  }

  // Answer was chosen
  if (elementId == "answerA_area") {
    game.SetChosenAnswer("A");
  }
  if (elementId == "answerB_area") {
    game.SetChosenAnswer("B");
  }
  if (elementId == "answerC_area") {
    game.SetChosenAnswer("C");
  }
  if (elementId == "answerD_area") {
    game.SetChosenAnswer("D");
  }
});
