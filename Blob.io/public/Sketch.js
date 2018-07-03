//Quick fix
var stats;
var zoom = 0;
var bodyCOL = [];
var outlineCOL = [];
var later;

/*    var colR = red(bodyCol)-10;
    var colG = green(bodyCol)-10;
    var colB = blue(bodyCol)-10;*/
    
//socket
var socket;
var player;
var players = [];
var botsIO = [];
var foods = [];

function energyRefiller(){
    if(player.energy+10<=180){
         player.energy+=10;
    }    
    else if(180-player.energy<10){
         player.energy=180;
    }
}

function regenTimer(){
            player.currentHealth++;
    }

function preload(){
//Coloring
    colors = loadJSON("Colors.json");
}
//Setup
function setup() {
    createCanvas(windowWidth,windowHeight);
    // Start a socket connection to the server
    // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
    
    player = new Player();
    // Make a little object with x and y
      var data = {
        x: player.pos.x,
        y: player.pos.y,
        size: player.X,
        attack: player.attack
      };
    socket.emit('start', data);
    
    socket.on('heartbeat',
    function(data) {
      //console.log(data);
      players = data;
    }
  );
    
    socket.on('bots',
    function(data) {
      //console.log(data);
      botsIO = data;
    }
  );
    
    socket.on('food',
    function(data) {
      //console.log(data);
      foods = data;
    }
  );
    stats = new Stats();
    stats.setup();
 
    var myFunction = function(){
    clearInterval(interval);
    if(player.currentHealth+1<player.health){
        player.currentHealth++;
    }
    interval = setInterval(myFunction, player.regenTime);
}
var interval = setInterval(myFunction, player.regenTime);
    
    setInterval(energyRefiller,5000);
}

function draw() {
    background(240);
//  background(180);

    
//View
    translate(width/2,height/2);
    var newzoom = 50 / player.X*3;
    zoom = lerp(zoom,newzoom,0.05);
    scale(zoom);
    translate(-player.pos.x,-player.pos.y);
    
//Creating players,foods,stats...
    player.update();
    player.mouseMovemet();
    stats.show();
    
//Drawing players
    for (var i = players.length - 1; i >= 0; i--) {
    var id = players[i].id;
        
        // removed substring(2, id.length);
    if (id !== socket.id) {
      noStroke();
      fill(0, 250, 0 ,255);
      ellipse(players[i].x, players[i].y, players[i].size, players[i].size);

      fill(51);
      textAlign(CENTER);
      textSize(5);
      text(players[i].id, players[i].x, players[i].y + players[i].size);
    }
  }
   
//Drawing bots && Showing Bots/Player Interaction
    for(var h=0;h<botsIO.length;h++){
       stroke(colors.colorPack1.outline[botsIO[h].colNum]);
       strokeWeight(3);
       fill(colors.colorPack1.body[botsIO[h].colNum]); 
       ellipse(botsIO[h].x, botsIO[h].y, 50, 50);
        
        var ds = dist(botsIO[h].x,botsIO[h].y,player.pos.x,player.pos.y);
         if(ds < player.X/2 + 60/2-5){
             
             var dy = botsIO[h].y - player.pos.y;
             
             if(player.pos.x<=botsIO[h].x){
               var a = dy/ds;
                // console.log(a);
            var newdis = ds*2;
             player.pos.y -= newdis*sin(a);
             player.pos.x -= newdis*cos(a);  
                }  
                if(player.pos.x>=botsIO[h].x){
               var a1 = dy/-ds;
               // console.log(a1);
            var newdis1 = ds*2;
             player.pos.y += newdis1*sin(a1);
             player.pos.x += newdis1*cos(a1); 
                }
         }
    }
    
//Покажи храната + Процеса на изяждане
    for(var fd=foods.length - 1;fd>=0;fd--){
         fill(colors.foodPack1[foods[fd].colorNum]);
        noStroke();
        ellipse(foods[fd].x,foods[fd].y,foods[fd].size,foods[fd].size);       
    }
    
        for(var m=foods.length-1;m>=0;m--){
      var dis = dist(player.pos.x, player.pos.y, foods[m].x, foods[m].y);
            
        if(dis < 5 + player.X/2) {
            clearTimeout(later);
          later = setTimeout(function(){
            player.X = player.X + 0.5;
            player.score+=10;
            player.health+=0.1;
              
            player.tracker();
          },5);
            }
        }
    player.show();
    
       var data = {
        x: player.pos.x,
        y: player.pos.y,
        size: player.X,
        attack:player.attack
      };
      socket.emit('update', data);
}
function mousePressed(){
    //player.X++;
    
//Energy constrainer + Placeholder for Abilities ....Concept!
/*    if(player.energy-player.energyUsage>=0){
    player.energy-=player.energyUsage;
   // alert("Attack Mode Activated");
    }*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
