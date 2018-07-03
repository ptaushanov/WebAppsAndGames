//Lerp module for node
var lerp = require('lerp');
//Grid size
var mapSize = 2035;
//Players + Bots IO (input/output)
var players = [];
var botsIO  = [];
var food = [];
var foodCount = 100;
var botCount = 5;

//Replacemet for requestAnimationFrame() AKA REPEAT FUNCTION!
setInterval(tick, 30);

//Constrain function
function constrain(num,min,max){
    if(num<=min){
        return min;
    }
    else if (num>=max){
        return max;
    }
    else{
        return num;
    }
}

//Random function in a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//Distance between two points 
function dist(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

//Player Info Constructor
function Player(id, x, y, size, attack) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.size = size;
  this.attack = attack;
}
//Food
function Food(size){
    this.x = Math.floor(random(2,2000));
    this.y = Math.floor(random(2,2000));
    this.colorNum=Math.floor(random(1,8));
    this.size = size;
}
//Server Side Bots Constructor
function Bots(){ 
  this.x = Math.random()*2035;
  this.y = Math.random()*2035;
  this.a = 0;
  this.speedx = random(1,2);
  this.speedy = random(1,2);
  this.dirx = 0;
  this.diry = 0;
  this.VK = false;
  this.colNum = Math.floor(random(0,7));
    
    var R = 60;
    this.field = R + 10;
    this.fieldPlayer = R + 40;
    
  this.knockback=20;
  this.attack = Math.floor(random(1,3));
  this.health = 2;
    
    this.eat = function(posx,posy){
        
    //Food part!
            var d = dist(this.x, this.y, posx, posy);
            var gapX = posx-this.x;
            var gapY = posy-this.y;
            var nX = this.x+gapX;
            var nY = this.y+gapY;
            if(d < this.field){
                this.VK=true;
        var newposx = nX;
        var newposy = nY;
            this.x = lerp(this.x, newposx, 0.02);
            this.y = lerp(this.y, newposy, 0.02);
                if(this.VK===true){
        var directionX = gapX;
        var directionY = gapY;
                    
            this.dirx = lerp(this.dirx, directionX, 0.005);
            this.diry = lerp(this.diry, directionY, 0.005);
                         
                this.speedx = this.dirx;
                this.speedy = this.diry;
                    this.VK=false;
                }
        if(d<5+R/2){
            return true;
            }
        else {
            return false;
        }      
      }
    }
 this.playerInterract = function(){
//Player part!
        for(var u=0;u<players.length;u++){
            
            var ds = dist(this.x, this.y, players[u].x, players[u].y);
            
            if(ds < this.fieldPlayer){
           //this.x = lerp(this.x, players[u].x, 0.05);
           //this.y = lerp(this.y, players[u].y, 0.05);
            
            if(ds <players[u].size/2 + R/2){
            var dy = players[u].y - this.y;
             
                this.x+=10;
             if(players[u].x>=this.x){
               var a = dy/ds;
            var newdis = ds*2;
             this.y -= newdis*Math.sin(a);
             this.x -= newdis*Math.cos(a);
                 this.health-=players[u].attack;
                }  
                if(players[u].x<=this.x){
               var a1 = dy/-ds;
            var newdis1 = ds*2;
             this.y += newdis1*Math.sin(a1);
             this.x += newdis1*Math.cos(a1); 
                 this.health-=players[u].attack;
                }
                        
                }
            }
        }
    }

//Bot movement + constrains
    this.interact = function(){
        if(this.VK===false){
        this.x += this.speedx;
        this.y += this.speedy;  
        }
        this.x = constrain(this.x,0, mapSize);
        this.y = constrain(this.y,0, mapSize);
        
        if(this.x===2035){
          this.speedx=-this.speedx;
        }
        else if(this.y===2035){
          this.speedy=-this.speedy;
        }
        else if(this.x===0){
          this.speedx=-this.speedx;
        }
        else if(this.y===0){
          this.speedy=-this.speedy;
        }
    }
    
}

//Creating Bots from a templete (Constructor!)
    for(var n=0; n<botCount; n++){
         botsIO[n] = new Bots();
      //console.log("Theres are " + botsIO[n].x + " " + botsIO[n].y + " here!");
    }
//Creation food and others
    for(var v=0;v<=foodCount;v++){
        food[v]= new Food(20);
       // console.log(food[v]);
    }

//**********************************************************************
//Repeatable function (Uses setInterval() )
function tick() { 
    //Ако храната намали създай нова.
    if(food.length<foodCount){
     var randomizer = Math.floor(random(1,20));
  //   console.log(randomizer);   
        if(randomizer===11){
        var newf = new Food(20);
        food.push(newf);
        }
    }
  for(var p=botsIO.length-1;p>=0;p--){
    //console.log(botsIO[0].x);
      botsIO[p].interact();
     botsIO[p].eat();
      botsIO[p].playerInterract();
      
      if(botsIO[p].health<=0){
         botsIO.splice(p,1); 
      }
  }
    for(var e=players.length-1;e>=0;e--){
        for(var m=food.length-1;m>=0;m--){
      var dis = dist(players[e].x, players[e].y, food[m].x, food[m].y);
        if(dis < 5 + players[e].size/2) {
        food.splice(m,1);
            }
        }
    }
    
    for(var j=botsIO.length-1;j>=0;j--){
            for(var o=food.length-1;o>=0;o--){
        if (botsIO[j].eat(food[o].x,food[o].y)){
        food.splice(o,1);
                }
            }
        }
    if(botsIO.length<botCount){;
        botsIO.push(new Bots());
    }
}

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(heartbeat, 20);


function heartbeat() {
  io.sockets.emit('heartbeat', players);
    if(players.length>0){
    //console.log("Emiting " + players[0].hitUp);
    }
  io.sockets.emit('bots', botsIO);
  io.sockets.emit('food', food);
}

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {

    console.log("We have a new client: " + socket.id);


    socket.on('start',
      function(data) {
        console.log(socket.id + " " + data.x + " " + data.y + " " + data.size + " " + data.attack);
        var player = new Player(socket.id, data.x, data.y, data.size, data.attack);
        players.push(player);
        
      }
    );

    socket.on('update',
      function(data) {
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.size + " " + data.attack);
        var player;
        for (var i = 0; i < players.length; i++) {
          if (socket.id == players[i].id) {
            player = players[i];
          }
        }
        player.x = data.x;
        player.y = data.y;
        player.size = data.size;
        player.attack = data.attack;
      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);

