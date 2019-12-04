class ColorPeg extends PIXI.Graphics{
    constructor(x, y, radius, color){
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.color = color;
        this.placed = false;
        this.on("pointerover", e=>e.target.alpha = .7);
        this.on("pointerup", move);
        this.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    }

    move(){

    }
}

class Row extends PIXI.Graphics{
    constructor(x = 100, y = 0, color = 0x00FF00){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();

        let colorArray = [0x555555, 0x555555, 0x555555, 0x555555];
        let answerArray = [0x555555, 0x555555, 0x555555, 0x555555];

        let hole1 = new PIXI.Graphics();
        let hole2 = new PIXI.Graphics();
        let hole3 = new PIXI.Graphics();
        let hole4 = new PIXI.Graphics();

        hole1.beginFill(colorArray[0]);
        hole1.drawCircle(this.x + 10, this.y + 5, 20);
        hole1.endFill();
        
        hole2.beginFill(colorArray[1]);
        hole2.drawCircle(this.x + 70, this.y + 5, 20);
        hole2.endFill();
        
        hole3.beginFill(colorArray[2]);
        hole3.drawCircle(this.x + 130, this.y + 5, 20);
        hole3.endFill();
        
        hole4.beginFill(colorArray[3]);
        hole4.drawCircle(this.x + 190, this.y + 5, 20);
        hole4.endFill();

        hole1.on("pointerup", colorArray[0] = 0x555555);
        hole2.on("pointerup", colorArray[1] = 0x555555);
        hole3.on("pointerup", colorArray[2] = 0x555555);
        hole4.on("pointerup", colorArray[3] = 0x555555);

        this.addChild(hole1);
        this.addChild(hole2);
        this.addChild(hole3);
        this.addChild(hole4);
    
        /*answer1.beginFill(answerArray[0]);
        answer1.drawCircle(this.x + 240, this.y + 5, 8)
        answer1.endFill();
    
        answer2.beginFill(answerArray[1]);
        answer2.drawCircle(this.x + 250, this.y + 5, 8)
        answer2.endFill();
    
        answer3.beginFill(answerArray[2]);
        answer3.drawCircle(this.x + 240, this.y + 25, 8)
        answer3.endFill();
    
        answer4.beginFill(answerArray[3]);
        answer4.drawCircle(this.x + 250, this.y + 25, 8)
        answer4.endFill();*/
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