
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

  questionsEl.setAttribute('class', ' ');
  
  timerId = setInterval(function () {
    clockTick();
    
  }, 1000);
    timerEl.textContent = time;
  
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionsEl.children[0].textContent = currentQuestion.title;
  // clear out any old question choices
  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  // loop over choices
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // display on the page
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

    feedbackEl.textContent = 'Incorrect';
  } else {
    feedbackEl.textContent = 'Correct';
  }

  feedbackEl.setAttribute('class', 'feedback');
  setInterval(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 500);

  currentQuestionIndex++;


  if (currentQuestionIndex === question.length) 
    quizEnd();

  else

    getQuestion();

}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  timerEl.textContent = time;

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.setAttribute("class", " ");

  var finalScoreEl = document.getElementById("score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
 
  if(time <= 0)
    quizEnd();
}



startBtn.onclick = quizStart;
console.log(quizStart);