var game;

class Game {
  constructor() {
    this.gameState = GAME_START;
    this.questionIndex = 0;
  }

  IncrementQuestion() {
    this.questionIndex++;
  }
}

function LoadGame() {
  console.log("Load game");
  game = new Game();
  LoadSoundFiles();
  document.getElementById("img_cover").style.opacity = 0.1;
  // SOUNDS_DICT["start_game"].SetCallback(LoadFirstQuestion); todo: uncomment
  // SOUNDS_DICT["start_game"].Play(); todo: uncomment
  LoadMoneyTable();
  LoadFirstQuestion(); // todo: comment

  SetCurrentMoneyIndex(1); // todo: comment
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
    cell2.appendChild(document.createTextNode(tableData[i]));
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
  game.IncrementQuestion();
}
