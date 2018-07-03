window.onload = () =>{
    const mTracker = document.getElementById('mTracker');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const tileWidth = 56,
    tileHeight = 30;

    let view = {
        x:width/2,
        y:200
    }

    ctx.translate(view.x, view.y);

    const grid = [
		[16, 15, 15, 14, 13, 10, 3, 2, 1, 0],
		[15, 15, 14, 13, 10, 10, 3, 2, 1, 0],
		[15, 14, 13, 10, 10, 3, 3, 2, 1, 0],
		[14, 13, 10, 9, 3, 3, 2, 1, 0, 0],
		[13, 10, 17, 7, 3, 2, 1, 0, 0, 0],
		[10, 9, 7, 6, 3, 2, 1, 0, 0, 0],
		[9, 7, 6, 5, 3, 2, 1, 1, 1, 1],
		[7, 6, 5, 3, 3, 2, 2, 2, 2, 2],
		[6, 5, 5, 3, 3, 3, 3, 3, 3, 3],
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
];

//Drawing a Tile
     const drawTile = (x,y,color) =>{
         ctx.save();
         ctx.translate((x - y)*tileWidth / 2 , (x + y)*tileHeight / 2);

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(tileWidth/2, tileHeight/2);
        ctx.lineTo(0, tileHeight);
        ctx.lineTo(-tileWidth/2, tileHeight/2);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

         ctx.restore();
     }

//Drawing a Block
     const drawBlock = (x,y,z) =>{
         const top = "#eeeeee",
               right = "#cccccc";
               left = "#999999";

        ctx.save();
        ctx.translate((x - y)*tileWidth / 2 , (x + y)*tileHeight / 2);

    //Drawing the top
        ctx.beginPath();
        ctx.moveTo(0,-z*tileHeight);
        ctx.lineTo(tileWidth/2, tileHeight/2 -z*tileHeight);
        ctx.lineTo(0, tileHeight -z*tileHeight);
        ctx.lineTo(-tileWidth/2, tileHeight/2 -z*tileHeight);
        ctx.closePath();
        ctx.fillStyle = top;
        ctx.fill();

    //Drawing the left side
        ctx.beginPath();
        ctx.moveTo(-tileWidth/2, tileHeight/2 -z*tileHeight);
        ctx.lineTo(0, tileHeight -z*tileHeight);
        ctx.lineTo(0, tileHeight);
        ctx.lineTo(-tileWidth/2, tileHeight/2);
        ctx.closePath();
        ctx.fillStyle = left;
        ctx.fill();

    //Drawing the right side
        ctx.beginPath();
        ctx.moveTo(tileWidth/2, tileHeight/2 -z*tileHeight);
        ctx.lineTo(0, tileHeight -z*tileHeight);
        ctx.lineTo(0, tileHeight);
        ctx.lineTo(tileWidth/2, tileHeight/2);
        ctx.closePath();
        ctx.fillStyle = right;
        ctx.fill();

        ctx.restore();
        
     }

//Color Randomizer
     const randomColor = () =>{
         let r = Math.floor(Math.random()*255),
         g = Math.floor(Math.random()*255),
         b = Math.floor(Math.random()*255);

         return "rgb(" + r + "," + g + "," + b + ")";
     }


//Draw img tile
    const img = document.createElement('img');
        img.addEventListener('load', ()=>{
        draw();
    });
        img.src = "assets/isomap2.png";

        const draw = () =>{
            /*for(let x=0;x<25;x++){
                for(let y=0;y<25;y++){
                    drawImgTile(x,y, Math.floor(Math.random()*17));
                   // drawBlock(x,y,Math.floor(Math.random((x+y))*4));
                }
            }*/

            for(var y = 0; y < grid.length; y++) {
                var row = grid[y];
                for(var x = 0; x < row.length; x++) {
                    drawImgTile(x, y, row[x]);
                }
            }
        }

        const drawImgTile = (x,y,index) => {
            ctx.save();
            ctx.translate((x - y) * tileWidth / 2 , (x + y)*tileHeight / 2 -11 + (index<4?5:0));
            ctx.drawImage(img, index * tileWidth, 0, tileWidth, img.height,
            -tileWidth / 2, 0, tileWidth,img.height);
            ctx.restore();
        }

        trackMouse(canvas,mTracker);

        
}
