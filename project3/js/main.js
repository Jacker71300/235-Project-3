"use strict";
const app = new PIXI.Application(600,740);
let container = document.querySelector("#gamespace");
container.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;

let menuScene;
let gameScene;
let gameOverScene;
let rows = [];
let currentRow = 0;

setup();


function setup(){
    stage = app.stage;

    menuScene = new PIXI.Container();
    menuScene.visible = true;
    stage.addChild(menuScene);

    //console.log(menuScene);

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
    let startButton = new PIXI.Text("Start");
    startButton.style = new PIXI.TextStyle({
        fill: 0x00FF00,
        fontSize: 30,
        fontFamily: "Vernanda",
        strokeThickness: 6
    });
    startButton.x = 0;
    startButton.y = 0;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    menuScene.addChild(startButton);

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
    submitButton.x = 200;
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
    menuScene.visible = false;
    gameOverScene.visible = false;

}

function createRows(num){
    for(let i = 1; i <= num; i++){
        let row = new Row(0, sceneHeight - 400 - 25 * i);
        rows.push(row);
        gameScene.addChild(row);
    }
}

function createKeyAndInput(){
    let key = new Key(50, 0);
    gameScene.addChild(key);
    let input = new Input(0, sceneHeight - 400);
    gameScene.addChild(input);
}

function submit(){
    currentRow++;
}

function getCurrentRow(){
    console.log(rows[currentRow]);
    return rows[currentRow];
}

function gameLoop(){
    rows.forEach(row => {
        row.updateColors();
    });
}
