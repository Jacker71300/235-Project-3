class Input extends PIXI.Graphics{
    constructor(x = 0, y = 600, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();
        this.x = x;
        this.y = y;
        this.color = color;

        let color1 = new PIXI.Graphics();
        let color2 = new PIXI.Graphics();
        let color3 = new PIXI.Graphics();
        let color4 = new PIXI.Graphics();
        let color5 = new PIXI.Graphics();
        let color6 = new PIXI.Graphics();

        color1.beginFill(0xFF00000);
        color1.drawCircle(x + 30, y + 25, 20);
        color1.endFill();
        
        color2.beginFill(0xFF8C00);
        color2.drawCircle(x + 90, y + 25, 20);
        color2.endFill();
        
        color3.beginFill(0xDAFF00);
        color3.drawCircle(x + 150, y + 25, 20);
        color3.endFill();

        color4.beginFill(0x00DD00);
        color4.drawCircle(x + 210, y + 25, 20);
        color4.endFill();
        
        color5.beginFill(0x0000FF);
        color5.drawCircle(x + 270, y + 25, 20);
        color5.endFill();
        
        color6.beginFill(0x800080);
        color6.drawCircle(x + 330, y + 25, 20);
        color6.endFill();
        
        this.addChild(color1);
        this.addChild(color2);
        this.addChild(color3);
        this.addChild(color4);
        this.addChild(color5);
        this.addChild(color6);

        color1.interactive = true;
        color1.buttonMode = true;
        color1.on("pointerover", e=>e.target.alpha = .7);
        color1.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color1.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        color2.interactive = true;
        color2.buttonMode = true;
        color2.on("pointerover", e=>e.target.alpha = .7);
        color2.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color2.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        color3.interactive = true;
        color3.buttonMode = true;
        color3.on("pointerover", e=>e.target.alpha = .7);
        color3.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color3.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        color4.interactive = true;
        color4.buttonMode = true;
        color4.on("pointerover", e=>e.target.alpha = .7);
        color4.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color4.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        color5.interactive = true;
        color5.buttonMode = true;
        color5.on("pointerover", e=>e.target.alpha = .7);
        color5.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color5.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        color6.interactive = true;
        color6.buttonMode = true;
        color6.on("pointerover", e=>e.target.alpha = .7);
        color6.on("pointerup", e=>this.transferColor(getCurrentRow(), e.target));
        color6.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    }

    transferColor(row, e){
        for(let i = 0; i < 4; i++){
            if(row.colorArray[i] == 0x555555){
                row.colorArray[i] = e.color;
                break;
            }
        }
    }
}

class Row extends PIXI.Graphics{
    constructor(x = 100, y = 55, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();

        this.colorArray = [0x555555, 0x555555, 0x555555, 0x555555];
        let answerArray = [0x555555, 0x555555, 0x555555, 0x555555];

        let hole1 = new PIXI.Graphics();
        let hole2 = new PIXI.Graphics();
        let hole3 = new PIXI.Graphics();
        let hole4 = new PIXI.Graphics();

        hole1.beginFill(this.colorArray[0]);
        hole1.drawCircle(x + 30, y + 25, 20);
        hole1.endFill();
        
        hole2.beginFill(this.colorArray[1]);
        hole2.drawCircle(x + 90, y + 25, 20);
        hole2.endFill();
        
        hole3.beginFill(this.colorArray[2]);
        hole3.drawCircle(x + 150, y + 25, 20);
        hole3.endFill();
        
        hole4.beginFill(this.colorArray[3]);
        hole4.drawCircle(x + 210, y + 25, 20);
        hole4.endFill();

        hole1.interactive = true;
        hole1.buttonMode = true;
        hole1.on("pointerover", e=>e.target.alpha = .7)
        hole1.on("pointerup", this.colorArray[0] = 0x555555);
        hole1.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        hole2.interactive = true;
        hole2.buttonMode = true;
        hole2.on("pointerover", e=>e.target.alpha = .7)
        hole2.on("pointerup", this.colorArray[0] = 0x555555);
        hole2.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        hole3.interactive = true;
        hole3.buttonMode = true;
        hole3.on("pointerover", e=>e.target.alpha = .7)
        hole3.on("pointerup", this.colorArray[0] = 0x555555);
        hole3.on("pointerout", e=>e.currentTarget.alpha = 1.0);

        hole4.interactive = true;
        hole4.buttonMode = true;
        hole4.on("pointerover", e=>e.target.alpha = .7)
        hole4.on("pointerup", this.colorArray[0] = 0x555555);
        hole4.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    
        let answer1 = new PIXI.Graphics;
        let answer2 = new PIXI.Graphics;
        let answer3 = new PIXI.Graphics;
        let answer4 = new PIXI.Graphics;
        
        answer1.beginFill(answerArray[0]);
        answer1.drawCircle(x + 250, y + 15, 8)
        answer1.endFill();
    
        answer2.beginFill(answerArray[1]);
        answer2.drawCircle(x + 270, y + 15, 8)
        answer2.endFill();
    
        answer3.beginFill(answerArray[2]);
        answer3.drawCircle(x + 250, y + 35, 8)
        answer3.endFill();
    
        answer4.beginFill(answerArray[3]);
        answer4.drawCircle(x + 270, y + 35, 8)
        answer4.endFill();

        this.addChild(hole1);
        this.addChild(hole2);
        this.addChild(hole3);
        this.addChild(hole4);
        this.addChild(answer1);
        this.addChild(answer2);
        this.addChild(answer3);
        this.addChild(answer4);
    }

    updateColors(){
        hole1.color = colorArray[0];
        hole2.color = colorArray[1];
        hole3.color = colorArray[2];
        hole4.color = colorArray[3];
    }

    compareRow(){

    }
}

class Key extends PIXI.Graphics{
    constructor(x = 150, y = 0, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 300, 50);
        this.endFill();
        let colorArray = [];

        for(let i = 0; i < 4; i++){
            let colorNum = Math.floor(Math.random() * 6);

            if(colorNum == 0){
                colorArray[i] = 0xFF0000;
            }
            else if(colorNum == 1){
                colorArray[i] = 0xFF8C00;
            }
            else if(colorNum == 2){
                colorArray[i] = 0xDAFF00;
            }
            else if(colorNum == 3){
                colorArray[i] = 0x00DD00;
            }
            else if(colorNum == 4){
                colorArray[i] = 0x0000FF;
            }
            else if(colorNum == 5){
                colorArray[i] = 0x800080;
            }
        }

        let peg1 = new PIXI.Graphics();
        let peg2 = new PIXI.Graphics();
        let peg3 = new PIXI.Graphics();
        let peg4 = new PIXI.Graphics();
        let cover = new PIXI.Graphics();

        peg1.beginFill(colorArray[0]);
        peg1.drawCircle(x + 30, y + 25, 20);
        peg1.endFill();
        
        peg2.beginFill(colorArray[1]);
        peg2.drawCircle(x + 90, y + 25, 20);
        peg2.endFill();
        
        peg3.beginFill(colorArray[2]);
        peg3.drawCircle(x + 150, y + 25, 20);
        peg3.endFill();
        
        peg4.beginFill(colorArray[3]);
        peg4.drawCircle(x + 210, y + 25, 20);
        peg4.endFill();

        cover.beginFill(color);
        cover.drawRect(x, y, 300, 50);
        cover.endFill();

        this.addChild(peg1);
        this.addChild(peg2);
        this.addChild(peg3);
        this.addChild(peg4);
        this.addChild(cover);
    }

    uncover(){
        this.removeChild(cover);
    }
}