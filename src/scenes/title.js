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
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log('title');
		this.music = this.sound.add('titlesong',true);
		this.rain = this.sound.add('rain',true);

		this.music.volume = 0.1;

		
		this.rain.play();
    	this.music.play();

		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'inicio');
        back.setScale(0.75);
        

		//Pintamos un botón de Empezar
		var s1 = this.textures.get('start');
		var s2 = this.textures.get('start2');

		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'start')
        sprite.setScale(0.125);

		// Hacemos el sprite interactivo para que lance eventos
		sprite.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"

	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.music.stop();
			this.rain.stop();
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

		//Pintamos el botón de mutear el sonido
		var sound1 = this.textures.get('soundon');
		var sound2 = this.textures.get('soundoff');

		if(this.sound.mute == false)var spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundon');
		else var spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundoff');
        spriteSound.setScale(0.925);

		spriteSound.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

		spriteSound.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    spriteSound.on('pointerup', pointer => {
			if (!this.sound.mute) {
				this.sound.setMute(true);
				spriteSound.setTexture(sound2.key);
			}	
			else {
				this.sound.setMute(false);
				this.rain.play();
				this.music.play();
				spriteSound.setTexture(sound1.key);
			}
	    });

	}
}