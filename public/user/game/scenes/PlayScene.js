//File: /user/game/scenes/PlayScene.js

//Description: Creates the EdGE scene where the RACTrainer main gameplay happens

import Engine from "../../engine/Engine.js"
import GameBehaviors from "../GameBehaviors.js"

export default class PlayScene extends Engine.Base.Scene {
    constructor(bpm, timeWSound, timeWOSound, cycles, feedback) {
        //Construct a Scene with name "PlayScene"
        super("PlayScene");

        // CREATE BACKGROUND
        let backgroundImage = new Image()
        backgroundImage.src = "./game/assets/background/BackgroundResized.jpeg";
        let background = new Engine.Base.GameObject(0, 0);
        let backgroundBody = new Engine.Components.RectangleComponent(1, 1, backgroundImage, "none", "image");
        backgroundBody.scaleX = 640;
        backgroundBody.scaleY = 500;
        background.addComponent(backgroundBody);
        this.children.push(background);

        //Create the spaceLaser GameObject
        let spaceLaser = new Engine.Base.GameObject(292, 3);

        //Create a renderable component and add it to the spaceLaser GameObject
        let img = new Image()
        img.src = "./game/assets/Laser/NoLaser.png";
        // width 60
        // height 600
        let laser = new Engine.Components.RectangleComponent(1, 1, img, "none", "image");
        spaceLaser.addComponent(laser);

        //Create a ScoreCalculator behavior and add it to the spaceLaser GameObject
        let ScoreCalculator = new GameBehaviors.ScoreCalculator();
        spaceLaser.addComponent(ScoreCalculator);

        //Create a Timer behavior and add it to the spaceLaser GameObject
        let Timer = new GameBehaviors.Timer(bpm, timeWSound, timeWOSound, cycles, this);
        spaceLaser.addComponent(Timer);

        //Create a TapHandler behavior and add it to the spaceLaser GameObject
        let TapHandler = new GameBehaviors.TapHandler(bpm, this);
        spaceLaser.addComponent(TapHandler);

        //Create a CircleBehavior behavior and add it to the spaceLaser GameObject
        let LaserBehavior = new GameBehaviors.LaserBehavior(feedback, this);
        spaceLaser.addComponent(LaserBehavior);

        //Create the intruction guideText GameObject
        let guideText = new Engine.Base.GameObject(27, 250);
        
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

        // add laser body
        let laserbodyImage = new Image();
        laserbodyImage.src = "./game/assets/laserbody/LaserBodyResized.png";
        let laserbody = new Engine.Base.GameObject(0, 350);
        let laserbodyComponent = new Engine.Components.RectangleComponent(1, 1, laserbodyImage, "none", "image");
        laserbodyComponent.scaleX = 640;
        laserbodyComponent.scaleY = 130;
        laserbody.addComponent(laserbodyComponent);
        this.children.push(laserbody);

        // TEST PURPOSES
        // CANVAS SIZE (BASED ON A 1,1 RECTANGLE): x: 0 - 640   y: 0 - 480
        // SIZE OF PIXELART BACKGROUND (TRY ~213, 160)
        // SCALE UP PIXELART TO MAKE SURE IT IS NOT BLURRY
        // let testPixel = new Engine.Base.GameObject(100, 100);
        // let testPixelComponent = new Engine.Components.RectangleComponent(48, 48, "white", "white");
        // testPixel.addComponent(testPixelComponent);
        // this.children.push(testPixel);

        // ADD CROSSHAIRS
        let crosshairImage = new Image()
        crosshairImage.src = "./game/assets/crosshair/CrosshairResizedTransparent.png";
        let crosshair = new Engine.Base.GameObject(298, 120);
        //let crosshair = new Engine.Base.GameObject(76, 76);
        let crosshairBody = new Engine.Components.RectangleComponent(1, 1, crosshairImage, "none", "image");
        crosshairBody.scaleX = 47;
        crosshairBody.scaleY = 47;
        crosshair.addComponent(crosshairBody);
        this.children.push(crosshair);
    }
}