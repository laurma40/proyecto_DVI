
export default class Bed extends Phaser.GameObjects.Sprite {
	/**
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y) { 
		super(scene, x, y, 'bed'); 
		this.setScale(0.17,0.17);
		this.scene.add.existing(this); 
		this.scene.physics.add.existing(this);

        console.log("CAMAMAMMAMMAMAMAMAMMA")
		//		this.load.spritesheet('bed', 'assets/cama_530_330.png', {frameWidth: 530, frameHeight: 330})



		this.scene.anims.create({
			key: 'sinFilemon',
			frames: scene.anims.generateFrameNumbers('bed', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'conFilemon',
			frames: scene.anims.generateFrameNumbers('bed', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});


		this.play('sinFilemon');

	}

	/**
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
	
	}

    

}