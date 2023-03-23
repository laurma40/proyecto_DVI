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
        
		this.load.image('start', 'assets/start3.png');
		this.load.image('start2', 'assets/start4.png');

        this.load.image('inicio', 'assets/casaInicio_v2.jpeg');

		this.load.image('over', 'assets/gameOver2.png');
		this.load.image('retry', 'assets/retry12.png');
		this.load.image('retry2', 'assets/retry22.png');


	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'inicio');
        back.setScale(0.75);
        

		//Pintamos un botón de Empezar
		var s1 = this.textures.get('start');
		var s2 = this.textures.get('start2');

		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'start')
        sprite.setScale(0.125);

		

		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('firstLevel'); //Cambiamos a la escena de juego
	    });

		sprite.on('pointerover', () => {
			console.log("hola");
			sprite.setTexture(s2.key);

	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
			sprite.setTexture(s1.key);
	    });

	}
}