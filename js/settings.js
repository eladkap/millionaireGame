const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 960;

const FPS = 1;
/* Colors */
const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];
const GRAY0 = [50, 50, 50];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED0 = [240, 128, 128];
const RED = [250, 0, 0];
const WOOD = [133, 94, 66];
const BISQUE = [255, 228, 196];
const ANTIQUEWHITE = [250, 235, 215];
const BROWN = [140, 70, 20];
const ORANGE = [255, 150, 50];
const PINK = [250, 0, 150];
const YELLOW = [255, 255, 0];
const DARKYELLOW = [200, 200, 0];
const GREEN = [0, 200, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 0, 250];
const LIGHTBLUE = [100, 149, 237];
const DARKBLUE = [0, 0, 80];
const ROYAL = [65, 105, 225];
const PURPLE = [200, 0, 250];
const TURQUOISE = [32, 114, 106];
const TURQUOISELIGHT = [50, 180, 166];

/* Question */
const QUESTION_POS_X = SCREEN_WIDTH * 0.05;
const QUESTION_POS_Y = SCREEN_HEIGHT * 0.8;
const QUESTION_WIDTH = SCREEN_WIDTH * 0.85;
const QUESTION_HEIGHT = 100;
const QUESTION_XOFFSET = 0;

/* Answers */
const ANSWER_WIDTH = SCREEN_WIDTH * 0.4;
const ANSWER_HEIGHT = 50;

const ANSWER_A_POS_X = SCREEN_WIDTH * 0.07;
const ANSWER_A_POS_Y = SCREEN_HEIGHT * 0.9;
const ANSWER_A_XOFFSET = 0;

const ANSWER_B_POS_X = SCREEN_WIDTH * 0.5;
const ANSWER_B_POS_Y = SCREEN_HEIGHT * 0.9;
const ANSWER_B_XOFFSET = SCREEN_WIDTH * 0.5;

const ANSWER_C_POS_X = SCREEN_WIDTH * 0.07;
const ANSWER_C_POS_Y = SCREEN_HEIGHT * 0.96;
const ANSWER_C_XOFFSET = 0;

const ANSWER_D_POS_X = SCREEN_WIDTH * 0.5;
const ANSWER_D_POS_Y = SCREEN_HEIGHT * 0.96;
const ANSWER_D_XOFFSET = SCREEN_WIDTH * 0.5;

/* Timer */
const TIMER_POS_X = SCREEN_WIDTH * 0.1;
const TIMER_POS_Y = SCREEN_HEIGHT * 0.15;
const TIMER_RADIUS = 150;
const TIMER_VALUE = 30;

/* Money Table */
const MONEY_TABLE_POS_X = SCREEN_WIDTH * 0.65;
const MONEY_TABLE_POS_Y = SCREEN_WIDTH * 0.15;
const MONEY_TABLE_WIDTH = SCREEN_WIDTH * 0.4;
const MONEY_TABLE_ROW_HEIGHT = SCREEN_HEIGHT * 0.035;
const MONEY_VALUES = [
  "100",
  "200",
  "300",
  "500",
  "1,000",
  "2,000",
  "4,000",
  "8,000",
  "16,000",
  "32,000",
  "64,000",
  "125,000",
  "250,000",
  "500,000",
  "1,000,000",
];
const CURRENCY = "$";

/* Font */
const FONT_FAMILY = "Arial";
const FONT_FAMILY2 = "Copperplate Gothic";
const FONT_SIZE = [16, 20, 24, 28, 32, 36, 40, 44, 50];
const FONT_SIZE_BIG = 60;

/* Lifeline */
const LIFELINE_WIDTH = SCREEN_WIDTH * 0.05;
const LIFELINE_HEIGHT = SCREEN_WIDTH * 0.025;
const LIFELINE_BORDER = 5;
const LIFELINE_POS_Y = SCREEN_WIDTH * 0.09;
const LIFELINE1_POS_X = SCREEN_WIDTH * 0.7;
const LIFELINE2_POS_X = SCREEN_WIDTH * 0.82;
const LIFELINE3_POS_X = SCREEN_WIDTH * 0.94;

/* Message box */
const MSG_BOX_POS_X = SCREEN_WIDTH * 0.5;
const MSG_BOX_POS_Y = SCREEN_HEIGHT * 0.05;

/* Game states */
const GAME_OVER = -1;
const GAME_START = 0;
const GAME_SHOW_QUESTION = 1;
const GAME_WAIT_FOR_RESPONSE = 2;
// const

/* DELAY */
const DELAY = 1000;
const DELAY_QUESTION = 2000;
const DELAY_ANSWER = 1000;

/* Sound */
const RULES_SONG = "sound/Millionaire - Explain the Rules.mp3";
const EASY_QUESTIONS_SONG = "sound/easy_questions.mp3";
const LETS_PLAY_SONG = "sound/Lets Play.mp3";
const CUT_5050_SOUND = "sound/5050.mp3";
