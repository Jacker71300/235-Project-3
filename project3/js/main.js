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
    let testRow = new Row();

    let startButton = new PIXI.Text("Start");
    startButton.style = new PIXI.TextStyle({
        fill: 0x00FF00,
        fontSize: 30,
        fontFamily: "Vernanda",
        strokeThickness: 6
    });
    startButton.x = 0;
    startButton.y = 0;

    menuScene.addChild(startButton);
    menuScene.addChild(testRow);
}

function startGame(){
    gameScene.visible = true;
    menuScene.visible = false;
    gameOverScene.visible = false;
}