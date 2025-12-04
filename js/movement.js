var direction = "up";
let speed = 150;
let score = 0; //counter
let timeInterval; //controls the clock display
let seconds = 30; //starting seconds
let minutes = 1; //starting minutes
const timerEvents = new EventTarget();
let movementTick = null;

function CreateGrid() {

  if (movementTick) {
    clearInterval(movementTick);
    clearInterval(timerInterval)
    player_positions.forEach(() => {
      player_positions.pop
    })
    player_positions = [120, 136];
    direction = "up";
  }

  movementTick = setInterval(() => {
    timerEvents.dispatchEvent(
      new CustomEvent("tick", {
        detail: { value: 1 },
      })
    );
  }, speed);

  grid.innerHTML = "";
  cells = [];
  score = 0; //resetting the score
  pointsDisplay.textContent = "Point number: 0"; //update the element text
  grid.appendChild(fruit); //showing the fruit object
  //initializing count down initial values and setting the initial display
  seconds = 30;
  minutes = 1;
  timerDisplay.textContent = minutes + ":" + seconds;
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
    cells.push(cell);
  }
  player_positions.forEach((pos) => {
    cells[pos].style.backgroundColor = currentSnakeColor;
    cells[pos].style.border = "2px solid " + currentSnakeBorderColor;
  });
  createBorder();
  moveFruit(); //initial fruit placement
  timerInterval = setInterval(updateTimer, 1000); //starting the countdown for the timer (every 1 second (1000 ms))

}
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

timerEvents.addEventListener("tick", () => {
  movePlayer(direction);
})

playbutton.addEventListener("click", CreateGrid);

function movePlayer(direction) {
  let headPosition = player_positions[0];
  let newHeadPosition;

  if (headPosition === fruitPosition) {
    score++; //increase the score
    pointsDisplay.textContent = "Point number: " + score; //updates the element text
    growPlayer();
    moveFruit(); //place a new fruits
  }

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
  if (cells[newHeadPosition].style.backgroundColor === "black" || player_positions.includes(newHeadPosition)) {
    gameOver();
    return;
  }

  let tail = player_positions.pop();
  cells[tail].style.backgroundColor = "rgb(102, 145, 74)";
  cells[tail].style.border = "2px solid rgb(64, 98, 65)";
  player_positions.unshift(newHeadPosition);

  cells[newHeadPosition].style.backgroundColor = currentSnakeColor;
  cells[newHeadPosition].style.border = "2px solid " + currentSnakeBorderColor;
}

function gameOver() {
  clearInterval(movementTick);
  clearInterval(timerInterval);
  saveBestScore();
  alert(`Game Over! Your score: ${score}`);
}

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

function growPlayer() {
  let tail = player_positions[0];
  player_positions.unshift(tail);
}
