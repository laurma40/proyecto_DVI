import Battery from "../objects/battery.js";
import CabezaPesanta from "../objects/cabezaPesanta.js";
import Filemon from "../objects/filemon.js";
import Armario from "../objects/armario.js";
import Bed from "../objects/bed.js";
/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class firstLevel extends Phaser.Scene {
	
	constructor() {
		super({ key: 'firstLevel' });
	}
	
	preload(){
		this.load.spritesheet('cabezaPesanta', 'assets/spritesheets_1row.png', {frameWidth: 504, frameHeight: 420})
		this.load.spritesheet('filemon', 'assets/filemon-250-400.png', {frameWidth: 250, frameHeight: 400})
		this.load.spritesheet('battery', 'assets/SpriteSheet_Batery3.png',{frameWidth: 280, frameHeight: 370})
		this.load.spritesheet('luz', 'assets/luz.png',{frameWidth: 100, frameHeight: 100})
		this.load.spritesheet('bed', 'assets/cama_530_330.png', {frameWidth: 530, frameHeight: 330})

		this.load.spritesheet('armario', 'assets/armario-125-125.png', {frameWidth: 125, frameHeight: 125})
		//Cargamos el archivo JSON necesario para importar el Tilemap
		this.load.tilemapTiledJSON('tilemap','assets/Tilemap/MapaPiso1Definitivo.json');
		//Cargamos los tilesets necesarios para poder crear el mapa
		this.load.image('nuevosMuros','assets/Tilemap/nuevosMuros.jpeg');
		//this.load.image('puertas','../../assets/Tilemap/puertas.png');
		this.load.image('mapaImg','assets/Tilemap/mapaCapa.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

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
		//this.capaAntiguoMapa = this.map.createLayer('mapaCapa', imagenCapa);
		this.muroInteriorLayer = this.map.createLayer('Muros/muroInterior',t_muro);
		this.muroExteriorLayer = this.map.createLayer('Muros/muroExterior',t_muro);
		//this.puertasLayer = this.map.createLayer('Puertas',t_puertas);
		
		
		console.log(this);
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
		//this.armarios = this.map.createFromObjects('Objetos', {name: "armario", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('Objetos', {name: "bed", classType: Bed, key: 'bed'});
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        //this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cojePila, null, this.player);
	}
	cambioEntrada(){
		if(this.player.wKey.isDown){
			this.muroExteriorLayer.setVisible(false);
		}else if(this.player.sKey.isDown){
			this.muroExteriorLayer.setVisible(true);
		}
	}
	cambioLateralesIncio(){
		if(this.player.wKey.isDown){
			this.muroInteriorLayer.setVisible(true);
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
			this.muroExteriorLayer.setVisible(true);
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
}
