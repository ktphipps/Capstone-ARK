import Base from "../Base.js"

export default class CircleComponent extends Base.Component{
    radius;
    fill;
    stroke;
    type;
    constructor(radius, fill, stroke, type){
        super();
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
        this.type = type;
    }
    draw(ctx){
        ctx.save();
        if(this.type == "image") {
            ctx.drawImage(this.fill, this.gameObject.x, this.gameObject.y);
        }
        else {
            ctx.fillStyle = this.fill;
            ctx.strokeStyle = this.stroke;
            ctx.beginPath();
            ctx.arc(0,0,this.radius,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.restore();
    }
    update(){

    }
}