
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables for DOM elements.
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  // This hides the beginning screen.
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide the questions div.
  questionsEl.setAttribute("class", " ");
  // Start the timer.
  timerId = setInterval(function(){
    clockTick();
  }, 1000);

  // The starting time.
  timerEl.textContent = time;

  getQuestion();
}
// Function to get the questions.
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionsEl.children[0].textContent = currentQuestion.title;

  // clear out any old question choices.
  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  // for loop over choices.
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // This creates a new button for the choices.
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // This wil display the choices on the page.
    choicesEl.appendChild(choiceButton);
  }
  // event listeners for the choices buttons.
  choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
  });
}

function questionClick(answerChoice) {
  //  This is checking for a wrong guess by the user.  
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    // penalize time
    time -= 10;

    // display new time on page.
    feedbackEl.textContent = "Incorrect";
     
  } else {
    feedbackEl.textContent = "Correct";

  }

  // This flashes the incorrect/correct for 3/4 of a second.
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 750);

  // Go to the next question in the list.
  currentQuestionIndex++;

  // checks to see if we ran out of questions.
  if(currentQuestionIndex === questions.length)

    // Ends the quiz if we have run out of questions.
    quizEnd();

  else
    // if not then get the next question.
    getQuestion();
}

function quizEnd() {

  // stops the timer
  clearInterval(timerId);
  timerEl.textContent = time;

  // This will display the ending screen.
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // This will show the final score.
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // This hides the questions section.
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {

  // Updates the time.
  time--;
  timerEl.textContent = time;

  // If the user runs out of time then end the quiz.
  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {

  // Get the input box value and set it to uppercase.
  var initials = initialsEl.value.toUpperCase();

  // If the value is empty or greater than 3 characters then the user will get an alert.
  if(initials === ""){ 
    alert("Input mustn't be blank'");
    return;
  }
  else if(initials.length > 3){
    alert("Input must be no more than 3 characters");
    return;
  }
  else{

    // This retrieves the highscores for local storage.
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];

    // format new score object for current user
    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);

    // Saves the highscore to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    location.href = "highscore.html";
  }
}

function checkForEnter(event) {
  // Check to see if event key is the enter key.
    // call saveHighscore function
    if(event.keyCode === 13)
      saveHighscore();
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
