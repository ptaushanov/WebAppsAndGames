let colorFG = colorBG = customColor = strokeColor = undefined;
let canvasName = "Canvas";

window.onload=()=>{
//DOM Selectors
    const createClose = document.getElementById('create-close');
    const createWrapper = document.getElementById('create-wrapper');
    const createName = document.getElementById('create-name');
    const createBTN = document.getElementById('createBTN');

    const nameTag = document.getElementById('nameTag');
    const checkbox = document.getElementById('custom-checkbox');
    const fill = document.getElementById('fill');

    const edit = {
        text:document.getElementById('text'),
        circle:document.getElementById('circle'),
        triangle:document.getElementById('triangle'),
        rectangle:document.getElementById('rectangle'),
        eraser:document.getElementById('eraser'),
        line:document.getElementById('line')
    }
    
    const sizes = {
        small:document.getElementById('small'),
        custom:document.getElementById('custom'),
        medium:document.getElementById('medium'),
        large:document.getElementById('large')
    }

    const brushes = {
        circleBrush:document.getElementById('circle-brush'),
        rectangleBrush:document.getElementById('rectangle-brush'),
        triangleBrush:document.getElementById('triangle-brush'),  
        diamondBrush:document.getElementById('diamond-brush'),
        lineBrush:document.getElementById('line-brush'),
        lineBrushReversed:document.getElementById('line-brush-reversed'),
        pencil:document.getElementById('pencil'),
    }

    const strokes = {
        thick:document.getElementById('thick'),
        normal:document.getElementById('normal'),
        thin:document.getElementById('thin')
    }

    const colorModes = {
        rainbow:document.getElementById('rainbow'),
        blackWhite:document.getElementById('black-white'),
        hue:document.getElementById('hue'),
        thickThin:document.getElementById('thick-thin'),
        spread:document.getElementById('spread'),
        deltaOpacity:document.getElementById('op-tr')
    }

    const strokeModes = {
        sHue:document.getElementById('sHue'),
        sRainbow:document.getElementById('sRainbow'),
        sBlackWhite:document.getElementById('sBlack-White'),
        sOpacity:document.getElementById('sOpacity'),
        sThickThin:document.getElementById('sThick-Thin'),
        pulse:document.getElementById('pulse')
    }

    const opacities = {
        fillOpacity:document.getElementById('opacity'),
        strokeOpacity:document.getElementById('s-opacity')
    }

    const warnings = {
        sOpWarning:document.getElementById('sOpWarning'),
        colWarning:document.getElementById('colWarning')
    }

    const swap = document.getElementById('swap');
    const toggleColor = document.getElementById('cc-checkbox');
    const randomColorBTN = document.getElementById('random-color-BTN');
    customColor = document.getElementById('c-color');
    colorFG = document.getElementById('fg-color');
    colorBG = document.getElementById('bg-color');
    const mX = document.getElementById("mouseX");
    const mY = document.getElementById("mouseY");
    const widthCanvas = document.getElementById("width");
    const heightCanvas = document.getElementById("height");
    const clearBTN = document.getElementById('clear');
    const curColor = document.getElementById('curent-color');
    const edges = document.getElementById('edges'); 
    const save = document.getElementById('save');
    strokeColor =  document.getElementById('s-color');

    const filters = {
        blur:document.getElementById('blur'),
        dotFill:document.getElementById('dotFill'),
        colorize:document.getElementById('colorizeBTN')
    }

    
//Update Function
    setInterval(()=>{
        if(checkbox.checked){
            for(let z in sizes){
                sizes[z].classList.remove('selected');
            }

            if(brushSize !== parseInt(sizes.custom.value)){
                brushSize = parseInt(sizes.custom.value);
            }
            sizes.small.disabled = sizes.medium.disabled = sizes.large.disabled = true;
            sizes.custom.disabled = false;
        }
        else{
            sizes.small.disabled = sizes.medium.disabled = sizes.large.disabled = false;
            sizes.custom.disabled = true;
        }

        toggleColor.onclick=()=>{
            if(toggleColor.checked){
                customColor.disabled = false;
                colorFG.disabled = colorBG.disabled = true;
                colorFG.style.opacity = colorBG.style.opacity = 0.3;
            }
            else if(!toggleColor.checked){
                customColor.disabled = true;
                colorFG.disabled = colorBG.disabled = false;
                colorFG.style.opacity = colorBG.style.opacity = 1;
            }
        }

//Clear Event
        clearBTN.onclick=()=>{
            background(255);
        }

//RandomColor Event
        randomColorBTN.onclick=()=>{
            if(isShifting){
                colorBG.value = randomColor()
            }
            else{
                colorFG.value = randomColor()
            }
        }

//Fill + Swap Events
        swap.onclick=()=>{
            const temp = colorFG.value;
            colorFG.value = colorBG.value;
            colorBG.value = temp;
        }
        fill.onclick=()=>{
            if(isShifting){
                background(colorBG.value);
            }
            else{
                background(colorFG.value);
            }
        }

//Sizes Events
for(let x in sizes){
    sizes[x].onclick=()=>{
        warnings.colWarning.style.display = "none";
        for(let z in sizes){
            sizes[z].classList.remove('selected');
        }

        switch(x){
            case'small':
            sizes.small.classList.add('selected');
            brushSize = 5;
            break;

            case'medium':
            sizes.medium.classList.add('selected');
            brushSize = 20;
            break;

            case'large':
            sizes.large.classList.add('selected');
            brushSize = 50;
            break;

            default:
            brushSize = 10;
        }
    }
}
//Edit events
    for(let x in edit){
        edit[x].onclick = () =>{
            for(let z in edit){
                edit[z].classList.remove('selected');
            }
        switch (x) {
            case 'line':
            edit.line.classList.add('selected');
                break;

            case 'triangle':
            edit.triangle.classList.add('selected');   
                break;

            case 'circle':
            edit.circle.classList.add('selected'); 
                break;

            case 'rectangle':
            edit.rectangle.classList.add('selected'); 
                break;

            case 'text':
            edit.text.classList.add('selected'); 
                break;

            case 'eraser':
            edit.eraser.classList.add('selected'); 
                break;
        }
      }
    }


//Brushes events
        brushes.pencil.onclick=()=>{
            brushSelected = 'pencil';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.pencil.classList.add('selected');
        }
        brushes.circleBrush.onclick=()=>{
            brushSelected = 'circle-brush';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.circleBrush.classList.add('selected');
        }
        brushes.rectangleBrush.onclick=()=>{
            brushSelected = 'rectangle-brush';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.rectangleBrush.classList.add('selected');
        }
        brushes.triangleBrush.onclick=()=>{
            brushSelected = 'triangle-brush';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.triangleBrush.classList.add('selected');
        }
        brushes.diamondBrush.onclick=()=>{
            brushSelected = 'diamond-brush';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.diamondBrush.classList.add('selected');
        }
        brushes.lineBrush.onclick=()=>{
            brushSelected = 'line-brush';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.lineBrush.classList.add('selected'); 
        }
        brushes.lineBrushReversed.onclick=()=>{
            brushSelected = 'line-brush-reversed';
            for(let x in brushes){
                brushes[x].classList.remove('selected');
            }
            brushes.lineBrushReversed.classList.add('selected'); 
        }

//Stroke Events
        strokeColor.onclick= () =>{
            if(sSwitch){
                strokeColor.innerHTML = "Sec";
            }
            else{
                strokeColor.innerHTML = "Pri";
            }
            sSwitch = !sSwitch;
        }

        for(let x in strokes){
            strokes[x].onclick =()=>{
                for(let z in strokes){
                    strokes[z].classList.remove('selected');
                }
                
                switch(x){
                    case 'thick':
                    strokeSize = 6;
                    strokes.thick.classList.add('selected');
                    break;

                    case 'normal':
                    strokeSize = 4;
                    strokes.normal.classList.add('selected');
                    break;
                    
                    case 'thin':
                    strokeSize = 2;
                    strokes.thin.classList.add('selected');
                    break;
                }
            }
        }
//Stroke Mode Events
        strokeModes.sHue.onclick=()=>{
            strokeModes.sHue.classList.toggle('selected');
            strokeModeList[0] = !strokeModeList[0];

            strokeModes.sRainbow.classList.remove('selected');
            strokeModes.sBlackWhite.classList.remove('selected');
            strokeModeList[1] = false;
            strokeModeList[2] = false;
        }

        strokeModes.sRainbow.onclick=()=>{
            strokeModes.sRainbow.classList.toggle('selected');
            strokeModeList[1] = !strokeModeList[1];

            strokeModes.sHue.classList.remove('selected');
            strokeModes.sBlackWhite.classList.remove('selected');
            strokeModeList[0] = false;
            strokeModeList[2] = false;
        }

        strokeModes.sBlackWhite.onclick=()=>{
            strokeModes.sBlackWhite.classList.toggle('selected');
            strokeModeList[2] = !strokeModeList[2];

            strokeModes.sHue.classList.remove('selected');
            strokeModes.sRainbow.classList.remove('selected');
            strokeModeList[0] = false;
            strokeModeList[1] = false;
        }

        strokeModes.sThickThin.onclick=()=>{
            strokeModes.sThickThin.classList.toggle('selected');
            strokeModeList[3] = !strokeModeList[3];
        }

        strokeModes.sOpacity.onclick=()=>{
            strokeModes.sOpacity.classList.toggle('selected');
            strokeModes.pulse.classList.remove('selected');
            strokeModeList[4] = !strokeModeList[4];
            strokeModeList[5] = false;
        }

        strokeModes.pulse.onclick=()=>{
            strokeModes.pulse.classList.toggle('selected');
            strokeModes.sOpacity.classList.remove('selected');
            strokeModeList[5] = !strokeModeList[5];
            strokeModeList[4] = false;
        }


//Opacity Event
        opacities.fillOpacity.onmousemove=()=>{
            opacityVal = opacities.fillOpacity.value;
        }

        opacities.strokeOpacity.onmousemove=()=>{
            sOpacityVal = opacities.strokeOpacity.value;
            if(sOpacityVal>0){
                warnings.sOpWarning.style.display = "none";
            }
            else if(sOpacityVal<=0){
                warnings.sOpWarning.style.display = "block";
            }
        }

//Color Modes events
        colorModes.hue.onclick=()=>{
            colorModes.hue.classList.toggle('selected');
            colorModeList[0] = !colorModeList[0];

            colorModes.rainbow.classList.remove('selected');
            colorModes.blackWhite.classList.remove('selected');
            colorModeList[1] = false;
            colorModeList[2] = false;
            
        }
        colorModes.rainbow.onclick=()=>{
            colorModes.rainbow.classList.toggle('selected');
            colorModeList[1] = !colorModeList[1];

            colorModes.hue.classList.remove('selected');
            colorModes.blackWhite.classList.remove('selected');
            colorModeList[0] = false;
            colorModeList[2] = false;
        }
        colorModes.blackWhite.onclick=()=>{
            colorModes.blackWhite.classList.toggle('selected');
            colorModeList[2] = !colorModeList[2];

            colorModes.hue.classList.remove('selected');
            colorModes.rainbow.classList.remove('selected');
            colorModeList[0] = false;
            colorModeList[1] = false;
        }
        colorModes.thickThin.onclick=()=>{
            colorModes.thickThin.classList.toggle('selected');
            colorModeList[3] = !colorModeList[3];
        }
        colorModes.spread.onclick=()=>{
            colorModes.spread.classList.toggle('selected');
            colorModeList[4] = !colorModeList[4];
        }
        colorModes.deltaOpacity.onclick=()=>{
            colorModes.deltaOpacity.classList.toggle('selected');
            colorModeList[5] = !colorModeList[5];
        }

//Nav Events//
//New Event
        createClose.onclick=()=>{
            setTimeout(()=>{
                createWrapper.style.display = "none";
            },300);
        }
        
        createBTN.onclick=()=>{
            canvasName = createName.value != "" ? createName.value : "Canvas";
            nameTag.innerHTML = canvasName != " " ? canvasName : "Canvas" ;
            
            setTimeout(()=>{
                createWrapper.style.display = "none";
            },300);
        }

//Save Event
        save.onclick=()=>{
            if(isShifting){
                saveCanvas("FastDraw","png");
            }
            else if(!isShifting){
                saveCanvas("FastDraw","jpg");
            }

        }

//Filters Event
        filters.dotFill.onclick = () =>{
            dotFillFilter();
        }


//Canvas Options
        edges.onmousemove=()=>{
            board.elt.style.borderRadius = edges.value + 'px';
        }

//Paramiters
        if(mouseX!==pmouseX){
            mX.innerHTML = Math.floor(mouseX);
        }

        if(mouseY!==pmouseY){
            mY.innerHTML = Math.floor(mouseY);
        }

        if(widthCanvas.innerHTML !== canvas.width || heightCanvas.innerHTML !== canvas.height){
            widthCanvas.innerHTML = canvas.width;
            heightCanvas.innerHTML = canvas.height;
        }

        if(!customColor.disabled && curColor.innerHTML !== customColor.value){
            curColor.innerHTML = customColor.value;
        }
        else if(customColor.disabled && isShifting && curColor.innerHTML !== colBG){
            curColor.innerHTML = colBG;
        }
        else if(customColor.disabled && !isShifting && curColor.innerHTML !== colFG){
            curColor.innerHTML = colFG;
        }

    },100)
}