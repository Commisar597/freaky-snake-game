const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
var player_positions = [120, 136, 152, 168, 184];
var direction = "up";
const fruit = document.getElementById("fruitsId");
const pointsDisplay = document.getElementById("points");
const timerDisplay = document.getElementById("timer");

let root = document.documentElement;

var savedScore = parseInt(localStorage.getItem("bestScore")) || 0;
const BestScore = document.getElementById("bestScore");
BestScore.textContent = parseInt(localStorage.getItem("bestScore")) || 0;

function saveBestScore() {
  let savedScore = localStorage.getItem("bestScore") || 0;
  if (score > savedScore) {
    localStorage.setItem("bestScore", score);
  }
}

//loading the variable with styles elements in local storage
var savedBg = localStorage.getItem("bgColor");
var savedBorder = localStorage.getItem("bgBlockBorderColor");
var savedBlock = localStorage.getItem("bgBlockColor");
var savedPrimary = localStorage.getItem("primaryColor");
var savedSecondary = localStorage.getItem("secondaryColor");
var savedHL = localStorage.getItem("highlightedColor");
var savedHL2 = localStorage.getItem("highlighted2Color");

document.addEventListener("DOMContentLoaded", function () {
  //The function works when the program starts thanks to the "DOMContentLoaded"
  //event, changing the style to the one saved in local storage

  if (localStorage.getItem("--bg-layout-color")) {
    root.style.setProperty(
      "--bg-layout-color",
      localStorage.getItem("--bg-layout-color")
    );
    root.style.setProperty(
      "--bg-block-border-color",
      localStorage.getItem("--bg-block-border-color")
    );
    root.style.setProperty(
      "--bg-block-color",
      localStorage.getItem("--bg-block-color")
    );
    root.style.setProperty(
      "--text-primary-color",
      localStorage.getItem("--text-primary-color")
    );
    root.style.setProperty(
      "--text-secondary-color",
      localStorage.getItem("--text-secondary-color")
    );
    root.style.setProperty(
      "--text-highlighted-color",
      localStorage.getItem("--text-highlighted-color")
    );
    root.style.setProperty(
      "--text-highlighted2-color",
      localStorage.getItem("--text-highlighted2-color")
    );
  }
});

var snakeColors = [
  "rgba(160, 41, 41, 1)",
  "rgba(215, 254, 59, 1)",
  "rgba(60, 90, 210, 1)",
];
var snakeBorderColors = [
  "rgba(114, 30, 30, 1)",
  "rgba(140, 165, 40, 1)",
  "rgba(42, 63, 146, 1)",
];
var currentSnakeColor = "rgba(160, 41, 41, 1)";
var currentSnakeBorderColor = "rgba(114, 30, 30, 1)";

document.getElementById("pinkBG").addEventListener("click", function () {
  //A function that is activated when you click the style change button and changes
  //  the data on the site and in local storage

  root.style.setProperty("--bg-layout-color", "#ffe4ea");
  localStorage.setItem("--bg-layout-color", "#ffe4ea");
  root.style.setProperty("--bg-block-border-color", "#ffdde5");
  localStorage.setItem("--bg-block-border-color", "#ffdde5");
  root.style.setProperty("--bg-block-color", "#ffbfcc");
  localStorage.setItem("--bg-block-color", "#ffbfcc");
  root.style.setProperty("--text-primary-color", "#582b41");
  localStorage.setItem("--text-primary-color", "#582b41");
  root.style.setProperty("--text-secondary-color", "#7f4b61");
  localStorage.setItem("--text-secondary-color", "#7f4b61");
  root.style.setProperty("--text-highlighted-color", "#e3006f");
  localStorage.setItem("--text-highlighted-color", "#e3006f");
  root.style.setProperty("--text-highlighted2-color", "#ff78a7");
  localStorage.setItem("--text-highlighted2-color", "#ff78a7");
});

document.getElementById("blueBG").addEventListener("click", function () {
  root.style.setProperty("--bg-layout-color", "#0C1226");
  localStorage.setItem("--bg-layout-color", "#0C1226");
  root.style.setProperty("--bg-block-border-color", "#1B274A");
  localStorage.setItem("--bg-block-border-color", "#1B274A");
  root.style.setProperty("--bg-block-color", "#1F315C");
  localStorage.setItem("--bg-block-color", "#1F315C");
  root.style.setProperty("--text-primary-color", "#202430");
  localStorage.setItem("--text-primary-color", "#202430");
  root.style.setProperty("--text-secondary-color", "#8FA2D0");
  localStorage.setItem("--text-secondary-color", "#8FA2D0");
  root.style.setProperty("--text-highlighted-color", "#5A8BFF");
  localStorage.setItem("--text-highlighted-color", "#5A8BFF");
  root.style.setProperty("--text-highlighted2-color", "#89A8FF");
  localStorage.setItem("--text-highlighted2-color", "#89A8FF");
});

document.getElementById("greenBG").addEventListener("click", function () {
  root.style.setProperty("--bg-layout-color", "#dfffe7ff");
  localStorage.setItem("--bg-layout-color", "#dfffe7ff");
  root.style.setProperty("--bg-block-border-color", "#C7EAD1");
  localStorage.setItem("--bg-block-border-color", "#C7EAD1");
  root.style.setProperty("--bg-block-color", "#AEECC0");
  localStorage.setItem("--bg-block-color", "#AEECC0");
  root.style.setProperty("--text-primary-color", "#1F4B2E");
  localStorage.setItem("--text-primary-color", "#1F4B2E");
  root.style.setProperty("--text-secondary-color", "#4E7257");
  localStorage.setItem("--text-secondary-color", "#4E7257");
  root.style.setProperty("--text-highlighted-color", "#27A05A");
  localStorage.setItem("--text-highlighted-color", "#27A05A");
  root.style.setProperty("--text-highlighted2-color", "#57D98B");
  localStorage.setItem("--text-highlighted2-color", "#57D98B");
});

