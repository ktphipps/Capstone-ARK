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

        // this.rectangle.height = 600;
        // this.rectangle.width = 60;
        // let img = new Image()
        // img.src = "./game/assets/Laser/NoLaser.png";
        // this.rectangle.fill = img;
        // this.rectangle.type = "image";
        this.rectangle.scaleX = 56;
        this.rectangle.scaleY = 370;
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
            //this.rectangle.height = 600;
            //this.rectangle.width = 60;
            let img = new Image()
            img.src = "./game/assets/Laser/LaserWhite.png";
            this.rectangle.fill = img;
            console.log(img.src);
            //this.rectangle.type = "image";
            //this.rectangle.scaleX = 56;
            //this.rectangle.scaleY = 370;

            //Call the taphandler to handle the press
            let delta = this.tapHandler.tapDown();
            
            //If feedback is enabled
            if(this.feedback == "true") {
                //If we are in the soundOn phase (feedback is not displayed during soundOff)
                if (this.tapHandler.timer.soundOn) {
                    //If the tap is within 33% of the beat, color the circle green
                    if (Math.abs(delta) < this.tapHandler.beatTime / 6) {
                        //this.rectangle.fill = "green";
                        // CHANGE TO GREEN SPRITE
                    }
                    //If the tap is within 66% of the beat, color the circle yellow
                    else if (Math.abs(delta) < this.tapHandler.beatTime * 2 / 6) {
                        //this.rectangle.fill = "yellow"
                        // CHANGE TO YELLOW SPRITE
                    }
                    //Otherwise color the circle red
                    else {
                        //this.rectangle.fill = "red";
                        // CHANGE TO RED SPRITE
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
            //this.rectangle.height = 1;
            //this.rectangle.width = 1;
            //this.rectangle.fill = "white";
            
            //this.rectangle.height = 600;
            //this.rectangle.width = 60;
            let img = new Image()
            img.src = "./game/assets/Laser/NoLaser.png";
            this.rectangle.fill = img;
            console.log(img.src);
            //this.rectangle.type = "image";
            //this.rectangle.scaleX = 56;
            //this.rectangle.scaleY = 370;
            
            //Call the taphandler to handle the release
            this.tapHandler.tapUp();
        }
    }
}