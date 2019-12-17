// Class for the input objects on the bottom of the screen
class Input extends PIXI.Graphics{
    constructor(x = 0, y = 600, color = 0x999999){
        super();
        // this.beginFill(color);
        // this.drawRect(x, y, 400, 50);
        // this.endFill();
        this.input = PIXI.Sprite.fromImage("images/Input.png");
        this.input.position.set(x, y);
        this.addChild(this.input);
        
        this.x = x;
        this.y = y;
        this.color = color;

        // Create buttons
        this.color1 = PIXI.Sprite.fromImage("images/Button.png");
        this.color2 = PIXI.Sprite.fromImage("images/Button.png");
        this.color3 = PIXI.Sprite.fromImage("images/Button.png");
        this.color4 = PIXI.Sprite.fromImage("images/Button.png");
        this.color5 = PIXI.Sprite.fromImage("images/Button.png");
        this.color6 = PIXI.Sprite.fromImage("images/Button.png");

        //center anchor points
        this.color1.anchor.set(0.5,0.5);
        this.color2.anchor.set(0.5,0.5);
        this.color3.anchor.set(0.5,0.5);
        this.color4.anchor.set(0.5,0.5);
        this.color5.anchor.set(0.5,0.5);
        this.color6.anchor.set(0.5,0.5);

        // Set position and colors of buttons
        this.color1.position.x = this.x + 30;
        this.color1.position.y = this.y + 28;
        this.color1.tint = 0xFF00000;
        
        this.color2.position.x = this.x + 77;
        this.color2.position.y = this.y + 28;
        this.color2.tint = 0xFF8C00;
        
        this.color3.position.x = this.x + 124;
        this.color3.position.y = this.y + 28;
        this.color3.tint = 0xDAFF00;

        this.color4.position.x = this.x + 171;
        this.color4.position.y = this.y + 28;
        this.color4.tint = 0x00DD00;
        
        this.color5.position.x = this.x + 218;
        this.color5.position.y = this.y + 28;
        this.color5.tint = 0x0000FF;
        
        this.color6.position.x = this.x + 265;
        this.color6.position.y = this.y + 28;
        this.color6.tint = 0x800080;
        
        //add buttons to main box
        this.addChild(this.color1);
        this.addChild(this.color2);
        this.addChild(this.color3);
        this.addChild(this.color4);
        this.addChild(this.color5);
        this.addChild(this.color6);

        // Set functionality of all buttons
        this.color1.interactive = true;
        this.color1.buttonMode = true;
        this.color1.on("pointerover", e=>e.target.alpha = .7);
        this.color1.on("pointerup", e=>this.transferColor(getCurrentRow(), 0xFF0000));
        this.color1.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.color2.interactive = true;
        this.color2.buttonMode = true;
        this.color2.on("pointerover", e=>e.target.alpha = .7);
        this.color2.on("pointerup", e=>this.transferColor(getCurrentRow(), 0xFF8C00));
        this.color2.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.color3.interactive = true;
        this.color3.buttonMode = true;
        this.color3.on("pointerover", e=>e.target.alpha = .7);
        this.color3.on("pointerup", e=>this.transferColor(getCurrentRow(), 0xDAFF00));
        this.color3.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.color4.interactive = true;
        this.color4.buttonMode = true;
        this.color4.on("pointerover", e=>e.target.alpha = .7);
        this.color4.on("pointerup", e=>this.transferColor(getCurrentRow(), 0x00DD00));
        this.color4.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.color5.interactive = true;
        this.color5.buttonMode = true;
        this.color5.on("pointerover", e=>e.target.alpha = .7);
        this.color5.on("pointerup", e=>this.transferColor(getCurrentRow(), 0x0000FF));
        this.color5.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.color6.interactive = true;
        this.color6.buttonMode = true;
        this.color6.on("pointerover", e=>e.target.alpha = .7);
        this.color6.on("pointerup", e=>this.transferColor(getCurrentRow(), 0x800080));
        this.color6.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    }

    //finds the first empty light in that row and makes it the set color
    transferColor(row, color){
        if(localStorage.getItem("muted") == "false")
            clickSound.play();
        for(let i = 0; i < 4; i++){
            if(row.colorArray[i] == 0x555555){
                row.colorArray[i] = color;
                break;
            }
        }

        row.updateColors();
    }
}

