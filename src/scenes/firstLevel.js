//import Knight from '../objetos/knight.js';
//import Floor from '../objetos/floor.js';
//import Box from '../objetos/box.js';
import Batery from "../objects/battery";
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
		//Imagen de fondo
		//this.add.image(0, 0, 'stairs').setOrigin(0, 0);

		//let pesanta = new CabezaPesanta(this,150,100);
		//let file = new Filemon(this,150,100);
		

		//this.scene.launch('title');
		//crear tilemap
		this.map = this.make.tilemap({
			key: 'tilemap',
			tileWidth: 24,
			tileHeight: 24,
			width:50,
			height:50
		});
	
		const tileset1 = this.map.addTilesetImage('Inside_A4');
		const tileset2 = this.map.addTilesetImage('Outside_A1');
		const tileset3 = this.map.addTilesetImage('Outside_A5');

		this.groundLayer = this.map.createLayer('Suelo',[tileset1,tileset2,tileset3]);

		// Obtener los polígonos y el objeto cuadrado de la capa de objetos

		/*let muros = this.map.createFromObjects('Muros',{name: '',key: ''});
		let murosGroup = this.add.group();
		murosGroup.addMultiple(muros);
		muros.forEach(obj => {
			this.physics.add.existing(obj);
		});*/

		let pila1 = new Batery(this,600,1110, 200).setName("battery");
		let pila2 = new Batery(this,600,1120, 200).setName("battery");
		let pila3 = new Batery(this,600,1050, 400).setName("battery");
		let pila4 = new Batery(this,600,1020, 800).setName("battery");



		this.mov = this.map.createFromObjects('Player',{name: 'player',classType: Filemon, key:'player'});
		let player = this.mov[0];
		this.cameras.main.startFollow(player);



		

		//this.physics.add.collider(player,murosGroup);

		/*
		let boxes = this.physics.add.group();
		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let knight = new Knight(this, 50, 0);
		let floor = new Floor(this, 50);
		let box1 = new Box(this, 200, 0, boxes);
		let box2 = new Box(this, 400, 0, boxes);

		knight.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
		this.physics.add.collider(knight, floor, function(){
			if(scene.physics.world.overlap(knight, floor)) {
				knight.enableJump(); // Hemos tocado el suelo, permitimos volver a saltar
			}
		});

		this.physics.add.collider(floor, boxes);
		this.physics.add.collider(knight, boxes);
		*/
		/*
		 * Escuchamos los eventos de colisión en el mundo para poder actuar ante ellos
		 * En este caso queremos detectar cuando el caballero colisiona con el suelo para activar el salto del personaje
		 * El salto del caballero lo desactivamos en su "clase" (archivo knight.js) para evitar dobles saltos
		 * También comprobamos si está en contacto con alguna caja mientras ataca, en ese caso destruimos la caja
		 */
		/*
		scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			if(gameObject1 === knight && gameObject2 === floor || gameObject1 === floor && gameObject2 === knight){
				knight.enableJump();
			}

			if(gameObject1 === knight && boxes.contains(gameObject2)){
				if(gameObject1.isAttackInProcess()) {
					gameObject2.destroyMe()
				} 				
			}
		});	

		this.scene.launch('title');*/
	}

}
