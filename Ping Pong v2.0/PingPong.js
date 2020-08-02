var backsong, hit, hit2, miss;
var vsflag = 0, restartflag = 0,startsflag=0;
var x, y;
var x2, y2=500;
var ball, plays = [];
var myfont, myfont2;
let startbutton, vsbutton;
var startclicked = 2, vsclicked = 2;
var mode, dark = -1;
var sound, mute = -1;
var sfxflag = -1;
let music, nomusic, sfx, nosfx, day, night;
var startx = 80, starty = 40;
var vsx = 100, vsy = 100;
var xp = 0.25, yp = 0.25;

function setup(){
  window.addEventListener("resize", function(event) {
    //console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
});
  createCanvas(document.body.clientWidth, document.body.clientHeight);
  myfont2 = loadFont("fonts/ToetheLineless.ttf");
  myfont = loadFont("fonts/SlimThinPixelettes.otf");
  backsong = loadSound("audio/FunkSoul.wav", loaded);
  backsong.playMode('restart');
  backsong.setVolume(0.5);
  hit = loadSound("audio/breviceps__wet-click.wav");
  hit2 = loadSound("audio/moogy73__click02.wav");
  miss = loadSound("audio/gusgus26__click-05.wav");
  startbutton = loadImage('icons/single.png',draw);
  vsbutton = loadImage('icons/image.png',draw);
  music = loadImage('icons/soundwhite.png');
  nomusic = loadImage('icons/nosoundwhite.png');
  //sfx = loadImage('icons/SFX.png');
  //nosfx = loadImage('icons/noSFX.png');
  day = loadImage('icons/day.png');
  night = loadImage('icons/night.png');
  //lose = loadImage('icons/hahayoulose.png');
  ball = new Ball();
  plays.push(new Play());
}

function loaded(){
  startclicked = 0;
  vsclicked = 0;
  x = 200; 
  y = height/2 - 45;
  x2 = width - 200; 
  //y2 = height/2 - 45;
}

