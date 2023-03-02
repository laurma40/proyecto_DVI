/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
    
	constructor() {
		super({ key: 'title' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
		this.load.image('start', 'assets/start.png');
        this.load.image('inicio', 'assets/inicio.jpeg');
		/*this.load.spritesheet('knight', 'assets/Knight/knight.png', {frameWidth: 72, frameHeight: 86})
		this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})*/



	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		var back = this.add.image(-1, -1, 'inicio').setOrigin(0, 0);
        back.setScale(0.55);
        

		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'start')
        sprite.setScale(0.5);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('firstLevel'); //Cambiamos a la escena de juego

	    });

		sprite.on('pointerover', () => {
			console.log("hola")
	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
	    });

	}
}