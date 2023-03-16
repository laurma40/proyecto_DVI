
export default class Luz extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y) { 
		super(scene, x, y, 'luz'); 
        this.scene.add.existing(this);


		this.scene.anims.create({
			key: 'offLuz',
			frames: scene.anims.generateFrameNumbers('luz', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'onLuz',
			frames: scene.anims.generateFrameNumbers('luz', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});


        console.log('LUZZZZZZZZZZZZZZZZZZZZZZzz');

		this.setAlpha(0.6);
        
		this.displayWidth = this.scene.cameras.main.width;
		this.displayHeight = this.scene.cameras.main.height;
		this.play('offLuz');



	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
	

	}
}