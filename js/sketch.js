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

/* Speaker */
var speech;

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

function SetSpeech() {
  speech = new p5.Speech();
  let voices = speech.voices;
  let voice = random(voices);
  speech.setVoice("Alex");
  speech.setVolume(1);
  speech.setRate(0.7);
  speech.setPitch(1);
  // speech.onLoad = voiceReady;
  // speech.started(StartedSpeaking);
  // speech.ended(EndedSpeaking);
}

function StartedSpeaking() {
  // fill(WHITE);
  // ellipse(5, 5, 10, 10);
}

function EndedSpeaking() {
  // fill(BLACK);
  // ellipse(5, 5, 10, 10);
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
  SetSpeech();
  gameState = GAME_START;
}

async function ShowQuestion() {
  console.log(question.txt);
  letsPlaySong.play();
  await Sleep(5000);
  letsPlaySong.stop();
  await Sleep(DELAY);
  question.SetVisible(true);
  easyQuestionsSong.play();
  speech.ended(ShowAnswers);
  speech.speak(question.txt);
}

async function ShowAnswers() {
  let wordsCount = question.txt.split(" ").length;
  console.log("Words count: " + wordsCount);
  // let delayQuestion = wordsCount * 500;
  // await Sleep(delayQuestion);
  console.log(answers.length);
  for (let answer of answers) {
    console.log(answer.txt);
    answer.SetVisible(true);
    answerDelay = answer.txt.split(" ").length * 500;
    speech.speak(answer.txt);
    await Sleep(answerDelay);
    speech.stop();
  }
  timer.Run();
}

/* Load Sound */
function LoadSoundFiles() {
  rulesSong = loadSound(RULES_SONG);
  letsPlaySong = loadSound(LETS_PLAY_SONG);
  easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
  cut5050Sound = loadSound(CUT_5050_SOUND);
  rulesSong.setVolume(0.5);
  letsPlaySong.setVolume(0.5);
  easyQuestionsSong.setVolume(0.5);
  cut5050Sound.setVolume(0.5);
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
  lifelines[0].Disable();
  cut5050Sound.play();
}

async function ChooseAnswer() {
  answer.SetMarked(true);
  await Sleep(2);
  if (currQuestion.rightAnswer == answer.letter) {
    console.log("Right answer!");
    // answer.SetRight();
  } else {
    console.log("Wrong answer!");
    // answer.SetWrong();
  }
  console.log(answer.txt + " was chosen");
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
  // mouseOver();
}

/* Keyboard Events */
async function keyPressed() {
  if (gameState == GAME_START && keyCode === ENTER) {
    gameState = GAME_SHOW_QUESTION;
    msgbox.SetText("Show question");
    await ShowQuestion();
    console.log("Waiting for response");
    gameState = GAME_WAIT_FOR_RESPONSE;
    msgbox.SetText("Waiting for response...");
  }
  if (keyCode === ESCAPE) {
    speech.speak("Escape already?");
  }
}

/* Mouse Events */
async function mousePressed() {
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
      await ChooseAnswer(answer);
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
