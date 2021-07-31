let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var level = 0;
var highscore = 0;
var hints = 1;

$(".start-btn").on("click", function() {
    $(".start-page, .footer").hide();
    $(".game-page").show();

    $(".current-score").text("Score: " + 0);
    $(".high-score").text("Highest Score: " + highscore);
    $(".hint-btn").text("Hint (" + hints + " left)");

    nextSequence();
});

$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
        
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    $(".current-score").text("Score: " + (level - 1));
    $(".high-score").text("Highest Score: " + (Math.max(highscore, level - 1)));
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    myLoop(0, gamePattern.length);
}  

function myLoop(i, len) 
{
    setTimeout(function() {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]); 
        if (--len) {
            myLoop(i + 1, len);  
        }
    }, 400);
}  

$(".hint-btn").on("click", function() {
    if(hints) {
        myLoop(0, gamePattern.length);
        hints--;
        $(".hint-btn").text("Hint (" + hints + " left)");
    }
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 600);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
       
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over!");
        $(".container, .hint").hide();
        $(".restart").show();

        $(".restart-btn").text("Play Again").on("click", function() {
            setTimeout(() => {
                startOver();
            }, 500);
        });     
    }
}

function startOver()
{
    highscore = Math.max(highscore, level - 1);
    level = 0;
    hints = 1;
    gamePattern= [];

    $(".restart").hide();
    $(".container, .hint").show();    

    nextSequence();        
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

