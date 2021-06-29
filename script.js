
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var timerEl = document.getElementById('time');
var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var startBtn = document.getElementById('start-button');
var initialsEl = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var feedbackEl = document.getElementById('feedback');


function quizStart() {
  var homeScreen = document.getElementById('home');
  homeScreen.setAttribute('class', 'start hide');

  questionsEl.setAttribute('class', " ");
  
  timerId = setInterval(function () {
    clockTick();
    
  }, 1000);
    timerEl.textContent = time;
  
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  questionsEl.children[0].textContent = currentQuestion.title;

  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);

  }

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButton = document.createElement('button');
    choiceButton.textContent = currentQuestion.choices[i];


    choicesEl.appendChild(choiceButton);
    
  }

  choicesEl.children[0].addEventListener("click", function(event){
    questionAnswer(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionAnswer(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionAnswer(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionAnswer(choicesEl.children[3]);
  });


}

function questionAnswer(answerChoice) {
  if (answerChoice.textContent != questions[currentQuestionIndex].answer) {
    time -= 10;

    feedbackEl
  }
}



startBtn.onclick = quizStart;
console.log(quizStart);