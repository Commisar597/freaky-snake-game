//initialize an array with colors for setting the background color
var bgColor = ["red", "green", "blue"];
const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
var player_positions = [120,136,152,168]; //initial player positions
var direction = "up";
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
      cells[pos].style.backgroundColor = "black";
    });
  timerEvents.addEventListener("tick", (event) => {
  movePlayer(direction);
  })
  }

  const timerEvents = new EventTarget;
  playbutton.addEventListener("click", CreateGrid);

  //Snakelike movement without growing just yet 
  function movePlayer(direction){
  let headPosition = player_positions[0]; // Gets head position
  let newHeadPosition;
  // Calculates new head position based on direction
  if (direction === "up"){newHeadPosition = headPosition - 16;};
  if (direction === "down"){newHeadPosition = headPosition + 16;};
  if (direction === "left"){newHeadPosition = headPosition - 1;};
  if (direction === "right"){newHeadPosition = headPosition + 1;};

  let tail = player_positions.pop(); // .pop removes the last element from the array, and returns it, so tail var is the removed element
  cells[tail].style.backgroundColor = "white"; // sets the tail white
  player_positions.unshift(newHeadPosition);// .unshift adds an element to the start of the array, unlike push which adds to the end
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
});



