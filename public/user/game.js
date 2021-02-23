import Scenes from "./game/Scenes.js";
import SceneManager from "./game/SceneManager.js";
import Engine from "./engine/Engine.js";
import GameBehaviors from "./game/GameBehaviors.js";
import GameObjects from "./game/GameObjects.js";

Engine.Base.Scene.gameObjects = GameObjects;
Engine.Base.Scene.components = Engine.Components;
Engine.Base.Scene.gameBehaviors = GameBehaviors;

//Scene Management
let playScene = Engine.Base.Scene.parse(Scenes.PlayScene);


SceneManager.addScene(playScene);
SceneManager.currentScene = "PlayScene";


let screen = document.getElementById('screen');
let canv, ctx;


document.getElementById('play').onclick = function startGame() {
    screen.innerHTML = "<canvas id='canv' width='650px' height='450px'></canvas>"
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    setInterval(gameLoop, 33);

    SceneManager.currentScene = "GameScene";
}



function gameLoop() {
    Engine.Base.Time.updateTime();
    destroyObjects();
    update();
    draw(ctx);
}

function destroyObjects() {
    SceneManager.currentScene.children = SceneManager.currentScene.children.filter(checkDelete => !checkDelete.delete)
    SceneManager.currentScene.children.forEach(child => child.destroyObjects());
}

function update() {    
    SceneManager.currentScene.update(Engine.Components.Collider, Engine.Components.CollisionHelper);
}

function draw(ctx) {
    SceneManager.currentScene.draw(ctx,canv.width,canv.height);
}