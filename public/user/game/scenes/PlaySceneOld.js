//File: /user/game/scenes/PlaySceneOld.js

//Description: Creates the EdGE scene where the RACTrainer main gameplay happens

import Engine from "../../engine/Engine.js"
import GameBehaviors from "../GameBehaviors.js"

export default class PlaySceneOld extends Engine.Base.Scene {
    constructor(bpm, timeWSound, timeWOSound, cycles, feedback) {
        //Construct a Scene with name "PlayScene"
        super("PlaySceneOld");

        //Create the feedbackCircle GameObject
        let feedbackCircle = new Engine.Base.GameObject(320, 240);

        //Create a renderable CircleComponent component and add it to the feedbackCircle GameObject
        let circle = new Engine.Components.CircleComponent(100, "white", "black");
        feedbackCircle.addComponent(circle);

        //Create a ScoreCalculator behavior and add it to the feedbackCircle GameObject
        let ScoreCalculator = new GameBehaviors.ScoreCalculator();
        feedbackCircle.addComponent(ScoreCalculator);

        //Create a Timer behavior and add it to the feedbackCircle GameObject
        let Timer = new GameBehaviors.TimerOld(bpm, timeWSound, timeWOSound, cycles, this);
        feedbackCircle.addComponent(Timer);

        //Create a TapHandler behavior and add it to the feedbackCircle GameObject
        let TapHandler = new GameBehaviors.TapHandler(bpm, this);
        feedbackCircle.addComponent(TapHandler);

        //Create a CircleBehavior behavior and add it to the feedbackCircle GameObject
        let CircleBehavior = new GameBehaviors.CircleBehavior(feedback);
        feedbackCircle.addComponent(CircleBehavior);

        //Create the intruction guideText GameObject
        let guideText = new Engine.Base.GameObject(0, -150);
        
        //Create a renderable TextComponent component and add it to the guideText GameObject
        let text = new Engine.Components.TextComponent("", "20px Roboto", "white");
        guideText.addComponent(text);

        //Create a TextController behavior and add it to the guideText GameObject
        let textController = new GameBehaviors.TextControllerOld(Timer, text);
        guideText.addComponent(textController);

        //Add the guideText GameObject as a child of the feedbackCircle GameObject
        feedbackCircle.children.push(guideText);

        //Add the feedbackCircle GameObject to the scene
        this.children.push(feedbackCircle);


    }
}