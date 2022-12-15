const btnColorArr = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
const gameHeading = document.getElementById("level-title");

// Check Which Button is Pressed and perform function
$(".btn").click(function (event) {
  // This is the handler function
  // when the button is clicked it grabs the id of the element and pushes it to the array.
  // let userChosenColor = $(this).attr("id"); this is another way
  let userChosenColor = $(event.target).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

const newSequence = () => {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = btnColorArr[randomNum];
  gamePattern.push(randomColor);

  console.log(randomColor);

  // Flashes the color selected randomly
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomColor);
};

// Play sound for the clicked btn
function playSound(name) {
  let colorSound = new Audio(`./sounds/${name}.mp3`);
  colorSound.play();
}

// Adds the 'pressed' class to the button that was clicked
const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");

  // Remove the 'pressed' class from the button after 100 milliseconds
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

let level = "level 0";

let firstKeyPress = true;

$(document).keydown(function () {
  if (firstKeyPress) {
    // This is the first time a keyboard key has been pressed
    // Call nextSequence()
    newSequence();

    gameHeading.innerHTML = "level 0"
    // Set the flag to false to prevent nextSequence() from being called again
    firstKeyPress = false;
  }
});
