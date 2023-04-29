/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class NextLevel extends Phaser.Scene {
    
	constructor() {
		super({ key: 'nextLevel' });
	}

	init(data) {
        this.currentLevel = data.nivel;
        console.log(this.currentLevel);
    }

	create() {

		this.sonido();

		this.sonidoWin = this.sound.add('sonWin');
		this.sonidoWin.volume = 0.25;
		this.sonidoWin.play();
		this.sonidoWin.rate = 0.5;

		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'inicio');
        back.setScale(0.75);
        

		//Pintamos un botón de Empezar
		var overView = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2-20, 'complete')
        overView.setScale(0.5);


		var h1 = this.textures.get('home1');
		var h2 = this.textures.get('home2');

        var n1 = this.textures.get('next1');
		var n2 = this.textures.get('next2');

		var home = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2+30, 'home1')
        home.setScale(0.04);

        var next = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2+90, 'next1')
        next.setScale(0.04);

        next.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });
		home.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

	    next.on('pointerup', pointer => {
			//this.scene.start('firstLevel'); //Cambiamos a la escena de juego
            switch(this.currentLevel){
                case this.currentLevel = 'firstLevel':
                    this.scene.start('gameOver');
                    break;
                default:
                    this.scene.start('title');
                    break;

            }
	    });

        next.on('pointerover', () => {
			next.setTexture(n2.key);

	    });

	    next.on('pointerout', () => {
			next.setTexture(n1.key);

	    });


        home.on('pointerup', pointer => {
			this.scene.start('title');
	    });

        home.on('pointerover', () => {
			home.setTexture(h2.key);

	    });

	    home.on('pointerout', () => {
			home.setTexture(h1.key);

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