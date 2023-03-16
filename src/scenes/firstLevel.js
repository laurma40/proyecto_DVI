//import Knight from '../objetos/knight.js';
//import Floor from '../objetos/floor.js';
//import Box from '../objetos/box.js';
import Battery from "../objects/battery";
import CabezaPesanta from "../objects/cabezaPesanta";
import Filemon from "../objects/filemon.js";
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class firstLevel extends Phaser.Scene {
	
	constructor() {
		super({ key: 'firstLevel' });
	}
	
	preload(){
		//this.load.image('stairs', 'assets/stairs.png');
		this.load.spritesheet('cabezaPesanta', 'assets/spritesheets_1row.png', {frameWidth: 504, frameHeight: 420})
		this.load.spritesheet('filemon', 'assets/filemon-520-450.png', {frameWidth: 520, frameHeight: 450})
		this.load.spritesheet('battery', 'assets/SpriteSheet_Batery.png',{frameWidth: 280, frameHeight: 370})
		this.load.spritesheet('luz', 'assets/luz.png',{frameWidth: 100, frameHeight: 100})
		//Cargamos el archivo JSON necesario para importar el Tilemap
		this.load.tilemapTiledJSON('tilemap','../../assets/Tilemap/MapaPrueba.json');
		//Cargamos los tilesets necesarios para poder crear el mapa
		this.load.image('Inside_A4','../../assets/Tilemap/Inside_A4.png');
		this.load.image('Outside_A1','../../assets/Tilemap/Outside_A1.png');
		this.load.image('Outside_A5','../../assets/Tilemap/Outside_A5.png');

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
			width:50,
			height:50
		});
	
		const tileset1 = this.map.addTilesetImage('Inside_A4');
		const tileset2 = this.map.addTilesetImage('Outside_A1');
		const tileset3 = this.map.addTilesetImage('Outside_A5');

		this.groundLayer = this.map.createLayer('Suelo',[tileset1,tileset2,tileset3]);
		this.borderLayer = this.map.createLayer('Borde',[tileset1,tileset2,tileset3]);
		this.colisionLayer = this.map.createLayer('Colisiones',tileset2);

		this.pila1 = new Battery(this,600,1110, 200).setName("battery");
		//let pila2 = new Battery(this,600,1120, 200).setName("battery");
		//let pila3 = new Battery(this,600,1050, 400).setName("battery");
		//let pila4 = new Battery(this,600,1020, 800).setName("battery");

		this.mov = this.map.createFromObjects('Objetos',{name: 'player',classType: Filemon, key:'player'});
		this.player = this.mov[0];
		this.cameras.main.startFollow(this.player);
		this.physics.add.existing(this.player);
		this.physics.world.enable(this.player);
		this.physics.add.collider(this.player, this.colisionLayer, this.colision);
		
		//primeros dos parametros los elementos que colisionanel, despues lafuncion, depues no sé, ultimo parametro a quien pertenece la funcion
		this.physics.add.overlap(this.pila1, this.player, this.player.cojePila, null, this.player);
		this.colisionLayer.setCollision(7457);


	}
	colision(){
		console.log('Colision');
	}
	
}
