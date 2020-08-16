/* GLOBALS */
var gameState;
var question;
var answers;
var timer;
var moneyTable;
var lifelines;
var msgbox;
var yesButton;
var noButton;

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

function SetButtons() {
  yesButton = new Button(
    YES_BUTTON_POS_X,
    YES_BUTTON_POS_Y,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    "Yes",
    1
  );
  noButton = new Button(
    NO_BUTTON_POS_X,
    NO_BUTTON_POS_Y,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    "No",
    1
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

function DrawButtons() {
  yesButton.Draw();
  noButton.Draw();
}

/* Game Functions */
function SetGame() {
  SetQuestion();
  SetAnswers();
  SetTimer();
  SetMoneyTable();
  SetLifelines();
  SetMessageBox();
  SetButtons();
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
  speech.ended(ShowAnswerA);
  speech.speak(question.txt);
}

async function ShowAnswerA() {
  let answer = answers[0];
  console.log(answer.txt);
  answer.SetVisible(true);
  speech.ended(ShowAnswerB);
  speech.speak(answer.txt);
}

async function ShowAnswerB() {
  let answer = answers[1];
  console.log(answer.txt);
  answer.SetVisible(true);
  speech.ended(ShowAnswerC);
  speech.speak(answer.txt);
}

async function ShowAnswerC() {
  let answer = answers[2];
  console.log(answer.txt);
  answer.SetVisible(true);
  speech.ended(ShowAnswerD);
  speech.speak(answer.txt);
}

async function ShowAnswerD() {
  let answer = answers[3];
  console.log(answer.txt);
  answer.SetVisible(true);
  speech.ended(StartClock);
  speech.speak(answer.txt);
  timer.Run();
}

function StartClock() {
  timer.Run();
}

/* Load Sound */
function LoadSoundFiles() {
  rulesSong = loadSound(RULES_SONG);
  letsPlaySong = loadSound(LETS_PLAY_SONG);
  easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
  cut5050Sound = loadSound(CUT_5050_SOUND);
  easyRightSound = loadSound(EASY_QUESTIONS_RIGHT_ANSWER);
  loseSound = loadSound(LOSE_SOUND);
  rulesSong.setVolume(0.5);
  letsPlaySong.setVolume(0.5);
  easyQuestionsSong.setVolume(0.5);
  cut5050Sound.setVolume(0.5);
  easyRightSound.setVolume(0.5);
  loseSound.setVolume(0.5);
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

async function PrepareLifeline5050() {
  speech.ended(PerformLifeline5050);
  speech.speak("The computer is about to take away two random wrong answers.");
}

async function PerformLifeline5050() {
  await Sleep(1000);
  let wrongAnswerIndices = GetTwoRandomWrongAnswers(currQuestion);
  for (answerIndex of wrongAnswerIndices) {
    answers[answerIndex].Disable();
    answers[answerIndex].SetVisible(false);
  }
  lifelines[0].Disable();
  cut5050Sound.play();
}

function ShowYesNoButtons() {
  yesButton.Enable();
  yesButton.SetVisible(true);
  noButton.Enable();
  noButton.SetVisible(true);
}

function HideYesNoButtons() {
  yesButton.Disable();
  yesButton.SetVisible(false);
  noButton.Disable();
  noButton.SetVisible(false);
}

async function ChooseAnswer(answer) {
  answer.SetMarked(true);
  speech.speak("You say " + answer.txt + ". " + "Is it you final answer?");
  gameState = GAME_FINAL_ANSWER;
  msgbox.SetText("Final answer?");
  ShowYesNoButtons();
}

async function CheckRightAnswer() {
  if (currQuestion.rightAnswer == answer.letter) {
    RightAnswerChosen();
  } else {
    WrongQuestionChosen();
  }
  HideYesNoButtons();
}

async function RightAnswerChosen(answer) {
  speech.speak("You right!!!");
  easyRightSound.play();
  gameState = GAME_SHOW_QUESTION;
}

async function WrongQuestionChosen(answer) {
  speech.ended(ShowRightAnswer);
  speech.speak("sorry, You are wrong.");
  answer.SetBackcolor(RED);
  loseSound.play();
}

async function ShowRightAnswer() {
  let rightAnsLetter = currQuestion.rightAnswer;
  let rightAnsIndex = rightAnsLetter.charCodeAt() - "A".charCodeAt();
  let rightAnswerObj = currQuestion[rightAnsIndex];
  speech.speak(
    "But, the right answer is " +
      rightAnswerObj.letter +
      ", " +
      rightAnswerObj.txt
  );
}

/* MAIN */
function preload() {
  LoadSoundFiles();
  SetSpeech();
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
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
  DrawButtons();
  // mouseOver();
}

/* Keyboard Events */
async function keyPressed() {
  if (gameState == GAME_START && keyCode === ENTER) {
    gameState = GAME_SHOW_QUESTION;
    HideYesNoButtons();
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

  if (gameState == GAME_FINAL_ANSWER) {
    if (yesButton.IsClicked(mouseX, mouseY)) {
      console.log("Yes button was clicked.");
      CheckRightAnswer();
    }
    if (noButton.IsClicked(mouseX, mouseY)) {
      console.log("No button was clicked.");
    }
  }
  console.log("Get response");

  // Check lifelines
  for (let lifeline of lifelines) {
    if (lifeline.IsClicked(mouseX, mouseY) && lifeline.IsEnabled()) {
      lifeline.SetChosen(true);
      console.log(lifeline.type + " was chosen");
      if (lifeline.type == "50:50") {
        console.log("50:50");
        PrepareLifeline5050();
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
