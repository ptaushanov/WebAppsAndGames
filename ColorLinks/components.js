/* Game Options - Colors, Levels, Card posion, size and spacing */
const colorPallet = [0x5ebd3e, 0xffb900, 0xf78200, 0xe23838, 0x973999, 0x009cdf, 0xff0198, 0x113683, 0x107c10, 0xffff00];
const levelOptions = [
    {pivotX:290, pivotY:116, count:4, rows:2, crdWidth: 85, crdHeight: 122, spacingX: 50, spacingY: 25},
    {pivotX:184, pivotY:188, count:4, rows:1, crdWidth: 85, crdHeight: 122, spacingX: 30, spacingY: 0},
    {pivotX:223, pivotY:116, count:6, rows:2, crdWidth: 85, crdHeight: 122, spacingX: 50, spacingY: 25},
    {pivotX:155, pivotY:116, count:8, rows:2, crdWidth: 85, crdHeight: 122, spacingX: 50, spacingY: 25},
    {pivotX:88, pivotY:116, count:10, rows:2, crdWidth: 85, crdHeight: 122, spacingX: 50, spacingY: 25},
    {pivotX:112, pivotY:135, count:12, rows:2, crdWidth: 75, crdHeight: 107, spacingX: 25, spacingY: 15},
    {pivotX:212, pivotY:75, count:12, rows:3, crdWidth: 75, crdHeight: 107, spacingX: 25, spacingY: 15},
    {pivotX:77, pivotY:154, count:16, rows:2, crdWidth: 63, crdHeight: 90, spacingX: 20, spacingY: 10},
    {pivotX:227, pivotY:55, count:16, rows:4, crdWidth: 63, crdHeight: 90, spacingX: 30, spacingY: 10},
    {pivotX:146, pivotY:105, count:18, rows:3, crdWidth: 63, crdHeight: 90, spacingX: 25, spacingY: 10},
    {pivotX:193, pivotY:55, count:20, rows:4, crdWidth: 63, crdHeight: 90, spacingX: 25, spacingY: 10},
];

let levelIndex = 0; // Index for the levelOptions
let playerScore = 0; // Record for the player score

/* Component Classes */
class InteractiveButton extends PIXI.Graphics{
    constructor(btnPosX, btnPosY, width, height, color = 0xf5f5f5){
        super();
        this.position.set(btnPosX, btnPosY);
        this.width = width;
        this.height = height;


        this.beginFill(color,0);
        this.lineStyle(2,0x000000, 0.15);
        this.drawPolygon([-2, -2, width - 17, -2, width -2, height -2, 13, height -2, -2, -2]);
        this.endFill();

        this.beginFill(color,0.15);
        this.lineStyle(2,color, 0.8);
        this.drawPolygon([0, 0, width - 15, 0, width, height, 15, height, 0,0]);
        this.endFill();

        
    }
}

class LevelSelectorButton extends PIXI.Graphics{
    constructor(x, y, offsetX, offsetY, width = 70, height = 70, color = 0xffffff){
        super();
        this.beginFill(color, 0);
        this.lineStyle(2, 0x000000, 0.15);
        this.drawRect(x + offsetX - 2, y + offsetY - 2, width, height);
        this.endFill();

        this.beginFill(color, 0.15);
        this.lineStyle(2, color, 0.8);
        this.drawRect(x + offsetX, y + offsetY, width, height);
        this.endFill();
    }
}

class Card extends PIXI.Graphics{
    constructor(cardX, cardY, width, height, color = 0x0c0a31){
        super();
        this.cardX = cardX;
        this.cardY = cardY;
        this.width = width;
        this.height = height;
        this.color = color;

        this.hiddenColor = 0xffffff;

        this.show = () =>{
            this.clear();
            this.beginFill(this.color);
            this.lineStyle(5,0xffffff);
            this.drawRoundedRect(cardX, cardY, width, height, 10);
            this.endFill();
        };

        this.toDeffautColor = () =>{
            this.color = 0x0c0a31;
        };
    }
}
/* Component Classes End*/

// Array shuffle function
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* Polyfills */
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
}
/* Polyfills END */

/* Component creator funcions */
const createCards = (options, array) =>{
    for(let i = 0; i < options.count / options.rows; i++){
        for(let j = 0; j < options.rows; j++){
            const cardX = 0 + i * (options.crdWidth + options.spacingX);
            const cardY = 0 + j * (options.crdHeight + options.spacingY);
            let newCard = new Card(cardX, cardY, options.crdWidth, options.crdHeight);
            newCard.position.set(options.pivotX, options.pivotY);
            array.push(newCard);
        }
    }
};

const createCardsAndBehaviour = (cardsArray, cardContainer) =>{
    createCards(levelOptions[levelIndex], cardsArray);

    //Adding just the needed colors;
    shuffle(colorPallet);
    let currentColors = colorPallet.slice().splice(0,levelOptions[levelIndex].count / 2);
    currentColors = [...currentColors, ...currentColors];
    shuffle(currentColors);

    /*Moddifying the cards behaviour */
    //When player clicks reveals a color
    let colorToPair, pairingCard;

    //Looping the cards
    for(let card of cardsArray){
    
        //Picking a random color
        card.hiddenColor = currentColors[cardsArray.indexOf(card)];

        //Adding mouse interactivity to current cards
        card.interactive = true;
        card.cursor = "pointer";
    
        //Checking for user input
        card.on("click",() =>{
            card.color = card.hiddenColor;
    
            //If no card selected
            if(colorToPair === undefined){
                cardClickSound.play();
                colorToPair = card.color;
                pairingCard = card;
                card.interactive = false;
            }
            else{
                cardsArray.forEach(x => x.interactive = false);
                
                //When a second card is selected but doesn't match the first
                if(colorToPair !== card.hiddenColor){
                    nomatchSound.play();
                    if(playerScore !== 0){
                        playerScore -= 10;
                    }
                    setTimeout(()=>{
                        pairingCard.toDeffautColor();
                        card.toDeffautColor();
                        cardsArray.forEach(x => x.interactive = true);
                    },1000);
                }
                else{
                    //When the second card matches the first
                    matchSound.play();
                    playerScore += 30;
                    setTimeout(() => {
                      cardContainer.removeChild(card);
                      cardContainer.removeChild(pairingCard);
    
                      cardsArray.forEach(x => x.interactive = true);
                    },1000);
                }
                
                colorToPair = undefined;
            }
     
        });
    
        cardContainer.addChild(card);
    }
};
/* Component creator funcions  END*/

/* Component Loaders */
let hoverSound, menuClickSound, cardClickSound, matchSound, nomatchSound;
const loadImages = () =>{
    PIXI.loader
    .add("menu0","assets/menu0.png")
    .add("menu1","assets/menu1.png")
    .add("menu2","assets/menu2.png")
    .add("menu3","assets/menu3.png")
    .add("menu4","assets/menu4.png")
    .add("menu5","assets/menu5.png")
    .add("menu6","assets/menu6.png")
    .add("menu7","assets/menu7.png")
    .add("menu8","assets/menu8.png")
    .load(setup);
};
sounds.load([
    "assets/hover.mp3",
    "assets/menu_click.mp3",
    "assets/card_click.mp3",
    "assets/match.mp3",
    "assets/nomatch.mp3"
  ]);
sounds.whenLoaded = loadImages;