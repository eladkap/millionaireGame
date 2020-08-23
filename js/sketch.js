/* GLOBALS */
var gameState;
var question;
var currQuestionIndex = 0;
var answers;
var chosenAnswer;
var timer;
var moneyTable;
var lifelines;
var msgbox;
var phoneMsgbox;
var yesButton;
var noButton;
var startButton;

/* Sound */
var rulesSong;
var letsPlaySong;
var easyQuestionsSong;
var mediumQuestionsSong;
var hardQuestionsSong;
var questionsSong;
var questionsSongs;
var cut5050Sound;
var finalMediumAnswerSound;
var finalHardAnswerSound;
var finalAnswerSound;
var easyRightAnswerSound;
var mediumRightAnswerSound;
var hardRightAnswerSound;
var rightAnswerSound;
var phoneClockSound;

/* Speaker - next version */

/* Questions DB */
var qdb;
var questionsPool;
var currQuestion;

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
  msgbox = new MessageBox(MSG_BOX_POS_X, MSG_BOX_POS_Y, "");
}

function SetPhoneMessageBox() {
  phoneMsgbox = new MessageBox(PHONE_MSG_BOX_POS_X, PHONE_MSG_BOX_POS_Y, "");
}

function SetButtons() {
  yesButton = new Button(
    YES_BUTTON_POS_X,
    YES_BUTTON_POS_Y,
    BUTTON_RADIUS,
    "Yes",
    1
  );
  noButton = new Button(
    NO_BUTTON_POS_X,
    NO_BUTTON_POS_Y,
    BUTTON_RADIUS,
    "No",
    1
  );
  startButton = new Button(
    START_BUTTON_POS_X,
    START_BUTTON_POS_Y,
    BUTTON_RADIUS,
    "Start",
    1
  );
  HideYesNoButtons();
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
  startButton.Draw();
}

/* Game Functions */
function SetGame() {
  SetQuestion();
  SetAnswers();
  SetTimer();
  SetMoneyTable();
  SetLifelines();
  SetMessageBox();
  SetPhoneMessageBox();
  SetButtons();
  gameState = GAME_START;
  currQuestionIndex = 0;
}

async function ShowQuestion() {
  console.log(question.txt);
  questionsSong = questionsSongs[int(currQuestionIndex / 5)];

  if (currQuestionIndex == 0) {
    letsPlaySong.play();
    await Sleep(DELAY_QUESTION);
    letsPlaySong.stop();
  }
  question.SetVisible(true);
  questionsSong.play();
  for (let answer of answers) {
    await Sleep(DELAY_ANSWER);
    console.log(answer.txt);
    answer.SetVisible(true);
  }
  StartClock();
}

function StartClock() {
  if (currQuestionIndex < 5) {
    timer.Run();
  } else {
    timer.SetVisible(false);
  }
}

/* Load Sound */
function LoadSoundFiles() {
  console.log("Loading sound files...");
  try {
    rulesSong = loadSound(RULES_SONG);
    console.log("Sound1");
    letsPlaySong = loadSound(LETS_PLAY_SONG);
    console.log("Sound2");
    easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
    console.log("Sound3");
    mediumQuestionsSong = loadSound(MEDIUM_QUESTIONS_SONG);
    console.log("Sound4");
    hardQuestionsSong = loadSound(HARD_QUESTIONS_SONG);
    console.log("Sound5");
    cut5050Sound = loadSound(CUT_5050_SOUND);
    console.log("Sound6");
    easyRightAnswerSound = loadSound(EASY_RIGHT_ANSWER_SOUND);
    console.log("Sound7");
    mediumRightAnswerSound = loadSound(MEDIUM_RIGHT_ANSWER_SOUND);
    console.log("Sound8");
    hardRightAnswerSound = loadSound(HARD_RIGHT_ANSWER_SOUND);
    console.log("Sound9");
    loseSound = loadSound(LOSE_SOUND);
    console.log("Sound10");
    finalMediumAnswerSound = loadSound(FINAL_MEDIUM_ANSWER_SOUND);
    console.log("Sound11");
    finalHardAnswerSound = loadSound(FINAL_HARD_ANSWER_SOUND);
    console.log("Sound12");
    phoneClockSound = loadSound(PHONE_CLOCK_SOUND);
    console.log("Sound13");

    rulesSong.setVolume(0.5);
    letsPlaySong.setVolume(0.5);
    easyQuestionsSong.setVolume(0.5);
    mediumQuestionsSong.setVolume(0.5);
    hardQuestionsSong.setVolume(0.5);
    cut5050Sound.setVolume(0.5);
    easyRightAnswerSound.setVolume(0.5);
    mediumRightAnswerSound.setVolume(0.5);
    hardRightAnswerSound.setVolume(0.5);
    finalMediumAnswerSound.setVolume(0.5);
    finalHardAnswerSound.setVolume(0.5);
    loseSound.setVolume(0.5);
  } catch (error) {
    console.log(error);
  }

  questionsSongs = [easyQuestionsSong, mediumQuestionsSong, hardQuestionsSong];
}

/* Load questions database */
function LoadQuestions() {
  let dbText = ReadTextFile("data/Q001.json");
  questionsData = JSON.parse(dbText);
  qdb = new QuestionsDB();
  qdb.CreateFrom(questionsData);
  questionsPool = qdb.RandomizePool(15);
  currQuestion = questionsPool[currQuestionIndex];
}

