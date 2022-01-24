const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const correctAnswerAudio = document.querySelector("#correctAnswer");
const incorrectAnswerAudio = document.querySelector("#incorrectAnswer");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who loves cake?",
    choice1: "Femi",
    choice2: "Unlucky",
    choice3: "Lucky",
    choice4: "Timothy",
    answer: 3,
  },
  {
    question: "My dad says I am the color of?",
    choice1: "Orange",
    choice2: "Honey",
    choice3: "Caramel",
    choice4: "Rainbows",
    answer: 2,
  },
  {
    question: "Why was Lucky sad?",
    choice1: "Because he is out of ideas",
    choice2: "No carrots at the shop",
    choice3: "His ideas were stolen",
    choice4: "His dog chewed his recipe",
    answer: 1,
  },
  {
    question: "What's the name of Amanda's dog?",
    choice1: "Bingo",
    choice2: "Porsha",
    choice3: "Wuff Wuff",
    choice4: "Pitbull",
    answer: 2,
  },
  {
    question: "Who sits at the clinic with Bora?",
    choice1: "Baba",
    choice2: "Mama",
    choice3: "Dada",
    choice4: "Papa",
    answer: 1,
  },
  {
    question: "What did Bora get after his injection?",
    choice1: "Chocolate",
    choice2: "An Apple",
    choice3: "Red Lollipop",
    choice4: "Chewing Gum",
    answer: 3,
  },
];

//console.log(questions);

const SCORE_POINTS = 250;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("../games/gameOver.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
      correctAnswerAudio.play();
    }

    incorrectAnswerAudio.play();
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
