var monkey, banana, stone, jungle, monkey_img, banana_img, stone_img, jungle_img, stoneGroup, score, ground, bananaGroup;
function preload() {
  monkey_img = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  banana_img = loadImage("banana.png");
  
  jungle_img = loadImage("jungle.jpg");
  
  stone_img = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 300);
  
  jungle = createSprite(0, 0, 600, 300);
  jungle.addImage("jungle", jungle_img);
  jungle.scale = 1.2;
  jungle.velocityX = -5;
  
  ground = createSprite(300, 300, 600, 20);
  ground.visible = false;
  
  monkey = createSprite(100, 232, 20, 20);
  monkey.addAnimation("monkey", monkey_img);
  monkey.scale = 0.2;
  
  bananaGroup = createGroup();
  
  stoneGroup = createGroup();
  
  score = 0;
}

function draw() {
  background(220);
  
  if(jungle.x < 0)
    {
      jungle.x = 300;
    }
  
  monkey.collide(ground);
  
  if(keyDown("space"))
    {
      monkey.velocityY = -20;
    }
  
  monkey.velocityY = monkey.velocityY + 2;
  
  if(monkey.y<55)
    {
      monkey.velocityY = +2;
    }
  
  if(bananaGroup.isTouching(monkey))
  {
    score = score+2;
    banana.visible = false;
  }
  
  if(score%10 == 0)
    {
      switch(score){ 
          case 10: monkey.scale=0.22; 
          break; 
          case 20: monkey.scale=0.24; 
          break; 
          case 30: monkey.scale=0.26; 
          break; 
          case 40: monkey.scale=0.28; 
          break; 
          case 100: monkey.scale=0.30;
          break;
          case 200: monkey.scale=0.40;
          break;
          default: break; 
      }
    
    }
     
  if(stoneGroup.isTouching(monkey))
    {
      monkey.scale = 0.2;
    }
  
   
  spawnBanana();
  spawnStone();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500, 50);
}

function spawnBanana() {
  if(frameCount % 60 == 0)
    {
      banana = createSprite(600, 200, 20, 20);
      banana.addImage("banana", banana_img);
      banana.velocityX = -8;
      banana.y = Math.round(random(60,150));
      banana.scale = 0.05;
      banana.lifetime = 200;
      bananaGroup.add(banana);
      banana.depth = monkey.depth;
    }
}

function spawnStone() {
  if(frameCount %120 == 0)
    {
      stone = createSprite(600, 288, 10, 10);
      stone.addImage("stone", stone_img);
      stone.velocityX = -15;
      stone.lifetime = 180;
      stone.scale = 0.05;
      stoneGroup.add(stone);
      stone.depth = monkey.depth;
    }
}