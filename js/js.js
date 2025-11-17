//initialize an array with colors for setting the background color
const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
var player_positions = [120, 136, 152, 168, 184];
var direction = "up";
//loading the variable with the color in the local storage

var snakeColors = ["rgba(160, 41, 41, 1)", "rgba(215, 254, 59, 1)", "rgba(60, 90, 210, 1)"]
var snakeBorderColors = ["rgba(114, 30, 30, 1)", "rgba(140, 165, 40, 1)", "rgba(42, 63, 146, 1)"]
var currentSnakeColor = "rgba(160, 41, 41, 1)"
var currentSnakeBorderColor = "rgba(114, 30, 30, 1)"

document.getElementById("pinkBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#ffe4eaff');
  document.documentElement.style.setProperty('--bg-block-border-color', '#ffdde5');
  document.documentElement.style.setProperty('--bg-block-color', '#ffbfcc');
  document.documentElement.style.setProperty('--text-primary-color', '#582B41');
  document.documentElement.style.setProperty('--text-secondary-color', '#7F4B61');
  document.documentElement.style.setProperty('--text-highlighted-color', '#E3006F');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#FF78A7');
});

document.getElementById("blueBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#0C1226');
  document.documentElement.style.setProperty('--bg-block-border-color', '#1B274A');
  document.documentElement.style.setProperty('--bg-block-color', '#1F315C');
  document.documentElement.style.setProperty('--text-primary-color', '#202430ff');
  document.documentElement.style.setProperty('--text-secondary-color', '#8FA2D0');
  document.documentElement.style.setProperty('--text-highlighted-color', '#5A8BFF');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#89A8FF');
});

document.getElementById("greenBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#dfffe7ff');
  document.documentElement.style.setProperty('--bg-block-border-color', '#C7EAD1');
  document.documentElement.style.setProperty('--bg-block-color', '#AEECC0');
  document.documentElement.style.setProperty('--text-primary-color', '#1F4B2E');
  document.documentElement.style.setProperty('--text-secondary-color', '#4E7257');
  document.documentElement.style.setProperty('--text-highlighted-color', '#27A05A');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#57D98B');
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

let speed = 500;
let speedIncrease = 10;
let minSpeed = 80;

function CreateGrid() {
  let time = 0;

  //I put the timer inside the button cuz it just keeps going up if its not, also would be preferable to stop the timer somehow H.N.  
  setInterval(() => {
    time++;
    timerEvents.dispatchEvent(new CustomEvent("tick", {
      detail: { value: 1 }
    }));
  }, 120);//Higher value = slower snake, I think this speed is good H.N.

  grid.innerHTML = ""; // this just clears existing cells, may be redunant
  cells = [];
  for (let i = 0; i < 256; i++) {//Creates 256 divs for the grid, configure size in CSS .screen 
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell); // put the cells as the childs of the grid
    cells.push(cell);// and in the array as elements
  }
  player_positions.forEach(pos => {
    cells[pos].style.backgroundColor = currentSnakeColor;
    cells[pos].style.border = "2px solid " + currentSnakeBorderColor;
  });
  timerEvents.addEventListener("tick", (event) => {
    movePlayer(direction);
  })
}

const timerEvents = new EventTarget;
playbutton.addEventListener("click", CreateGrid);

function movePlayer(direction) {
  let headPosition = player_positions[0];
  let newHeadPosition;
  if (direction === "up") { newHeadPosition = headPosition - 16; };
  if (direction === "down") { newHeadPosition = headPosition + 16; };
  if (direction === "left") { newHeadPosition = headPosition - 1; };
  if (direction === "right") { newHeadPosition = headPosition + 1; };

  let tail = player_positions.pop();
  cells[tail].style.backgroundColor = "rgb(102, 145, 74)";
  cells[tail].style.border = "2px solid rgb(64, 98, 65)";
  player_positions.unshift(newHeadPosition);
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