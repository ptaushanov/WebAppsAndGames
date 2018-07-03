const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

if(game === undefined){
    document.getElementsByTagName('canvas')[0].innerText = 'Sorry your browser does not support HTML Canvas.';
}


const GameState ={
preload(){
   this.game.load.atlasJSONArray('texturemap','assets/TexturePack/texturemap.png','assets/TexturePack/texturemap.json');
   this.game.load.json('map', 'assets/Map/isomap.json');
 },

create(){
   this.map = this.game.cache.getJSON('map') || {};


   this.tileWidth = this.map.dimentions.tileWidth || 56;
   this.tileHeight = this.map.dimentions.tileHeight || 29;

   this.game.world.setBounds(-2000,-2000, 4000, 4000);
   this.keyPoint = game.input.keyboard.createCursorKeys();
   this.game.camera.x = -this.game.width/2+this.tileWidth/2;
   this.game.camera.y = -150;
   this.o_mcamera;

   this.game.stage.backgroundColor = 0x43A143;
   this.graphics = this.game.add.graphics(0,0);

   /*for(let x=0;x<110;x++){
        for(let y=0;y<110;y++){
           // this.drawBlock(x,y,Math.random()*4);
         // this.drawTile(x,y,this.colorize());
        }
    }*/
   
   for(let y = 0; y < this.map.data.length; y++) {
    let row = this.map.data[y];
    for(let x = 0; x < row.length; x++) {
        this.drawImgTile(x, y,'texturemap', row[x]);
        }
    }
 },

update(){

    this.move_camera_by_pointer(game.input.mousePointer);
    this.move_camera_by_pointer(game.input.pointer1);
 
 },

 render(){
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
 },

 move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) { return; }
    if (o_pointer.isDown && !o_pointer.targetObject) {
        if (this.o_mcamera) {
            this.game.camera.x += this.o_mcamera.x - o_pointer.position.x;
            this.game.camera.y += this.o_mcamera.y - o_pointer.position.y;
        }
        this.o_mcamera = o_pointer.position.clone();
    }
    if (o_pointer.isUp) { this.o_mcamera = null; }
},

drawTile(x,y,color){
   const offsetX = (x - y)*this.tileWidth/2;
   const offsetY = (x + y)*this.tileHeight/2;
   this.graphics.beginFill(color);
   this.graphics.moveTo(offsetX,offsetY);
   this.graphics.lineTo(offsetX+this.tileWidth/2, offsetY+this.tileHeight/2);
   this.graphics.lineTo(offsetX, offsetY+this.tileHeight);
   this.graphics.lineTo(offsetX-this.tileWidth/2, offsetY + this.tileHeight/2);
   this.graphics.endFill();
 },

drawBlock (x,y,z){
    const top = 0xeeeeee,
          right = 0xcccccc;
          left = 0x999999;

    const offsetX = (x - y)*this.tileWidth/2;
    const offsetY = (x + y)*this.tileHeight/2;

//Drawing the top
   this.graphics.beginFill(top)
   this.graphics.moveTo(offsetX,offsetY-z*this.tileHeight);
   this.graphics.lineTo(offsetX+this.tileWidth/2,offsetY + this.tileHeight/2 -z*this.tileHeight);
   this.graphics.lineTo(offsetX,offsetY + this.tileHeight -z*this.tileHeight);
   this.graphics.lineTo(offsetX-this.tileWidth/2,offsetY + this.tileHeight/2 -z*this.tileHeight);
   this.graphics.endFill();

//Drawing the left side
   this.graphics.beginFill(left)
   this.graphics.moveTo(offsetX-this.tileWidth/2, offsetY+this.tileHeight/2 -z*this.tileHeight);
   this.graphics.lineTo(offsetX, offsetY + this.tileHeight -z*this.tileHeight);
   this.graphics.lineTo(offsetX, offsetY + this.tileHeight);
   this.graphics.lineTo(offsetX-this.tileWidth/2, offsetY + this.tileHeight/2);
   this.graphics.endFill();

//Drawing the right side
   this.graphics.beginFill(right)
   this.graphics.moveTo(offsetX + this.tileWidth/2, offsetY + this.tileHeight/2 -z*this.tileHeight);
   this.graphics.lineTo(offsetX, offsetY + this.tileHeight -z*this.tileHeight);
   this.graphics.lineTo(offsetX, offsetY + this.tileHeight);
   this.graphics.lineTo(offsetX + this.tileWidth/2, offsetY + this.tileHeight/2);
   this.graphics.endFill();  
},

//Draw Img Tile
drawImgTile(x,y,map_name,index){
    const item = this.game.add.sprite((x - y)*this.tileWidth/2, (x + y)*this.tileHeight/2 + (index===15?-6:0) - (index>3?+5:0), map_name, index);
    //item.inputEnabled = true;
    //item.input.enableDrag(true);
},

//Colorizer
colorize(){
    return '0x' +Math.floor(Math.random()*16777215).toString(16);
 }
 
}

game.state.add('GameState',GameState);
game.state.start('GameState');



