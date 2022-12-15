const btnColorArr = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];

let level = 0;
let firstKeyPress = true;

// Check Which Button is Pressed and perform function
$(".btn").click(function (event) {
  // This is the handler function
  // when the button is clicked it grabs the id of the element and pushes it to the array.
  // let userChosenColor = $(this).attr("id"); this is another way
  let userChosenColor = $(event.target).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

const newSequence = () => {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = btnColorArr[randomNum];
  gamePattern.push(randomColor);

  // Flashes the color selected randomly
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomColor);

  // Increasing level every time newSequence is called
  level++;

  // Update title for every iteration
  $("#level-title").text("Level " + level);

  userClickedPattern = [];
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

// Game start logic
$(document).keydown(function () {
  if (firstKeyPress) {
    // This is the first time a keyboard key has been pressed
    // Call newSequence()
    $("#level-title").text("Level " + level);
    newSequence();

    // Set the flag to false to prevent newSequence() from being called again
    firstKeyPress = false;
  }
});

$("#title-restart").hide(); // hide title-restart initially

// Check users answer against game sequence
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // Play sound when user inputs wrong input
    let wrongSound = new Audio(`./sounds/wrong.mp3`);
    wrongSound.play();

    // Flash screen red upon wrong input
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset title after wrong input and removes previous title
    $("#title-restart").show();
    $("#level-title").hide();
  }
};
