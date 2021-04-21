//File: /user/game/Behaviors/TextController.js

//Description: Controls the in game text instructions which tell the player what to do

import Base from "../../engine/Base.js"

export default class TextController extends Base.Behavior {
    /*
		constructor
		params: timer - A reference to the game's Timer behavior; text - A reference to the game's guideText's TextComponent
		returns: none
		Creates a TextController behavior
	*/
    timer;
    text;
    constructor(timer, text) {
        super();
        this.timer = timer;
        this.text = text;
    }

    /*
        start
        params: none
        returns: none
        Initializes this behavior. Called when EdGE intializes
    */
    start() { }

    /*
		update
		params: none
		returns: none
		Runs this behavior's logic. Called every frame by EdGE
	*/
    update() {
        //The player has not started tapping yet
        if (this.timer.startTime == -1) {
            this.text.text = "Press Spacebar to fire the laser!";
            //The sound is fading in (During first half of soundOn phases excluding the first)
        } else if (this.timer.currentCycle != 1 && this.timer.currentTime < this.timer.startTime + this.timer.soundPhaseTime / 2) {
            this.text.text = "The sound is coming back. Use this time to get back on beat!";
            //The sound is steady (During first 3/4 of soundOn phases, unless fading in)
        } else if (this.timer.currentTime < this.timer.startTime + this.timer.soundPhaseTime / 4 * 3) {
            this.text.text = "The UFO's will soon become invisible. Keep firing in rhythm!";
            //The sound is fading out (During last 1/4 of soundOn phases)
        } else if (this.timer.currentTime < this.timer.startTime + this.timer.soundPhaseTime) {
            this.text.text = "The UFO's are disappearing. Keep firing!";
            //The sound is off (During soundOff phases)
        } else {
            this.text.text = "Keep firing!";
        }
    }
}