function starts(){
  startsflag = 1;
  backsong.rate(1.1);
  if(mute == -1){
    backsong.play();
  }
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

function vsstarts(){
  vsflag = 1;
  backsong.rate(1.1);
  if(mute == -1){
    backsong.play();
  }
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
    var xx = xp*width;
    var yy = yp*height;
  if(dark == 1){
    background(0);
    tint('white');
    image(night, width-86, 20, 80, 30);
  }
  else if(dark == -1){
    background(255);
    tint('white');
    image(day, width-86, 20, 80, 30);
  }
  if(startclicked == 0 && restartflag == 0){
    tint('red');
    image(startbutton,xx+320,yy+350,startx,starty);
    tint('blue');
    image(vsbutton,xx+470,yy+300,vsx,vsy);
  }
  if(mute == -1){
    tint(127,255,212, 125);
    image(music, width-66, 60, 50, 50);
  }else if(mute == 1){
    tint(200, 0 , 0, 180);
    image(nomusic, width-66, 60, 50, 50);
  }
  /*if(sfxflag == -1){
    tint(0, 153, 204, 126);
    image(sfx, 1300, 115, 50, 50);
  }else if(sfxflag == 1){
    tint('grey');
    image(nosfx, 1300, 115, 50, 50);
  }*/
  for(var i=0; i<plays.length; i++){
    plays[i].display();
  }
  if(vsclicked == 1 && restartflag == 0){
    if(dark == -1){
      fill(0);
    }else{
      fill(255);
    }
    rect(0, 0, 10, height);
    rect(width-10, 0, 10, height);
    rect(0, 0, width, 10);
    rect(0, height-10, width, 10);
    fill(255, 0, 0);
    rect(x, y, 15, 140);
    fill(0, 0, 255);
    rect(x2, y2, 15, 140);
    ball.show();
    ball.update();    
  }
  if(vsflag){
    ball.singleloc();
    ball.singlep();
  }
  keypad();
  for (i = 0; i < touches.length; i++) {
    if(touches[i].x > 150 + width/3 && touches[i].x < 390 + width/3 && touches[i].y > 380 + height/3 && touches[i].y < 450 + height/3 && (ball.sc1==5||ball.sc2==5)){
      restart();
    }
    if(touches[i].x > width/2 && vsflag == 0){
      if(touches[i].y < 10+70){
        y2 = 10;
      }
      else if(touches[i].y > height-10-70){
        y2 = height-10-140;
      }
      else if(y2 >= 10 && y2 <= height-10-140){
        y2 = touches[i].y - 70;
      }
    }
    else if(touches[i].x < width/2){
      if(touches[i].y < 10+70){
        y = 10;
      }
      else if(touches[i].y > height-10-70){
        y = height-10-140;
      }
      else if(y >= 10 && y <= height-10-140){
        y = touches[i].y - 70;
      }
    }
  }
    if(backsong.isLoaded()){
      if(int(backsong.currentTime()) == int(backsong.duration())-1){
        backsong.play();
      }
    }
    if(ball.sc2 == 5 || ball.sc1 == 5){
      if(ball.sc2 == 5){
        if(dark == -1){
          fill(0);
        }else{
          fill(255);
        }
        textFont(myfont);
        textSize(100);
        if(vsflag){
          text('you lose!', 100 + width/3, height/3);
          text('better luck next time...', width/4, 200 + height/3);
        }
        else if(startsflag){
          text('Player 2 wins!', width/2 - 300, height/2);
        }
      }else if(ball.sc1 == 5){
        if(dark == -1){
          fill(0);
        }else{
          fill(255);
        }
        textFont(myfont);
        textSize(100);
        if(vsflag){
          text('you win!', width/2 - 200, height/2);
        }
        else if(startsflag){
          text('Player 1 wins!', width/2 - 300, height/2);
        }
      }
      textSize(30);
      textFont('default');
      fill('red');
      text('Press Space or X', 150 + width/3, 400 + height/3);
      backsong.stop();
      restartflag = 1;
      startclicked = 1;
      vsclicked = 1;
    }
}

function restart(){
  restartflag = 0;
  startclicked = 0;
  vsclicked = 0;
  vsflag = 0;
  ball = new Ball();
  plays.push(new Play());
}

function mouseClicked(){
    var xx = xp*width;
    var yy = yp*height;
  if(mouseX > xx+320 && mouseX < xx+400 && mouseY > yy+350 && mouseY < yy+390 && startclicked == 0){
    startclicked = 1;
    vsclicked = 1;
    vsstarts();
  }
  else if(mouseX > xx+470 && mouseX < xx+570 && mouseY > yy+300 && mouseY < yy+400 && vsclicked == 0){
    startclicked = 1;
    vsclicked = 1;
    starts();
  }
  else if(mouseX > width-66 && mouseX < width-16 && mouseY > 60 && mouseY < 110){
    mute *= -1;
    if(mute == 1 && vsclicked == 1 && startclicked == 1){
      backsong.stop();
      sfxflag = 1;
    }
    else if(mute == -1 && vsclicked == 1 && startclicked == 1){
     backsong.play();
     sfxflag = -1;
    }
  }
  else if(mouseX > width-86 && mouseX < width && mouseY > 20 && mouseY < 50){
    dark *= -1;
  }
  //else if(mouseX > 1300 && mouseX < 1350 && mouseY > 100 && mouseY < 150){
    //sfxflag *= -1;
  //}
  else if(mouseX > 150 + width/3 && mouseX < 390 + width/3 && mouseY > 380 + height/3 && mouseY < 450 + height/3 && (ball.sc1==5||ball.sc2==5)){
    restart();
  }
}

function keypad(){
    var xx = xp*width;
    var yy = yp*height;
   if(keyIsDown(87) && y > 10){ //key W
     y -= 10;
   }
   else if(keyIsDown(83) && y < height-10-140){ //key S
     y += 10;
   }
   if(keyIsDown(104) && y2 > 10 && vsflag == 0){ //key NUMPAD 8
     y2 -= 10;
   }
   else if(keyIsDown(98) && y2 < height-10-140 && vsflag == 0){ //key NUMPAD 2
     y2 += 10;
   }
   if(((keyIsDown(37)) || (mouseX > xx+320 && mouseX < xx+400 && mouseY > yy+350 && mouseY < yy+390)) && startx < 96){
     startx += 15;
     starty += 15;
     vsx = 100;
     vsy = 100;
   }else if(((keyIsDown(39))||(mouseX > xx+470 && mouseX < xx+570 && mouseY > yy+300 && mouseY < yy+400)) && vsx < 116){
     vsx += 15;
     vsy += 15;
     startx = 80;
     starty = 40;
   }
   if(keyIsDown(13) && startx > 80 && (vsclicked == 0 || startclicked == 0)){
     startclicked = 1;
     vsclicked = 1;
     vsstarts();
   }else if(keyIsDown(13) && vsx > 100 && (vsclicked == 0 || startclicked == 0)){
     startclicked = 1;
     vsclicked = 1;
     starts();
   }else if((keyIsDown(32) || keyIsDown(88)) && restartflag == 1){
     restart();
   }
}

function touchMoved() {
  return false;
}

var start;
var sp = 0;
var mp = 0;
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
    gameLoop();
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
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
        if(y < height-10-140){
          y+=10;
        }
      } else if (buttonPressed(gp.buttons[12]) || gp.axes[1] < -0.5) {
        if(y > 10){
          y-=10;
        }
      }
      if(buttonPressed(gp.buttons[0]) && startx > 80 && vsclicked == 0){
        startclicked = 1;
        vsclicked = 1;
        vsstarts();
      }else if(buttonPressed(gp.buttons[0]) && vsx > 100 && startclicked == 0){
        startclicked = 1;
        vsclicked = 1;
        starts();
      }
      if(gp.axes[0] > 0.5 && vsx < 116){
        vsx += 20;
        vsy += 20;
        startx = 80;
        starty = 40;
      }else if(gp.axes[0] < -0.5 && startx < 96){
        startx += 15;
        starty += 15;
        vsx = 100;
        vsy = 100;
      }
      if(buttonPressed(gp.buttons[4])){
        for(i=0;i<50000000;i++){
          sp++;
        }
        sp = 0;
        dark *= -1;
      }
      if(buttonPressed(gp.buttons[5])){
        for(i=0;i<50000000;i++){
          sp++;
        }
        sp = 0;
        mute *= -1;
        if(mute == 1 && vsclicked == 1 && startclicked == 1){
          backsong.stop();
        }
        else if(mute == -1 && vsclicked == 1 && startclicked == 1){
         backsong.play();
        }
      }
  }
  if(gamepads[1]){
    gp = gamepads[1];
      if(buttonPressed(gp.buttons[0]) || gp.axes[3] > 0.5) {
        if(y2 < height-10-140){
          y2+=10;
        }
      } else if(buttonPressed(gp.buttons[3]) || gp.axes[3] < -0.5) {
        if(y2 > 10){
          y2-=10;
        }
      }
  }
 start = rAF(gameLoop);
}




