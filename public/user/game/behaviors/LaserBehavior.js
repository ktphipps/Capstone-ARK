//File: /user/game/Behaviors/LaserBehavior.js

//Description: An EdGE behavior which controls the appearance of the space laser feedback

import Base from "../../engine/Base.js"
import Input from "../../engine/base/Input.js"
import RectangleComponent from "../../engine/components/RectangleComponent.js"
import TapHandler from "./TapHandler.js";

export default class LaserBehavior extends Base.Behavior {
    rectangle;
    tapHandler;
    feedback;
    scene;
    img;
    img2;
    img3;
    img4;
    img5;

    constructor(feedback, scene) {
        super();
        this.feedback = feedback;
        this.scene = scene;
    }

    /*
		start
		params: none
		returns: none
		Initializes this behavior. Called when EdGE intializes
	*/
    start() {
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
        this.tapHandler = this.gameObject.getComponent(TapHandler);

        //this.rectangle.height = 600;
        //this.rectangle.width = 60;
        
        this.img = new Image()
        this.img.src = "./game/assets/Laser/LaserWhiteResized.png";

        this.img2 = new Image()
        this.img2.src = "./game/assets/Laser/NoLaser.png";

        this.img3 = new Image()
        this.img3.src = "./game/assets/Laser/LaserGreenResized.png";

        this.img4 = new Image()
        this.img4.src = "./game/assets/Laser/LaserYellowResized.png";

        this.img5 = new Image()
        this.img5.src = "./game/assets/Laser/LaserRedResized.png";

        this.rectangle.scaleX = 59;
        this.rectangle.scaleY = 410;
        
    }

    /*
		update
		params: none
		returns: none
		Runs this behavior's logic. Called every frame by EdGE
	*/
    update() {

    }

    /*
		pulse
		params: none
		returns: none
		Recieves keypress events from EdGE and displays the feedback with the circle object
	*/
    pulse() {       
        //If a tap is in progress
        if(Input.keys[' '] || Input.touch) {
            //Make the laser appear
            this.rectangle.fill = this.img;

            //Call the taphandler to handle the press
            let delta = this.tapHandler.tapDown();
            
            //If feedback is enabled
            if(this.feedback == "true") {
                //If we are in the soundOn phase (feedback is not displayed during soundOff)
                if (this.tapHandler.timer.soundOn) {
                    //If the tap is within 33% of the beat, color the laser green
                    if (Math.abs(delta) < this.tapHandler.beatTime / 6) {
                        //this.rectangle.fill = "green";
                        this.rectangle.fill = this.img3;
                    }
                    //If the tap is within 66% of the beat, color the laser yellow
                    else if (Math.abs(delta) < this.tapHandler.beatTime * 2 / 6) {
                        //this.rectangle.fill = "yellow"
                        this.rectangle.fill = this.img4;
                    }
                    //Otherwise color the laser red
                    else {
                        //this.rectangle.fill = "red";
                        this.rectangle.fill = this.img5;
                    }
                }
            }

            let targetsMinRange = this.scene.children.filter(c => c.x > 275);
            let targetsMaxRange = targetsMinRange.filter(target => target.x < 365);
            let targets = targetsMaxRange.find(target => target.components.find(c => c.tag == "GoRight") != undefined);
                        
            if (targets != undefined ) {
                this.scene.children.splice(this.scene.children.findIndex(c => c == targets), 1);
            }
        } 

        //If a tap is not in progress
        if (!Input.keys[' '] && !Input.touch){
            //Make the laser not visible
            this.rectangle.fill = this.img2;
            
            //Call the taphandler to handle the release
            this.tapHandler.tapUp();
        }
    }
}