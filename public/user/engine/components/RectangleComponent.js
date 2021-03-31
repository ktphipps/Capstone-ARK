import Base from "../Base.js"

export default class RectangleComponent extends Base.Component{
    width;
    height;
    fill;
    stroke;
    type;
    constructor(width, height, fill, stroke, type){
        super();
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.type = type;
    }
    draw(ctx){
        ctx.save();
        if(this.type == "image") {
            ctx.drawImage(this.fill, -this.width, -this.height, 60, 60);
        }
        else {
            ctx.translate(-this.width/2, -this.height/2);
            ctx.fillStyle = this.fill;
            ctx.strokeStyle = this.stroke;
            ctx.fillRect(0,0, this.width, this.height);
            ctx.strokeRect(0, 0, this.width, this.height);
        }
        
        ctx.restore();
    }
    update(){

    }
}