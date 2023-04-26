import Battery from "../objects/battery.js";
import CabezaPesanta from "../objects/cabezaPesanta.js";
import Filemon from "../objects/filemon.js";
import Armario from "../objects/armario.js";
import Bed from "../objects/bed.js";
import Llave from "../objects/llave.js"

/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class firstLevel extends Phaser.Scene {
	
	constructor() {
		super({ key: 'firstLevel' });
	}
	
	preload(){
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		this.sonido();
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
		const t_muro = this.map.addTilesetImage('nuevosMuros');
		this.imagenCapa = this.add.image(0,0,'mapaImg');
		this.imagenCapa.setOrigin(0, 0);
		this.imagenCapa.setDepth(0);
		//Este es el orden de Pintado
		this.colisionesLayer =this.map.createLayer('Colisiones/colisionesMuro',t_muro);
		this.colisionesLayer.setVisible(false);
		this.colisionesLayer.setDepth(1);
		//this.capaAntiguoMapa = this.map.createLayer('mapaCapa', imagenCapa);
		this.muroInteriorLayer = this.map.createLayer('Muros/muroInterior',t_muro);
		this.muroInteriorLayer.setDepth(2);
		this.muroExteriorLayer = this.map.createLayer('Muros/muroExterior',t_muro);
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
		
		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('Objetos', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('Objetos', {name: "armario", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('Objetos', {name: "bed", classType: Bed, key: 'bed'});
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cojePila, null, this.player);

		//crear fuentes
		this.textoEscribiendose = false;
		this.retroText = this.add.bitmapText(100,100,'fuente','', 16);
		this.retroText.setTint(0xffffff);
		this.retroText.setDepth(4);

		let path = this.add.path(1200,1754)
			.lineTo(1200,1900)
			.lineTo(1400,1900);

		this.cabezaPesanta = new CabezaPesanta(this, 1200, 1760,path);
		this.physics.add.overlap(this.cabezaPesanta, this.player, this.player.cercaPesanta, null, this.player);

		this.llave = new Llave(this, 1150, 1800,'rojo');
		this.llave2 = new Llave(this, 1100, 1800,'azul');
		this.llave3 = new Llave(this, 1050, 1800,'gris');
		this.llave4 = new Llave(this, 1000, 1800,'marron');

		this.physics.add.overlap(this.llave, this.player, this.player.cojeObjeto, null, this.player);
		this.physics.add.overlap(this.llave2, this.player, this.player.cojeObjeto, null, this.player);
		this.physics.add.overlap(this.llave3, this.player, this.player.cojeObjeto, null, this.player);
		this.physics.add.overlap(this.llave4, this.player, this.player.cojeObjeto, null, this.player);


	}
	update() {
        // actualizar la posición del texto en función de la posición actual del jugador
		if (this.retroText) {
			this.retroText.x = this.cameras.main.scrollX + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
			this.retroText.y = this.cameras.main.scrollY + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
		}
    }
	cambioEntrada(){
		if(this.player.wKey.isDown){
			this.muroExteriorLayer.setVisible(false);
		}else if(this.player.sKey.isDown){
			this.muroExteriorLayer.setVisible(true);
		}
		this.escribirTexto("Bienvenido a la habitacion");
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
	entradaHabitacion(){
		if(this.player.wKey.isDown || this.player.aKey.isDown){
			this.muroInteriorLayer.setVisible(false);
		}else if(this.player.sKey.isDown || this.player.dKey.isDown){
			this.muroInteriorLayer.setVisible(true);
		}
	};
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
						}
					}, i * 100, i);
				}
			}
		}
	} 

	sonido(){

		this.sound.stopAll();

		this.rain = this.sound.add('rain',true);

		this.rain.play();

		this.input.keyboard.on('keydown-M', function (event) {
			console.log('La tecla M ha sido presionada');
			if (!this.sound.mute) {
				this.sound.setMute(true);
			  } else {
				this.sound.setMute(false);
				this.rain.play();
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

		this.input.keyboard.on('keydown-P', function (event) {

			this.scene.pause(this);
			this.scene.launch('pauseMenu');

		}.bind(this));

	}

}
