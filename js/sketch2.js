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

/* Speaker */
var speaker;

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

function SetSpeaker() {
  speaker = new Speaker("Alex");
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
  SetButtons();
  gameState = GAME_START;
  currQuestionIndex = 0;
}

async function ShowQuestion() {
  console.log(question.txt);
  questionsSong = questionsSongs[int(currQuestionIndex / 5)];

  // speaker.SetRate(0.7);
  if (currQuestionIndex == 0) {
    letsPlaySong.play();
    await Sleep(5000);
    letsPlaySong.stop();
  }
  question.SetVisible(true);
  questionsSong.play();
  speaker.SetCallback(ShowAnswerA);
  speaker.Say(question.txt);
}

async function ShowAnswerA() {
  let answer = answers[0];
  console.log(answer.txt);
  answer.SetVisible(true);
  speaker.SetCallback(ShowAnswerB);
  speaker.Say(answer.txt);
}

async function ShowAnswerB() {
  let answer = answers[1];
  console.log(answer.txt);
  answer.SetVisible(true);
  speaker.SetCallback(ShowAnswerC);
  speaker.Say(answer.txt);
}

async function ShowAnswerC() {
  let answer = answers[2];
  console.log(answer.txt);
  answer.SetVisible(true);
  speaker.SetCallback(ShowAnswerD);
  speaker.Say(answer.txt);
}

async function ShowAnswerD() {
  let answer = answers[3];
  console.log(answer.txt);
  answer.SetVisible(true);
  speaker.SetCallback(StartClock);
  speaker.Say(answer.txt);
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
  rulesSong = loadSound(RULES_SONG);
  letsPlaySong = loadSound(LETS_PLAY_SONG);
  easyQuestionsSong = loadSound(EASY_QUESTIONS_SONG);
  mediumQuestionsSong = loadSound(MEDIUM_QUESTIONS_SONG);
  hardQuestionsSong = loadSound(HARD_QUESTIONS_SONG);
  cut5050Sound = loadSound(CUT_5050_SOUND);
  easyRightAnswerSound = loadSound(EASY_RIGHT_ANSWER_SOUND);
  mediumRightAnswerSound = loadSound(MEDIUM_RIGHT_ANSWER_SOUND);
  hardRightAnswerSound = loadSound(HARD_RIGHT_ANSWER_SOUND);
  loseSound = loadSound(LOSE_SOUND);
  finalMediumAnswerSound = loadSound(FINAL_MEDIUM_ANSWER_SOUND);
  finalHardAnswerSound = loadSound(FINAL_HARD_ANSWER_SOUND);
  phoneClockSound = loadSound(PHONE_CLOCK_SOUND);

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

async function PrepareLifeline5050() {
  speaker.SetCallback(PerformLifeline5050);
  speaker.Say("The computer is about to take away two random wrong answers.");
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

async function PrepareLifelinePhone() {
  questionsSong.stop();
  speaker.SetCallback(PerformLifelinePhone);
  speaker.Say(
    "Ok, we are going to call your friend. You will have 30 seconds to discuss. Time runs now!"
  );
}

async function PerformLifelinePhone() {
  speaker.SetRandomVoice();
  timer.SetVisible(true);
  timer.Reset();
  timer.Run();
  phoneClockSound.play();
  if (random() < 0.5) {
    speaker.Say(
      "Ok listen. I am sure the answer is " + currQuestion.rightAnswer
    );
  } else {
    let guessedAnswer = random(answers);
    speaker.Say(
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
  speaker.Say(
    "You right! you have " +
      moneyTable.CurrentPrize().replace(",", "") +
      "dollars"
  );
  gameState = GAME_SHOW_QUESTION;
  chosenAnswer.SetBackcolor(GREEN);
  await Sleep(5000);
  speaker.Stop();
  await NextQuestion();
}

async function WrongQuestionChosen() {
  questionsSong.stop();
  await Sleep(1000);
  gameState = GAME_OVER;
  speaker.SetCallback(ShowRightAnswer);
  speaker.Say("sorry, You are wrong.");
  chosenAnswer.SetBackcolor(RED);
  loseSound.play();
}

async function ShowRightAnswer() {
  let rightAnsLetter = currQuestion.rightAnswer;
  let rightAnsIndex = rightAnsLetter.charCodeAt() - "A".charCodeAt();
  let rightAnswerObj = answers[rightAnsIndex];
  rightAnswerObj.SetBackcolor(GREEN);
  speaker.SetCallback(ShowFinalPrize);
  speaker.Say(
    "Because, the right answer is " +
      rightAnswerObj.letter +
      ", " +
      rightAnswerObj.txt
  );
}

async function ShowFinalPrize() {
  let prize = CheckPointPrize(currQuestionIndex);
  speaker.Say("Your final price is: " + prize + "dollars.");
  await Sleep(5000);
  speaker.Stop();
}

/* MAIN */
function preload() {
  LoadSoundFiles();
  SetSpeaker();
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
  // if (phoneClockSound.isPlaying() && keyCode == ESCAPE) {
  //   console.log("Escape.");
  //   phoneClockSound.stop();
  //   questionsSong.play();
  //   speaker.SetVoice("Alex");
  //   return;
  // }
  // if (gameState == GAME_START && keyCode === ENTER) {
  //   questionsSong = questionsSongs[0];
  //   gameState = GAME_SHOW_QUESTION;
  //   HideYesNoButtons();
  //   msgbox.SetText("Show question");
  //   await ShowQuestion();
  //   console.log("Waiting for response");
  //   gameState = GAME_WAIT_FOR_RESPONSE;
  //   msgbox.SetText("Waiting for response...");
  // }
}

/* Mouse Events */
async function mousePressed() {
  // Check start button
  if (gameState == GAME_START && startButton.IsClicked(mouseX, mouseY)) {
    startButton.Disable();
    startButton.SetVisible(false);
    questionsSong = questionsSongs[0];
    gameState = GAME_SHOW_QUESTION;
    HideYesNoButtons();
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
        PrepareLifeline5050();
      } else if (lifeline.type == "phone") {
        console.log("Phone call");
        PrepareLifelinePhone();
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
