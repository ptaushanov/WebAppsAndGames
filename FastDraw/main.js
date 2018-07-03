//Declarables
let colFG = colBG = '#000',
modColor = sModColor = '#FFF',
colorModeList = [0,0,0,0,0,0],
strokeModeList = [0,0,0,0,0,0],
isShifting = sSwitch =false,
board = undefined,
indexColor = nextIndex = hslIndex = sOpacityVal = 0,
indexSize = sIndexSize = indexOpacity = 0,
brushSize = 10,
strokeSize = 2,
brushSelected = 'pencil',
opacityVal = 1;

//Main Setup
function setup(){
   board = createCanvas(800,600); 
   background('white');
   stroke(colBG);
}

//Rendering and Updating
function draw(){

    //Mouse down event
    if (mouseIsPressed){
        if(colorModeList[0] || colorModeList[1] || colorModeList[2]){
            fill(modColor);
        }
        else if(!customColor.disabled){
            fill(customColor.value);
        }
        else if(isShifting){
            fill(colBG);
        }
        else{
            fill(colFG);
        }
    

    strokeWeight(strokeSize);
    
        //Stroke Color Setup
            if(strokeModeList[0] || strokeModeList[1] || strokeModeList[2]){
                stroke(sModColor);
            }
            else if(sSwitch){
                stroke(hexToRgba(colorFG.value,strokeModeList[4],sOpacityVal,0.15));
            }
            else{
                stroke(hexToRgba(colorBG.value,strokeModeList[4],sOpacityVal,0.15));
            }
        

//Brush Select
        switch(brushSelected){

        case'circle-brush':
            
            if(colorModeList[4]){
                ellipse(mouseX+brushSize+1,mouseY,brushSize,brushSize);
                ellipse(mouseX,mouseY+brushSize+1,brushSize,brushSize);
                ellipse(mouseX+brushSize+1,mouseY+brushSize+1,brushSize,brushSize);
            }
                ellipse(mouseX,mouseY,brushSize,brushSize);

        break;

        case'rectangle-brush':
        
            rectMode(CENTER);
            if(colorModeList[4]){
                rect(mouseX-brushSize-2,mouseY-brushSize/2,brushSize,brushSize);
                rect(mouseX+brushSize+2,mouseY+brushSize/2,brushSize,brushSize);
            }
            rect(mouseX,mouseY,brushSize,brushSize);
        break;

//Triangle brush
        case'triangle-brush':
 
            if(colorModeList[4]){
                triangle(mouseX + brushSize, mouseY-brushSize/2 + brushSize, mouseX+brushSize/2 + brushSize, mouseY+brushSize/2 + brushSize, mouseX-brushSize/2 + brushSize, mouseY+brushSize/2 + brushSize);
                triangle(mouseX - brushSize, mouseY-brushSize/2 + brushSize, mouseX+brushSize/2 - brushSize, mouseY+brushSize/2 + brushSize, mouseX-brushSize/2 - brushSize, mouseY+brushSize/2 + brushSize);
            }
            triangle(mouseX, mouseY-brushSize/2, mouseX+brushSize/2, mouseY+brushSize/2, mouseX-brushSize/2, mouseY+brushSize/2);
        break;

//Diamond brush
        case'diamond-brush':
        if(colorModeList[4]){
 
            beginShape();
            vertex(mouseX, mouseY-brushSize/2-brushSize-2);
            vertex(mouseX+brushSize/2, mouseY-brushSize-2);
            vertex(mouseX, mouseY+brushSize/2-brushSize-2);
            vertex(mouseX-brushSize/2, mouseY-brushSize-2);
            endShape(CLOSE);

            beginShape();
            vertex(mouseX, mouseY-brushSize/2+brushSize+2);
            vertex(mouseX+brushSize/2, mouseY+brushSize+2);
            vertex(mouseX, mouseY+brushSize/2+brushSize+2);
            vertex(mouseX-brushSize/2, mouseY+brushSize+2);
            endShape(CLOSE);

            beginShape();
            vertex(mouseX+brushSize+2, mouseY-brushSize/2);
            vertex(mouseX+brushSize/2+brushSize+2, mouseY);
            vertex(mouseX+brushSize+2, mouseY+brushSize/2);
            vertex(mouseX-brushSize/2+brushSize+2, mouseY);
            endShape(CLOSE);

            beginShape();
            vertex(mouseX-brushSize-2, mouseY-brushSize/2);
            vertex(mouseX+brushSize/2-brushSize-2, mouseY);
            vertex(mouseX-brushSize-2, mouseY+brushSize/2);
            vertex(mouseX-brushSize/2-brushSize-2, mouseY);
            endShape(CLOSE);
        }

            beginShape();
            vertex(mouseX, mouseY-brushSize/2);
            vertex(mouseX+brushSize/2, mouseY);
            vertex(mouseX, mouseY+brushSize/2);
            vertex(mouseX-brushSize/2, mouseY);
            endShape(CLOSE);
        break;

//Line
        case'line-brush':
            if(colorModeList[0] || colorModeList[1] || colorModeList[2]){
                stroke(modColor);
            }
            else if(!customColor.disabled){
                stroke(customColor.value);
            }
            else if(isShifting){
                stroke(colBG);
            }
            else{
                stroke(colFG);
            }
            
            if(colorModeList[4]){
                line(mouseX-brushSize, mouseY-brushSize/2, mouseX+brushSize, mouseY+brushSize/2);
            }
            line(mouseX-brushSize/2, mouseY-brushSize/2, mouseX+brushSize/2, mouseY+brushSize/2);
        break;

//Line Reverced
        case'line-brush-reversed':
            if(colorModeList[0] || colorModeList[1] || colorModeList[2]){
                stroke(modColor);
            }
            else if(!customColor.disabled){
                stroke(customColor.value);
            }
            else if(isShifting){
                stroke(colBG);
            }
            else{
                stroke(colFG);
            }
            if(colorModeList[4]){
                line(mouseX-brushSize/2, mouseY+brushSize, mouseX+brushSize/2, mouseY-brushSize);
            }
            line(mouseX-brushSize/2, mouseY+brushSize/2, mouseX+brushSize/2, mouseY-brushSize/2);
        break;

//Pencil
        default:
        if(!customColor.disabled){
            stroke(customColor.value);
        }
         else if(isShifting){
            stroke(colBG);
        }
        else{
            stroke(colFG);
        }
        strokeWeight(1.5);
        point(mouseX,mouseY);
    }

//Converting HEX to RGB for the opacity aspect only for the FILL
    if(colorFG!==undefined && colorBG!==undefined){
        colFG = hexToRgba(colorFG.value,colorModeList[5],opacityVal,0);
        colBG = hexToRgba(colorBG.value,colorModeList[5],opacityVal,0);
    }
  }
}

