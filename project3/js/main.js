"use strict";
const app = new PIXI.Application(600,740);
let container = document.querySelector("#gamespace");
container.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

PIXI.loader.load(setup);

let stage;

let menuScene;
let gameScene;
let gameOverScene;

function setup(){
    stage = app.stage;

    menuScene = new PIXI.Container();
    stage.addChild(menuScene);

    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    let row1 = new Row();
    menuScene.addChild(row1);

    addTextAndButtons();
}

function addTextAndButtons(){
    
}