class Row extends PIXI.Sprite{
    constructor(x = 100, y = 55, color = 0x999999){
        super();

        //make row from images
        this.row = PIXI.Sprite.fromImage("images/Row.png");
        this.row.anchor.set(0,0);
        this.row.position.x = x;
        this.row.position.y = y;
        this.addChild(this.row);

        this.x = x;
        this.y = y;
        this.color = color;
        
        //make arrays for lights to reference for their own color
        //(used in updateColors)
        this.colorArray = [0x555555, 0x555555, 0x555555, 0x555555];
        this.answerArray = [0x555555, 0x555555, 0x555555, 0x555555];

        this.updateColors();
    }

    //this is used because pixi doesnt let you change the color of something when its drawn
    //so every time a light changes color, all 8 lights need to be changed too
    updateColors(){
        //creates 4 lights
        this.hole1 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole2 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole3 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole4 = PIXI.Sprite.fromImage("images/Light.png");

        //center anchor points
        this.hole1.anchor.set(0.5,0.5);
        this.hole2.anchor.set(0.5,0.5);
        this.hole3.anchor.set(0.5,0.5);
        this.hole4.anchor.set(0.5,0.5);

        //place lights in appropriate spaces
        this.hole1.position.set(this.x + 30, this.y + 30);
        this.hole1.tint = this.colorArray[0];
        
        this.hole2.position.set(this.x + 90, this.y + 30);
        this.hole2.tint = this.colorArray[1];
        
        this.hole3.position.set(this.x + 150, this.y + 30);
        this.hole3.tint = this.colorArray[2];
        
        this.hole4.position.set(this.x + 210, this.y + 30);
        this.hole4.tint = this.colorArray[3];

        //make them all buttons
        //when pressed, call resetColor for that location in colorArray
        this.hole1.interactive = true;
        this.hole1.buttonMode = true;
        this.hole1.instantiating = true;
        this.hole1.on("pointerover", e=>e.target.alpha = .7);
        this.hole1.on("pointerup", e=>this.resetColor(0));
        this.hole1.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.hole2.interactive = true;
        this.hole2.buttonMode = true;
        this.hole2.instantiating = true;
        this.hole2.on("pointerover", e=>e.target.alpha = .7);
        this.hole2.on("pointerup", e=>this.resetColor(1));
        this.hole2.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.hole3.interactive = true;
        this.hole3.buttonMode = true;
        this.hole3.instantiating = true;
        this.hole3.on("pointerover", e=>e.target.alpha = .7);
        this.hole3.on("pointerup", e=>this.resetColor(2));
        this.hole3.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        this.hole4.interactive = true;
        this.hole4.buttonMode = true;
        this.hole4.instantiating = true;
        this.hole4.on("pointerover", e=>e.target.alpha = .7);
        this.hole4.on("pointerup", e=>this.resetColor(3));
        this.hole4.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    
        this.answer1 = PIXI.Sprite.fromImage("images/Light.png");
        this.answer2 = PIXI.Sprite.fromImage("images/Light.png");
        this.answer3 = PIXI.Sprite.fromImage("images/Light.png");
        this.answer4 = PIXI.Sprite.fromImage("images/Light.png");
        
        //places answer lights
        this.answer1.scale.set(0.25);
        this.answer1.anchor.set(0.5,0.5);
        this.answer1.position.set(this.x + 260, this.y + 20);
        this.answer1.tint = this.answerArray[0];

        this.answer2.scale.set(0.25);
        this.answer2.anchor.set(0.5,0.5);
        this.answer2.position.set(this.x + 280, this.y + 20);
        this.answer2.tint = this.answerArray[1];

        this.answer3.scale.set(0.25);
        this.answer3.anchor.set(0.5,0.5);
        this.answer3.position.set(this.x + 260, this.y + 40);
        this.answer3.tint = this.answerArray[2];

        this.answer4.scale.set(0.25);
        this.answer4.anchor.set(0.5,0.5);
        this.answer4.position.set(this.x + 280, this.y + 40);
        this.answer4.tint = this.answerArray[3];

        //add all 8 lights to parent
        this.addChild(this.hole1);
        this.addChild(this.hole2);
        this.addChild(this.hole3);
        this.addChild(this.hole4);
        this.addChild(this.answer1);
        this.addChild(this.answer2);
        this.addChild(this.answer3);
        this.addChild(this.answer4);
    }

