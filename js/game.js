function LoadGame() {
  console.log("Load game");
  LoadSoundFiles();
  document.getElementById("img_cover").style.opacity = 0.1;
  // SOUNDS_DICT["start_game"].SetCallback(LoadFirstQuestion); todo: uncomment
  // SOUNDS_DICT["start_game"].Play(); todo: uncomment
  LoadMoneyTable();
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

function CreateTable(tableData) {
  var table = document.createElement("table");
  table.setAttribute("id", "money_table");
  var tableBody = document.createElement("tbody");

  let len = tableData.length;
  for (let i = 0; i < len; i++) {
    var row = document.createElement("tr");
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