document
  .getElementById("redColorSnake") // snake colour
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[0];
    currentSnakeColor = snakeColors[0];
  });

document
  .getElementById("yellowColorSnake")
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[1];
    currentSnakeColor = snakeColors[1];
  });

document
  .getElementById("blueColorSnake")
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[2];
    currentSnakeColor = snakeColors[2];
  });

window.addEventListener("beforeunload", function () {
  saveBestScore();
});

let speed = 500;
let speedIncrease = 10;
let minSpeed = 80;
let score = 0; //counter
let timeInterval; //controls the clock display
let seconds = 30; //starting seconds
let minutes = 1; //starting minutes

//hiding the fruit object
if (fruit) {
  fruit.style.display = "none";
}

function CreateGrid() {
  let time = 0;

  //I put the movement timer inside the button cuz it just keeps going up if its not, also would be preferable to stop the timer somehow H.N.
  setInterval(() => {
    time++;
    timerEvents.dispatchEvent(
      new CustomEvent("tick", {
        detail: { value: 1 },
      })
    );
  }, 120); //Higher value = slower snake, I think this speed is good H.N.

  grid.innerHTML = ""; // this just clears existing cells
  cells = [];
  score = 0; //resetting the score
  pointsDisplay.textContent = "Point number: 0"; //update the element text
  grid.appendChild(fruit); //showing the fruit object
  //initializing count down initial values and setting the initial display
  seconds = 30;
  minutes = 1;
  timerDisplay.textContent = "1:30";
  for (let i = 0; i < 256; i++) {
    //Creates 256 divs for the grid, configure size in CSS .screen
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell); // put the cells as the childs of the grid
    cells.push(cell); // and in the array as elements
  }
  player_positions.forEach((pos) => {
    cells[pos].style.backgroundColor = currentSnakeColor;
    cells[pos].style.border = "2px solid " + currentSnakeBorderColor;
  });
  timerEvents.addEventListener("tick", (event) => {
    movePlayer(direction);
  });

  gameLoop = setInterval(() => {
    movePlayer(direction);
  }, speed); //gameloop updates and renders the game every frame

  timerInterval = setInterval(updateTimer, 1000); //starting the countdown for the timer (every 1 second (1000 ms))

  moveFruit(); //initial fruit placement
}

function updateTimer() {
  //checking if the time already ran out
  if (minutes === 0 && seconds === 0) {
    gameOver();
    saveBestScore();
    return; //stopping the execution
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

function gameOver() {
  if (gameLoop) clearInterval(gameLoop); //stops the game
  if (timerInterval) clearInterval(timerInterval); //stops the countdown
  saveBestScore();
  alert(`Game Over! Your score: ${score}`);
}

function saveBestScore() {
  let savedScore = parseInt(localStorage.getItem("bestScore")) || 0;
  if (score > savedScore) {
    localStorage.setItem("bestScore", score);
    BestScore.textContent = score; // <- сразу обновляем отображение
  }
}

//random fruits
function moveFruit() {
  const availableCells = []; //an array for available cells
  //loop to find the cells that are not part of the snake
  for (let i = 0; i < cells.length; i++) {
    if (!player_positions.includes(i)) {
      availableCells.push(i);
    }
  }

  if (availableCells.length > 0) {
    //picks a random position from available cells
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    fruitPosition = availableCells[randomIndex]; //appends it

    //checks if the fruit element was created
    if (fruit) {
      cells[fruitPosition].appendChild(fruit); //moves element to the chosen cell
      fruit.style.display = "block"; //make the fruit object visible
    }
  }
}

const timerEvents = new EventTarget();
playbutton.addEventListener("click", CreateGrid);

function movePlayer(direction) {
  let headPosition = player_positions[0];
  let newHeadPosition;
  if (direction === "up") {
    newHeadPosition = headPosition - 16;
  }
  if (direction === "down") {
    newHeadPosition = headPosition + 16;
  }
  if (direction === "left") {
    newHeadPosition = headPosition - 1;
  }
  if (direction === "right") {
    newHeadPosition = headPosition + 1;
  }
  const ateFruit = newHeadPosition === fruitPosition; //checks the equality of the snake head and the fruit cell

  //moves the fruit if the equality is true
  if (ateFruit) {
    score++; //increase the score
    pointsDisplay.textContent = "Point number: " + score; //updates the element text
    moveFruit(); //place a new fruit
    growPlayer();
  } else {
    //no collision, the snakes moves normally
    let tail = player_positions.pop();
    cells[tail].style.backgroundColor = "rgb(102, 145, 74)";
    cells[tail].style.border = "2px solid rgb(64, 98, 65)";
    player_positions.unshift(newHeadPosition);
  }
  cells[newHeadPosition].style.backgroundColor = currentSnakeColor;
  cells[newHeadPosition].style.border = "2px solid " + currentSnakeBorderColor;
}

document.addEventListener("keydown", (event) => {
  if (cells.length === 0) return;

  if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
    direction = "up";
  }
  if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
    direction = "down";
  }
  if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
    direction = "left";
  }
  if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
    direction = "right";
  }
});

function autoMoveLoop() {
  autoMoveSnake();

  speed -= speedIncrease;
  if (speed < minSpeed) speed = minSpeed;

  setTimeout(autoMoveLoop, speed);
}

function growPlayer() {
  let tail = player_positions[0];
  player_positions.unshift(tail);
}
