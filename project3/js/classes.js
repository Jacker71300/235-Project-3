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

    transferColor(row, color){
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
        // this.beginFill(color);
        // this.drawRect(x, y, 400, 50);
        // this.endFill();

        this.row = PIXI.Sprite.fromImage("images/Row.png");
        this.row.anchor.set(0,0);
        this.row.position.x = x;
        this.row.position.y = y;
        this.addChild(this.row);


        this.x = x;
        this.y = y;
        this.color = color;
        

        this.colorArray = [0x555555, 0x555555, 0x555555, 0x555555];
        this.answerArray = [0x555555, 0x555555, 0x555555, 0x555555];

        this.updateColors();
    }

    updateColors(){
        this.hole1 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole2 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole3 = PIXI.Sprite.fromImage("images/Light.png");
        this.hole4 = PIXI.Sprite.fromImage("images/Light.png");

        this.hole1.anchor.set(0.5,0.5);
        this.hole2.anchor.set(0.5,0.5);
        this.hole3.anchor.set(0.5,0.5);
        this.hole4.anchor.set(0.5,0.5);

        // this.hole1.beginFill(this.colorArray[0]);
        // this.hole1.drawCircle(this.x + 30, this.y + 25, 20);
        // this.hole1.endFill();
        this.hole1.position.set(this.x + 30, this.y + 30);
        this.hole1.tint = this.colorArray[0];
        
        // this.hole2.beginFill(this.colorArray[1]);
        // this.hole2.drawCircle(this.x + 90, this.y + 25, 20);
        // this.hole2.endFill();
        this.hole2.position.set(this.x + 90, this.y + 30);
        this.hole2.tint = this.colorArray[1];
        
        // this.hole3.beginFill(this.colorArray[2]);
        // this.hole3.drawCircle(this.x + 150, this.y + 25, 20);
        // this.hole3.endFill();
        this.hole3.position.set(this.x + 150, this.y + 30);
        this.hole3.tint = this.colorArray[2];
        
        // this.hole4.beginFill(this.colorArray[3]);
        // this.hole4.drawCircle(this.x + 210, this.y + 25, 20);
        // this.hole4.endFill();
        this.hole4.position.set(this.x + 210, this.y + 30);
        this.hole4.tint = this.colorArray[3];

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
        
        // this.answer1.beginFill(this.answerArray[0]);
        // this.answer1.drawCircle(this.x + 250, this.y + 15, 8)
        // this.answer1.endFill();
        this.answer1.scale.set(0.25);
        this.answer1.anchor.set(0.5,0.5);
        this.answer1.position.set(this.x + 260, this.y + 20);
        this.answer1.tint = this.answerArray[0];

        // this.answer2.beginFill(this.answerArray[1]);
        // this.answer2.drawCircle(this.x + 270, this.y + 15, 8)
        // this.answer2.endFill();
        this.answer2.scale.set(0.25);
        this.answer2.anchor.set(0.5,0.5);
        this.answer2.position.set(this.x + 280, this.y + 20);
        this.answer2.tint = this.answerArray[1];


        // this.answer3.beginFill(this.answerArray[2]);
        // this.answer3.drawCircle(this.x + 250, this.y + 35, 8)
        // this.answer3.endFill();
        this.answer3.scale.set(0.25);
        this.answer3.anchor.set(0.5,0.5);
        this.answer3.position.set(this.x + 260, this.y + 40);
        this.answer3.tint = this.answerArray[2];

        // this.answer4.beginFill(this.answerArray[3]);
        // this.answer4.drawCircle(this.x + 270, this.y + 35, 8)
        // this.answer4.endFill();
        this.answer4.scale.set(0.25);
        this.answer4.anchor.set(0.5,0.5);
        this.answer4.position.set(this.x + 280, this.y + 40);
        this.answer4.tint = this.answerArray[3];

        this.addChild(this.hole1);
        this.addChild(this.hole2);
        this.addChild(this.hole3);
        this.addChild(this.hole4);
        this.addChild(this.answer1);
        this.addChild(this.answer2);
        this.addChild(this.answer3);
        this.addChild(this.answer4);
    }

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

    resetColor(index){
        if(this.colorArray[index] != 0x555555)
            lightSound.play();
        this.colorArray[index] = 0x555555;
        this.updateColors();
    }

    isComplete(){
        for(let r = 0; r < 4; r++){
            if(this.colorArray[r] == 0x555555){
                return false;
            }
        }
        
        return true;
    }

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
        // this.beginFill(color);
        // this.drawRect(x, y, 300, 50);
        // this.endFill();

        this.row = PIXI.Sprite.fromImage("images/Row.png");
        this.row.position.set(x, y);
        this.addChild(this.row);

        this.colorArray = [];

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

        this.peg1 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg2 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg3 = PIXI.Sprite.fromImage("images/Light.png");
        this.peg4 = PIXI.Sprite.fromImage("images/Light.png");
        this.cover = PIXI.Sprite.fromImage("images/Cover.png");

        this.peg1.anchor.set(0.5,0.5);
        this.peg2.anchor.set(0.5,0.5);
        this.peg3.anchor.set(0.5,0.5);
        this.peg4.anchor.set(0.5,0.5);

        // this.peg1.beginFill(this.colorArray[0]);
        // this.peg1.drawCircle(x + 30, y + 25, 20);
        // this.peg1.endFill();
        this.peg1.position.x = x + 30;
        this.peg1.position.y = y + 30;
        this.peg1.tint = this.colorArray[0];
        
        // this.peg2.beginFill(this.colorArray[1]);
        // this.peg2.drawCircle(x + 90, y + 25, 20);
        // this.peg2.endFill();
        this.peg2.position.x = x + 90;
        this.peg2.position.y = y + 30;
        this.peg2.tint = this.colorArray[1];
        
        // this.peg3.beginFill(this.colorArray[2]);
        // this.peg3.drawCircle(x + 150, y + 25, 20);
        // this.peg3.endFill();
        this.peg3.position.x = x + 150;
        this.peg3.position.y = y + 30;
        this.peg3.tint = this.colorArray[2];
        
        // this.peg4.beginFill(this.colorArray[3]);
        // this.peg4.drawCircle(x + 210, y + 25, 20);
        // this.peg4.endFill();
        this.peg4.position.x = x + 210;
        this.peg4.position.y = y + 30;
        this.peg4.tint = this.colorArray[3];

        // this.cover.beginFill(color);
        // this.cover.drawRect(x, y, 300, 50);
        // this.cover.endFill();
        this.cover.position.set(x, y);


        this.addChild(this.peg1);
        this.addChild(this.peg2);
        this.addChild(this.peg3);
        this.addChild(this.peg4);
        this.addChild(this.cover);
    }

    uncover(){
        //console.log("win");
        this.removeChild(this.cover);
    }
}