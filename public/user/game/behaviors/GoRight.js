//File: /user/game/Behaviors/CircleBehavior.js

//Description: An EdGE behavior which controls the appearance of the feedback circle

import Base from "../../engine/Base.js"

export default class GoRight extends Base.Behavior {
    FramesPerMinute = 2000;
    DistPerBeat = 320;
    bpm;
    tag = "GoRight";

    constructor(bpm) {
        super();
        this.bpm = bpm;
    }

    /*
		start
		params: none
		returns: none
		Initializes this behavior. Called when EdGE intializes
	*/
    start() {
        //console.log(this.bpm * this.DistPerBeat / this.FramesPerMinute)

    }

    /*
		update
		params: none
		returns: none
		Runs this behavior's logic. Called every frame by EdGE
	*/
    update() {
        this.gameObject.x += (this.bpm * this.DistPerBeat / this.FramesPerMinute);
    }
}