export default class CabezaPesanta extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'cabezaPesanta');
		this.setScale(0.2);

		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de cabeza de pesanta
		this.scene.anims.create({
			key: 'front',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:1, end:4}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'back',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:6, end:9}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'right',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:11, end:14}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:16, end:19}),
			frameRate: 5,
			repeat: -1
		});
		///
		this.scene.anims.create({
			key: 'standFront',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:0, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standBack',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:5, end:6}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standRight',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:10, end:11}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standLeft',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:15, end:16}),
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

		else if(this.aKey.isUp && this.anims.currentAnim.key === 'left') {
			this.play('standLeft');
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		else if(this.dKey.isDown){
			if(this.anims.currentAnim.key !== 'right')
				this.play('right');
			this.x += 5*dt/60;
		}

		else if(this.dKey.isUp && this.anims.currentAnim.key === 'right') {
			this.play('standRight');
		}
		
		// Mientras pulsemos la tecla 'W' movemos el personaje en la Y
		else if(this.wKey.isDown){
			if(this.anims.currentAnim.key !== 'back')
				this.play('back');
			this.y -= 5*dt/60;
		}

		else if(this.wKey.isUp && this.anims.currentAnim.key === 'back') {
			this.play('standBack');
		}

		// Mientras pulsemos la tecla 'S' movemos el personaje en la Y
		else if(this.sKey.isDown){
			if(this.anims.currentAnim.key !== 'front')
				this.play('front');
			this.y += 5*dt/60;
		}

		else if(this.sKey.isUp && this.anims.currentAnim.key === 'front') {
			this.play('standFront');
		}
	}
}