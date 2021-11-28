var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girlImg, zombie, zombieImg
var rock, rockGroup, rockImg , forest, forestImg
var gameOver, gameOverImg
var ground, invisibleGround

var score;


function preload(){
 
    girlImg = loadImage("Girl.jpg");
    zombieImg = loadImage("Zombie girl.png");
    forestImg = loadImage("Forest.jpg");
    rockImg = loadImage("rock.jpg");
    gameOverImg = loadImage("gameOver.png")
    }
    
    function setup() {
        createCanvas(600, 200);
        
        girl = createSprite(50,180,20,50);
        girl.addImage("girl", girlImg);
        girl.scale = 0.5;
        
        ground = createSprite(200,180,400,20);

        forest = createSprite(600, 200)
        forest.addImage("forest", forestImg)

        ground.x = ground.width /2;
        gameover = createSprite(300,100) 
        gameover.addImage(gameOverImg)
        gameover.scale = 0.5

        invisibleGround = createSprite(200,190,400,10);
        invisibleGround.visible = false; 

        rocksGroup = createGroup();
        girl.setCollider("circle",0,0,40);

        score = 0
    }

    function draw (){
        background(0)
    
        text("Score: "+ score, 500,50);
  
        console.log("this is ",gameState)

        if(gameState === PLAY){
            ground.velocityX = -4;
            score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& girl.y >=100) {
        girl.velocityY = -13;
    }
    gameover.visible = false;
    girl.velocityY = girl.velocityY + 0.8

    spawnRocks();

    if(rocksGroup.isTouching(girl)){
        gameState = END;
    }
    else if (gameState === END) {
        ground.velocityX = 0;
      girl.velocityY = 0;
      
       rocksGroup.setLifetimeEach(-1);
        rocksGroup.setVelocityXEach(0);
       gameover.visible = true;
      
        }
    }
    girl.collide(invisibleGround);

  
  drawSprites();
     restartSprites();
    }

    function spawnRocks() {
        //write code here to spawn the clouds
         if (frameCount % 100 === 0) {
           rock = createSprite(10,165,10,40);
         rock.y = Math.round(random(10,60));
          rock.addImage(rockImg);
          rock.scale = 0.5;
          rock.velocityX = -3;
          
           //assign lifetime to the variable
           rock.lifetime = 210;
          
          //adjust the depth
          rock.depth = girl.depth;
          girl.depth = girl.depth + 1;
          
          //adding cloud to the group
         rocksGroup.add(rock);
          }
        }
