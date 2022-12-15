const btnColorArr = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStart = true;

// Check Which Button is Pressed and perform function
$(".btn").click(function (event) {
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
  $(`#${randomColor}`).fadeOut(100).fadeIn(100);

  playSound(randomColor);

  // Increasing level every time newSequence is called
  level++;

  // Update title for every iteration
  $(".level-title").text(`level ${level}`);

  userClickedPattern = [];
};

// Game start logic
$(document).keydown(function () {
  if (gameStart) {
    // This is the first time a keyboard key has been pressed
    // Call newSequence()
    $(".level-title").text(`level ${level}`);
    newSequence();

    // Set the flag to false to prevent newSequence() from being called again
    gameStart = false;
  $(".level-title").removeClass("title-restart");
}
});

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
    playSound("wrong");

    // Flash screen red upon wrong input
    $("body").addClass("game-over");
    $(".level-title")
      .text("Game Over, Press Any Key to Restart")
      // .attr("id", "title-restart");
      .addClass("title-restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    restartGame();
  }
};

// Adds the 'pressed' class to the button that was clicked
const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");

  // Remove the 'pressed' class from the button after 100 milliseconds
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

// Play sound for the clicked btn
function playSound(name) {
  let colorSound = new Audio(`./sounds/${name}.mp3`);
  colorSound.play();
}

// Restarts the game upon wrong input
const restartGame = () => {
  level = 0;
  gamePattern = [];
  gameStart = true;
};
