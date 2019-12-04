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
    constructor(x = 100, y = 0, color = 0x999999){
        super();
        this.beginFill(color);
        this.drawRect(x, y, 400, 50);
        this.endFill();

        let hole1 = new PIXI.Graphics();
        let hole2 = new PIXI.Graphics();
        let hole3 = new PIXI.Graphics();
        let hole4 = new PIXI.Graphics();

        hole1.beginFill(0x000000);
        hole1.drawCircle(this.x + 10, this.y + 5, 40);
        hole1.endFill();
        
        hole2.beginFill(0x000000);
        hole2.drawCircle(this.x + 70, this.y + 5, 40);
        hole2.endFill();
        
        hole3.beginFill(0x000000);
        hole3.drawCircle(this.x + 130, this.y + 5, 40);
        hole3.endFill();
        
        hole4.beginFill(0x000000);
        hole4.drawCircle(this.x + 190, this.y + 5, 40);
        hole4.endFill();
    }
}