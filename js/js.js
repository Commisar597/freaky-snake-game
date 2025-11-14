//initialize anarray with colors for setting the background color
var bgColor = ["red", "green", "blue"];

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


