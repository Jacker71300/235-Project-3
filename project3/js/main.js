"use strict";
const app = new PIXI.Application(600,720);
let container = document.querySelector("#gamespace");
container.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;

let menuScene;
let rule1Scene;
let rule2Scene;
let rule3Scene;
let gameScene;
let gameOverScene;
let rows = [];
let currentRow = 0;
let key

setup();


function setup(){
    stage = app.stage;

    menuScene = new PIXI.Container();
    menuScene.visible = true;
    let menuPhoto = PIXI.Sprite.fromImage("images/MainMenu.png");
    menuScene.addChild(menuPhoto);
    stage.addChild(menuScene);

    //console.log(menuScene);

    //rules scenes
    rule1Scene = new PIXI.Container();
    rule1Scene.visible = false;
    rule2Scene = new PIXI.Container();
    rule2Scene.visible = false;
    rule3Scene = new PIXI.Container();
    rule3Scene.visible = false;
    let rule1Photo = PIXI.Sprite.fromImage("images/Rules1.png");
    let rule2Photo = PIXI.Sprite.fromImage("images/Rules2.png");
    let rule3Photo = PIXI.Sprite.fromImage("images/Rules3.png");
    rule1Scene.addChild(rule1Photo);
    rule2Scene.addChild(rule2Photo);
    rule3Scene.addChild(rule3Photo);
    stage.addChild(rule1Scene);
    stage.addChild(rule2Scene);
    stage.addChild(rule3Scene);

    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    addTextAndButtons();

    //app.ticker.add(gameLoop);
    //app.ticker.start();
}

function addTextAndButtons(){

    // Create start button for main menu
    let startButton = PIXI.Sprite.fromImage("images/StartButton.png");
    startButton.anchor.set(0.5,0.5);
    startButton.x = sceneWidth / 2;
    startButton.y = sceneHeight - 150;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    menuScene.addChild(startButton);

    //create rules button for main menu
    let rulesButton = PIXI.Sprite.fromImage("images/RulesButton.png");
    rulesButton.anchor.set(0.5,0.5);
    rulesButton.x = sceneWidth / 2;
    rulesButton.y = sceneHeight - 350;
    rulesButton.interactive = true;
    rulesButton.buttonMode = true;
    rulesButton.on("pointerup",showRules);
    rulesButton.on("pointerover",e=>e.target.alpha = 0.7);
    rulesButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    menuScene.addChild(rulesButton);

    //create next buttons for rules menu
    let nextButton1 = PIXI.Sprite.fromImage("images/nextButton.png");
    nextButton1.anchor.set(0.5,0.5);
    nextButton1.x = sceneWidth - 150;
    nextButton1.y = sceneHeight - 85;
    nextButton1.interactive = true;
    nextButton1.buttonMode = true;
    nextButton1.on("pointerup", cycleRules);
    nextButton1.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton1.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule1Scene.addChild(nextButton1);

    let nextButton2 = PIXI.Sprite.fromImage("images/nextButton.png");
    nextButton2.anchor.set(0.5,0.5);
    nextButton2.x = sceneWidth - 150;
    nextButton2.y = sceneHeight - 85;
    nextButton2.interactive = true;
    nextButton2.buttonMode = true;
    nextButton2.on("pointerup", cycleRules);
    nextButton2.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton2.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule2Scene.addChild(nextButton2);

    let nextButton3 = PIXI.Sprite.fromImage("images/nextButton.png");
    nextButton3.anchor.set(0.5,0.5);
    nextButton3.x = sceneWidth - 150;
    nextButton3.y = sceneHeight - 85;
    nextButton3.interactive = true;
    nextButton3.buttonMode = true;
    nextButton3.on("pointerup", cycleRules);
    nextButton3.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton3.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule3Scene.addChild(nextButton3);

    // Create the rows and input for game scene
    createRows(10);
    createKeyAndInput();

    // Create submit button for game scene
    let submitButton = new PIXI.Text("Submit");
    submitButton.style = new PIXI.TextStyle({
        fill: 0x00FF00,
        fontSize: 30,
        fontFamily: "Vernanda",
        strokeThickness: 6
    });
    submitButton.x = 300;
    submitButton.y = sceneHeight - 100;
    submitButton.interactive = true;
    submitButton.buttonMode = true;
    submitButton.on("pointerup",submit);
    submitButton.on("pointerover",e=>e.target.alpha = 0.7);
    submitButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    gameScene.addChild(submitButton);


    // Create restart button for game over scene
    let restartButton = new PIXI.Text("Play Again?");
    restartButton.style = new PIXI.TextStyle({
        fill: 0x00FF00,
        fontSize: 30,
        fontFamily: "Vernanda",
        strokeThickness: 6
    });
    restartButton.x = 0;
    restartButton.y = 0;
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.on("pointerup",startGame);
    restartButton.on("pointerover",e=>e.target.slpha = 0.7);
    restartButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    gameOverScene.addChild(restartButton);
}

function startGame(){
    gameScene.visible = true;
    rule1Scene.visible = false;
    rule2Scene.visible = false;
    rule3Scene.visible = false;
    menuScene.visible = false;
    gameOverScene.visible = false;
}

function showRules(){
    gameScene.visible = false;
    rule1Scene.visible = true;
    rule2Scene.visible = false;
    rule3Scene.visible = false;
    menuScene.visible = false;
    gameOverScene.visible = false;
}

function cycleRules(){
    if(rule1Scene.visible){
        rule1Scene.visible = false;
        rule2Scene.visible = true;
    }
    else if(rule2Scene.visible){
        rule2Scene.visible = false;
        rule3Scene.visible = true;
    }
    else if(rule3Scene.visible){
        rule3Scene.visible = false;
        menuScene.visible = true;
    }
}

function createRows(num){
    for(let i = 1; i <= num; i++){
        let row = new Row(0, sceneHeight - 380 - 31 * i);
        rows.push(row);
        gameScene.addChild(row);
    }
}

function createKeyAndInput(){
    key = new Key(0, 0);
    gameScene.addChild(key);
    let input = new Input(0, sceneHeight - 375);
    gameScene.addChild(input);
}

function submit(){
    console.log(currentRow);
    if(rows[currentRow].isComplete()){
        rows[currentRow].compareRow(key);
        if(rows[currentRow].didPlayerWin()){
            console.log("win");
            endGameWin();
        }
        else if(currentRow == rows.length){
            console.log("lose");
            endGameLose();
        }
        else{
            currentRow++;
        }
    }
}

function getCurrentRow(){
    console.log(currentRow);
    console.log(rows[currentRow]);
    return rows[currentRow];
}

function endGameWin(){
    key.uncover();
}

function endGameLose(){
    
}