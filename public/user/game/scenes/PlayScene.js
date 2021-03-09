//File: /user/game/scenes/PlayScene.js

//Description: Creates the EdGE scene where the RACTrainer main gameplay happens

import Engine from "../../engine/Engine.js"
import GameBehaviors from "../GameBehaviors.js"

export default class PlayScene extends Engine.Base.Scene {
    constructor(bpm, timeWSound, timeWOSound, cycles, feedback) {
        //Construct a Scene with name "PlayScene"
        super("PlayScene");

        //Create the spaceLaser GameObject
        let spaceLaser = new Engine.Base.GameObject(320, 300);

        //Create a renderable component and add it to the spaceLaser GameObject
        let laser = new Engine.Components.RectangleComponent(1, 1, "white", "black");
        spaceLaser.addComponent(laser);

        //Create a ScoreCalculator behavior and add it to the spaceLaser GameObject
        let ScoreCalculator = new GameBehaviors.ScoreCalculator();
        spaceLaser.addComponent(ScoreCalculator);

        //Create a Timer behavior and add it to the spaceLaser GameObject
        let Timer = new GameBehaviors.Timer(bpm, timeWSound, timeWOSound, cycles, this);
        spaceLaser.addComponent(Timer);

        //Create a TapHandler behavior and add it to the spaceLaser GameObject
        let TapHandler = new GameBehaviors.TapHandler(bpm);
        spaceLaser.addComponent(TapHandler);

        //Create a CircleBehavior behavior and add it to the spaceLaser GameObject
        let LaserBehavior = new GameBehaviors.LaserBehavior(feedback);
        spaceLaser.addComponent(LaserBehavior);

        //Create the intruction guideText GameObject
        let guideText = new Engine.Base.GameObject(0, -150);
        
        //Create a renderable TextComponent component and add it to the guideText GameObject
        let text = new Engine.Components.TextComponent("", "20px Roboto", "white");
        guideText.addComponent(text);

        //Create a TextController behavior and add it to the guideText GameObject
        let textController = new GameBehaviors.TextController(Timer, text);
        guideText.addComponent(textController);

        //Add the guideText GameObject as a child of the spaceLaser GameObject
        spaceLaser.children.push(guideText);

        //Add the spaceLaser GameObject to the scene
        this.children.push(spaceLaser);


    }
}