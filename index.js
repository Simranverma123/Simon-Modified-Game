var userClickedPattern=[];
var level=0;
var started=false;
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var hint = false;

$(document).keypress(function()
    { if(!started)
        {   
        $("#level-title").text("Level "+level)
        nextSequence();
        started=true;
        }
    }
);



function nextSequence(){
    userClickedPattern=[];
    index=0;
    $("#level-title").text("Level "+level);
    level=level+1;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(1000).fadeIn(1000);
    var audio1 = new Audio("sounds/"+randomChosenColor+".mp3");
    audio1.play();
    
}


$(".btn").click(function()
{
    index=index+1;
    userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

       
})
$("#hintbtn").click(function(){
    if(!hint)
    {   alert("The pattern is "+gamePattern);
        hint=true;
    }
    else
    alert("You can use hint only once");

})

function playSound(name)
{
    var audio2 = new Audio("sounds/"+name+".mp3");
    audio2.play(); 
   
}
function animatePress(currentColor){
   var temp = $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
   temp.removeClass("pressed");
},100);
}

function checkAnswer(currentLevel)
{
 if( gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
        if(userClickedPattern.length === gamePattern.length)
            { setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
   else{
    var audio3= new Audio("sounds/wrong.mp3");
    audio3.play();
    var t =$("body").addClass("game-over");
    setTimeout(function(){
        t.removeClass("game-over");
        startOver();
    },200);
   }
   
   
}


function startOver()
{   hint = false;
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    $("#level-title").text("Game Over, Press any  key to restart");
}