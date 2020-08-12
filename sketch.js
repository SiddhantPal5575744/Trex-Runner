var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY=1;
var END=0;
var gamestate=PLAY;
var restart,restartImage,gameover,gameoverImage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImage=loadImage('restart.png');
  gameoverImage=loadImage('gameOver.png')
  
  
}

function setup() {
  createCanvas(600, 200);
  
  restart=createSprite(300,100,40,40);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  gameover=createSprite(300,50,40,40);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5;
  
  restart.visible=false;
  gameover.visible=false;
  
  
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
   score = 0;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
 
}

function draw() {
  background(180);
  console.log(trex.y);
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  trex.collide(invisibleGround);
  
  trex.velocityY = trex.velocityY + 0.8;
  if(gamestate===PLAY){
   ground.velocityX = -(4+(3*(score/100)));
  if(keyDown("space")&&trex.y>160) {
    trex.velocityY = -15;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       gamestate=END;
       }
 
}else if(gamestate===END) {
  ground.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  trex.changeAnimation('collided',trex_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  gameover.visible=true;
  restart.visible=true;
  
  if(mousePressedOver(restart)){
    score=0;
    gamestate=PLAY;
    gameover.visible=false;
    restart.visible=false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
  }
  
  
}
  
  
   drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.lifetime=210;
    cloudsGroup.add(cloud);
    cloud.velocityX=-(4+(3*(score/100)));
     
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(4+(3*(score/100))) ;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}