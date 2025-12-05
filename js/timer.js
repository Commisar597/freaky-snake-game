function updateTimer() {
  //checking if the time already ran out
  if (minutes === 0 && seconds === 0) {
    clearInterval(timerInterval); //stops the countdown
    clearInterval(movementTick); //stops the game
    saveBestScore();
    alert(`Game Over! Your score: ${score}`);
    player_positions.forEach(() => {
      player_positions.pop
    })
    player_positions = [120, 184];
    //After alert it stops the execution
  }

  //logic for seconds and minutes. when seconds hit 0, starts the decrement for minutes
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  }

  //updating the display
  let formattedSeconds;
  //formatting so that it will always have 2 digits
  if (seconds < 10) {
    formattedSeconds = "0" + seconds;
  } else {
    formattedSeconds = seconds;
  }
  timerDisplay.textContent = minutes + ":" + formattedSeconds;
}

function saveBestScore() {
  let savedScore = parseInt(localStorage.getItem("bestScore")) || 0;
  if (score > savedScore) {
    localStorage.setItem("bestScore", score);
    BestScore.textContent = score; // <- сразу обновляем отображение
  }
}
