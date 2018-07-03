function Stats(){
//Declared elements
    this.b1;
    this.h1;
    this.h2;
    this.div1;
    this.DNA;
    this.Name;
    
//Animation validator/cheker/swicher
    var isComplete=false;
    var energyToggle=false;
//Selectors   
this.setup = function(){
    Level = select('#level');
    DNA = select('#span1');
    Health = select('#span3');
    Attack = select('#span4');
    Speed = select('#span5');
    Name = select('#playerName');
    $('#section3').hide();
}
//Stats updater
this.show = function (){
    Level.html(player.level);
    DNA.html(" " + player.score /*foods.length*/);
    Health.html(Math.floor(player.health));
    Attack.html(Math.floor(player.attack));
    Speed.html(Math.floor(player.speed));
    Name.html(player.name);
    
    //jquery 
    $(progressBar).width(player.xp);
    $(progressIns6).height(player.energy);
    $(points).html("x "+player.points);
    $(span2).html(player.currentHealth);
    
    
    
//Grid
    var mapSize = 2000;
    for(var xgrid=0;xgrid<=mapSize;xgrid+=40){
     for(var ygrid=0;ygrid<=mapSize;ygrid+=40){
        stroke(126);
        strokeWeight(0.1);
        noFill();
        rect(xgrid,ygrid,40,40);

      }
    }  
//Animation

    if(player.points>0 && isComplete===false){
           isComplete=true;
        $('#section3').show(1000);
        $('#section3').animate({
            left:"+=0em"
        },650);
    }
        else if(player.points<=0 && isComplete===true){
            isComplete=false;
        $('#section3').animate({
            left:"-=0em"
            },1500,function(){
        $('#section3').hide(1000);     
        });
    }
     if(player.energy<180 && energyToggle===true){
        energyToggle=false;
        $('#section4').fadeIn(); 
     }
     else if(player.energy>=180 && energyToggle===false){
         energyToggle=true;
         $('#section4').fadeOut(); 
     }
//End   
  }
}