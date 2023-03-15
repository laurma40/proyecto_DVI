
/*
luz --> encender y apagar E
num Pilas
capacidad bolsillos {total, actual} --> cojer cosas F
*/


import Battery from "./battery";
import LifeBar from "./lifeBar";
import Luz from "./luz";

export default class Filemon extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'filemon');
		this.setScale(0.1);
		this.scene.add.existing(this); //Añadimos el caballero a la escena


		//variables globales (creo q si se declaran arriba con el @ se hacen globales también)
		this.linterna = false;
		this.pilas = [];
		//this.pilas.push(new Battery(scene,400,300));

		this.corduraMax = 5000; //esto se pasaría por el constructor para que dependa del nivel
		this.cordura = this.corduraMax;

		this.scene = scene;
		
	

		// Creamos las animaciones de cabeza de pesanta
		this.scene.anims.create({
			key: 'front',
			frames: scene.anims.generateFrameNumbers('filemon', {start:4, end:7}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'back',
			frames: scene.anims.generateFrameNumbers('filemon', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'right',
			frames: scene.anims.generateFrameNumbers('filemon', {start:8, end:11}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('filemon', {start:12, end:15}),
			frameRate: 5,
			repeat: -1
		});
		///
		this.scene.anims.create({
			key: 'standFront',
			frames: scene.anims.generateFrameNumbers('filemon', {start:4, end:4}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'standBack',
			frames: scene.anims.generateFrameNumbers('filemon', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standRight',
			frames: scene.anims.generateFrameNumbers('filemon', {start:8, end:8}),
			frameRate: 1,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standLeft',
			frames: scene.anims.generateFrameNumbers('filemon', {start:12, end:12}),
			frameRate: 1,
			repeat: -1
		});

		this.play('front');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

		this.eKey = this.scene.input.keyboard.addKey('E'); //encender / apagar
		this.canPressE = true;

		this.fKey = this.scene.input.keyboard.addKey('F'); //coger / interactuarzz
		
		this.luz = new Luz(this.scene, this.x, this.y);
		this.progressBar = new LifeBar(this.scene, this.x + 170, this.y - 180, this.corduraMax );
	}
	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);
		var speed = 6; //cambiara segun tenga la linterna encendida o apagada


		// Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if(this.aKey.isDown){
			if(this.anims.currentAnim.key !== 'left')
				this.play('left');
			this.x -= speed*dt/60;
		}

		else if(this.aKey.isUp && this.anims.currentAnim.key === 'left') {
			this.play('standLeft');
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		else if(this.dKey.isDown){
			if(this.anims.currentAnim.key !== 'right')
				this.play('right');
			this.x += speed*dt/60;
		}

		else if(this.dKey.isUp && this.anims.currentAnim.key === 'right') {
			this.play('standRight');
		}
		
		// Mientras pulsemos la tecla 'W' movemos el personaje en la Y
		else if(this.wKey.isDown){
			if(this.anims.currentAnim.key !== 'back')
				this.play('back');
			this.y -= speed*dt/60;
		}

		else if(this.wKey.isUp && this.anims.currentAnim.key === 'back') {
			this.play('standBack');
		}

		// Mientras pulsemos la tecla 'S' movemos el personaje en la Y
		else if(this.sKey.isDown){
			if(this.anims.currentAnim.key !== 'front')
				this.play('front');
			this.y += speed*dt/60;
		}

		else if(this.sKey.isUp && this.anims.currentAnim.key === 'front') {
			this.play('standFront');
		}

		
		///////////////////////////////////////////////////////////////////////////////////

		////LINTERNA encender y apagar
		
		this.luz.setPosition(this.x, this.y);
		
		//Encender y apagar linterna -> se pulsa el boton de encender y tenemos pilas
		if(this.eKey.isDown && this.pilas.length != 0 && this.canPressE){ 
			this.linterna = !this.linterna;
			console.log("linterna " + this.linterna);

			if(this.linterna){
				this.luz.play('onLuz');
			} 
			else{this.luz.play('offLuz');}

			this.canPressE = false;
			// Esperar un segundo antes de volver a escuchar la tecla E porque si no no se pulsa bien
			setTimeout(() => { this.canPressE = true; }, 100); //esto lo mejora pero no lo arregla del todo
		}
		
		//Descargamos pila 
		if(this.linterna){//si esta encendida la linterna, para que se haya encendido tiene q tener pilas se chequea antes
			
			this.pilas[0].descarga(); //USAR DT¿?

			if(this.pilas[0].carga <= 0){
				this.pilas[0].x = this.x + 5;
				this.pilas[0].y = this.y + 10;
				this.pilas[0].visible = true;
				this.pilas.shift();//suelto la pila en primera posición
			}
			if(this.pilas.length == 0){
				this.linterna = false;
				this.luz.play('offLuz')
			} 
		}

		////COGER / INTERACTUAR CON  OBJETOS (de momento pilas)
		
		if(this.fKey.isDown){ 
			
			const objetosEscena = this.scene.children.getChildren(); 
			let ditancia = 10;

			objetosEscena.forEach(objeto => { //recorro los objetos en la escena
				
				//console.log(objeto);

				if( Math.abs(objeto.y - this.y) <= ditancia && Math.abs(objeto.x - this.x) >= ditancia){
					if(objeto.name == "battery"){ 
						this.cojePila(objeto);
					}	

					//AÑADIR AQUI EL RESTO DE OBJETOS CON LOS QUE PUEDE INTERACTUAR
					//Armario, puerta, cama(meta), llave

					return false; //para el bucle para coger de uno en uno (no va bn :( ) 
				}		

			});
		}


		////CORDURA

		if(this.linterna){
			if(this.cordura < this.corduraMax) this.cordura++; //HACERLO CON
		}
		else{
			if(this.cordura > 0) this.cordura--; //USAR DT¿?
			else{
				//LLAMAR A SCENE GAME OVER 
				this.scene.scene.start('gameOver'); //Cambiamos a la escena de juego
			}

		}
		this.progressBar.updateBar(this.cordura, this.x + 168, this.y - 178);
		
	}


	cojePila(battery){

		if( battery.carga > 0 && this.pilas.length < 3){ //Solo puede llevar tres pilas y solo la cojo si tiene carga
			this.pilas.push(battery);
			//AQUI SE METERIAN EN ALGUN ESPECIO DE INVENTARIO (la hago invisible de momento)

			battery.visible = false;

			//Y PONER SONIDO
		}
	}


	


}
