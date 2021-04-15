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



let quizQuestion = [{
  "question": "what is 2 * 5?",
  "answers": [{
    "text": 2,
    "correct": false
  },
    {
      "text": 12,
      "correct": false
    },
    {
      "text": 8,
      "correct": false
    },
    {
      "text": 10,
      "correct": true
    }]
},
  {
    "question": "who is the best youtuber?",
    "answers": [{
      "text": "Traversy Media",
      "correct": true
    },
      {
        "text": "Dev Ed",
        "correct": true
      },
      {
        "text": "WebDev Simlyfied",
        "correct": true
      },
      {
        "text": "Keith Galli",
        "correct": true
      }]
  },
  {
    "question": "what is JavaScript?",
    "answers": [{
      "text": "Football team",
      "correct": false
    },
      {
        "text": "styling language",
        "correct": false
      },
      {
        "text": "Programming language",
        "correct": true
      },
      {
        "text": "Runtime",
        "correct": false
      }]
  },
  {
    "question": "Which of the following is an inline element?",
    "answers": [{
      "text": "div",
      "correct": false
    },
      {
        "text": "span",
        "correct": true
      },
      {
        "text": "main",
        "correct": false
      },
      {
        "text": "css",
        "correct": false
      }]
  },
  {
    "question": "which of the following is a JavaScript framework?",
    "answers": [{
      "text": "NodeJS",
      "correct": false
    },
      {
        "text": "Vue",
        "correct": true
      },
      {
        "text": "mongoDB",
        "correct": false
      },
      {
        "text": "react",
        "correct": false
      }]
  },
  {
    "question": "which of the following is a primitive data type?",
    "answers": [{
      "text": "function(){}",
      "correct": false
    },
      {
        "text": "'string'",
        "correct": true
      },
      {
        "text": "array[]",
        "correct": false
      },
      {
        "text": "object{}",
        "correct": false
      }]
  },
  {
    "question": "which of the following is not a high order function?",
    "answers": [{
      "text": "class",
      "correct": true
    },
      {
        "text": "forEach",
        "correct": false
      },
      {
        "text": "map",
        "correct": false
      },
      {
        "text": "reduce",
        "correct": false
      }]
  },
  {
    "question": "what is the output of 2==='2'?",
    "answers": [{
      "text": "true",
      "correct": false
    },
      {
        "text": "false",
        "correct": true
      }]
  }];
let  questionIndex, selectedQuestion;
/*
//feching data from json
async function getQuestions() {
  try {
    let response = await fetch('https://tesn-cmd.github.io/quiz_app/questions.json');
    let data = response.json();
    let allQuestion = data.questions;
    questionList(allQuestion)
  }catch(err) {
    console.log(err)
  }
}
getQuestions();


function questionList(quiz) {
  quizQuestion = quiz;
}
*/
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