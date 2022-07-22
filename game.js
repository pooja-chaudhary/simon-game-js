var butttonColors=["red", "blue","green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

//detect a keypress using jquery
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+ level);
    nextSequence();
    started=true;
  }
});

//function to choose a random color using random number and play sound relevent to that color and apply annimation
function nextSequence(){
  //user clicked pattern to be set 0 once next sequence is triggerd for next game
  userClickedPattern=[];
  level++;
  $("h1").html("level "+ level);

  var randomNumber= Math.round(Math.random()*3);
  var randomChosenColor=butttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //apply a flash property using jQuery
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //calling of function
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

// identify the button click and play relevent sound
$(".btn").click(function (event){
  var userChosenColor=event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //calling check answer function
  checkAnswer(userClickedPattern.length-1);
});



//function to play a sound using javascript
function playSound(name){
  var audio=new Audio("sounds/" + name+ ".mp3");
  audio.play();
}

//function to apply annimation on pressed button using jQuery
function animatePress(currentColor){
  $("#" +currentColor).addClass("pressed");
  //timeout function using jQuery
  setTimeout(function (){
    $("#" +currentColor).removeClass("pressed");
  }, 100);

}

// creating a function to check answer and passing index of last answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("sucess");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }

  }
  else
  //playing wrong sound when user enters wrong pattern
  var audio1= new Audio("sounds/wrong.mp3");
  audio1.play();
  //adding game-over class to body
  $("body").addClass("game-over");
  //setting delay of 200 milisecond
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  //changing h1
  $("h1").text("Game Over, Press Any Key to Restart");

  //calling startover functtion
  startOver();
}

//creating a functtion to start over a gamePattern
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