//Key Events
function keyPressed() {
    if (keyCode === SHIFT) {
        isShifting = true;
    }
  }
function keyReleased() {
    if (keyCode === SHIFT) {
        isShifting = false;
      }
}


//Slow update for the color drawing and randomizing
const slowUpdate=()=>{
    if(mouseX!==pmouseX || mouseY!==pmouseY){
        
        if(colorModeList[3] && indexSize<20){
            brushSize = Math.abs(Math.sin(indexSize)*30)+10;
            indexSize+=0.2;
        }
        else{
            indexSize = 0;
        }

        if(strokeModeList[3] && sIndexSize<6){
            strokeSize = Math.abs(Math.sin(sIndexSize)*5)+1;
            sIndexSize+=0.2;
        }
        else{
            sIndexSize = 0;
        }

        if(colorModeList[0]){
            modColor = hslToRGBA(hslColor(hslIndex),colorModeList[5],opacityVal,0);
        }
        else if(colorModeList[1]){
            modColor = hexToRgba(rainbowColor(indexColor),colorModeList[5],opacityVal,0);
        }
        else if(colorModeList[2]){
            modColor = blackWhite(nextIndex,colorModeList[5],opacityVal,0);
        }

        if(strokeModeList[0]){
            sModColor = hslToRGBA(hslColor(hslIndex+12),strokeModeList[4],sOpacityVal,0.15);
        }
        else if(strokeModeList[1]){
            if(indexColor>=1){
                sModColor = hexToRgba(rainbowColor(indexColor-1),strokeModeList[4],sOpacityVal,0.15);
            }   
        }
        else if(strokeModeList[2]){
            sModColor = blackWhite(nextIndex+1,strokeModeList[4],sOpacityVal,0.15);
        }

        //Pulse Mode
        if(strokeModeList[5]){
            sOpacityVal = nextIndex;
        }


        if(indexColor<6){
            indexColor++;
        }
        else{
            indexColor = 0;
        }

        if(nextIndex<1){
            nextIndex++;
        }
        else{
            nextIndex = 0;
        }

        if(hslIndex<360){
            hslIndex+=6;
        }
        else{
            hslIndex = 0;
        }

        if(indexOpacity<1){
            indexOpacity+=0.05;
        }
        else{
            indexOpacity = 0.1;
        }
   
    }
}
setInterval(slowUpdate,100);

const goFullscreen = () =>{
    let fs = fullscreen();
    fullscreen(!fs);
}
