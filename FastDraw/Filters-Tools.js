const dotFillFilter = () =>{
    for(let x=0;x<canvas.width;x+=5){
        for(let y=0;y<canvas.height;y+=5){
            point(x+Math.random()*2,y+Math.random()*2);
        }
    }
}