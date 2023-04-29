
import Filemon from "../objects/filemon.js";


/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class Level extends Phaser.Scene {
	
	constructor(key2) {
		super({ key: key2 });
	}
	
	preload(){
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		this.sonido();
		this.rain = this.sound.add('rain', { loop: true });
		this.rain.play();

		this.shortCut();
		this.pauseMenu();

		//crear tilemap
		this.map = this.make.tilemap({
			key: 'tilemap',
			tileWidth: 12,
			tileHeight: 12,
			width:200,
			height:200
		});
		this.t_muro = this.map.addTilesetImage('nuevosMuros');
		this.imagenCapa = this.add.image(0,0,'mapaImg');
		this.imagenCapa.setOrigin(0, 0);
		this.imagenCapa.setDepth(0);
		//Este es el orden de Pintado
		this.colisionesLayer =this.map.createLayer('Colisiones/colisionesMuro',this.t_muro);
		this.colisionesLayer.setVisible(false);
		this.colisionesLayer.setDepth(1);
		//this.capaAntiguoMapa = this.map.createLayer('mapaCapa', imagenCapa);
		this.muroInteriorLayer = this.map.createLayer('Muros/muroInterior',this.t_muro);
		this.muroInteriorLayer.setDepth(1.8);
		this.muroExteriorLayer = this.map.createLayer('Muros/muroExterior',this.t_muro);
		this.muroExteriorLayer.setDepth(3);
		//this.puertasLayer = this.map.createLayer('Puertas',t_puertas);
		
		this.colisionesLayer.setCollision(1281);
		this.colisionesLayer.setTileIndexCallback(1289,this.cambioEntrada,this);
		this.colisionesLayer.setTileIndexCallback(1297,this.cambioLateralesIncio,this);
		this.colisionesLayer.setTileIndexCallback(1305,this.cambioLateralesArriba,this);
		this.colisionesLayer.setTileIndexCallback(1313,this.entradaHabitacion,this);
		//this.colisionesLayer.setTileIndexCallback(2601,this.escaleraHabitacion,this);
		this.mov = this.map.createFromObjects('Objetos',{name: 'player',classType: Filemon, key:'player'});
		this.player = this.mov[0];

		this.cameras.main.startFollow(this.player);
		this.physics.add.existing(this.player);
		this.physics.world.enable(this.player);

		//Añadir las colisiones del jugador con la capa
		this.physics.add.collider(this.player, this.colisionesLayer, this.colision);
		
		console.log(this);
		

		//crear fuentes
		this.textoEscribiendose = false;
		this.retroText = this.add.bitmapText(100,100,'fuente','', 16);
		this.retroText.setTint(0xffffff);
		this.retroText.setDepth(4);

		//boton ppausa
		this.botonPausa = this.add.image(this.sys.game.canvas.width-20, 20, 'noPausado');
		this.botonPausa.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });
		this.botonPausa.on('pointerup', pointer => {
			this.scene.pause(this);
			this.scene.launch('pauseMenu');
	    });
		this.botonPausa.setScale(0.25);
		this.botonPausa.setDepth(5);

		this.ultimaLetra = false;
	}
	update() {
        // actualizar la posición del texto en función de la posición actual del jugador
		if (this.retroText) {
			this.retroText.x = this.cameras.main.scrollX + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
			this.retroText.y = this.cameras.main.scrollY + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
		}

		if (this.botonPausa) {
			this.botonPausa.x = this.cameras.main.scrollX + this.sys.game.canvas.width-20; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
			this.botonPausa.y = this.cameras.main.scrollY + 25; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
		}
		if(this.textoEscribiendose === false && this.ultimaLetra === true ){
			this.time.delayedCall(2000, this.resetText, [], this);
		}
    }
	resetText(){
		this.retroText.setText("");
		this.ultimaLetra=false;
	}
	cambioEntrada(){
		if(this.player.wKey.isDown){
			this.muroExteriorLayer.setVisible(false);
		}else if(this.player.sKey.isDown){
			this.muroExteriorLayer.setVisible(true);
		}
		//this.escribirTexto("Bienvenido a la habitacion");
	}
	cambioLateralesIncio(){
		if(this.player.wKey.isDown){
			this.muroExteriorLayer.setVisible(true);
		}else if(this.player.sKey.isDown){
			this.muroExteriorLayer.setVisible(false);
		}
	}
	cambioLateralesArriba(){
		if(this.player.wKey.isDown){
			this.muroInteriorLayer.setVisible(false);
		}else if(this.player.sKey.isDown){
			this.muroInteriorLayer.setVisible(true);
		}
	}
	escaleraHabitacion(){
		console.log('Pulsa p para entrar al dormitorio');
	}
	colision(){
		console.log('Colision');
	}
	puerta(){
		console.log('Puerta');
	}
	escribirTexto(texto) {
		if (!this.textoEscribiendose) {
			this.textoEscribiendose = true;
			if (this.retroText) {
				var aux = '';  
				for (var i = 0; i < texto.length; i++) {
					setTimeout((index) => {
						aux = aux + texto[index]; 
						this.retroText.setText(aux);
						if (index === texto.length - 1) {
							this.textoEscribiendose = false;
							this.ultimaLetra=true;
						}
					}, i * 100, i);
				}
			}
		}
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

	shortCut(){

		this.input.keyboard.on('keydown-N', function (event) {

			this.sound.stopAll();

			console.log('La tecla N ha sido presionada');
			this.cameras.main.fadeOut(1000, 0, 0, 0)
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
				this.scene.start('nextLevel', {nivel: this.scene.key}); //Cambiamos a la escena de juego
			});
		}.bind(this));

		
	}

	pauseMenu() {

		this.input.keyboard.on('keydown-ESC', function (event) {

			this.scene.pause(this);
			this.scene.launch('pauseMenu', {pausado: this.pausa});

		}.bind(this));

	}

}
