class boat{

    constructor(x,y,width,height,bpos)
    {
    
    
    
    this.width=width
    this.height=height
    this.boatposition=bpos
    this.body=Bodies.rectangle(x,y,width,height)
    this.image=loadImage("./assets/boat.png")
    World.add(world,this.body)
    
    }

    remove(index){
        setTimeout(()=>{
            Matter.World.remove(world,baots[index].body)
            delete boats[index]
        },2000)
    }
    display()
    {
        var pos=this.body.position
        push()
        translate(pos.x,pos.y)
        imageMode(CENTER)
        image (this.image,0,this.boatposition,this.width,this.height)
        pop()
    }
    }