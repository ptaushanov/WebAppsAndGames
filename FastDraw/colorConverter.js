//Custom fuctions

//Redundant
const randomColor=()=>{
    return '#' +Math.floor(Math.random()*16777215).toString(16);
}
const hslColor=(hslIndex)=>{
    return [hslIndex, '100%', "50%"];
}
//End

const blackWhite=(index,list,oPacity,increment=0)=>{
    switch (index){
      case 1:
          if(list){
            return `rgba(240,240,240,${indexOpacity+increment})`;
          }
          else{
            return `rgba(240,240,240,${oPacity})`;
          }
      break;
      default:
          if(list){
            return `rgba(0,0,0,${indexOpacity+increment})`;
          }
          else{
            return `rgba(0,0,0,${oPacity})`;
          }
      break;
    }
    return colors[index];
}
const rainbowColor=(index)=>{
    const colors = ['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#4B0082','#9400D3'];
    return colors[index];
}
const hexToRgba = (hex,list,oPacity,increment=0) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if(list){
        return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${(indexOpacity+increment).toFixed(2)})`;
    }
    else{
        return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${oPacity})`;
    }
}

    const hslToRGBA = (HSL,list,oPacity,increment=0) => {
    let h = Math.max(Math.min(parseInt(HSL[0], 10), 360), 0) / 360,
      s = Math.max(Math.min(parseInt(HSL[1], 10), 100), 0) / 100,
      l = Math.max(Math.min(parseInt(HSL[2], 10), 100), 0) / 100,
      v,min,sv,six,fract,vsfract,r,g,b;

    if (l <= 0.5) {
      v = l * (1 + s);
    } else {
      v = l + s - l * s;
    }
    if (v === 0) {
      return [0, 0, 0];
    }
    min = 2 * l - v;
    sv = (v - min) / v;
    h = 6 * h;
    six = Math.floor(h);
    fract = h - six;
    vsfract = v * sv * fract;
    switch (six) {
    case 1:
      r = v - vsfract;
      g = v;
      b = min;
      break;
    case 2:
      r = min;
      g = v;
      b = min + vsfract;
      break;
    case 3:
      r = min;
      g = v - vsfract;
      b = v;
      break;
    case 4:
      r = min + vsfract;
      g = min;
      b = v;
      break;
    case 5:
      r = v;
      g = min;
      b = v - vsfract;
      break;
    default:
      r = v;
      g = min + vsfract;
      b = min;
      break;
    }
        if(list){
            return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)},${(indexOpacity+increment).toFixed(2)})`;
        }
        else{
            return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)},${oPacity})`;
        }
}