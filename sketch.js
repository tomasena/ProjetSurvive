var posX;
var posY;
var LONG_X = 640;
var LONG_Y = 480;
var posObstacleX;
var posObstacleY;
var direction;
var estDirH;
var estTouche = false;
var millisecond;
var sec;

function updatePositionCercle(){
  let px = posX;
  let py = posY;
  if(keyIsDown(RIGHT_ARROW)){
    px += 5;
  } else  if(keyIsDown(LEFT_ARROW)){
    px -= 5;
  } else if(keyIsDown(UP_ARROW)){
    py -= 5;
  } else if(keyIsDown(DOWN_ARROW)){
    py += 5;
  } 
  if (! isOutOfScreen(px,py)) {
    posX = px;
    posY = py;
  }
  if (! isBorderOfScreen(posX,posY)) {
    stroke('black');
    strokeWeight(2);
  }
  else {
    stroke('red');
    strokeWeight(2);
  }
}
function updatePositionObstacle(){
  if (isOutOfScreen(posObstacleX,posObstacleY)) {
    direction = direction * -1;
  }
  if (estDirH){
    posObstacleY = posObstacleY + direction * 5 ;
  } else {
    posObstacleX = posObstacleX + direction * 5 ;
  }
}

function isBorderOfScreen(px,py){
  return px <= 0 || py <= 0 || px >= LONG_X || py >= LONG_Y;
}


function isOutOfScreen(px,py){
  return px < 0 || py < 0 || px > LONG_X || py > LONG_Y;
}

function testCollision(){
  if (distance(posObstacleX,posObstacleY,posX,posY) <= 30) {
    estTouche = true;
    return true;
  }
}

function distance(x1,y1,x2,y2){
  let d = sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  return d;
}


function setup(){
  millisecond = millis();
  posObstacleX = random(0, LONG_X);
  posObstacleY = random(0, LONG_Y);
  posX = random(100, LONG_X-100);
  posY = random(100, LONG_X-100);
  if (random(0,10)<5)
  direction = 1;
  else
    direction = -1;
  if (random(0,10)<5)
    estDirH = true;
  else
    estDirH = false;
  createCanvas(LONG_X, LONG_Y);
}

function draw(){
    if (!estTouche) {
      updatePositionCercle();
      updatePositionObstacle();
      }    
    background(220);
    if (testCollision()){
      fill("red");
    } else{
      fill("white");
    }
    ellipse(posX,posY,50,50);
    fill ('red');
    ellipse(posObstacleX,posObstacleY,10,10);

    line(0,0,LONG_X,0);
    line(0,0,0,LONG_Y);
    line(0,LONG_Y-1,LONG_X,LONG_Y-1);
    line(LONG_X,0,LONG_X,LONG_Y);

    fill("white");
    if (estTouche) {
      textSize(26);      
      text("Votre score : " + sec + " secondes",LONG_X/2-150,LONG_Y/2-20);
    } else {
      sec =  round((millis() - millisecond) / 1000);
      text(sec + " sec",LONG_X-50,LONG_Y-10);
    }
    
}

