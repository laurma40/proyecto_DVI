export default class CabezaPesanta extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Cabeza de Pesanta
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'cabezaPesanta');
		this.speed = 40;
		this.setScale(0.2);

		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de cabeza de pesanta
		this.scene.anims.create({
			key: 'front',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:0, end:3}),
			frameRate: 3,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'back',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:4, end:7}),
			frameRate: 3,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'right',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:8, end:11}),
			frameRate: 3,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:12, end:15}),
			frameRate: 3,
			repeat: -1
		});

		this.play('front');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
		
	}
	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if(this.aKey.isDown){
			this.setFlip(true, false)
			if(this.anims.currentAnim.key !== 'left'){
				this.play('left');
			
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		if(this.dKey.isDown){
			this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'right'){
				this.play('right');
			}
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(this.speed);
		}
		
		// Mientras pulsemos la tecla 'W' movemos el personaje en la Y
		if(this.dKey.isDown){
			this.setFlip(true, false)
			if(this.anims.currentAnim.key !== 'back'){
				this.play('back');
			}
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityY(this.speed);
		}

		// Mientras pulsemos la tecla 'S' movemos el personaje en la Y
		if(this.dKey.isDown){
			this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'front'){
				this.play('front');
			}
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityY(-this.speed);
		}
	}
}