function Ball(){
  this.x = width/2;
  this.y = height/2 - 80;
  this.d = 20;
  this.speed = 7;
  this.xdir = 0;
  this.ydir = 0;
  this.sc1 = 0;
  this.sc2 = 0;
  this.count = 0;
  this.flag = 0;
  this.ai = 250;
  this.temp = 0;
  this.rand = 0;
  this.rand2 = 0;
  
  this.show = function(){
    fill(0, 255, 0);
    noStroke();
    circle(this.x, this.y, this.d);
    textSize(75);
    textFont(myfont2);
    fill('red');
    text(this.sc1, width/2 - 108, 100);
    fill('blue');
    text(this.sc2, width/2 + 57, 100);
    if(dark == -1){
      fill(0);
    }else{
      fill(255);
    }
    rect(width/2 - 18, 65, 30, 15);
  };
  
  this.update = function(){
    hit.rate(0.6);
    this.y += this.speed * this.ydir;
    this.x += this.speed * this.xdir;
    if(this.x < x+15+this.d/2 && this.x > x+this.d/2 && this.y > y-this.d/2 && this.y < y+140+this.d/2){
      this.xdir = 1;
      this.count++;
      if(sfxflag == -1){
        hit.play();
      }
    }
    if(this.y < 10 + this.d/2 || this.y > height-10-this.d/2){
      this.ydir *= -1;
      if(sfxflag == -1){
        hit2.play();
      }
    }
    if(this.x > x2-this.d/2 && this.x < x2+15-this.d/2 && this.y > y2-this.d/2 && this.y < y2+140+this.d/2){
      this.xdir = -1;
      this.count++;
      this.fail++;
      if(sfxflag == -1){
        hit.play();
      }
      
    }
    if(this.y > y-this.d/2 && this.y < y+40 && this.x < x+15+this.d/2 && this.x > x+this.d/2){
      this.ydir = -1;
    }
    if(this.y > y+100 && this.y < y+140+this.d/2 && this.x < x+15+this.d/2 && this.x > x+this.d/2){
      this.ydir = 1;
    }
    if(this.y > y2-this.d/2 && this.y < y2+40 && this.x > x2-this.d/2 && this.x < x2+15-this.d/2){
      this.ydir = -1;
    }
    if(this.y > y2+100 && this.y < y2+140+this.d/2 && this.x > x2-this.d/2 && this.x < x2+15-this.d/2){
      this.ydir = 1;
    }
    
    if(this.x > width-10-this.d/2){
      if(sfxflag == -1){
        miss.play();
      }
      this.sc1 += 1;
      background(255);
      this.x = width/2;
      this.y = height/2;
      this.count = 0;
      this.speed = 6;
    }
    if(this.x < 10 + this.d/2){
      if(sfxflag == -1){
        miss.play();
      }
      background(255);
      this.sc2 += 1;
      this.x = width/2;
      this.y = height/2;
      this.count = 0;
      this.speed = 6;
    }
    let m = map(this.speed, 7, 17, 1, 1.5);
    backsong.rate(m);
    if(this.count > 2){
      this.count = 0;
      this.speed++;
    }  
  };
  
  this.singlep = function(){
    if(this.y < 10 + this.d/2 || this.y > height-10-this.d/2){
      if(this.xdir == 1){
        this.flag = 1;
      }
    }
    if(this.flag == 1){
      this.flag = 0;
      if(this.y < 10 + this.d/2){
        this.ai = width-200 - int(random(0, 140)) - this.x;
        if(this.ai < 10){
          this.ai = 10;
        }
        else if(this.ai > height-10-140){
          this.ai = height-10-140;
        }
      }else{
        this.ai = height-(width-200  - this.x + int(random(70, 140)));
        //this.ai = this.x - 695 - 140;
        if(this.ai < 10){
          this.ai = 10;
        }
        else if(this.ai > height-10-140){
          this.ai = height-10-140;
        }
      }
      this.rand = int(random(0,100));
      this.rand2 = int(random(100,150));
      if(this.rand % 5 == 0 && this.speed > 7){
        if(this.ai + this.rand2 > height-10-140){
          this.ai -= this.rand2;
        }
        else if(this.ai - this.rand2 < 10){
          this.ai += this.rand2;
        }
      }
      
      this.temp = this.ai % 10;
      if(this.temp > 5){
        this.ai += int(10-this.temp);
      }
      else{
        this.ai -= this.temp;
      }
    }
  };
  
  this.singleloc = function(){
    if(y2 > this.ai){
      y2 -= 10;
    }
    else if(y2 < this.ai){
      y2 += 10;
    }
  };
  
}



