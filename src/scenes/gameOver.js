/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class GameOver extends Phaser.Scene {
    
	constructor() {
		super({ key: 'gameOver' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        

	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'inicio');
        back.setScale(0.75);
        

		//Pintamos un botón de Empezar
		var overView = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'over')
        overView.setScale(0.035);


		var s1 = this.textures.get('retry');
		var s2 = this.textures.get('retry2');

		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'retry')
        sprite.setScale(0.025);


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
			sprite.setTexture(s2.key);

	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
			sprite.setTexture(s1.key);

	    });

	}
}