/* GLOBALS */
var gameState;
var question;
var answers;
var timer;
var moneyTable;
var lifelines;
var msgbox;

/* Sound */
var rulesSong;
var letsPlaySong;
var easyQuestionsSong;
var cut5050Sound;

/* Questions DB */
var qdb;
var questionsPool;
var currQuestion;
var currIndex = 0;

/* Flag indicates the user to choose an action */
var chooseState = false;

function SetQuestion() {
  question = new Question(
    QUESTION_POS_X,
    QUESTION_POS_Y,
    QUESTION_WIDTH,
    QUESTION_HEIGHT,
    QUESTION_XOFFSET,
    currQuestion.question,
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
    currQuestion.A,
    2
  );
  let answer2 = new Answer(
    ANSWER_B_POS_X,
    ANSWER_B_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_B_XOFFSET,
    "B",
    currQuestion.B,
    2
  );
  let answer3 = new Answer(
    ANSWER_C_POS_X,
    ANSWER_C_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_C_XOFFSET,
    "C",
    currQuestion.C,
    2
  );
  let answer4 = new Answer(
    ANSWER_D_POS_X,
    ANSWER_D_POS_Y,
    ANSWER_WIDTH,
    ANSWER_HEIGHT,
    ANSWER_D_XOFFSET,
    "D",
    currQuestion.D,
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

function SetMessageBox() {
  msgbox = new MessageBox(
    MSG_BOX_POS_X,
    MSG_BOX_POS_Y,
    "Press ENTER to start the game"
  );
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
  SetMessageBox();
  gameState = GAME_START;
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

/* Load Sound */
function LoadSoundFiles() {
  rulesSong = loadSound(RULES_SONG);
  letsPlaySong = loadSound(LETS_PLAY_SONG);
  easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
  cut5050Sound = loadSound(CUT_5050_SOUND);
}

/* Load questions database */
function LoadQuestions() {
  let dbText = ReadTextFile("data/Q001.json");
  questionsData = JSON.parse(dbText);
  qdb = new QuestionsDB();
  qdb.CreateFrom(questionsData);
  questionsPool = qdb.RandomizePool(10);
  currQuestion = questionsPool[currIndex];
}

function CheckTimer() {
  if (timer.value == 0) {
    gameState = GAME_OVER;
    console.log("Time's up!!!");
    msgbox.SetText("Time's up!!!");
    easyQuestionsSong.stop();
  }
}

/* Lifeline Actions */
function GetTwoRandomWrongAnswers(questionObj) {
  let rightAnsLetter = questionObj.rightAnswer;
  let wrongAnswerIndices = [0, 1, 2, 3];
  let rightAnsIndex = rightAnsLetter.charCodeAt() - "A".charCodeAt();
  wrongAnswerIndices.splice(rightAnsIndex, 1);
  let wrongAnswerToBeLeftIndex = random([0, 1, 2]);
  wrongAnswerIndices.splice(wrongAnswerToBeLeftIndex, 1);
  return wrongAnswerIndices;
}

async function PerformLifeline5050() {
  let wrongAnswerIndices = GetTwoRandomWrongAnswers(currQuestion);
  for (answerIndex of wrongAnswerIndices) {
    answers[answerIndex].Disable();
    answers[answerIndex].SetVisible(false);
  }
  await Sleep(1000);
  cut5050Sound.play();
  lifelines[0].Disable();
}

/* MAIN */
function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
  LoadSoundFiles();
  LoadQuestions();
  SetGame();
}

function draw() {
  background(BLACK);
  question.Draw();
  DrawAnswers();
  timer.Draw();
  timer.Update();
  msgbox.Draw();
  CheckTimer();

  moneyTable.Draw();
  DrawLifelines();
  mouseOver();
}

/* Keyboard Events */
async function keyPressed() {
  if (gameState == GAME_START && keyCode === ENTER) {
    gameState = GAME_SHOW_QUESTION;
    await ShowQuestionAndAnswers();
    console.log("Waiting for response");
    gameState = GAME_WAIT_FOR_RESPONSE;
  }
}

/* Mouse Events */
function mousePressed() {
  if (gameState != GAME_WAIT_FOR_RESPONSE) {
    console.log("Ignore");
    return;
  }
  console.log("Get response");

  // Check lifelines
  for (let lifeline of lifelines) {
    if (lifeline.IsClicked(mouseX, mouseY) && lifeline.IsEnabled()) {
      lifeline.SetChosen(true);
      console.log(lifeline.type + " was chosen");
      if (lifeline.type == "50:50") {
        console.log("50:50");
        PerformLifeline5050();
      }
    }
  }

  // Check answers
  for (let answer of answers) {
    if (answer.IsClicked(mouseX, mouseY)) {
      answer.SetChosen(true);
      console.log(answer.txt + " was chosen");
    }
  }
}

function mouseOver() {
  if (!chooseState) {
    return;
  }
  for (let answer of answers) {
    if (answer.IsFocus(mouseX, mouseY)) {
      answer.SetMarked(true);
    } else {
      answer.SetMarked(false);
    }
  }
}
