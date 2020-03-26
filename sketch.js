var Trex1,Trex,edges,Ground,ground1,iground,jump,die,checkp
var obj1,r1,cloudimage,cloud1,c1,score=0
var objt1,objt2,objt3,objt4,objt5,objt6,objtt,img1
var PLAY=0;
var END=1;
var gameState=PLAY
var cloudGroup,obsGroup,reset1,game1,reset,gameOver
function preload()
{
 Trex1=loadAnimation("trex1.png","trex3.png","trex4.png") 
  Ground=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  objt1=loadImage("obstacle1.png")
  objt2=loadImage("obstacle2.png")
  objt3=loadImage("obstacle3.png")
  objt4=loadImage("obstacle4.png")
  objt5=loadImage("obstacle5.png")
  objt6=loadImage("obstacle6.png")
  img1= loadImage("trex_collided.png")
  reset1=loadImage("restart.png")
  game1=loadImage("gameOver.png")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkp=loadSound("checkPoint.mp3")
}

function setup() {
createCanvas(600,200);
  obj1=createSprite(300,190,600,10)
  obj1.visible=false
  Trex=createSprite(200,190,20,20)
  Trex.addAnimation("trexx",Trex1)
  Trex.scale=0.7
  ground1=createSprite(300,190,600,10)
  ground1.addImage("ground11",Ground)
  edges=createEdgeSprites()
  Trex.x=50
  iground=createSprite(300,196,600,10)
  iground.visible=false
  cloudGroup=createGroup();
  obsGroup=createGroup();
  Trex.debug=true
 Trex.setCollider("circle",0,0,40)
 reset=createSprite(300,100,10,10)
 gameOver=createSprite(300,50,10,10)
    gameOver.addImage("game1",game1)
    reset.addImage("reset1",reset1)
    gameOver.scale=0.5
    reset.scale=0.5
}

function draw() {
  background("white");
  drawSprites()
  text(score,580,20)
  r1=Math.round(random(1,100))
  //console.log(r1)
  if(gameState===PLAY)
  { 
    reset.visible=false
    gameOver.visible=false
    score=Math.round(frameCount/10)
    if(score%100===0&&score>0) 
    {
      checkp.play()
      //ground1.velocityX=-10
    }
    spawnClouds();
    spawnObjt();
    if(ground1.x<0)
  { ground1.x=ground1.width/2
  }
    if(keyDown("space")&&Trex.y>=151)
  {
    
  Trex.velocityY=-10
    jump.play()
  }
  Trex.velocityY= Trex.velocityY+0.6
    if(keyDown("space"))
  {
    ground1.velocityX=-(5+3*score/100)
    
  }
  if(Trex.isTouching(obsGroup))
     { 
       gameState=END
      // Trex.velocityY=-12
       Trex.addImage("trexx",img1)
       die.play()
     } 
    
    
  }
  else if(gameState===END)
  {
    reset.visible=true
    gameOver.visible=true
    Trex.velocityY=0
    ground1.velocityX=0
    cloudGroup.setVelocityXEach(0)
    obsGroup.setVelocityXEach(0)
    obsGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    
    
  }
  if(mousePressedOver(reset)&&gameState===END)
 
  {
    score=0
    frameCount=0
    gameState=PLAY
    gameOver.visible=false
    reset.visible=false
    obsGroup.destroyEach()
    cloudGroup.destroyEach()
    Trex.addAnimation("trexx",Trex1)
    
    
    
  }
  

  
  
  
   Trex.collide(iground)
                
  
}
function spawnClouds()

{
  if(frameCount%60===0)
     { 
       
  cloud1=createSprite(600,10)
  cloud1.addImage("rtr",cloudimage)
  cloud1.lifetime=120
  cloud1.y=random(50,150)
  cloud1.velocityX=-5
  console.log(cloud1.depth)
       Trex.depth=cloud1.depth+1
  cloudGroup.add(cloud1)     
     }
  
}
function  spawnObjt()
{ if (frameCount%100===0) 
{
 
  objtt=createSprite(600,170)
  //objtt.lifetime=150
  objtt.velocityX=-(4+3*score/20)
  var r11=Math.round(random(1,6))
  objtt.scale=0.8
  objtt.debug=true
  obsGroup.add(objtt)
  switch(r11)
  { 
    case 1:objtt.addImage("o1", objt1)
      break;
      case 2:objtt.addImage("o2",objt2)
      break;
      case 3: objtt.addImage("o3",objt3)
      break
      case 4:objtt.addImage("o4",objt4)
      break
      case 5: objtt.addImage("o5",objt5)
      break
      case 6: objtt.addImage("o6", objt6)
      break
      default:break
      
}
}
}