/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (i=0; i<gamepad.axes.length; i++) {
    e = document.createElement("progress");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();
  for (var j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
  }
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addgamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 500);
}



function Play(){
  this.display = function(){
    var xx = xp*width;
    var yy = yp*height;
    fill(0, 255, 0);
    noStroke();
    circle(xx+433, yy+168, 40);
    textSize(100);
    textFont(myfont2);
    fill('blue');
    text("PING", xx+170, yy+198);
    textSize(100);
    fill('red');
    text("PONG", xx+463, yy+198);
    fill('red');
    rect(xx+140, yy+98, 10, 100);
    fill('blue');
    rect(xx+753, yy+98, 10, 100);
    if(dark == -1){
      fill(0);
    }else{
      fill(255);
    }
    textSize(15);
    //textFont('default');
    text("version 2.0",xx+780, yy+480);
   
    rect(xx, yy, 10, 500);//l
    rect(xx, yy+500, 910, 10);//d
    rect(xx, yy, 900, 10);//u
    rect(xx+900, yy, 10, 500);//r
    
    rect(xx+15, yy+20, 5, 470);
    rect(xx+70, yy+490, 825, 5);
    rect(xx+15, yy+15, 825, 5);
    rect(xx+890, yy+20, 5, 475);
    
    text("INSTRUCTIONS:", 100, 30);
    textFont('default');
    text("1.Use 'W' and 'S' to move paddle in single player", 10, 70);
    text("2.Use NUM8 and NUM2 for player 2 in multiplayer", 10, 90);
    text("3.Everytime ball touches the paddle 3 times, speed is increased.", 10, 110);
    text("4.The one who scores 5 points first, wins the game!", 10, 130);
    textFont(myfont2);
    text("Developed by: Wajahatulla Sharif", 20, height-20);
  };
}
