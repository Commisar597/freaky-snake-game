// =====================
// DOM elements and base variables
// =====================

// Main game grid container
const grid = document.querySelector(".screen");

// Play / restart button
const playbutton = document.getElementById("playbutton");

// Initial snake positions (cell indexes)
let player_positions = [120, 136];

// Fruit DOM element
const fruit = document.getElementById("fruitsId");

// Score and timer displays
const pointsDisplay = document.getElementById("points");
const timerDisplay = document.getElementById("timer");

// Grid movement helpers
const row = 1;        // left / right step
const collumn = 16;   // up / down step

// Root element for CSS variables
let root = document.documentElement;

// UI buttons
const snakeButtons = document.querySelectorAll("#snake_colors button");
const bgButtons = document.querySelectorAll("#background_colors button");

// =====================
// Best score (localStorage)
// =====================

var savedScore = parseInt(localStorage.getItem("bestScore")) || 0;
const BestScore = document.getElementById("bestScore");
BestScore.textContent = parseInt(localStorage.getItem("bestScore")) || 0;

// Save best score if current score is higher
function saveBestScore() {
  let savedScore = localStorage.getItem("bestScore") || 0;
  if (score > savedScore) {
    localStorage.setItem("bestScore", score);
  }
}

// =====================
// Loading saved theme values
// =====================

//loading the variable with styles elements in local storage
var savedBg = localStorage.getItem("bgColor");
var savedBorder = localStorage.getItem("bgBlockBorderColor");
var savedBlock = localStorage.getItem("bgBlockColor");
var savedPrimary = localStorage.getItem("primaryColor");
var savedSecondary = localStorage.getItem("secondaryColor");
var savedHL = localStorage.getItem("highlightedColor");
var savedHL2 = localStorage.getItem("highlighted2Color");

// Apply saved theme on page load
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

// =====================
// Snake colors
// =====================

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

// =====================
// Background theme buttons
// =====================

document.getElementById("pinkBG").addEventListener("click", function () {
  //A function that is activated when you click the style change button and changes
  // the data on the site and in local storage
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
  activateButton(this, bgButtons);
});

document.getElementById("blueBG").addEventListener("click", function () {
  // Apply blue theme and save to localStorage
  root.style.setProperty("--bg-layout-color", "#0C1226");
  localStorage.setItem("--bg-layout-color", "#0C1226");
  root.style.setProperty("--bg-block-border-color", "#1B274A");
  localStorage.setItem("--bg-block-border-color", "#1B274A");
  root.style.setProperty("--bg-block-color", "#1F315C");
  localStorage.setItem("--bg-block-color", "#1F315C");
  root.style.setProperty("--text-primary-color", "#787878ff");
  localStorage.setItem("--text-primary-color", "#787878ff");
  root.style.setProperty("--text-secondary-color", "#8FA2D0");
  localStorage.setItem("--text-secondary-color", "#8FA2D0");
  root.style.setProperty("--text-highlighted-color", "#5A8BFF");
  localStorage.setItem("--text-highlighted-color", "#5A8BFF");
  root.style.setProperty("--text-highlighted2-color", "#89A8FF");
  localStorage.setItem("--text-highlighted2-color", "#89A8FF");
  activateButton(this, bgButtons);
});

document.getElementById("greenBG").addEventListener("click", function () {
  // Apply green theme and save to localStorage
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
  activateButton(this, bgButtons);
});

// =====================
// Snake color buttons
// =====================

document
  .getElementById("redColorSnake") // snake colour
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[0];
    currentSnakeColor = snakeColors[0];
    activateButton(this, snakeButtons);
  });

document
  .getElementById("yellowColorSnake")
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[1];
    currentSnakeColor = snakeColors[1];
    activateButton(this, snakeButtons);
  });

document
  .getElementById("blueColorSnake")
  .addEventListener("click", function () {
    currentSnakeBorderColor = snakeBorderColors[2];
    currentSnakeColor = snakeColors[2];
    activateButton(this, snakeButtons);
  });

// Highlight active button in a group
function activateButton(active, group) {
  group.forEach(btn => btn.classList.remove("activeButton"));
  active.classList.add("activeButton");
}

// Save score before page unload
window.addEventListener("beforeunload", function () {
  saveBestScore();
});

// =====================
// Game state variables
// =====================

var direction = "up";
let speed = 150;
let score = 0; //counter
let timeInterval; //controls the clock display
let seconds = 30; //starting seconds
let minutes = 1; //starting minutes
const timerEvents = new EventTarget();
let movementTick = null;

// =====================
// Game initialization
// =====================

