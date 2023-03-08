export default class CabezaPesanta extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'cabezaPesanta');
		this.setScale(0.2);

		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de cabeza de pesanta
		this.scene.anims.create({
			key: 'front',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'back',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:4, end:7}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'right',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:8, end:11}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:12, end:15}),
			frameRate: 5,
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
			if(this.anims.currentAnim.key !== 'left')
				this.play('left');
			this.x -= 5*dt/60;
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		if(this.dKey.isDown){
			if(this.anims.currentAnim.key !== 'right')
				this.play('right');
			this.x += 5*dt/60;
		}
		
		// Mientras pulsemos la tecla 'W' movemos el personaje en la Y
		if(this.wKey.isDown){
			if(this.anims.currentAnim.key !== 'back')
				this.play('back');
			this.y -= 5*dt/60;
		}

		// Mientras pulsemos la tecla 'S' movemos el personaje en la Y
		if(this.sKey.isDown){
			if(this.anims.currentAnim.key !== 'front')
				this.play('front');
			this.y += 5*dt/60;
		}
	}
}
