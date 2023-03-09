
export default class Batery extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'batery'); // todo menos la escena son opcionales
		this.setScale(0.07,0.07);
		this.scene.add.existing(this); //Añadimos la caja a la escena
		
		// Creamos las animaciones de nuestra caja
		this.scene.anims.create({
			key: 'on',
			frames: scene.anims.generateFrameNumbers('batery', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'off',
			frames: scene.anims.generateFrameNumbers('batery', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});

		// Si la animación de ataque se completa pasamos a ejecutar la animación 'idle'
		/*this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'hit'){
				new Box(scene, Phaser.Math.Between(50, scene.sys.game.canvas.width-100),20, colliderGroup);
				this.setActive(false).setVisible(false);
				this.toDestroy = true;
			}
		})*/

		this.play('on');

		// Agregamos la caja a las físicas para que Phaser lo tenga en cuenta
		//scene.physics.add.existing(this);

		// Decimos que la caja colisiona con los límites del mundo
	//this.body.setCollideWorldBounds();

		//colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		/*
		super.preUpdate(t, dt);
		if(this.body.velocity.x > 5){
			this.body.velocity.x -= 5;
		} else if(this.body.velocity.x < -5){
			this.body.velocity.x += 5;
		}

		if(this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0){
			 this.body.velocity.x = 0;
		}*/



	}

}