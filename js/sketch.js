/* GLOBALS */
var game;
var question;
var answers;
var timer;
var moneyTable;

function SetQuestion() {
  question = new Question(
    QUESTION_POS_X,
    QUESTION_POS_Y,
    QUESTION_WIDTH,
    QUESTION_HEIGHT,
    QUESTION_XOFFSET,
    "If you were in the east coast of the United States, which city you may travel to \nand in which you could make a swim in the ocean?",
    3
  );
}

function SetAnswers() {
  let answer1 = new Answer(
    ANSWER_A_POS_X,
    ANSWER_A_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_A_XOFFSET,
    "A",
    "Los Angeles",
    2
  );
  let answer2 = new Answer(
    ANSWER_B_POS_X,
    ANSWER_B_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_B_XOFFSET,
    "B",
    "New York City",
    2
  );
  let answer3 = new Answer(
    ANSWER_C_POS_X,
    ANSWER_C_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_C_XOFFSET,
    "C",
    "Houston",
    2
  );
  let answer4 = new Answer(
    ANSWER_D_POS_X,
    ANSWER_D_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_D_XOFFSET,
    "D",
    "Miami",
    2
  );
  answers = [];
  answers.push(answer1);
  answers.push(answer2);
  answers.push(answer3);
  answers.push(answer4);
}

function SetTimer() {
  timer = new Timer(TIMER_POS_X, TIMER_POS_Y, TIMER_RADIUS, TIMER_VALUE);
}

function SetMoneyTable() {
  moneyTable = new MoneyTable(
    MONEY_TABLE_POS_X,
    MONEY_TABLE_POS_Y,
    MONEY_TABLE_WIDTH,
    MONEY_TABLE_ROW_HEIGHT
  );
}

function DrawAnswers() {
  for (let answer of answers) {
    answer.Draw();
  }
}

/* Game Functions */
function SetGame() {
  SetQuestion();
  SetAnswers();
  SetTimer();
  SetMoneyTable();
}

async function ShowQuestionAndAnswers() {
  question.SetVisible(true);
  await Sleep(1000);
  for (let answer of answers) {
    answer.SetVisible(true);
    await Sleep(1000);
  }
}

/* MAIN */
function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
  SetGame();
}

function draw() {
  background(BLACK);
  question.Draw();
  DrawAnswers();
  timer.Draw();
  timer.Update();
  moneyTable.Draw();
}

function keyPressed() {
  if (keyCode === ENTER) {
    ShowQuestionAndAnswers();
  }
}
