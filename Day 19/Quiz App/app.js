const startBtn = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
let shuffledQuestion = undefined;
let currentQuestionIndex = undefined;

const questions = [
  {
    question: "What is 2 + 2",
    answers: [
      { text: "4", correct: true },
      { text: "43", correct: false },
      { text: "1", correct: false },
      { text: "78", correct: false },
    ],
  },
  {
    question:
      "If soccer is called football in England, what is American football called in England?",
    answers: [
      { text: "American football", correct: true },
      { text: "Combball", correct: false },
      { text: "Handball", correct: false },
      { text: "Touchdown", correct: false },
    ],
  },
  {
    question: "What is the largest country in the world?",
    answers: [
      { text: "Canada", correct: false },
      { text: "China", correct: false },
      { text: "Russia", correct: true },
      { text: "United States", correct: false },
    ],
  },
  {
    question:
      "An organic compound is considered an alcohol if it has what functional group?",
    answers: [
      { text: "Carbonyl", correct: false },
      { text: "Alkyl", correct: false },
      { text: "Aldehyde", correct: false },
      { text: "Hydroxyl", correct: true },
    ],
  },
  {
    question: "What is the 100th digit of Pi?",
    answers: [
      { text: "4", correct: false },
      { text: "9", correct: true },
      { text: "7", correct: false },
      { text: "2", correct: false },
    ],
  },
];

function startQuiz() {
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextQuestion();
}

function nextQuestion() {
  reset();
  showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
  questionText.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtn.appendChild(button);
  });
}

function reset() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtn.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

startBtn.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});
