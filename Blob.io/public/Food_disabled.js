function Food(size){    
    this.randomColor=Math.floor(random(1,8));
    this.foodx = Math.floor(random(2,2000));
    this.foody = Math.floor(random(2,2000));
 
  this.show = function(){
     // console.log(this.randomColor);
      if(this.randomColor===1){
         fill(225,0,0);
    }
      else if(this.randomColor===2){
         fill(0,225,0);
    }
      else if(this.randomColor===3){
         fill(66,134,244);
    }
      else if(this.randomColor===4){
         fill(244,66,152);
    }
      else if(this.randomColor===5){
         fill(200,66,244);
    }
      else if(this.randomColor===6){
         fill(225,225,0);
    }
      else if(this.randomColor===7){
         fill(255,166,0);
    }
        noStroke();
        ellipse(this.foodx,this.foody,size,size);       
    }
}