function CheckTimer() {
  if (timer.value == 0) {
    gameState = GAME_OVER;
    console.log("Time's up!!!");
    msgbox.SetText("Time's up!!!");
    questionsSong.stop();
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
  await Sleep(1000);
  let wrongAnswerIndices = GetTwoRandomWrongAnswers(currQuestion);
  for (answerIndex of wrongAnswerIndices) {
    answers[answerIndex].Disable();
    answers[answerIndex].SetVisible(false);
  }
  lifelines[0].Disable();
  cut5050Sound.play();
  await Sleep(2000);
  cut5050Sound.stop();
}

function PerformLifelinePhone() {
  if (random() < 0.5) {
    phoneMsgbox.setText(
      "Ok listen. I am sure the answer is " + currQuestion.rightAnswer
    );
  } else {
    let guessedAnswer = random(answers);
    phoneMsgbox.setText(
      "Ohhh. ok. I am not sure. I would guess it is " + guessedAnswer.txt
    );
  }
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
  chosenAnswer = answer;
  gameState = GAME_FINAL_ANSWER;
  msgbox.SetText("Final answer?");
  ShowYesNoButtons();
}

async function CheckRightAnswer() {
  chosenAnswer.SetBackcolor(ORANGE);
  if (currQuestionIndex > 4 && currQuestionIndex < 10) {
    questionsSong.stop();
    finalAnswerSound = finalMediumAnswerSound;
    finalAnswerSound.play();
    await Sleep(FINAL_HARD_ANSWER_DELAY);
  } else if (currQuestionIndex >= 10) {
    questionsSong.stop();
    finalAnswerSound = finalHardAnswerSound;
    finalAnswerSound.play();
    await Sleep(FINAL_HARD_ANSWER_DELAY);
  }
  if (currQuestion.rightAnswer == chosenAnswer.letter) {
    RightAnswerChosen();
  } else {
    WrongQuestionChosen();
  }
  HideYesNoButtons();
}

async function RightAnswerChosen(answer) {
  if (finalAnswerSound != undefined) {
    finalAnswerSound.stop();
  }
  if (currQuestionIndex <= 4) {
    rightAnswerSound = easyRightAnswerSound;
  } else if (currQuestionIndex > 4 && currQuestionIndex < 10) {
    rightAnswerSound = mediumRightAnswerSound;
  } else {
    rightAnswerSound = hardRightAnswerSound;
  }
  moneyTable.IncreasePrize();
  rightAnswerSound.play();
  gameState = GAME_SHOW_QUESTION;
  chosenAnswer.SetBackcolor(GREEN);
  await Sleep(5000);
  await NextQuestion();
}

async function WrongQuestionChosen() {
  questionsSong.stop();
  await Sleep(1000);
  gameState = GAME_OVER;
  msgbox.SetText("sorry, You are wrong.");
  chosenAnswer.SetBackcolor(RED);
  loseSound.play();
  await ShowRightAnswer();
}

async function ShowRightAnswer() {
  let rightAnsLetter = currQuestion.rightAnswer;
  let rightAnsIndex = rightAnsLetter.charCodeAt() - "A".charCodeAt();
  let rightAnswerObj = answers[rightAnsIndex];
  rightAnswerObj.SetBackcolor(GREEN);
  msgbox.SetText(
    "Because, the right answer is " +
      rightAnswerObj.letter +
      ", " +
      rightAnswerObj.txt
  );
  ShowFinalPrize();
}

function ShowFinalPrize() {
  let prize = CheckPointPrize(currQuestionIndex);
  msgbox.SetText("Your final price is: " + prize + "dollars.");
}

/* MAIN */
function preload() {
  LoadSoundFiles();
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  // SCREEN_WIDTH = windowWidth;
  // SCREEN_HEIGHT = windowHeight;
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
}

async function NextQuestion() {
  currQuestionIndex++;
  console.log("Current question index:" + currQuestionIndex);
  currQuestion = questionsPool[currQuestionIndex];
  SetQuestion();
  SetAnswers();
  timer.Stop();
  timer.Reset();
  HideYesNoButtons();
  gameState = GAME_START;
  questionsSong.stop();
  await ShowQuestion();
  gameState = GAME_WAIT_FOR_RESPONSE;
}

/* Keyboard Events */
async function keyPressed() {
  if (phoneClockSound.isPlaying() && keyCode == ESCAPE) {
    console.log("Escape.");
  }
}

/* Mouse Events */
async function mousePressed() {
  // Check start button
  if (gameState == GAME_START && startButton.IsClicked(mouseX, mouseY)) {
    startButton.Disable();
    startButton.SetVisible(false);
    questionsSong = questionsSongs[0];
    gameState = GAME_SHOW_QUESTION;
    msgbox.SetText("Show question");
    await ShowQuestion();
    console.log("Waiting for response");
    gameState = GAME_WAIT_FOR_RESPONSE;
    msgbox.SetText("Waiting for response...");
  }

  // Check yes/no buttons
  if (gameState == GAME_FINAL_ANSWER) {
    console.log("check buttons");
    if (yesButton.IsClicked(mouseX, mouseY)) {
      console.log("Yes button was clicked.");
      await CheckRightAnswer();
    }
    if (noButton.IsClicked(mouseX, mouseY)) {
      console.log("No button was clicked.");
    }
    return;
  }

  if (gameState != GAME_WAIT_FOR_RESPONSE) {
    console.log("Ignore");
    return;
  }

  // Check lifelines
  for (let lifeline of lifelines) {
    if (lifeline.IsClicked(mouseX, mouseY) && lifeline.IsEnabled()) {
      lifeline.SetChosen(true);
      console.log(lifeline.type + " was chosen");
      if (lifeline.type == "50:50") {
        console.log("50:50");
        PerformLifeline5050();
      } else if (lifeline.type == "phone") {
        console.log("Phone call");
        PerformLifelinePhone();
      }
    }
  }

  // Check answers
  for (let answer of answers) {
    if (answer.IsClicked(mouseX, mouseY)) {
      ChooseAnswer(answer);
    }
  }
}
