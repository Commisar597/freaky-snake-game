/* random fruits */
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
