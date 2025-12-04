const grid = document.querySelector(".screen");
const playbutton = document.getElementById("playbutton");
let player_positions = [120, 136];
const fruit = document.getElementById("fruitsId");
const pointsDisplay = document.getElementById("points");
const timerDisplay = document.getElementById("timer");
const row = 1;
const collumn = 16;
let root = document.documentElement;
const snakeButtons = document.querySelectorAll("#snake_colors button");
const bgButtons = document.querySelectorAll("#background_colors button");

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
var currentSnakeColor = "rgba(160, 41, 41, 1)"; // current color of the snake
var currentSnakeBorderColor = "rgba(114, 30, 30, 1)"; // current snake border

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
  activateButton(this, bgButtons);
});

document.getElementById("blueBG").addEventListener("click", function () {
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

function activateButton(active, group) {
  group.forEach(btn => btn.classList.remove("activeButton"));
  active.classList.add("activeButton");
}

window.addEventListener("beforeunload", function () {
  saveBestScore();
});``