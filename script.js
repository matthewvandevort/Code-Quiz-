var timeEl = document.querySelector(".time"); 

var highEl = document.querySelector('.highscore');
highEl.textContent = 'View Highscore';

var secondsLeft = 75;
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = 'Time Left: ' + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

setTime();