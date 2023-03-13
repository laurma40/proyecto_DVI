
/*
luz --> encender y apagar E
num Pilas
capacidad bolsillos {total, actual} --> cojer cosas F
*/


import Batery from "./batery";

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
		//this.pilas.push(new Batery(scene,400,300));

		this.sce = scene;
		
	

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
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

		this.eKey = this.scene.input.keyboard.addKey('E'); 
		this.fKey = this.scene.input.keyboard.addKey('F'); 
		
		
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

		
		////////////
		///PILAS
		
		//Encender y apagar linterna -> se pulsa el boton de encender y tenemos pilas
		if(this.eKey.isDown && this.pilas.length != 0){ 
			this.linterna = !this.linterna;
			console.log("linterna " + this.linterna);
			//HACER LA MASCARA; SE ACTIVA Y DESACTIVA AQUI
		}
		
		//Descargamos pila 
		if(this.linterna){//si esta encendida la linterna, para que se haya encendido tiene q tener pilas se chequea antes
			this.pilas[0].descarga();
			if(this.pilas[0].carga == 0){
				this.pilas[0].x = this.x + 2;
				this.pilas[0].y = this.y + 2;
				this.pilas.pop();//suelto la pila
			}
			if(this.pilas.length == 0){this.linterna = false;} 
		}


		//COGER OBJETOS - en proceso

		/*
		if(this.fKey.isDown){ 
			for (let i = 0; i < this.sce.list.length; i++) {
				const child = this.sce.list[i];
				// Hacer algo con cada objeto
				console.log(child.name);

				//el objeto esta en un radio de 10 de filemon
				if((child.y >= this.y + 10 || child.y < this.y + 10) && (child.x >= this.x + 10 || child.x < this.x + 10) ){
					if(child.name == "batery"){
						this.cojePila(child);

						return false; //para el bucle 
					}
					
				}
			}
		}*/


		/* 
		if(this.fKey.isDown){ 
			this.sce.list.forEach(child => { //recorro los objetos de la escena 
				// Hacer algo con cada objeto
				console.log(child.name);
	
				//el objeto esta en un radio de 10 de filemon
				if((child.y >= this.y + 10 || child.y < this.y + 10) && (child.x >= this.x + 10 || child.x < this.x + 10) ){
					if(child.name == "batery"){
						this.cojePila(child);

						return false; //para el bucle 
					}
					
				}
	
			});
	
		}*/

		
		
	}


	cojePila(batery){

		if(this.pilas.length < 3){ //Solo puede llevar tres pilas 
			this.pilas.push(batery);
			//AQUI SE METERIAN EN ALGUN ESPECIO DE INVENTARIO
			//Y PONER SONIDO
		}
	}


	


}
