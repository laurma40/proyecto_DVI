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

		this.sonido();

		const config = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		  };
		this.sonidoInter = this.sound.add('sonGameOver', config);
		this.sonidoInter.volume = 0.1;
		this.sonidoInter.play();
		this.sonidoInter.rate = 0.5;



		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'tv');
        back.setScale(0.75);
		back.setAlpha(0.60);


		//Pintamos un botón de Empezar
		var overView = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'over')
        overView.setScale(0.035);


		var s1 = this.textures.get('retry');
		var s2 = this.textures.get('retry2');

		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'retry')
        sprite.setScale(0.025);

		// Hacemos el sprite interactivo para que lance eventos
		sprite.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.sound.stopAll();
			this.scene.start('title'); //Cambiamos a la escena de juego

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

	sonido(){

		this.input.keyboard.on('keydown-M', function (event) {
			console.log('La tecla M ha sido presionada');
			if (!this.sound.mute) {
				this.sound.setMute(true);
			  } else {
				this.sound.setMute(false);
			}
		}.bind(this));
	
	}
}