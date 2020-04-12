var x = 200;
var y = 250;
var x2 = 1166;
var y2 = 250;
var ball;
var plays = [];

function setup(){
  createCanvas(1366, 595);
  ball = new Ball();
  plays.push(new Play());
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
  for (i = 0; i < touches.length; i++) {
    if(touches[i].x > 683){
      y2 = touches[i].y - 100;
    }  
    else if(touches[i].x < 683){
      y = touches[i].y - 100;
    }
    if(touches[i].x>643 && touches[i].x<723 &&touches[i].y>34 && touches[i].y<69){
    ball.xdir = random(-1,2);
    ball.ydir = random(-1,2);
    ball.xconst = 1/abs(ball.xdir);
    ball.yconst = 1/abs(ball.ydir);
    plays.splice(0,1);
  }
  }
}

function keyPressed(){
  if(key == 'w'){
    y -= 20;
  }
  else if(key == 's'){
    y += 20;
  }
  else if(key == '8'){
    y2 -= 20;
  }
  else if(key == '2'){
    y2 += 20;
  }
}

function keyReleased(){
  if(key == 'w'){
    y -= 20;
  }
  else if(key == 's'){
    y += 20;
  }
  else if(key == '8'){
    y2 -= 20;
  }
  else if(key == '2'){
    y2 += 20;
  }
}

function touchMoved() {
  return false;
}

function mousePressed(){
  if(mouseX>643 && mouseX<723 && mouseY>332 && mouseY<368){
    ball.xdir = random(-1,2);
    ball.ydir = random(-1,2);
    ball.xconst = 1/abs(ball.xdir);
    ball.yconst = 1/abs(ball.ydir);
    plays.splice(0,1);
  }
}


function Ball(){
  this.x = width/2;
  this.y = height/2 - 15;
  this.r = 20;
  this.speed = 10;
  this.xdir = 0;
  this.ydir = 0;
  this.sc1 = 0;
  this.sc2 = 0;
  this.xconst = 0;
  this.yconst = 0;
  
  this.show = function(){
    fill(0, 255, 0);
    noStroke();
    circle(this.x, this.y, this.r);
    textSize(25);
    fill(255, 0, 0);
    text("Score: ", 200, 50);
    text(this.sc1, 280, 50);
    fill(0, 0, 255);
    text("Score: ", 1100, 50);
    text(this.sc2, 1180, 50);
  };
  
  this.update = function(){
    this.y += this.speed * this.ydir * this.yconst;
    this.x += this.speed * this.xdir * this.xconst;
    if(this.x < x+15+this.r/2 && this.x > x+this.r/2 && this.y > y-this.r/2 && this.y < y+140+this.r/2){
      this.xdir *= -1;
    }
    if(this.y < this.r/2 || this.y > height-this.r/2){
      this.ydir *= -1;
    }
    if(this.x > x2-this.r/2 && this.x < x2+15-this.r/2 && this.y > y2-this.r/2 && this.y < y2+140+this.r/2){
      this.xdir *= -1;
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
    
    if(this.x > width-this.r/2){
      this.sc1 += 1;
      background(255);
      this.x = width/2;
      this.y = height/2;
    }
    if(this.x < this.r/2){
      background(255);
      this.sc2 += 1;
      this.x = width/2;
      this.y = height/2;
    }
  };
}

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
    fill('yellow');
    ellipse(683, 350, 80, 35);
    textSize(15);
    fill(0);
    textStyle(BOLD);
    text("PLAY !", 660, 358);
  };
}
