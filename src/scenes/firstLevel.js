//import Knight from '../objetos/knight.js';
//import Floor from '../objetos/floor.js';
//import Box from '../objetos/box.js';
import Battery from "../objects/battery";
import CabezaPesanta from "../objects/cabezaPesanta";
import Filemon from "../objects/filemon.js";
import Armario from "../objects/armario.js";
/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class firstLevel extends Phaser.Scene {
	
	constructor() {
		super({ key: 'firstLevel' });
	}
	
	preload(){
		//this.load.image('stairs', 'assets/stairs.png');
		this.load.spritesheet('cabezaPesanta', 'assets/spritesheets_1row.png', {frameWidth: 504, frameHeight: 420})
		this.load.spritesheet('filemon', 'assets/filemon-250-400.png', {frameWidth: 250, frameHeight: 400})
		this.load.spritesheet('battery', 'assets/SpriteSheet_Batery3.png',{frameWidth: 280, frameHeight: 370})
		this.load.spritesheet('luz', 'assets/luz.png',{frameWidth: 100, frameHeight: 100})

		this.load.spritesheet('armario', 'assets/armario-125-125.png', {frameWidth: 125, frameHeight: 125})
		//Cargamos el archivo JSON necesario para importar el Tilemap
		this.load.tilemapTiledJSON('tilemap','../../assets/Tilemap/MapaPiso1Definitivo.json');
		//Cargamos los tilesets necesarios para poder crear el mapa
		this.load.image('muro','../../assets/Tilemap/muro.jpeg');
		//this.load.image('puertas','../../assets/Tilemap/puertas.png');
		this.load.image('mapaImg','../../assets/Tilemap/mapaCapa.png');
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
		
		//Tileds para el Fondo
		const t_muro = this.map.addTilesetImage('muro');
		this.imagenCapa = this.add.image(0,0,'mapaImg');
		this.imagenCapa.setOrigin(0, 0);
		this.imagenCapa.setDepth(0);
				//Este es el orden de Pintado
		this.colisionesLayer =this.map.createLayer('Colisiones/colisionesMuro',t_muro);
		//this.capaAntiguoMapa = this.map.createLayer('mapaCapa', imagenCapa);
		this.muroInteriorLayer = this.map.createLayer('Muros/muroInterior',t_muro);
		this.muroExteriorLayer = this.map.createLayer('Muros/muroExterior',t_muro);
		//this.puertasLayer = this.map.createLayer('Puertas',t_puertas);
		
		console.log(this);

		this.mov = this.map.createFromObjects('Objetos',{name: 'player',classType: Filemon, key:'player'});
		this.player = this.mov[0];
		this.cameras.main.startFollow(this.player);
		this.physics.add.existing(this.player);
		this.physics.world.enable(this.player);

		//Añadir las colisiones del jugador con la capa
		this.physics.add.collider(this.player, this.colisionesLayer, this.colision);
		//this.physics.add.collider(this.player, this.puertasLayer,this.colision);
		
		//Comportamiento segun con que colisione
		//this.colisionesLayer.setCollision(7937);
		/*
		this.colisionEscaleraYPuertaLayer.setTileIndexCallback(8577, this.escaleraHabitacion,this);
		this.colisionEscaleraYPuertaLayer.setTileIndexCallback(10684,this.entradaHabitacion,this);//H1 Arriba
		this.colisionEscaleraYPuertaLayer.setTileIndexCallback(10692,this.entradaHabitacion,this);//Alfombra
		this.colisionEscaleraYPuertaLayer.setTileIndexCallback(10688,this.entradaHabitacion,this);//H1 Abajo
		this.colisionEscaleraYPuertaLayer.setTileIndexCallback(8593,this.entradaHabitacion,this);//H2 Abajo*/

		//this.colisionesLayer.setTileIndexCallback(10684, this.cambioEntrada, this);
		//this.colisionesLayer.setTileIndexCallback(10692, this.cambioLateralesIncio, this);
		//this.colisionesLayer.setTileIndexCallback(10688, this.cambioLateralesArriba, this);

		
		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('Objetos', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('Objetos', {name: "armario", classType: Armario, key: 'armario'});
        	this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cojePila, null, this.player);


		//this.anims.play('spin', pilas);
		
		/*let pilasGroup = this.add.group();
		pilasGroup.addMultiple(pilas)
		pilas.forEach(obj => {
			this.physics.add.existing(obj);
		});
		this.physics.add.overlap(this.player, pilasGroup);*/
		//this.cambioMurosLayer.setCollision(8577);
		//this.colisionEscaleraLayer.setCollision()


		//this.physics.add.collider(player,murosGroup);

		/*
		let boxes = this.physics.add.group();
		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let knight = new Knight(this, 50, 0);
		let floor = new Floor(this, 50);
		let box1 = new Box(this, 200, 0, boxes);
		let box2 = new Box(this, 400, 0, boxes);

		knight.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo

		//let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
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
	cambioEntrada(){
			if(this.player.wKey.isDown){
				this.muroExteriorLayer.setVisible(false);
			}else if(this.player.sKey.isDown){
				this.muroExteriorLayer.setVisible(true);
			}
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
		console.log('Pulsa p para entrar a la habitación');
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
