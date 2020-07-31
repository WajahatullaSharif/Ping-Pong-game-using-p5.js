var backsong, hit, hit2, miss;
var vsflag = 0, restartflag = 0;
var x = 200, y = 250;
var x2 = 1166, y2 = 250;
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

function setup(){
  window.addEventListener("resize", function(event) {
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
})
  createCanvas(document.body.clientWidth, document.body.clientHeight);
  myfont2 = loadFont("../fonts/ToetheLineless.ttf");
  myfont = loadFont("../fonts/SlimThinPixelettes.otf");
  backsong = loadSound("../audio/FunkSoul.wav", loaded);
  backsong.playMode('restart');
  backsong.setVolume(0.5);
  hit = loadSound("../audio/breviceps__wet-click.wav");
  hit2 = loadSound("../audio/moogy73__click02.wav");
  miss = loadSound("../audio/gusgus26__click-05.wav");
  startbutton = loadImage('../icons/single.png',draw);
  vsbutton = loadImage('../icons/image.png',draw);
  music = loadImage('../icons/soundwhite.png');
  nomusic = loadImage('../icons/nosoundwhite.png');
  //sfx = loadImage('../icons/SFX.png');
  //nosfx = loadImage('../icons/noSFX.png');
  day = loadImage('../icons/day.png');
  night = loadImage('../icons/night.png');
  ball = new Ball();
  plays.push(new Play());
}

function loaded(){
  startclicked = 0;
  vsclicked = 0;
}

function mouseClicked(){
  if(mouseX > 570 && mouseX < 650 && mouseY > 370 && mouseY < 410 && startclicked == 0){
    startclicked = 1;
    vsclicked = 1;
    vsstarts();
  }
  else if(mouseX > 720 && mouseX < 820 && mouseY > 350 && mouseY < 450 && vsclicked == 0){
    startclicked = 1;
    vsclicked = 1;
    starts();
  }
  else if(mouseX > 1300 && mouseX < 1350 && mouseY > 60 && mouseY < 110){
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
  else if(mouseX > 1280 && mouseX < 1360 && mouseY > 20 && mouseY < 50){
    dark *= -1;
  }
  //else if(mouseX > 1300 && mouseX < 1350 && mouseY > 100 && mouseY < 150){
    //sfxflag *= -1;
  //}
  else if(mouseX > 560 && mouseX < 800 && mouseY > 480 && mouseY < 550){
    restart();
  }
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
  if(dark == 1){
    background(0);
    tint('white');
    image(night, 1280, 20, 80, 30);
  }
  else if(dark == -1){
    background(255);
    tint('white');
    image(day, 1280, 20, 80, 30);
  }
  if(startclicked == 0 && restartflag == 0){
    tint('red');
    image(startbutton,570,370,startx,starty);
    tint('blue');
    image(vsbutton,720,350,vsx,vsy);
  }
  if(mute == -1){
    tint(127,255,212, 125);
    image(music, 1300, 60, 50, 50);
  }else if(mute == 1){
    tint(200, 0 , 0, 180);
    image(nomusic, 1300, 60, 50, 50);
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
    if(touches[i].x > 683 && vsflag == 0){
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
    else if(touches[i].x < 683){
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
        text('you lose!',500, 200);
        text('better luck next time...', 280, 400);
      }else if(ball.sc1 == 5){
        if(dark == -1){
          fill(0);
        }else{
          fill(255);
        }
        textFont(myfont);
        textSize(100);
        text('you win!',500, 200);
        //text('better luck next time...', 280, 400);
      }
      textSize(30);
      textFont('default');
      fill('red');
      text('Press Space or X', 560, 530);
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

function keypad(){
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
   if(((keyIsDown(37)) || (mouseX > 570 && mouseX < 650 && mouseY > 370 && mouseY < 480)) && startx < 96){
     startx += 15;
     starty += 15;
     vsx = 100;
     vsy = 100;
   }else if(((keyIsDown(39))||(mouseX > 720 && mouseX < 820 && mouseY > 350 && mouseY < 450)) && vsx < 116){
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
   }else if((keyIsDown(32) ||keyIsDown(88))&& restartflag == 1){
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
    text(this.sc1, 575, 100);
    fill('blue');
    text(this.sc2, 740, 100);
    if(dark == -1){
      fill(0);
    }else{
      fill(255);
    }
    rect(665, 65, 30, 15);
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
        this.ai = 1166 - int(random(0, 140)) - this.x;
        if(this.ai < 10){
          this.ai = 10;
        }
        else if(this.ai > height-10-140){
          this.ai = height-10-140;
        }
      }else{
        this.ai = this.x - 711 + int(random(0,140));
        if(this.ai < 10){
          this.ai = 10;
        }
        else if(this.ai > height-10-140){
          this.ai = height-10-140;
        }
      }
      this.rand = int(random(0,100));
      this.rand2 = int(random(100,150));
      console.log(this.rand);
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
      y2 -=10;
    }
    else if(y2 < this.ai){
      y2 += 10;
    }
  };
  
}



function Play(){
  this.display = function(){
    fill(0, 255, 0);
    noStroke();
    circle(width/2, height/2 - 80, 40);
    textSize(100);
    textFont(myfont2);
    fill('blue');
    text("PING", 420, 248);
    textSize(100);
    fill('red');
    text("PONG", 713, 248);
    fill('red');
    rect(390, 148, 10, 100);
    fill('blue');
    rect(1003, 148, 10, 100);
    if(dark == -1){
      fill(0);
    }else{
      fill(255);
    }
    textSize(15);
    //textFont('default');
    text("version 2.0",1030, 530);
    rect(250, 50, 10, 500);
    rect(250, 550, 910, 10);
    rect(250, 50, 900, 10);
    rect(1150, 50, 10, 500);
    
    rect(265, 70, 5, 470);
    rect(320, 540, 825, 5);
    rect(265, 65, 825, 5);
    rect(1140, 70, 5, 475);
  };
}



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
