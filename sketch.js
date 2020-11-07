var monkey , monkey_running, monkey_dead
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground
var rand
var gameState
var gameOver
var GOI

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  monkeyDead = loadAnimation("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  GOI = loadImage("you_are_dead_sao_by_xsougox_d5k1l9y-fullview.png")
 
}



function setup() {
  createCanvas(400,400)
  
  ground=createSprite(200,385, 400, 50)
  
  monkey=createSprite(50,330,20,20)
  monkey.addAnimation("run", monkey_running)
  monkey.addAnimation("oops", monkeyDead)
  monkey.scale=0.15
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  gameOver=createSprite(200,200,10,10)
  gameOver.addAnimation("pstt",GOI)
  gameOver.visible=false
  gameOver.scale=0.25
  
  score=0;

  monkey.setCollider("rectangle",0,0,monkey.width-300, monkey.height-170);

  gameState="play"

}


function draw() {
  background("#024b00")
  ground.shapeColor="#B67B65";
  monkey.collide(ground);
  
  
if (gameState==="end"){
  
    text('Oops! Press Space to restart! Your Score was '+score,95,300);
  if (keyWentUp("space")){
    reset();
  score=0;

  }
}
    monkey.velocityY = monkey.velocityY + 0.8
if (gameState==="play"){

  score = score + Math.round(getFrameRate()/60);
  monkey.changeAnimation("run",monkey_running)
  if(keyWentUp("space")&& monkey.y >= 313){
    monkey.velocityY=-12
    
  gameOver.visible=false
    
  }
  if (monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score=score+50
      }
    if (monkey.isTouching(obstacleGroup)){

      banana.lifetime=-1
      obstacle.lifetime=-1
      banana.velocityX=0
      obstacle.velocityX=0
      gameState="end"
      monkey.changeAnimation("oops", monkeyDead)
      gameOver.visible=true

      }

  

  text("Survival Time: "+ score, 300,50);
  spawnBananas();
  spawnRocks();
}
  drawSprites();
}

function spawnBananas(){
  if (frameCount % 100 === 0){
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(219,250));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.lifetime=500
    banana.velocityX = -8;
    foodGroup.add(banana)

  }
}

function spawnRocks(){
  if (frameCount % 90 === 0){
    obstacle = createSprite(600,350,40,10);
    obstacle.y = Math.round(random(340,370));
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime=500
    obstacleGroup.add(obstacle)
    

  }
}


function reset(){
  gameState="play";
  score=0;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();

}
