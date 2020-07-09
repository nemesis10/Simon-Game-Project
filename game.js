
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// button clicked

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// basic logic of the game

function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}


//to generate pattern

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //to play the sound and animate the button

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// play the sound of the button

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(name);
}

// animate the button clicked

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// to start over the game

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
