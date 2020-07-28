class QuestionsDB {
  constructor() {
    this.questions = [];
  }

  CreateFrom(questionsData) {
    let questionObjects = questionsData.questions;
    for (let questionObj of questionObjects) {
      let questionTxt = questionObj.question;
      let ansA = questionObj.A;
      let ansB = questionObj.B;
      let ansC = questionObj.C;
      let ansD = questionObj.D;
      let rightAnswer = questionObj.answer;
      let question = {
        question: questionTxt,
        A: ansA,
        B: ansB,
        C: ansC,
        D: ansD,
        rightAnswer: rightAnswer,
      };
      this.questions.push(question);
    }
  }

  Count() {
    return this.questions.length;
  }

  RandomizePool(num) {
    let m = 10;
    let pool = [];
    let j = 0;
    for (let i = 0; i < num; i++) {
      let k = Math.floor(random(1, m));
      j += k;
      question = this.questions[j];
      pool.push(question);
    }
    return pool;
  }
}
