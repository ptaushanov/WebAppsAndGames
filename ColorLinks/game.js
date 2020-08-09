//Seting up the aplication
const cLinks = new PIXI.Application({
    width: 800,
    height: 500,
    backgroundColor: 0x89CFF0,
    antialias: true,
    resolution: 1,
    forceCanvas: false
});
const btOpt = {
    onScreenX: 40,
    onScreenY: 300,
    spacing: 70,
    textStyle: {
        fontSize: 60,
        fontFamily: "Gaegu",
        fill: 0xffffff,
        dropShadow: true,
        dropShadowDistance: -1.4
    }
};

//Canvas centering
cLinks.view.style.display = "block";
cLinks.view.style.margin = "auto";

//Body darkening
document.body.style.backgroundColor = "black";

//Apending the view
document.body.appendChild(cLinks.view);

const setup = () => {
    //Adding the sounds
    hoverSound = sounds["assets/hover.mp3"];
    menuClickSound = sounds["assets/menu_click.mp3"];
    cardClickSound = sounds["assets/card_click.mp3"];
    matchSound = sounds["assets/match.mp3"];
    nomatchSound = sounds["assets/nomatch.mp3"];

    //Adding the menu background
    let menuSprite = new PIXI.Sprite(
        PIXI.loader.resources["menu0"].texture
    );
    menuSprite.scale.set(0.8);

    //Updating the menu background
    let currMenuFrame = 0;
    setInterval(() => {
        currMenuFrame < 8 ? currMenuFrame++ : currMenuFrame = 0;
        menuSprite.texture = PIXI.loader.resources["menu" + currMenuFrame].texture;
    }, 1000);

    //Bluring the view
    menuSprite.filters = [new PIXI.filters.BlurFilter(1.8)];

    //Creating Containers
    const cMenu = new PIXI.Container();
    const cPlay = new PIXI.Container();
    const cEnd = new PIXI.Container();
    const cLevels = new PIXI.Container();
    const cTutorial = new PIXI.Container();

    cPlay.visible = false; // Deffaut False
    cLevels.visible = false;
    cEnd.visible = false;
    cTutorial.visible = false;

    /* Interactive Text  */
    const playText = new PIXI.Text("Play", btOpt.textStyle);
    const levelText = new PIXI.Text("Levels", btOpt.textStyle);
    const tutText = new PIXI.Text("Tutorial", btOpt.textStyle);
    const backTexts = [];

    playText.position.set(btOpt.onScreenX, btOpt.onScreenY);
    playText.anchor.set(0, 0.5);

    levelText.position.set(btOpt.onScreenX, btOpt.onScreenY + btOpt.spacing);
    levelText.anchor.set(0, 0.5);

    tutText.position.set(btOpt.onScreenX, btOpt.onScreenY + 2 * btOpt.spacing);
    tutText.anchor.set(0, 0.5);

    for (let i = 0; i < 3; i++) {
        const backText = new PIXI.Text("Back", btOpt.textStyle);
        backText.position.set(42, 412);
        backTexts.push(backText);
    }

    //Adding back text to all menus
    cEnd.addChild(backTexts[0]);
    cLevels.addChild(backTexts[1]);
    cTutorial.addChild(backTexts[2]);

    //Adding the texts to the main menu screen
    cMenu.addChild(menuSprite);
    cMenu.addChild(playText);
    cMenu.addChild(levelText);
    cMenu.addChild(tutText);

    /* Text End */

    /* Buttons for Text */
    const playBTN = new InteractiveButton(btOpt.onScreenX - 15, btOpt.onScreenY - 20, 135, 60);
    playBTN.interactive = true;
    playBTN.cursor = 'pointer';
    cMenu.addChild(playBTN);

    const levelBTN = new InteractiveButton(btOpt.onScreenX - 15, btOpt.onScreenY + 48, 180, 60);
    levelBTN.interactive = true;
    levelBTN.cursor = 'pointer';
    cMenu.addChild(levelBTN);

    const tutBTN = new InteractiveButton(btOpt.onScreenX - 15, btOpt.onScreenY + 116, 220, 60);
    tutBTN.interactive = true;
    tutBTN.cursor = 'pointer';
    cMenu.addChild(tutBTN);

    const backButtons = [];
    for (let i = 0; i < 3; i++) {
        backButton = new InteractiveButton(20, 420, 158, 60);
        backButton.interactive = true;
        backButton.cursor = "pointer";

        backButton.on("mouseover", () => {
            hoverSound.play();
            backTexts[i].style.fontSize *= 1.05;
            backButtons[i].width *= 1.06;
        });

        backButton.on("mouseout", () => {
            backTexts[i].style.fontSize /= 1.05;
            backButtons[i].width /= 1.06;
        });

        backButton.on("click", () => {
            menuClickSound.play();
            cPlay.visible = false;
            cEnd.visible = false;
            cLevels.visible = false;
            cTutorial.visible = false;
            cMenu.visible = true;
        });

        backButtons.push(backButton);
    }

    //Adding the back buttons to all menus
    cEnd.addChild(backButtons[0]);
    cLevels.addChild(backButtons[1]);
    cTutorial.addChild(backButtons[2]);
    /* Buttons End  */

    //Ading the Menu to the stage
    cLinks.stage.addChild(cMenu);

    //Adding the Main Play Area
    cLinks.stage.addChild(cPlay);
    cLinks.stage.addChild(cEnd);

    //Adding the Level viewer and Tutorial
    cLinks.stage.addChild(cLevels);
    cLinks.stage.addChild(cTutorial);

    /* Events on buttons */
    //Play
    playBTN.on("mouseover", () => {
        hoverSound.play();
        playText.style.fontSize *= 1.1;
        playBTN.width *= 1.06;
    });

    playBTN.on("mouseout", () => {
        playText.style.fontSize /= 1.1;
        playBTN.width /= 1.06;
    });

    playBTN.on("click", () => {
        menuClickSound.play();
        cMenu.visible = false;
        cPlay.visible = true;
    });

    //Levels
    levelBTN.on("mouseover", () => {
        hoverSound.play();
        levelText.style.fontSize *= 1.1;
        levelBTN.width *= 1.09;
    });

    levelBTN.on("mouseout", () => {
        levelText.style.fontSize /= 1.1;
        levelBTN.width /= 1.09;
    });

    levelBTN.on("click", () => {
        menuClickSound.play();
        cMenu.visible = false;
        cLevels.visible = true;
    });

    //Tutorial
    tutBTN.on("mouseover", () => {
        hoverSound.play();
        tutText.style.fontSize *= 1.1;
        tutBTN.width *= 1.09;
    });

    tutBTN.on("mouseout", () => {
        tutText.style.fontSize /= 1.1;
        tutBTN.width /= 1.09;
    });

    tutBTN.on("click", () => {
        menuClickSound.play();
        cMenu.visible = false;
        cTutorial.visible = true;
    });

    /* End on Button Events */

    /* Level Selector View */
    const textGroup = new PIXI.Container();

    let customStyle = Object.assign({}, btOpt.textStyle);
    customStyle.fontSize = 55;

    for (let row = 0; row < Math.ceil(levelSettings.length / 6); row++) {
        for (let coll = 0; coll < 6; coll++) {
            if (row * 6 + coll >= levelSettings.length)
                break;

            const buttText = (row * 6 + coll).toString();
            const letterOffset = buttText.length > 1 ? 15 : 0;
            const levelNumber = new PIXI.Text(buttText, customStyle);
            levelNumber.position.set(0 + coll * 100 - letterOffset, 0 + row * 100);

            textGroup.addChild(levelNumber);
            const levelSelectorBTN = new LevelSelectorButton(0 + coll * 100, 0 + row * 100, 115, 60);
            levelSelectorBTN.interactive = true;
            levelSelectorBTN.cursor = "pointer";

            levelSelectorBTN.on("click", () => {
                menuClickSound.play();
                levelIndex = parseInt(buttText) - 1;
                cardContainer.removeChildren();
                cLevels.visible = false;
                cPlay.visible = true;
            });

            cLevels.addChild(levelSelectorBTN);
        }
    }

    customStyle = undefined;
    textGroup.position.set(135, 60);
    cLevels.addChild(textGroup);
    /* Level Selector END */

    /* Tutoria View */
    let guideStyle = Object.assign({}, btOpt.textStyle);
    guideStyle.fontSize = 70;
    const guideHeaderText = new PIXI.Text("● How to play ●", guideStyle);

    guideStyle.fontSize = 42;
    guideStyle.align = "center";
    const guideParagraphText = new PIXI.Text("Click on a card to reveal its color. \nFind two cards with matching colors\n to earn score points. Picking 2 \nmismatching cards will subtract \n10 of your total points. That's it. Enjoy!", guideStyle);

    guideHeaderText.position.set(cLinks.screen.width / 2 - guideHeaderText.width / 2, 20);
    guideParagraphText.position.set(cLinks.screen.width / 2 - guideParagraphText.width / 2, guideHeaderText.height + 30);

    cTutorial.addChild(guideHeaderText);
    cTutorial.addChild(guideParagraphText);
    /* Tutorial END */

    /* Play */
    window.cardContainer = new PIXI.Container();
    let playCards = [];

    //Calling the createCardsAndBehaviour
    createCardsAndBehaviour(playCards, cardContainer);

    //Ading the cardContainer
    cPlay.addChild(cardContainer);

    //Scrore, Level and End Text
    const scoreLevelStyle = {
        fontFamily: "Lato",
        fontSize: 27,
        fill: 0xffffff,
        dropShadow: true,
        dropShadowDistance: -0.8
    };
    const scoreText = new PIXI.Text("Score: 0", scoreLevelStyle);
    const curLevText = new PIXI.Text("Level 0", scoreLevelStyle);
    const endText = new PIXI.Text("End not reached yet!", btOpt.textStyle);

    scoreText.position.set(30, 20);
    curLevText.position.set(cLinks.screen.width - curLevText.width - 40, 20);
    endText.style.align = "center";

    cPlay.addChild(scoreText);
    cPlay.addChild(curLevText);
    cEnd.addChild(endText);

    //Game draw loop
    cLinks.ticker.add(() => {
        if (cardContainer.children.length === 0) {
            if (levelIndex + 1 < levelSettings.length) {
                levelIndex++;
                playCards = [];
                curLevText.text = "Level " + levelIndex;
                createCardsAndBehaviour(playCards, cardContainer);
            } else {
                //End of the game
                endText.text = `Levels completed!\nYour score: ${playerScore}`;
                endText.position.set(cLinks.screen.width / 2 - endText.width / 2, 130);

                cPlay.visible = false;
                cEnd.visible = true;

                levelIndex = 0;
                playerScore = 0;
                playCards = [];
                curLevText.text = "Level " + levelIndex;
                createCardsAndBehaviour(playCards, cardContainer);
            }
        }

        //Showing the canges made on the cards
        for (let card of playCards) {
            card.show();
        }

        scoreText.text = "Score: " + playerScore;
    });
};