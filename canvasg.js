const canvas=document.querySelector('canvas')
const c=canvas.getContext('2d')
canvas.width=innerWidth
canvas.height=innerHeight;
const scoreEl=document.querySelector('#scoreEl')
console.log(scoreEl)
const StartG=document.querySelector('#StartG')
const modEl=document.querySelector('#modEl')
const finalscore=document.querySelector('#finalscore')
const R=canvas.getContext('2d')

console.log(canvas)
class Player{
    constructor(x,y,radius,color,vel){
        this.x=x
         this.y=y
         this.radius=radius
         this.color=color
         this.vel={x:0,y:0}
    }
     draw(){
         c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
         c.fill();
    }
    update(){
        this.draw()
        this.x=this.x+this.vel.x
        this.y=this.y+this.vel.y}
    
}
        const player=new Player(innerWidth/2,innerHeight-40,40,'white',{
            x:10,
            y:10
        })
        
                           
        player.draw()
            




class Projectile{
    constructor(x,y,radius,color,vel){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.vel=vel


    }
     draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill();
    }
    update(){
        this.draw()
        this.x=this.x+this.vel.x
        this.y=this.y+this.vel.y
     }
}
addEventListener('click',(event)=>{
    console.log(projectiles)
    
const angle=Math.atan2(event.clientY-(player.y),
event.clientX-player.x)
const vel={
    x:Math.cos(angle)*3,
    y:Math.sin(angle)*3
}
projectiles.push(new Projectile(player.x,player.y,15,'white',vel))
projectile.draw()
projectile.update()})

class Home{
    constructor(x,y,color,text){
        this.x=x
        this.y=y
        
        this.color=color
        this.text=text
    }
    draw(){
        R.fillRect(this.x,this.y,300,150)
        R.fillStyle=this.color
        R.fillText="HOME"
        R.fillText=this.text
        R.fill()}
}
const home=new Home(innerWidth-350,500,'white',"HOME")

home.draw()



 class ENEMY{
    constructor(x,y,radius,color,vel)
    {
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.vel=vel
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill();
    }
    update(){
        this.draw()
        this.x=this.x+this.vel.x
        this.y=this.y+this.vel.y
    }
}
// // let projectiles=[]
// let enemies=[]

 
function spawnEnemies(){
    setInterval(()=>{
       
        const x=Math.random()*canvas.width
        const y=0
        const radius=20
        const color='red'

        const angle=Math.atan2((player.y)-y,(player.x)-x)
        const angle1=Math.atan2(innerHeight/2,innerWidth/2)
        const vel={
            x:Math.cos(angle),
            y:Math.sin(angle)}

            enemies.push(new ENEMY(x,y,radius,color,vel))
        },1000)
}
const projectile=new Projectile(player.x,player.y,10,'white',{
    x:1,
   y:-1}
)

 let animationId
 let score=0
 
  
let projectiles=[]
let enemies=[]
// const projectile=new Projectile(innerWidth/2,innerHeight-40,10,'pink',{
//     x:1,
//     y:-1})
function animate(){
  animationId=requestAnimationFrame(animate)
  
  
        
 c.fillStyle='rgba(0,0,0,0.1)'
  c.fillRect(0,0,canvas.width,canvas.height)
  player.draw();
  player.update()
  home.draw()
  
 projectiles.forEach((projectile,index)=>{
     projectile.update() 
     //removing projectiles from edges
  if (projectile.x-projectile.radius<0 || projectile.x-projectile.radius>canvas.width ||
     projectile.y-projectile.radius<0 ||projectile.y-projectile.radius>canvas.height)
     setTimeout(()=>{
         projectiles.splice(index,1)
     },0)
 //     }  
   })
 enemies.forEach((ENEMY,index)=>{
     ENEMY.update()
     const dist=Math.hypot(player.x-ENEMY.x,player.y-ENEMY.y)
     const D= Math.hypot(home.x-ENEMY.x,home.y-ENEMY.y)
 // // // when enemy hits player
 if(dist-ENEMY.radius-player.radius<1 ){
     cancelAnimationFrame(animationId)
     modEl.style.display='flex'
       finalscore.innerHTML=score
 }
     projectiles.forEach((projectile,projectileIndex)=>{
     const dist=Math.hypot(projectile.x-ENEMY.x,projectile.y-ENEMY.y)
     
    // // objects touch
      if(dist-ENEMY.radius-projectile.radius<1)
 
        {// inc score
         score+=100
         
         //scoreEl.innerHTML= score
         console.log(score)
         
        setTimeout(()=>{
           { enemies.splice(index,1)
             projectiles.splice(projectileIndex,1)}
        },0)
     }})
     
    })
if(keys[37].pressed && player.x>=0){
    player.vel.x=-10
}else if(keys[38].pressed && player.y>=0){
    player.vel.y-=10
}else if(keys[39].pressed && player.x+ player.radius<=canvas.width){
     player.vel.x+=10
}
else if(keys[40].pressed&& player.y+player.radius<=canvas.height){
     player.vel.y+=10
}
else{
    player.vel.x=0
    player.vel.y=0
}


}
     
 
 

 StartG.addEventListener('click',()=>{
     init();
     
     animate();
 spawnEnemies()
modEl.style.display="none"

 })
 function init(){
    
    projectiles=[]
     enemies=[]
     
     score=0
    player.x=innerWidth/2
    player.y=innerHeight-40;
     scoreEl.innerHTML=score
     finalscore.innerHTML=score
     

 }
 const keys={
    37:{
       pressed:false
    },
    38:{
       pressed:false
    },
    39:{
       pressed:false
    },
    40:{
       pressed:false
    }
}


addEventListener('keydown',({keyCode})=>{
   // console.log(keyCode)
    switch(keyCode){
        case 37:
            console.log('left')
            keys[37].pressed=true
           
            break

        case 38:
            
            keys[38].pressed=true
           
            break


        case 39:
          
            keys[39].pressed=true
           
            break


        case 40:
          
            keys[40].pressed=true
           
            break }})
addEventListener('keyup',({keyCode})=>{
    // console.log(keyCode)
    switch(keyCode){
     case 37:
    console.log('left')
    keys[37].pressed=false
    break
             
    case 38:
        keys[38].pressed=false
     
    break
             
     case 39:
        keys[39].pressed=false
    
     break
             
             
   case 40:
    keys[40].pressed=false
     
    break }})
              