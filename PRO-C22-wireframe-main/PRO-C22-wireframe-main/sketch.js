const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var angle
var balls=[]
var boats=[]

function preload() {

backgroundimg=loadImage("./assets/background.gif")
towerimg=loadImage("./assets/tower.png")
 
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)
  angle=15


  var options={
    isStatic:true
  }
  ground=Bodies.rectangle(0,height-1,width*2,4,options)
  World.add(world,ground)
   
  tower=Bodies.rectangle(160,350,160,310,options)
  World.add(world,tower)
 
  Canon=new canon(180,110,130,100,angle)
  
  
}

function draw() {
  image(backgroundimg,0,0,1200,600)
 
  Engine.update(engine);
  fill("black")
  rect(ground.position.x,ground.position.y,width*2,4)
  push()
  imageMode(CENTER)
  image(towerimg,tower.position.x,tower.position.y,160,310)
  pop()

  for(var i=0;i<balls.length;i++){
  showcanonball(balls[i])
  collisionWithBoat(i)
  }
  Canon.display()
  showboats()

 
  // 3.14/180 angle to radian
  // 180/3.14 radian to angle
  

}


function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot()
  } 

}

function keyPressed(){
  if(keyCode===32)
  {
    canonBall=new canonball(Canon.x,Canon.y)
    canonBall.trajectry=[]
    Matter.Body.setAngle(canonBall.body,canon.angle)
    balls.push(canonBall)
  }
}

function showcanonball(ball){
  if(ball){
    ball.display()
  if(ball.body.position.x>=width||ball.body.position.y>=height-50){
    ball.remove(index)
  }
  }
}

function showboats(){
  if(boats.length>0){
    if(boats[boats.length-1]===undefined||boats[boats.length-1].body.position.x<width-300){
      var positions=[-40,-60,-20,-70]
      var position=random(positions)
      var boat1=new boat(width-39,height-60,170,170,-80)
      boats.push(boat1)

    }
    for(var i=0;i<boats.length;i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display()
      }
        }
  }
  else{
    var boat1=new boat(width,height-60,170,170,-60)
    boats.push(boat1)
  }
}

function collisionWithBoat(index){
  for(var i=0;i<boats.length;i++){
    if(balls[index]!==undefined&&boats[i]!==undefined){
     var collision= Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){ 
        boats[i].remove(i)
        Matter.World.remove(world,balls[index].body)
        delete balls[index]
     }
    }
  } 



}

