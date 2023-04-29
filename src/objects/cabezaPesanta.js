export default class CabezaPesanta extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, path) {
		super(scene, x, y, 'cabezaPesanta');
		this.setScale(0.12);
		this.path = path;
		this.t = 0;
		//this.easing = null;
		this.x = x;
		this.y = y;
		this.scene.add.existing(this); 

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

		


		this.follower = scene.add.follower(path, x, y, this);
		this.follower.startFollow({
			duration: 10 * this.path.getLength(),
			ease: 'Linear',
			repeat: -1,
			yoyo: true
		});
		this.follower.setAlpha(0);

		this.scene.physics.add.existing(this);

		this.sonidoPesanta = scene.sound.add('sonPesanta');
		this.sonidoPesanta.volume = 0.08;
		this.playGrito = false;

		setTimeout(() => { this.playGrito = true; }, 1000);
	}
	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);	

		//console.log("Coors path: " + this.follower.x + " " + this.follower.y);
		//console.log("Coors delta path: " + this.follower.path.deltaX + " " + this.follower.path.deltaY);
		//console.log("Coors pesanta: " + this.x + " " + this.y);

		// Check if sprite's position has incremented or decremented since the last update
		if (this.follower.x > this.x) {
			this.anims.play('rightP', true);
		} 
		else if (this.follower.x < this.x) {
			this.anims.play('leftP', true);
		} 
		else if (this.follower.y > this.y){
			this.anims.play('frontP', true);
		}
		else if (this.follower.y < this.y){
			this.anims.play('backP', true);
		}
		else {
			if (this.anims.currentAnim.key === 'rightP') {
				this.anims.play('standRightP', true);
			}
			else if (this.anims.currentAnim.key === 'leftP') {
				this.anims.play('standLeftP', true);
			}
			else if (this.anims.currentAnim.key === 'frontP') {
				this.anims.play('standFrontP', true);
			}
			else if (this.anims.currentAnim.key === 'backP') {
				this.anims.play('standBackP', true);
			}
		}

		this.setPosition(this.follower.x, this.follower.y);


		if(this.playGrito){

			this.sonidoPesanta.play();

			this.playGrito = false;
			setTimeout(() => { this.playGrito = true; }, 10000);
		}

		
	}


	
}
