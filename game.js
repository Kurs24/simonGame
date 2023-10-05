var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var isStarted = false;
var level = 1;

$(document).on("keydown", function () {
    if (isStarted === false) {
        isStarted = true;
        nextSequence();
    }
})


function nextSequence() {
    var randomNumber = Math.round((Math.random() * 3));
    $("h1").text("Level " + level);
    level += 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("hehe");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Solution ver.1

// $(".btn").on("click", function (event) {
//     var userChosenColor = event.target.id;
//     playSound(userChosenColor);
//     userClickedPattern.push(userChosenColor);
//     // console.log(userClickedPattern);
// });


// Solution ver.2

$(".btn").on("click", function () {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer((userClickedPattern.length - 1))
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}