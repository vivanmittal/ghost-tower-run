var END=0
var PLAY=1
var gameState=PLAY
var tower,towerImage
var door,doorImage
var climber,climberImage,climberGroup
var ghost,ghostImage
var invisibleBlock,invisibleBlockGroup

function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=2
  
  climberGroup=new Group()
  invisibleBlockGroup=new Group()
  ghost=createSprite(300,300)
  ghost.addImage(ghostImage)
  ghost.scale=0.5
}

function draw(){
  background(0);
if (gameState===PLAY){
  if(tower.y>400){
tower.y=300     
     }
  spawnDoors()
  
  if(keyDown("space")){
    ghost.velocityY=-10
      }
  ghost.velocityY+=0.5
  if(keyDown("left")){
    ghost.x-=10
  }
 if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  gameState=END 
  ghost.destroy() ;
 }
  
  
  if(keyDown("right")){
    ghost.x+=10
  }
  
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0
     }
  drawSprites()
}
  
  if(gameState===END){
    textSize(30)
    fill ("yellow")
    text("game over",230,250)
  }
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50) 
    door.addImage(doorImage)
    door.velocityY=2
    door.x=random(120,400)
    
  //for railings
    climber=createSprite(200,10)
    climber.addImage(climberImage)
    climber.velocityY=2
    climber.x=door.x
    climberGroup.add(climber)
    ghost.depth=door.depth
    ghost.depth+=1
  
  invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.velocityY=2
    invisibleBlock.x=door.x
    invisibleBlockGroup.add(invisibleBlock)
  }
  
}