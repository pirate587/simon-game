var firstclick = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
if(firstclick == false)
{
   $(".btn").click(function()
  { 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkanswer(userClickedPattern.length-1);
      playSound(userChosenColor);
firstclick =true;

   
  });
}
function nextSequence()
{
firstclick =false;
userClickedPattern = [];
  level++;
    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColor  = buttonColors[randomnumber];
  gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColor);
 
 $("h1").text("Level " + level);

}

function playSound(name)
{
 var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

 function animatePress(currentColor)
  {

      $("#" + currentColor).addClass("pressed");

     setTimeout(function()
    {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
if(!started)
{
$(document).keypress(function()
{

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
});
}
function startover()
{
  level = 0;
  gamePattern = [];
  started = false;
}

function checkanswer(currentlevel)
{
  if(gamePattern[currentlevel]=== userClickedPattern[currentlevel])
  {
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function()
        {
            nextSequence();
        },1000);
    }

  }
  else{
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key To Restart");
  startover();
  }
 

}
$(".btn").click(function() {
  var currentColor = $(this).attr("id");
  animatePress(currentColor);
});

