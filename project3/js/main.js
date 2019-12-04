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

setup();

function setup(){
    stage = app.stage;

    menuScene = new PIXI.Container();
    menuScene.visible = true;
    stage.addChild(menuScene);
    
    console.log(menuScene);

    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    addTextAndButtons();
}

function addTextAndButtons(){
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

    createRows(10);
}

function startGame(){
    gameScene.visible = true;
    menuScene.visible = false;
    gameOverScene.visible = false;

}

function createRows(num){
    for(let i = 1; i <= num; i++){
        let row = new Row(0, sceneHeight - 100 - 50 * i);
        gameScene.addChild(row);
    }
}