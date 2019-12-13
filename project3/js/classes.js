class Input extends PIXI.Graphics{
    constructor(x = 0, y = 600, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();
        this.x = x;
        this.y = y;
        this.color = color;

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
        // this.color1.beginFill(0xFF00000);
        // this.color1.drawCircle(x + 30, y + 25, 20);
        // this.color1.endFill();
        this.color1.position.x = this.x + 30;
        this.color1.position.y = this.y + 25;
        this.color1.tint = 0xFF00000;
        
        // this.color2.beginFill(0xFF8C00);
        // this.color2.drawCircle(x + 90, y + 25, 20);
        // this.color2.endFill();
        this.color2.position.x = this.x + 90;
        this.color2.position.y = this.y + 25;
        this.color2.tint = 0xFF8C00;
        
        // this.color3.beginFill(0xDAFF00);
        // this.color3.drawCircle(x + 150, y + 25, 20);
        // this.color3.endFill();
        this.color3.position.x = this.x + 150;
        this.color3.position.y = this.y + 25;
        this.color3.tint = 0xDAFF00;

        // this.color4.beginFill(0x00DD00);
        // this.color4.drawCircle(x + 210, y + 25, 20);
        // this.color4.endFill();
        this.color4.position.x = this.x + 210;
        this.color4.position.y = this.y + 25;
        this.color4.tint = 0x00DD00;
        
        // this.color5.beginFill(0x0000FF);
        // this.color5.drawCircle(x + 270, y + 25, 20);
        // this.color5.endFill();
        this.color5.position.x = this.x + 270;
        this.color5.position.y = this.y + 25;
        this.color5.tint = 0x0000FF;
        
        // this.color6.beginFill(0x800080);
        // this.color6.drawCircle(x + 330, y + 25, 20);
        // this.color6.endFill();
        this.color6.position.x = this.x + 330;
        this.color6.position.y = this.y + 25;
        this.color6.tint = 0x800080;
        
        this.addChild(this.color1);
        this.addChild(this.color2);
        this.addChild(this.color3);
        this.addChild(this.color4);
        this.addChild(this.color5);
        this.addChild(this.color6);

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
        for(let i = 0; i < 4; i++){
            if(row.colorArray[i] == 0x555555){
                console.log("Before: " + i + "-" + row.colorArray[i]);
                row.colorArray[i] = color;
                console.log("After: " + i + "-" + + row.colorArray[i]);
                break;
            }
        }

        row.updateColors();
    }
}

