

import Inventory from "./inventory.js";
import LifeBar from "./lifeBar.js";
import Luz from "./luz.js";

export default class Filemon extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y) {
		super(scene, x, y, 'filemon');
		this.setScale(0.1);
		this.scene = scene;
		this.scene.add.existing(this); //Añadimos el caballero a la escena
		this.scene.physics.add.existing(this);

		//variables globales (creo q si se declaran arriba con el @ se hacen globales también)
		this.linterna = false;
		this.pilas = [];
		this.zonaSegura = false;
		//this.pilas.push(new Battery(scene,400,300));

		//this.corduraMax = 30000; //esto se pasaría por el constructor para que dependa del nivel

		this.corduraMax = 3000; //esto se pasaría por el constructor para que dependa del nivel
		this.cordura = this.corduraMax;

		this.maxSpeed = 115;
		this.minSpeed = 70;
		this.speed = this.maxSpeed;		
		this.depth=1.9;

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

		this.eKey = this.scene.input.keyboard.addKey('E'); //coger / interactuarzz/
		this.fKey = this.scene.input.keyboard.addKey('F'); //encender / apagar
		this.canPressF = true;
		this.canPressW = true;
		this.canPressA = true;
		this.canPressS = true;
		this.canPressD = true;

		this.sonidoLinterna = scene.sound.add('sonlinterna');
		this.sonidoLinterna.volume = 0.3;

		this.sonidoCoger = scene.sound.add('sonCoger');
		this.sonidoCoger.volume = 0.3;

		this.sonidoGrito = scene.sound.add('sonGrito');
		this.sonidoGrito.volume = 0.08;

		this.sonidoPuerta = scene.sound.add('sonPuerta');
		this.sonidoPuerta.volume = 0.3;

		this.animacionEnCurso = false;
		this.enArmario = false;
		
