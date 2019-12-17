"use strict";
const app = new PIXI.Application(600,680);
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
let gameLossScene;
let muteButton;
let mute;
let unmuteButton;
let unmute;
//global list of all rows in the game scene
let rows = [];
let currentRow = 0;
//a reference to the current correct code
let key;
let submitButton;
if(localStorage.getItem("muted") == null){
    localStorage.setItem("muted", false);
}

if(localStorage.getItem("muted") == null){
    localStorage.setItem("muted", false);
}

// Preload sounds
let backgroundMusic = new Howl({
    src:['media/spainTrim.mp3'],
    volume: .15,
    loop: true
});

let clickSound = new Howl({
    src:['media/click.mp3']
});

let submitSound = new Howl({
    src:['media/submit.mp3']
});

let submitFailSound = new Howl({
    src:['media/submitFail.mp3'],
    volume: .4
});

let lightSound = new Howl({
    src:['media/light.mp3']
});

let winSound = new Howl({
    src:['media/win.mp3']
});

// Play looping background music
if(localStorage.getItem("muted") == "false")
    backgroundMusic.play();
setup();


function setup(){
    stage = app.stage;

    menuScene = new PIXI.Container();
    menuScene.visible = true;
    stage.addChild(menuScene);

    //rules scenes
    rule1Scene = new PIXI.Container();
    rule1Scene.visible = false;
    rule2Scene = new PIXI.Container();
    rule2Scene.visible = false;
    rule3Scene = new PIXI.Container();
    rule3Scene.visible = false;
    stage.addChild(rule1Scene);
    stage.addChild(rule2Scene);
    stage.addChild(rule3Scene);

    // Create scenes
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    gameLossScene = new PIXI.Container();
    gameLossScene.visible = false;
    stage.addChild(gameLossScene);

    muteButton = new PIXI.Container();
    muteButton.visible = localStorage.getItem("muted") == "false";
    stage.addChild(muteButton);

    unmuteButton = new PIXI.Container();
    unmuteButton.visible = localStorage.getItem("muted") == "true";
    stage.addChild(unmuteButton);

    addTextAndButtons();
}

// Creates the functions for the buttons in each scene
function addTextAndButtons(){
    let menuPhoto = PIXI.Sprite.fromImage("images/MainMenu.png");
    menuScene.addChild(menuPhoto);

    // Create backgrounds for rules
    let rule1Photo = PIXI.Sprite.fromImage("images/Rules1.png");
    let rule2Photo = PIXI.Sprite.fromImage("images/Rules2.png");
    let rule3Photo = PIXI.Sprite.fromImage("images/Rules3.png");
    rule1Photo.scale.set(.65);
    rule2Photo.scale.set(.65);
    rule3Photo.scale.set(.65);
    rule1Scene.addChild(rule1Photo);
    rule2Scene.addChild(rule2Photo);
    rule3Scene.addChild(rule3Photo);

    // Create start button for main menu
    let startButton = PIXI.Sprite.fromImage("images/StartButton.png");
    startButton.anchor.set(0.5,0.5);
    startButton.scale.set(.75);
    startButton.x = sceneWidth / 2;
    startButton.y = sceneHeight - 140;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    menuScene.addChild(startButton);

    //create rules button for main menu
    let rulesButton = PIXI.Sprite.fromImage("images/RulesButton.png");
    rulesButton.anchor.set(0.5,0.5);
    rulesButton.scale.set(.75);
    rulesButton.x = sceneWidth / 2;
    rulesButton.y = sceneHeight - 275;
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
    nextButton1.y = sceneHeight - 30;
    nextButton1.interactive = true;
    nextButton1.buttonMode = true;
    nextButton1.on("pointerup", cycleRules);
    nextButton1.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton1.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule1Scene.addChild(nextButton1);

    let nextButton2 = PIXI.Sprite.fromImage("images/nextButton.png");
    nextButton2.anchor.set(0.5,0.5);
    nextButton2.x = sceneWidth - 150;
    nextButton2.y = sceneHeight - 30;
    nextButton2.interactive = true;
    nextButton2.buttonMode = true;
    nextButton2.on("pointerup", cycleRules);
    nextButton2.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton2.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule2Scene.addChild(nextButton2);

    let nextButton3 = PIXI.Sprite.fromImage("images/nextButton.png");
    nextButton3.anchor.set(0.5,0.5);
    nextButton3.x = sceneWidth - 150;
    nextButton3.y = sceneHeight - 30;
    nextButton3.interactive = true;
    nextButton3.buttonMode = true;
    nextButton3.on("pointerup", cycleRules);
    nextButton3.on("pointerover",e=>e.target.alpha = 0.7);
    nextButton3.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    rule3Scene.addChild(nextButton3);

    // Create the rows and SS for game scene
    let background = new PIXI.Graphics();
    background.beginFill(0x222222);
    background.drawRect(0, 0, sceneWidth, sceneHeight);
    gameScene.addChild(background);
    createRows(9);
    createKeyAndInput();

    // Create submit button for game scene
    submitButton = PIXI.Sprite.fromImage("images/SubmitButton.png");
    submitButton.x = 430;
    submitButton.y = sceneHeight - 55;
    submitButton.interactive = true;
    submitButton.buttonMode = true;
    submitButton.on("pointerup",submit);
    submitButton.on("pointerover",e=>e.target.alpha = 0.7);
    submitButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    gameScene.addChild(submitButton);

    // Create the game over scene
    

    // Create restart button for game over scene
    let restartButton = PIXI.Sprite.fromImage("images/AgainButton.png");
    restartButton.position.set(sceneWidth / 4, sceneHeight/3);
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.on("pointerup",restartGame);
    restartButton.on("pointerover",e=>e.target.alpha = 0.7);
    restartButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    restartButton.scale.set(.34);

    gameOverScene.addChild(restartButton);
    
    let failButton = PIXI.Sprite.fromImage("images/LoseButton.png");
    failButton.position.set(sceneWidth / 4, sceneHeight/3);
    failButton.interactive = true;
    failButton.buttonMode = true;
    failButton.on("pointerup",restartGame);
    failButton.on("pointerover",e=>e.target.alpha = 0.7);
    failButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    failButton.scale.set(.34);
    
    gameLossScene.addChild(failButton);

    // Create the mute button
    mute = PIXI.Sprite.fromImage("images/MuteButton.png");
    mute.anchor.set(0.5,0.5);
    mute.position.set(sceneWidth / 2, sceneHeight - 40);
    mute.interactive = true;
    mute.buttonMode = true;
    mute.on("pointerup",muteAudio);
    mute.on("pointerover",e=>e.target.alpha = 0.7);
    mute.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    muteButton.addChild(mute);

    // Create the unmute button
    unmute = PIXI.Sprite.fromImage("images/UnmuteButton.png");
    unmute.anchor.set(0.5,0.5);
    unmute.position.set(sceneWidth / 2, sceneHeight - 40);
    unmute.interactive = true;
    unmute.buttonMode = true;
    unmute.on("pointerup",unmuteAudio);
    unmute.on("pointerover",e=>e.target.alpha = 0.7);
    unmute.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    unmuteButton.addChild(unmute);
}