class Row extends PIXI.Graphics{
    constructor(x = 100, y = 55, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();

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
        this.hole1.position.x = this.x + 30;
        this.hole1.position.y = this.y + 25;
        this.hole1.tint = this.colorArray[0];
        
        // this.hole2.beginFill(this.colorArray[1]);
        // this.hole2.drawCircle(this.x + 90, this.y + 25, 20);
        // this.hole2.endFill();
        this.hole2.position.x = this.x + 90;
        this.hole2.position.y = this.y + 25;
        this.hole2.tint = this.colorArray[1];
        
        // this.hole3.beginFill(this.colorArray[2]);
        // this.hole3.drawCircle(this.x + 150, this.y + 25, 20);
        // this.hole3.endFill();
        this.hole3.position.x = this.x + 150;
        this.hole3.position.y = this.y + 25;
        this.hole3.tint = this.colorArray[2];
        
        // this.hole4.beginFill(this.colorArray[3]);
        // this.hole4.drawCircle(this.x + 210, this.y + 25, 20);
        // this.hole4.endFill();
        this.hole4.position.x = this.x + 210;
        this.hole4.position.y = this.y + 25;
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
    
        this.answer1 = new PIXI.Graphics;
        this.answer2 = new PIXI.Graphics;
        this.answer3 = new PIXI.Graphics;
        this.answer4 = new PIXI.Graphics;
        
        this.answer1.beginFill(this.answerArray[0]);
        this.answer1.drawCircle(this.x + 250, this.y + 15, 8)
        this.answer1.endFill();
    
        this.answer2.beginFill(this.answerArray[1]);
        this.answer2.drawCircle(this.x + 270, this.y + 15, 8)
        this.answer2.endFill();
    
        this.answer3.beginFill(this.answerArray[2]);
        this.answer3.drawCircle(this.x + 250, this.y + 35, 8)
        this.answer3.endFill();
    
        this.answer4.beginFill(this.answerArray[3]);
        this.answer4.drawCircle(this.x + 270, this.y + 35, 8)
        this.answer4.endFill();

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
        let checked = [false, false, false, false];

        //check for direct matches
        for(let c = 0; c < 4; c++){
            if(this.colorArray[c] == key.colorArray[c]){
                checked[c] = true;

                //loop through answers for first empty slot
                //make it black
                for(let a = 0; a < 4; a++){
                    if(this.answerArray[a] == 0x555555){
                        this.answerArray[a] = 0x000000;
                        break;
                    }
                }
            }
        }

        //first, loop through colorArray
        //if checked[c], then this is already a black, move on
        for(let c = 0; c < 4; c++){
            //now loop through the key
            //if checked, move on to net color in key
            for(let k = 0; k < 4; k++){
                if(checked[k]){
                    continue;
                }
                //otherwise, check if there's a misplaced color
                else if(this.colorArray[c] == key.colorArray[k]){
                    //if there is, find where to change the color in the answerArray
                    checked[k] = true;
                    for(let a = 0; a < 4; a++){
                        if(this.answerArray[a] == 0x555555){
                            this.answerArray[a] = 0xFFFFFF;
                            break;
                        }
                    }
                    continue;
                }
            }
        }
        this.updateColors();
    }

    resetColor(index){
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
        if(this.answerArray[3] == 0x000000){
            return true;
        }
        return false;
    }
}

class Key extends PIXI.Graphics{
    constructor(x = 150, y = 0, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 300, 50);
        this.endFill();
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
        this.cover = PIXI.Sprite.fromImage("images/Light.png");

        this.peg1.anchor.set(0.5,0.5);
        this.peg2.anchor.set(0.5,0.5);
        this.peg3.anchor.set(0.5,0.5);
        this.peg4.anchor.set(0.5,0.5);

        // this.peg1.beginFill(this.colorArray[0]);
        // this.peg1.drawCircle(x + 30, y + 25, 20);
        // this.peg1.endFill();
        this.peg1.position.x = x + 30;
        this.peg1.position.y = y + 25;
        this.peg1.tint = this.colorArray[0];
        
        // this.peg2.beginFill(this.colorArray[1]);
        // this.peg2.drawCircle(x + 90, y + 25, 20);
        // this.peg2.endFill();
        this.peg2.position.x = x + 90;
        this.peg2.position.y = y + 25;
        this.peg2.tint = this.colorArray[1];
        
        // this.peg3.beginFill(this.colorArray[2]);
        // this.peg3.drawCircle(x + 150, y + 25, 20);
        // this.peg3.endFill();
        this.peg3.position.x = x + 150;
        this.peg3.position.y = y + 25;
        this.peg3.tint = this.colorArray[2];
        
        // this.peg4.beginFill(this.colorArray[3]);
        // this.peg4.drawCircle(x + 210, y + 25, 20);
        // this.peg4.endFill();
        this.peg4.position.x = x + 210;
        this.peg4.position.y = y + 25;
        this.peg4.tint = this.colorArray[3];

        // this.cover.beginFill(color);
        // this.cover.drawRect(x, y, 300, 50);
        // this.cover.endFill();

        this.addChild(this.peg1);
        this.addChild(this.peg2);
        this.addChild(this.peg3);
        this.addChild(this.peg4);
        //this.addChild(this.cover);
    }

    uncover(){
        this.removeChild(this.cover);
    }
}