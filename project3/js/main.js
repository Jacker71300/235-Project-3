"use strict";
const app = new PIXI.Application(600,600);
document.body.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;

let menuScene;
let gameScene;
let gameOverScene;