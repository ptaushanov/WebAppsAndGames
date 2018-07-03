function Player (){
//Definding stuff 
    this.name = "Silver1521";
    this.points = 0;
    this.level = 0;
    this.xp = 0;
    this.score = 0;
    this.energyUsage=40;
    this.regenTime = 20000;
    
    this.pos = createVector(random(0,2035),random(0,2035));
    this.vel=createVector(0,0);
    
    this.currentHealth=60;
    this.health = 60;
    this.energy = 180;
    this.attack = 3;
    this.speed = 5;
    
    this.xspeed = 0;
    this.yspeed = 0;
    this.X = 50;
    
//Mouse ralated stuff
    this.mouseMovemet = function(){
    var newvel = createVector(mouseX-width/2,mouseY-height/2);
    newvel.setMag(this.speed);
    this.vel.lerp(newvel,0.1);
    this.pos.add(this.vel);
}
//Old code for arrow keys    
    this.dir = function (x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    
//Eatting cells    
    this.eat = function(posx , posy){
        var d = dist(this.pos.x, this.pos.y, posx, posy);
        if(d < 5 + this.X/2) {
            
        //For bots or other players
            //var sum =PI*this.r*this.r+PI*other.r*other.r;
            //this.r = sqrt(sum/PI);
            this.X = this.X + 0.5;
            this.score+=10;
            this.health+=0.1;
            
//Do something if player eats - update xp,level.
            this.tracker();
//End  of tracker
        }
    }
    
//Constraining function
    var mapSize = 2035;
    this.update = function (){
        this.pos.x = constrain(this.pos.x,0, mapSize);
        this.pos.y = constrain(this.pos.y,0, mapSize);
            
        if(this.X>=100){
            this.X = 100;
        }

    }
//Player Shape fill and more... 
    this.show = function(){
        noStroke();
       // stroke(61,125,170);
        strokeWeight(2);
        fill(0,105,225,255);
        this.el = ellipse(this.pos.x,this.pos.y,this.X ,this.X);
        
 //Xp + level updator
        if(this.xp>=350){
           this.level++;
            this.points++;
            this.xp = 0;
        }
        else if (this.level>=20){
            this.xp= 349;
 //Incase   this.level=20;
        }
   }
//Level Checker 
    this.tracker = function(){
        switch(this.level) {
    case 0:
         this.xp+=70;
        break;
    case 1:
        this.xp+=43.75;
        break;
    case 2:
        this.xp+=35;
        break;
    case 3:
        this.xp+=29.2;
        break;
    case 4:
        this.xp+=25;
        break;
    case 5:
        this.xp+=22;
        break;
    case 6:
        this.xp+=19.5;
        break;
    case 7:
        this.xp+=17.5;
        break;
    case 8:
        this.xp+=16;
        break;
    case 9:
        this.xp+=14.6;
        break;
    case 10:
         this.xp+=13.5;
        break;
    case 11:
        this.xp+=12.5;
        break;
    case 12:
        this.xp+=11.7;
        break;
    case 13:
        this.xp+=11;
        break;
    case 14:
        this.xp+=10.3;
        break;
    case 15:
        this.xp+=9.73;
        break;
    case 16:
        this.xp+=9.22;
        break;
    case 17:
        this.xp+=8.75;
        break;
    case 18:
        this.xp+=8.34;
        break;
    case 19:
        this.xp+=7.96;
        break;
    default:
        this.xp+=0;
    }
    }
//Usage of points
        var healthBar=0;
    this.useHealth = function(){
        if(this.points-1>=0 && healthBar+15<=150){
        this.points--;
        this.health+=2;
        this.currentHealth+=4;
        healthBar+=15;
        $(progressIns1).width(healthBar);
        }
    }
    
        var regenBar=0;
    this.useRegen = function(){
        if(this.points-1>=0 && regenBar+15<=150){
        this.points--;
        this.regenTime-=1500;
        regenBar+=15;
        $(progressIns5).width(regenBar);
        }
    }


        var energyBar=0;
    this.useEnergy = function(){
        if(this.points-1>=0 && energyBar+15<=150){
        this.points--;
        this.energyUsage-=3;
        energyBar+=15;
        $(progressIns2).width(energyBar);
        }
    }
    
        var speedBar=0;
    this.useSpeed = function(){
        if(this.points-1>=0 && speedBar+15<=150){
        this.points--;
        this.speed+=0.5;
        speedBar+=15;
        $(progressIns3).width(speedBar);
        }
    }
    
        var attackBar=0;
    this.useAttack = function(){
        if(this.points-1>=0 && attackBar+15<=150){
        this.points--;
        this.attack+=0.5;
        attackBar+=15;
        $(progressIns4).width(attackBar);
        }
    }
    
//End of Constuctor
}