function CreateGrid() {
  // Reset previous game state if game is restarted
  if (movementTick) {
    clearInterval(movementTick);
    clearInterval(timerInterval)
    player_positions.forEach(() => {
      player_positions.pop
    })
    player_positions = [120, 136];
    direction = "up";
  }

  // Game tick event (movement speed)
  movementTick = setInterval(() => {
    timerEvents.dispatchEvent(
      new CustomEvent("tick", {
        detail: { value: 1 },
      })
    );
  }, speed);

  // Grid setup
  grid.innerHTML = "";
  cells = [];
  score = 0; //resetting the score
  pointsDisplay.textContent = "Point number: 0"; //update the element text
  grid.appendChild(fruit); //showing the fruit object

  // Timer reset
  seconds = 30;
  minutes = 1;
  timerDisplay.textContent = minutes + ":" + seconds;

  // Create 16x16 grid
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
    cells.push(cell);
  }

  // Draw initial snake
  player_positions.forEach((pos) => {
    cells[pos].style.backgroundColor = currentSnakeColor;
    cells[pos].style.border = "2px solid " + currentSnakeBorderColor;
  });

  createBorder();
  moveFruit(); //initial fruit placement
  timerInterval = setInterval(updateTimer, 1000); //starting the countdown for the timer (every 1 second (1000 ms))
}

// =====================
// Border creation
// =====================

function createBorder() {
  for (let i = 0; i < 16; i++) {
    cells[i].style.backgroundColor = "black"
  }
  for (let i = 16; i < 240; i += 16) {
    cells[i].style.backgroundColor = "black"
  }
  for (let i = 240; i < 256; i++) {
    cells[i].style.backgroundColor = "black"
  }
  for (let i = 31; i < 255; i += 16) {
    cells[i].style.backgroundColor = "black"
  }
}

// Move snake on every tick
timerEvents.addEventListener("tick", () => {
  movePlayer(direction);
})

// =====================
// Timer logic
// =====================

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

// =====================
// Fruit logic
// =====================

//random fruits
function moveFruit() {
  const availableCells = []; //an array for available cells
  //loop to find the cells that are not part of the snake or the border
  for (let i = 0; i < cells.length; i++) {
    if (!player_positions.includes(i) && cells[i].style.backgroundColor !== "black") {
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

// =====================
// Player movement
// =====================

playbutton.addEventListener("click", CreateGrid);

function movePlayer(direction) {
  let headPosition = player_positions[0];
  let newHeadPosition;

  // Eat fruit
  if (headPosition === fruitPosition) {
    score++; //increase the score
    pointsDisplay.textContent = "Point number: " + score; //updates the element text
    growPlayer();
    moveFruit(); //place a new fruits
  }

  // Direction handling
  if (direction === "up") {
    newHeadPosition = headPosition - collumn;
  }
  if (direction === "down") {
    newHeadPosition = headPosition + collumn;
  }
  if (direction === "left") {
    newHeadPosition = headPosition - row;
  }
  if (direction === "right") {
    newHeadPosition = headPosition + row;
  }

  // Collision detection
  if (cells[newHeadPosition].style.backgroundColor === "black" || player_positions.includes(newHeadPosition)) {
    gameOver();
    return;
  }

  // Move snake body
  let tail = player_positions.pop();
  cells[tail].style.backgroundColor = "rgb(102, 145, 74)";
  cells[tail].style.border = "2px solid rgb(64, 98, 65)";
  player_positions.unshift(newHeadPosition);

  cells[newHeadPosition].style.backgroundColor = currentSnakeColor;
  cells[newHeadPosition].style.border = "2px solid " + currentSnakeBorderColor;
}

// =====================
// Game over
// =====================

function gameOver() {
  clearInterval(movementTick);
  clearInterval(timerInterval);
  saveBestScore();
  alert(`Game Over! Your score: ${score}`);
}

// =====================
// Keyboard controls
// =====================

document.addEventListener("keydown", (event) => {

  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (keys.includes(event.key)) {
    event.preventDefault();
  }

  if (cells.length === 0) return;

  if ((event.key === "w" || event.key === "W" || event.key === "ArrowUp") && direction !== "down") {
    direction = "up";
  }
  if ((event.key === "s" || event.key === "S" || event.key === "ArrowDown") && direction !== "up") {
    direction = "down";
  }
  if ((event.key === "a" || event.key === "A" || event.key === "ArrowLeft") && direction !== "right") {
    direction = "left";
  }
  if ((event.key === "d" || event.key === "D" || event.key === "ArrowRight") && direction !== "left") {
    direction = "right";
  }
});

// =====================
// Snake growth
// =====================

function growPlayer() {
  let tail = player_positions[0];
  player_positions.unshift(tail);
}