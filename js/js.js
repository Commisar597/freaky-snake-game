//initialize an array with colors for setting the background color
var bgColor = ["red", "green", "blue"];
const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
var player_position = 120; //initial player position
//loading the variable with the color in the local storage
var savedColor = localStorage.getItem("bgColor");
if (savedColor) {
  document.body.style.backgroundColor = savedColor;
}

//setting the backgrounds on click on the corresponding buttons and saving the value in the local storage 
document.getElementById("redBackground").addEventListener("click", function () {
  document.body.style.backgroundColor = bgColor[0];
  localStorage.setItem("bgColor", bgColor[0]);
});

document
  .getElementById("greenBackground")
  .addEventListener("click", function () {
    document.body.style.backgroundColor = bgColor[1];
    localStorage.setItem("bgColor", bgColor[1]);
  });

document
  .getElementById("blueBackground")
  .addEventListener("click", function () {
    document.body.style.backgroundColor = bgColor[2];
    localStorage.setItem("bgColor", bgColor[2]);
  });

function CreateGrid() {
    grid.innerHTML = ""; // this just clears existing cells, may be redunant
    cells = [];
    for (let i = 0; i < 256; i++) {//Creates 256 divs for the grid, configure size in CSS .screen 
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }
    cells[player_position].style.backgroundColor = "black"
  }
  function movePlayer(newPosition){
    if(newPosition >= 0 && newPosition < 256){
      cells[player_position].style.backgroundColor = "white"; //clears previous position
      player_position = newPosition;
      cells[newPosition].style.backgroundColor = "black"; //sets new position
    }
  }
  playbutton.addEventListener("click", CreateGrid);
  document.addEventListener("keydown", (event) => {
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
});

let time = 0;
let direction = "up";
let speed = 500;
let speedIncrease = 10;
let minSpeed = 80;

const timerEvents = new EventTarget;

setInterval(() => {
  time++;
  timerEvents.dispatchEvent(new CustomEvent("tick", {
    detail: { value: 1 }
  }));
}, 1000);

timerEvents.addEventListener("tick", (event) => {
  autoMoveSnake();
})

function autoMoveSnake() {
  let newPos = player_position;

  if (direction === "up") newPos -= 1;
  if (direction === "down") newPos += 1;
  if (direction === "left") newPos -= 1;
  if (direction === "right") newPos += 1;

  movePlayer(newPos);
}

function autoMoveLoop()
{
  autoMoveSnake();

  speed -= speedIncrease;
  if(speed < minSpeed) speed = minSpeed;

  setTimeout(autoMoveLoop, spped);
}