// Start the game scene
function startGame(){
    if(localStorage.getItem("muted") == "false"){
        submitSound.play();
    }

    mute.position.set(510, 35);
    unmute.position.set(510, 35);
    gameScene.visible = true;
    rule1Scene.visible = false;
    rule2Scene.visible = false;
    rule3Scene.visible = false;
    menuScene.visible = false;
    gameOverScene.visible = false;
}

// Show the rules scene
function showRules(){
    if(localStorage.getItem("muted") == "false"){
        clickSound.play();
    }
    
    
    mute.position.set(100, 230);
    unmute.position.set(100, 230);
    gameScene.visible = false;
    rule1Scene.visible = true;
    rule2Scene.visible = false;
    rule3Scene.visible = false;
    menuScene.visible = false;
    gameOverScene.visible = false;
}

// Cycle through the rules
function cycleRules(){
    if(localStorage.getItem("muted") == "false")
        clickSound.play();    

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
        mute.position.set(sceneWidth / 2, sceneHeight - 40);
        unmute.position.set(sceneWidth / 2, sceneHeight - 40);
    }
}

// Create rows of input options
function createRows(num){
    for(let i = 1; i <= num; i++){
        let row = new Row(sceneWidth / 10, sceneHeight - 370 - 31 * i);
        rows.push(row);
        gameScene.addChild(row);
    }
}

// Create the inputs and the key at the top
function createKeyAndInput(){
    key = new Key(sceneWidth / 5, 0);
    gameScene.addChild(key);
    let input = new Input(sceneWidth / 10, sceneHeight - 370);
    gameScene.addChild(input);
}

// Submit a guess
function submit(){

    if(rows[currentRow].isComplete()){
        if(localStorage.getItem("muted") == "false")
            submitSound.play();

        rows[currentRow].compareRow(key);
        if(rows[currentRow].didPlayerWin()){
            endGameWin();
        }
        else if(currentRow == rows.length - 1){
            endGameLose();
        }
        else{
            currentRow++;
        }
    }
    else if(localStorage.getItem("muted") == "false")
        submitFailSound.play();
}

// Returns the currently active row
function getCurrentRow(){
    return rows[currentRow];
}

// Handles what happens when the game is won
function endGameWin(){
    if(localStorage.getItem("muted") == "false")
        winSound.play();
    key.uncover();
    gameOverScene.visible = true;
}

// Handles what happens when the game is lost
function endGameLose(){
    key.uncover();
    gameLossScene.visible = true;
}

// Unused
function endGame(){
    
}

// Restarts all the objects and resets the funcationality of everything
function restartGame(){
    if(localStorage.getItem("muted") == "false")
        submitSound.play();

    while(stage.children[0])
        stage.removeChild(stage.children[0]);
    
    rows = [];
    currentRow = 0;
    setup();
}

// Mutes all audio
function muteAudio(){
    localStorage.setItem("muted", "true");
    backgroundMusic.stop();
    unmuteButton.visible = true;
    muteButton.visible = false;
}

// Unmutes all audio
function unmuteAudio(){
    localStorage.setItem("muted", "false");
    backgroundMusic.play();
    unmuteButton.visible = false;
    muteButton.visible = true;
}