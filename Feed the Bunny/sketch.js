const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope
var fruit
var link
var bunny
var cutbutton
var blower
var bunnyImg
var backgroundImg
var fruitImg
var blink,sad,eat

function preload(){
bunnyImg = loadImage("Rabbit-01.png")
backgroundImg = loadImage("background.png")
fruitImg = loadImage("melon.png")
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
blink.looping=true
eat.looping=false
sad.looping=false
}

function setup() 
{
  createCanvas(500,600);
  frameRate(80); 

  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,600,600,10);

  rope = new Rope(6,{x:245,y:30})

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  let opt={density:0.001}
  fruit = Bodies.circle(300,300,15,opt)
  World.add(world,fruit)

  link = new Link(rope,fruit)

  bunny = createSprite(250,550,10,10)
  bunny.addImage("BUNNY",bunnyImg)
  bunny.scale = 0.2
  bunny.addAnimation("BLINK",blink)
  bunny.addAnimation("EAT",eat)
  bunny.addAnimation("SAD",sad)
  bunny.changeAnimation("BLINK",blink)

  cutbutton = createImg("cut_button.png")
  cutbutton.position(230,30)
  cutbutton.size(35,35)
  cutbutton.mouseClicked(drop)
   
  blower = createImg("balloon.png")
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(Air)
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,500,600)

  ground.show();
  rope.show();

  push()
  imageMode(CENTER)
  if(fruit!=null){
  image(fruitImg,fruit.position.x,fruit.position.y,70,70)
  }
  pop()

  Engine.update(engine);
  
  if(collisiondetection(fruit,bunny)){
bunny.changeAnimation("EAT",eat)
}
if(collisiondetection(ground.body,bunny)){
  bunny.changeAnimation("SAD",sad)
  }

  drawSprites()  
}

function drop(){
link.detach()
rope.break()
fruit=null
}

function collisiondetection(body1,body2){
if (body1!=null){
var distance = dist(body1.position.x,body1.position.y,body2.position.x,body2.position.y)  
console.log(distance)

if(distance<=80){
World.remove(world,fruit)
fruit=null
return true
}

else{
 return false
}
 }
  }


function Air(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
}
   