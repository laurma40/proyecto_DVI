export default class CabezaPesanta extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, path) {
		super(scene, x, y, 'cabezaPesanta');
		this.setScale(0.1);
		this.path = path;
		this.t = 0;
		this.speed = 100;
		//this.easing = null;
		this.x = x;
		this.y = y;
		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de cabeza de pesanta
		this.scene.anims.create({
			key: 'frontP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:1, end:4}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'backP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:6, end:9}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'rightP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:11, end:14}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:16, end:19}),
			frameRate: 5,
			repeat: -1
		});
		///
		this.scene.anims.create({
			key: 'standFrontP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:0, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standBackP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:5, end:6}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standRightP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:10, end:11}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'standLeftP',
			frames: scene.anims.generateFrameNumbers('cabezaPesanta', {start:15, end:16}),
			frameRate: 5,
			repeat: -1
		});

		this.play('frontP');
	}
	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);	

		if (this.path) {
			this.t += dt*0.001*this.speed;
			this.t = Phaser.Math.Clamp(this.t, 0, 1);

			console.log("coords");

			var position = this.path.getPoint(this.t);
			console.log(position);
			// Check if sprite's position has incremented or decremented since the last update
			if (position.x > this.x) {
			  	this.anims.play('rightP');
				//this.body.setVelocityX(this.speed*dt/60);
			} 
			else if (position.x < this.x) {
			  	this.anims.play('leftP');
				//this.body.setVelocityX(-this.speed*dt/60);
			} 
			else if (position.y > this.y){
				this.anims.play('frontP');
				//this.body.setVelocityY(-this.speed*dt/60);	
			}
			else if (position.y < this.y){
				this.anims.play('backP');
				//this.body.setVelocityY(this.speed*dt/60);	
			}
			else {
				if (this.anims.currentAnim.key === 'rightP')
					this.anims.play('standRightP');
				else if (this.anims.currentAnim.key === 'leftP')
					this.anims.play('standLeftP');
				else if (this.anims.currentAnim.key === 'frontP')
					this.anims.play('standFrontP');
				else if (this.anims.currentAnim.key === 'backP')
					this.anims.play('standBackP');
			}
			this.x = position.x;
			this.y = position.y;
	  
			this.setPosition(position.x, position.y);
			if (t === 1) {
			  this.path = null;
			}	  
		}
	}
}
