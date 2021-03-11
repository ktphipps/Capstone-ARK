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

    constructor(feedback) {
        super();
        this.feedback = feedback;
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
            this.rectangle.height = 600;
            this.rectangle.width = 60;

            //Call the taphandler to handle the press
            let delta = this.tapHandler.tapDown();
            
            //If feedback is enabled
            if(this.feedback == "true") {
                //If we are in the soundOn phase (feedback is not displayed during soundOff)
                if (this.tapHandler.timer.soundOn) {
                    //If the tap is within 33% of the beat, color the circle green
                    if (Math.abs(delta) < this.tapHandler.beatTime / 6) {
                        this.rectangle.fill = "green";
                    }
                    //If the tap is within 66% of the beat, color the circle yellow
                    else if (Math.abs(delta) < this.tapHandler.beatTime * 2 / 6) {
                        this.rectangle.fill = "yellow"
                    }
                    //Otherwise color the circle red
                    else {
                        this.rectangle.fill = "red";
                    }
                }
            }
        } 

        //If a tap is not in progress
        if (!Input.keys[' '] && !Input.touch){
            //Make the laser not visible
            this.rectangle.height = 1;
            this.rectangle.width = 1;
            this.rectangle.fill = "white";
            
            //Call the taphandler to handle the release
            this.tapHandler.tapUp();
        }
    }
}