		this.luz = new Luz(this.scene, this.x, this.y);
		this.progressBar = new LifeBar(this.scene, this.x + 170, this.y - 180, this.corduraMax, 96, 6);
		this.inventario = new Inventory(this.scene, this.x + 260, this.y - 130);
	}
	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);
		let velocity = new Phaser.Math.Vector2(0, 0);
		// Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if (this.aKey.isDown && !this.enArmario) {
			if (this.anims.currentAnim.key !== 'left'){
				this.play('left');
			}
			velocity.x = -1;
			//this.x -= this.speed*dt/60;
		}
		else if (this.aKey.isUp && this.anims.currentAnim.key === 'left') {
			this.play('standLeft');
		}
		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		else if (this.dKey.isDown && !this.enArmario) {
			if (this.anims.currentAnim.key !== 'right'){
				this.play('right');
			}
			velocity.x = 1;
			//this.x += speed*dt/60;
		}
		else if (this.dKey.isUp && this.anims.currentAnim.key === 'right') {
			this.play('standRight');
		}

		// Mientras pulsemos la tecla 'W' movemos el personaje en la Y
		if (this.wKey.isDown && !this.enArmario) {
			if (this.anims.currentAnim.key !== 'back' && this.anims.currentAnim.key !== 'left' && this.anims.currentAnim.key !== 'right'){
				this.play('back');
			}
			//this.y -= speed*dt/60;
			velocity.y = -1;
		}

		else if (this.wKey.isUp && this.anims.currentAnim.key === 'back' ) {
			this.play('standBack');
		}

		// Mientras pulsemos la tecla 'S' movemos el personaje en la Y
		else if (this.sKey.isDown && !this.enArmario) {
			if (this.anims.currentAnim.key !== 'front' && this.anims.currentAnim.key !== 'left' && this.anims.currentAnim.key !== 'right')
				this.play('front');
			velocity.y = 1;
			//this.y += speed*dt/60;
		}

		else if (this.sKey.isUp && this.anims.currentAnim.key === 'front') {
			this.play('standFront');
		}
		velocity.normalize();
		this.body.setVelocity(velocity.x*this.speed, velocity.y*this.speed);

		
		///////////////////////////////////////////////////////////////////////////////////

		////LINTERNA encender y apagar
		
		
		//Encender y apagar linterna -> se pulsa el boton de encender y tenemos pilas
		if(this.fKey.isDown && this.pilas.length != 0 && this.canPressF){ 

			this.sonidoLinterna.play();	

			this.linterna = !this.linterna;
			console.log("linterna " + this.linterna);

			if(this.linterna){
				this.luz.play('onLuz');
				this.speed = this.minSpeed;
				console.log(this.speed);
			} 
			else{
				this.luz.play('offLuz');
				this.speed = this.maxSpeed;
				console.log(this.speed);
			}

			this.canPressF = false;
			// Esperar un segundo antes de volver a escuchar la tecla E porque si no no se pulsa bien
			setTimeout(() => { this.canPressF = true; }, 100); // no lo corregimos del todo paar dar más ambiente
		}
		
		//Descargamos pila 
		if(this.linterna){//si esta encendida la linterna, para que se haya encendido tiene q tener pilas se chequea antes
			
			this.pilas[0].descarga(); //USAR DT¿?

			if(this.pilas[0].carga <= 0){
				this.pilas[0].x = this.x + 5;
				this.pilas[0].y = this.y + 10;
				this.pilas[0].visible = true;
				this.pilas.shift();//suelto la pila en primera posición

				this.sonidoCoger.play();

			}
			if(this.pilas.length == 0){

				this.sonidoLinterna.play();	
				this.sonidoCoger.play();
				this.linterna = false;
				this.luz.play('offLuz');
				this.speed = this.maxSpeed;
			} 
		}
		this.printBattry();
		this.inventario.print( this.x + 8, this.y + 12);


		////CORDURA

		if(this.linterna || this.zonaSegura){
			if(this.cordura < this.corduraMax) this.cordura++; //HACERLO CON
		}
		else{
			if(this.cordura > 0) this.cordura--; //USAR DT¿?
			else{
				//LLAMAR A SCENE GAME OVER 

				this.scene.sound.stopAll();
				this.sonidoGrito.play();
				this.scene.scene.start('gameOver'); //Cambiamos a la escena de juego
			}

		}
		this.progressBar.updateBar(this.cordura, this.x + 168, this.y - 178);
		
	}

	
	cogePila(sprite1, sprite2){//this.pila1, this.player,

		if(this.eKey.isDown){ 

			if( sprite1.carga > 0 && this.pilas.length < 3){ //Solo puede llevar tres pilas y solo la cojo si tiene carga
				this.pilas.push(sprite1);
				
				
				sprite1.visible = false;
				sprite1.x = 100000;
				sprite1.y = 100000;

				this.sonidoCoger.play();
			}
		}
		
	}
	printBattry(){

		if(this.pilas.length > 0){

			this.pilas[0].x = this.x + 260;
			this.pilas[0].y = this.y - 150;
			this.pilas[0].setScale(0.08,0.08);
			this.pilas[0].depth = 5;
			this.pilas[0].visible = true; 
			this.pilas[0].updateBar();

			if(this.pilas.length == 2){
				this.pilas[0].play('dos');
			}else if(this.pilas.length == 3){
				this.pilas[0].play('tres');
			}
		}
	}

	cogeObjeto(sprite1, sprite2){//objeto(llave), player
		if(this.eKey.isDown){ 
			this.sonidoCoger.play();
			this.inventario.addGameObject(sprite1);
			console.log("COJO LLAVE");
		}
		
	
	}

	interactuarArmario(sprite1, sprite2){ // armario, this.player
        if(!this.animacionEnCurso){
            this.animacionEnCurso = true;
            if(this.eKey.isDown){
                this.linterna = false;
                this.luz.play('offLuz');
                this.zonaSegura = !this.zonaSegura;
                this.eKey.isDown = false;
                if(this.zonaSegura){
                    sprite1.play('open');
                    this.scene.input.keyboard.removeKey('W');
                    this.scene.input.keyboard.removeKey('A');
                    this.scene.input.keyboard.removeKey('S');
                    this.scene.input.keyboard.removeKey('D');
                    this.scene.input.keyboard.removeKey('F');
					this.enArmario = true;
                    setTimeout(() => { 
                        sprite2.visible = false;
                        setTimeout(() => { 
                            sprite1.play('closed') ;
                            this.animacionEnCurso = false;
                        }, 1500);
                    }, 1500);
                }
                else{
                    sprite1.play('close');
                    setTimeout(() => { 
                        sprite2.visible = true;
						this.speed = this.maxSpeed;
                        setTimeout(() => { 
                            sprite1.play('closed') ;
                            this.wKey = this.scene.input.keyboard.addKey('W');
                            this.aKey = this.scene.input.keyboard.addKey('A');
                            this.sKey = this.scene.input.keyboard.addKey('S');
                            this.dKey = this.scene.input.keyboard.addKey('D');
                            this.fKey = this.scene.input.keyboard.addKey('F');
							this.enArmario = false;
                            this.animacionEnCurso = false;
                        }, 1500);
                    }, 1500);
                }
            }
            else{
                this.animacionEnCurso = false;
            }
        }
    
    }

	
    dormir(sprte1, sprite2){//cama, this.player,


		if(this.eKey.isDown){ 

			this.scene.sound.stopAll();
			sprte1.play('conFilemon')
			this.visible = false;
			this.linterna = false;
			this.luz.play('offLuz');
	
			this.scene.cameras.main.fadeOut(1000, 0, 0, 0)
			this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
				this.scene.scene.start('nextLevel', {nivel: this.scene.scene.key}); //Cambiamos a la escena de juego
			});
		}
		
	}
    
	cercaPesanta(sprte1, sprite2){//cabeza de Pesanta, this.player,

		if(!this.zonaSegura){
			this.cordura -= 10;
		}
		
	}

	abrirPuerta(sprite1, sprite2){

		console.log("Puerta " + sprite1.color);
		if(sprite1.bloqueada){
			if(this.eKey.isDown){

				if(this.inventario.getLlave(sprite1.color)){
					sprite1.body.enable = false;
					sprite1.bloqueada = false;
					this.sonidoPuerta.play();
					sprite1.play("openDoor");
					sprite1.setVisible(sprite1.frontal);
				}
				else{ 
					this.scene.escribirTexto(sprite1.texto);
				}
				
			}
		}

	}
}
