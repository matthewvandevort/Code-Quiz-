function printHighscores() {

    // Get scores form local storage
    var highScores = JSON.parse(localStorage.getItem("highscores"));
    if(highScores != null){

      // for loop each score
      for(var i = 0; i < highScores.length; i++){

        // Creates a new li tag for each high score
        var scoreLi = document.createElement("li");
        scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;

        // Displays the highscore on the page
        document.getElementById("highscores").appendChild(scoreLi);
      }
      
    }
    else{
      var temp = document.getElementById("highscores");
      temp.textContent = "NO HIGH SCORES";     
    }
    
      
  }
  
  function clearHighscores() {

    // Clears the highscores and reloads the page
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function(){
    clearHighscores();
  })
  // call printHighscores when page first loads.
  printHighscores();