    //used to check how well the player did and change the answer lights accordingly
    compareRow(key){
        let colorChecked = [false, false, false, false];
        let keyChecked = [false, false, false, false];

        //check for direct matches
        for(let c = 0; c < 4; c++){
            if(this.colorArray[c] == key.colorArray[c]){
                colorChecked[c] = true;
                keyChecked[c] = true;

                //loop through answers for first empty slot
                //make it black
                for(let a = 0; a < 4; a++){
                    if(this.answerArray[a] == 0x555555){
                        this.answerArray[a] = 0xFFFFFF;
                        break;
                    }
                }
            }
        }

        //first, loop through colorArray
        for(let c = 0; c < 4; c++){
            if(colorChecked[c]){
                continue;
            }
            //now loop through the key
            //if checked, move on to net color in key
            for(let k = 0; k < 4; k++){
                if(keyChecked[k]){
                    continue;
                }
                //otherwise, check if there's a misplaced color
                else if(this.colorArray[c] == key.colorArray[k]){
                    //if there is, find where to change the color in the answerArray
                    keyChecked[k] = true;
                    colorChecked[c] = true;
                    for(let a = 0; a < 4; a++){
                        if(this.answerArray[a] == 0x555555){
                            this.answerArray[a] = 0x888843;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        this.updateColors();
    }

    //used to change color of a wrong guess back to gray if player made a mistake
    resetColor(index){
        if(this.colorArray[index] != 0x555555 && localStorage.getItem("muted") == "false")
            lightSound.play();
        this.colorArray[index] = 0x555555;
        this.updateColors();
    }

    //can't submit if all lights aren't filled
    isComplete(){
        for(let r = 0; r < 4; r++){
            if(this.colorArray[r] == 0x555555){
                return false;
            }
        }
        
        return true;
    }

    //makes sure all 4 are correct, returns player win state
    didPlayerWin(){
        if(this.answerArray[3] == 0xFFFFFF){
            return true;
        }
        return false;
    }
}


class Key extends PIXI.Graphics{
    constructor(x = 150, y = 0, color = 0x999999){
        super();

        //used row image
        this.row = PIXI.Sprite.fromImage("images/Row.png");
        this.row.position.set(x, y);
        this.addChild(this.row);

        this.colorArray = [];

        //randomly generate color for each space
        for(let i = 0; i < 4; i++){
            let colorNum = Math.floor(Math.random() * 6);

            if(colorNum == 0){
                this.colorArray[i] = 0xFF0000;
            }
            else if(colorNum == 1){
                this.colorArray[i] = 0xFF8C00;
            }
            else if(colorNum == 2){
                this.colorArray[i] = 0xDAFF00;
            }
            else if(colorNum == 3){
                this.colorArray[i] = 0x00DD00;
            }
            else if(colorNum == 4){
                this.colorArray[i] = 0x0000FF;
            }
            else if(colorNum == 5){
                this.colorArray[i] = 0x800080;
            }
        }

        //make all lights
        this.peg1 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg2 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg3 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg4 = PIXI.Sprite.fromImage("images/Light.png");
        //drawn over lights to hide them until the code is guessed
        //we could just not draw them at all, but this was easier for debugging
        this.cover = PIXI.Sprite.fromImage("images/Cover.png");

        //center anchors
        this.peg1.anchor.set(0.5,0.5);
        this.peg2.anchor.set(0.5,0.5);
        this.peg3.anchor.set(0.5,0.5);
        this.peg4.anchor.set(0.5,0.5);

        //space lights out over row
        this.peg1.position.x = x + 30;
        this.peg1.position.y = y + 30;
        this.peg1.tint = this.colorArray[0];
        
        this.peg2.position.x = x + 90;
        this.peg2.position.y = y + 30;
        this.peg2.tint = this.colorArray[1];
        
        this.peg3.position.x = x + 150;
        this.peg3.position.y = y + 30;
        this.peg3.tint = this.colorArray[2];
        
        this.peg4.position.x = x + 210;
        this.peg4.position.y = y + 30;
        this.peg4.tint = this.colorArray[3];

        this.cover.position.set(x, y);

        //add children to parent
        this.addChild(this.peg1);
        this.addChild(this.peg2);
        this.addChild(this.peg3);
        this.addChild(this.peg4);
        this.addChild(this.cover);
    }

    //called when the game is won, removes cover to reveal 
    uncover(){
        //console.log("win");
        this.removeChild(this.cover);
    }
}