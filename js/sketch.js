/* GLOBALS */
var game;
var question;
var answers;
var timer;
var moneyTable;
var lifelines;

/* Sound */
var rulesSong;
var letsPlaySong;
var easyQuestionsSong;

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

function SetLifelines() {
  lifelines = [];
  let lifeline5050 = new LifeLine(
    LIFELINE1_POS_X,
    LIFELINE_POS_Y,
    LIFELINE_WIDTH,
    LIFELINE_HEIGHT,
    "50:50",
    LIFELINE_BORDER
  );
  let lifelinePhone = new LifeLine(
    LIFELINE2_POS_X,
    LIFELINE_POS_Y,
    LIFELINE_WIDTH,
    LIFELINE_HEIGHT,
    "phone",
    LIFELINE_BORDER
  );
  let lifelineAudience = new LifeLine(
    LIFELINE3_POS_X,
    LIFELINE_POS_Y,
    LIFELINE_WIDTH,
    LIFELINE_HEIGHT,
    "audience",
    LIFELINE_BORDER
  );
  lifelines.push(lifeline5050);
  lifelines.push(lifelinePhone);
  lifelines.push(lifelineAudience);
}

function DrawAnswers() {
  for (let answer of answers) {
    answer.Draw();
  }
}

function DrawLifelines() {
  for (let lifeline of lifelines) {
    lifeline.Draw();
  }
}

/* Game Functions */
function SetGame() {
  SetQuestion();
  SetAnswers();
  SetTimer();
  SetMoneyTable();
  SetLifelines();
}

async function ShowQuestionAndAnswers() {
  letsPlaySong.play();
  await Sleep(5000);
  letsPlaySong.stop();
  await Sleep(DELAY);
  question.SetVisible(true);
  easyQuestionsSong.play();
  await Sleep(DELAY_QUESTION);
  for (let answer of answers) {
    answer.SetVisible(true);
    await Sleep(DELAY_ANSWER);
  }
  timer.Run();
}

/* SOUND */
function LoadSoundFiles() {
  rulesSong = loadSound(RULES_SONG);
  letsPlaySong = loadSound(LETS_PLAY_SONG);
  easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
}

/* MAIN */
function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
  LoadSoundFiles();
  SetGame();
}

function draw() {
  background(BLACK);
  question.Draw();
  DrawAnswers();
  timer.Draw();
  timer.Update();
  if (timer.value == 0) {
    console.log("Time's up!!!");
    easyQuestionsSong.stop();
  }
  moneyTable.Draw();
  DrawLifelines();
}

/* Keyboard Events */
function keyPressed() {
  if (keyCode === ENTER) {
    ShowQuestionAndAnswers();
  }
}

/* Mouse Events */
function mousePressed() {
  // Check lifelines
  for (let lifeline of lifelines) {
    if (lifeline.IsClicked(mouseX, mouseY)) {
      // lifeline.SetChosen(true);
      lifeline.ChooseUnchoose();
      console.log(lifeline.type + " was chosen");
    }
  }

  // Check answers
  for (let answer of answers) {
    if (answer.IsClicked(mouseX, mouseY)) {
      // answer.SetChosen(true);
      answer.ChooseUnchoose();
      console.log(answer.txt + " was chosen");
    }
  }
}
