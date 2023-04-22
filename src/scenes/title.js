/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
    
	constructor() {
		super({ key: 'title' });
		this.soundOn = true;
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

		if(this.soundOn){
			this.rain.play();
    		this.music.play();
		}
		

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

		if(this.soundOn)var spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundon');
		else var spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundoff');
        spriteSound.setScale(0.925);

		spriteSound.setInteractive();

		spriteSound.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    spriteSound.on('pointerup', pointer => {
			if (this.soundOn) {
				this.sound.setMute(true);
				this.soundOn = false;
				spriteSound.setTexture(sound2.key);
			}	
			else {
				this.sound.setMute(false);
				this.rain.play();
				this.music.play();
				this.soundOn = true;
				spriteSound.setTexture(sound1.key);
			}
	    });

	}
}