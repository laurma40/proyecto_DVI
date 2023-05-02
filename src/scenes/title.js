/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
    
	constructor() {
		super({ key: 'title' });
	}

	preload(){
	}
	
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

		this.music = this.sound.add('titlesong', config);
		this.rain = this.sound.add('rain', config);

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


	    sprite.on('pointerup', pointer => {
			this.sound.stopAll();
			this.scene.start('firstLevel'); //Cambiamos a la escena de juego

	    });

		sprite.on('pointerover', () => {
			sprite.setTexture(s2.key);

	    });

	    sprite.on('pointerout', () => {
			sprite.setTexture(s1.key);
	    });

		//Pintamos el botón de mutear el sonido
		this.sound1 = this.textures.get('soundon');
		this.sound2 = this.textures.get('soundoff');

		if(this.sound.mute == false)this.spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundon');
		else this.spriteSound = this.add.image(this.sys.game.canvas.width-20, 20, 'soundoff');
        this.spriteSound.setScale(0.925);

		this.spriteSound.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

	

	    this.spriteSound.on('pointerup', pointer => {
			if (!this.sound.mute) {
				this.sound.setMute(true);
				this.spriteSound.setTexture(this.sound2.key);
			}	
			else {
				this.sound.setMute(false);
				this.rain.play();
				this.music.play();
				this.spriteSound.setTexture(this.sound1.key);
			}
	    });

	}

	sonido(){

		this.input.keyboard.on('keydown-M', function (event) {
			if (!this.sound.mute) {
				this.sound.setMute(true);
				this.spriteSound.setTexture(this.sound2.key);

			  } else {
				this.sound.setMute(false);
				this.spriteSound.setTexture(this.sound1.key);

			}
		}.bind(this));
	
	}
}