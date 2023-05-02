/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class InfoScene extends Phaser.Scene {
    
	constructor() {
		super({ key: 'infoScene' });
	}

	init(data) {
        this.currentLevel = data.nivel;
    }

	create() {

		this.sonido();

		//Pintamos un fondo
		var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'info');
        back.setScale(0.75);
    

        var n1 = this.textures.get('ok1');
		var n2 = this.textures.get('ok2');


        var ok = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2+140, 'ok1')
        ok.setScale(0.15);

        ok.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });

	  

        ok.on('pointerover', () => {
			ok.setTexture(n2.key);

	    });

	    ok.on('pointerout', () => {
			ok.setTexture(n1.key);

	    });


        ok.on('pointerup', pointer => {
			this.scene.start('title');
	    });
        

	}

	sonido(){

		this.input.keyboard.on('keydown-M', function (event) {
			if (!this.sound.mute) {
				this.sound.setMute(true);
			  } else {
				this.sound.setMute(false);
			}
		}.bind(this));
	
	}
}