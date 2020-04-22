var backsong;
var hit;
var hit2;
var miss;
var Button;
var x = 200;
var y = 250;
var x2 = 1166;
var y2 = 250;
var ball;
var plays = [];

function setup(){
  createCanvas(1366, 595);  //create game window
  backsong = loadSound("../audio/FunkSoul.wav",loaded);
  backsong.playMode('restart');
  backsong.setVolume(0.5);
  hit = loadSound("../audio/breviceps__wet-click.wav");
  hit2 = loadSound("../audio/moogy73__click02.wav");
  miss = loadSound("../audio/gusgus26__click-05.wav");
  ball = new Ball(); 
  plays.push(new Play());
}

function loaded(){
    Button = createButton('START');
    Button.position(630, 330);
    Button.size(100, 30);
    Button.mousePressed(starts);
}

function starts(){
  Button.remove();
  backsong.rate(1.1);
  backsong.play();
  ball.xdir = random(-1,1);
  ball.ydir = random(-1,1);
  if(ball.xdir > 0){
    ball.xdir = 1;
  }else{ 
    ball.xdir = -1;
  }
  if(ball.ydir > 0){
    ball.ydir = 1;
  }else{
    ball.ydir = -1;
  }
  plays.splice(0,1);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  rect(x, y, 15, 140);
  fill(0, 0, 255);
  rect(x2, y2, 15, 140);
  for(var i=0; i<plays.length; i++){
    plays[i].display();
  }
  ball.show();
  ball.update();
  for (i = 0; i < touches.length; i++) {  //for touchscreen mobiles
    if(touches[i].x > 683){
      if(touches[i].y < 70){
        y2 = 0;
      }
      else if(touches[i].y > height-70){
        y2 = height-140;
      }
      else if(y2 >= 0 && y2 <= height-140){
        y2 = touches[i].y - 70;
      }
    }
    else if(touches[i].x < 683){
      if(touches[i].y < 70){
        y = 0;
      }
      else if(touches[i].y > height-70){
        y = height-140;
      }
      else if(y >= 0 && y <= height-140){
        y = touches[i].y - 70;
      }
    }
  }
  if(backsong.isLoaded()){
      if(int(backsong.currentTime()) == int(backsong.duration())-1){
        backsong.play();
      }
  }
}

//playing in keyboard
function keypad(){
   if(keyIsDown(87) && y > 0){ //key W
     y -= 10;
   }
   else if(keyIsDown(83) && y < height-140){ //key S
     y += 10;
   }
   if(keyIsDown(104) && y2 > 0){ //key NUMPAD 8
     y2 -= 10;
   }
   else if(keyIsDown(98) && y2 < height-140){ //key NUMPAD 2
     y2 += 10;
   }
   if(keyIsDown(13)){
     starts();
   }
}

function touchMoved() {
  return false;
}

//play using gamepad(xbox controller)
var start;
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function() {
  var gp = navigator.getGamepads()[0];
  //gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";

  gameLoop();
});

window.addEventListener("gamepaddisconnected", function() {
  //gamepadInfo.innerHTML = "Waiting for gamepad.";

  rAFStop(start);
});

if(!('GamepadEvent' in window)) {
  // No gamepad events available, poll instead.
  var interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if(gp) {
      //gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads){
    return;}

  if(gamepads[0]){
    var gp = gamepads[0];
      if (buttonPressed(gp.buttons[13]) || gp.axes[1] > 0.5) {
        if(y < height-140){
          y+=5;
        }
      } else if (buttonPressed(gp.buttons[12]) || gp.axes[1] < -0.5) {
        if(y > 0){
          y-=5;
        }
      }
      if(buttonPressed(gp.buttons[9])){
        starts();
      }
  }
  if(gamepads[1]){
    gp = gamepads[1];
      if(buttonPressed(gp.buttons[0]) || gp.axes[3] > 0.5) {
        if(y2 < height-140){
          y2+=5;
        }
      } else if(buttonPressed(gp.buttons[3]) || gp.axes[3] < -0.5) {
        if(y2 > 0){
          y2-=5;
        }
      }
  }
  start = rAF(gameLoop);
}


//creating ball object
function Ball(){
  this.x = width/2;
  this.y = height/2 - 15;
  this.r = 20;
  this.speed = 5;
  this.xdir = 0;
  this.ydir = 0;
  this.sc1 = 0;
  this.sc2 = 0;
  this.count = 0;
  
  this.show = function(){
    fill(0, 255, 0);
    noStroke();
    circle(this.x, this.y, this.r);
    textSize(25);
    fill(255, 0, 0);
    text("Score: ", 250, 50);
    text(this.sc1, 330, 50);
    fill(0, 0, 255);
    text("Score: ", 1050, 50);
    text(this.sc2, 1130, 50);
  };
  
  this.update = function(){
    hit.rate(0.6);
    this.y += this.speed * this.ydir;  //to move the ball
    this.x += this.speed * this.xdir;
    
    //boundary conditions of the ball
    if(this.x < x+15+this.r/2 && this.x > x+this.r/2 && this.y > y-this.r/2 && this.y < y+140+this.r/2){
      this.xdir = 1;
      this.count++;
      hit.play();
    }
    if(this.y < this.r/2 || this.y > height-this.r/2){
      this.ydir *= -1;
       hit2.play();
    }
    if(this.x > x2-this.r/2 && this.x < x2+15-this.r/2 && this.y > y2-this.r/2 && this.y < y2+140+this.r/2){
      this.xdir = -1;
      this.count++;
      hit.play();
    }
    if(this.y > y && this.y < y+40 && this.x < x+15+this.r/2 && this.x > x+this.r/2){
      this.ydir = -1;
    }
    if(this.y > y+100 && this.y < y+140 && this.x < x+15+this.r/2 && this.x > x+this.r/2){
      this.ydir = 1;
    }
    if(this.y > y2 && this.y < y2+40 && this.x > x2-this.r/2 && this.x < x2+15-this.r/2){
      this.ydir = -1;
    }
    if(this.y > y2+100 && this.y < y2+140 && this.x > x2-this.r/2 && this.x < x2+15-this.r/2){
      this.ydir = 1;
    }
    
    if(this.x > width-this.r/2){  //if player2 loses ball
      miss.play();
      this.sc1 += 1;
      background(255);
      this.x = width/2;
      this.y = height/2;
      this.count = 0;
      this.speed = 5;
    }
    if(this.x < this.r/2){   //if player1 loses ball
      miss.play();
      background(255);
      this.sc2 += 1;
      this.x = width/2;
      this.y = height/2;
      this.count = 0;
      this.speed = 5;
    }
    let m = map(this.speed, 5, 15, 1, 1.5);
    backsong.rate(m);
    if(this.count > 3){
      this.count = 0;
      this.speed++;
    }
  };
}
//play object to display initial gamecover
function Play(){
  this.display = function(){
    textSize(50);
    fill('blue');
    rect(483, 250, 200, 60);
    fill('red');
    text("PING", 526, 298);
    textSize(50);
    fill('red');
    rect(683, 250, 200, 60);
    fill('blue');
    text("PONG", 713, 298);
  };
}
