//initialize an array with colors for setting the background color
var bgColor = ["#FFF6F8", "#0C1226", "#F3FFF6"];
const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
var player_positions = [120, 136, 152, 168, 184]; //initial player positions
var direction = "up";
//loading the variable with the color in the local storage
var savedColor = localStorage.getItem("bgColor");
if (savedColor) {
  document.body.style.backgroundColor = savedColor;
}

var snakeColors = ["rgba(160, 41, 41, 1)", "rgba(215, 254, 59, 1)", "rgba(60, 90, 210, 1)"]
var snakeBorderColors = ["rgba(114, 30, 30, 1)", "rgba(140, 165, 40, 1)", "rgba(60, 90, 210, 1)"]
var currentSnakeColor = "rgba(160, 41, 41, 1)"
var currentSnakeBorderColor = "rgba(114, 30, 30, 1)"
 
// Палетка A — Розовая |
document.getElementById("pinkBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#FFF6F8');
  document.documentElement.style.setProperty('--bg-block-border-color', '#ffdde5');
  document.documentElement.style.setProperty('--bg-block-color', '#ffbfcc');
  document.documentElement.style.setProperty('--text-primary-color', '#582B41');
  document.documentElement.style.setProperty('--text-secondary-color', '#7F4B61');
  document.documentElement.style.setProperty('--text-highlighted-color', '#E3006F');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#FF78A7');
  loc
});

// Палетка B — Темно-синяя |
document.getElementById("blueBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#0C1226');
  document.documentElement.style.setProperty('--bg-block-border-color', '#1B274A');
  document.documentElement.style.setProperty('--bg-block-color', '#1F315C');
  document.documentElement.style.setProperty('--text-primary-color', '#C9D6FF');
  document.documentElement.style.setProperty('--text-secondary-color', '#8FA2D0');
  document.documentElement.style.setProperty('--text-highlighted-color', '#5A8BFF');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#89A8FF');
});

// Палетка C — Приятная зелёная |
document.getElementById("greenBG").addEventListener("click", function () {
  document.documentElement.style.setProperty('--bg-layout-color', '#F3FFF6');
  document.documentElement.style.setProperty('--bg-block-border-color', '#C7EAD1');
  document.documentElement.style.setProperty('--bg-block-color', '#AEECC0');
  document.documentElement.style.setProperty('--text-primary-color', '#1F4B2E');
  document.documentElement.style.setProperty('--text-secondary-color', '#4E7257');
  document.documentElement.style.setProperty('--text-highlighted-color', '#27A05A');
  document.documentElement.style.setProperty('--text-highlighted2-color', '#57D98B');
});

document.getElementById("redBackground") // snake colour
  .addEventListener("click", function () {

  });

document
  .getElementById("yellowColorSnake")
  .addEventListener("click", function () {

  });

document
  .getElementById("blueColorSnake")
  .addEventListener("click", function () {

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

//Snakelike movement without growing just yet 
function movePlayer(direction) {
  let headPosition = player_positions[0]; // Gets head position
  let newHeadPosition;
  // Calculates new head position based on direction GOD I FUCKING HATE THESE AI FUCKING AUTOCOMPLETE SUGGESTIONS ITS DOING IT NOW AS WELL FUCK
  if (direction === "up") { newHeadPosition = headPosition - 16; };
  if (direction === "down") { newHeadPosition = headPosition + 16; };
  if (direction === "left") { newHeadPosition = headPosition - 1; };
  if (direction === "right") { newHeadPosition = headPosition + 1; };

  let tail = player_positions.pop(); // .pop removes the last element from the array, and returns it, so tail var is the removed element
  cells[tail].style.backgroundColor = "";
  cells[tail].style.border = "";
  player_positions.unshift(newHeadPosition);// .unshift adds an element to the start of the array, unlike push which adds to the end, cool ik
  cells[newHeadPosition].style.backgroundColor = currentSnakeColor;
  cells[newHeadPosition].style.border = "2px solid " + currentSnakeBorderColor; // sets the head black
}
document.addEventListener("keydown", (event) => { // function for the direction
  if (cells.length === 0) return; //ignore keypresses if grid not created

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

  function autoMoveLoop() {
    autoMoveSnake();

    speed -= speedIncrease;
    if (speed < minSpeed) speed = minSpeed;

    setTimeout(autoMoveLoop, speed);
  }

});
