import FirstLevel from './scenes/firstLevel.js';
import GameOver from './scenes/gameOver.js';
import Title from './scenes/title.js';
import Loading from './scenes/loadingScreen.js';
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"),
    
    width:  606,
    height: 400,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
    scene: [Loading, Title, FirstLevel, GameOver],
    physics: { 
        default: 'arcade', 
        arcade: { 
            //gravity: { y: 200 }, 
            //debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Juego Prueba",
    version: "1.0.0",
    transparent: false
};

new Phaser.Game(config);