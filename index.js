const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerContainer = document.getElementById('answers');
const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
const scoreText = document.getElementById('scoreText');
const scoreBoard = document.getElementById('score');
const total = document.getElementById('total');
const passText = document.getElementById('passText');
const passContainer = document.getElementById('passContainer');
const passentage = document.getElementById('passentage');

//feching data from json
async function getQuestions() {
  try {
    let response = await fetch('http://localhost:8158/questions.json');
    let data = await response.json();
    let allQuestion = data.questions;
    questionList(allQuestion)
  }catch(err) {
    console.log(err)
  }
}
getQuestions();

let quizQuestion, questionIndex, selectedQuestion;

function questionList(quiz) {
  quizQuestion = quiz;
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', ()=> {
  questionIndex++;
  setQuestion();
})

function startQuiz() {
  startBtn.classList.add('hide');
  scoreBoard.classList.remove('hide');
  questionContainer.classList.remove('hide');
  scoreText.innerText = 0;
  selectedQuestion = quizQuestion.sort(()=>Math.random()-0.5)
  questionIndex = 0;
  setQuestion();
}

function setQuestion() {
  reset()
  total.innerText = `${quizQuestion.length}`;
  let currentQuestion = selectedQuestion[questionIndex];
  let currentAnswers = currentQuestion.answers;
  showQuestion(currentQuestion, currentAnswers);
}

function showQuestion(question, answers) {
  questionElement.innerText = question.question;
  answers.forEach(answer=> {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer.text;
    if (answer.correct === true) {
      button.dataset.correct = answer.correct;
    }
    answerContainer.appendChild(button);
    button.addEventListener('click', selectAnswer, {
      once: true
    })
  })
}
function selectAnswer(e) {
  let chosenAnswer = e.target;
  addClass();
  if (chosenAnswer.dataset.correct) {
    document.body.classList.add('correct');
    scoreText.innerText++;
  } else {
    document.body.classList.add('wrong')
  }
  if (selectedQuestion.length > questionIndex+1) {
    nextBtn.classList.remove('hide');
  } else {
    dislpayWinOrDraw(total.innerText, scoreText.innerText)
    startBtn.innerText = 'restart';
    passContainer.classList.remove('hide');
    startBtn.classList.remove('hide');
    remove();
  }
}
//bg color functionality
function addClass() {
  Array.from(answerContainer.children).forEach(answer=> {
    if (answer.dataset.correct) {
      answer.classList.add('correct');
    } else {
      answer.classList.add('wrong');
    }
    answer.removeEventListener('click', selectAnswer)
  })
}

function reset() {
  nextBtn.classList.add('hide')
  document.body.classList.remove('wrong');
  document.body.classList.remove('correct');
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}
function dislpayWinOrDraw(totalAmount, scoreAmount) {
  let passRate = (scoreAmount/totalAmount)*100;
  passentage.innerText = `${passRate}%`
  if (passRate < 50) {
    passText.innerText = 'fail, please put more effort!';
  } else if (passRate >= 50 && passRate <= 70) {
    passText.innerText = 'good, but you can do better!';
  } else if (passRate > 70 && passRate <= 90) {
    passText.innerText = 'excellent, you are a pro!';
  } else if (passRate > 90) {
    passText.innerText = 'exceptional, you deserve titranium from wakanda!';
  }
}
function remove() {
  setTimeout(()=> {
    passContainer.classList.add('hide')
  }, 5000);
}