
export default class Luz extends Phaser.GameObjects.Sprite {
	/**
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


		this.setAlpha(0.75);
        this.depth = 2;

		this.displayWidth = this.scene.cameras.main.width + 10;
		this.displayHeight = this.scene.cameras.main.height + 10;
		this.play('offLuz');

	}

	/**

	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {

		this.x = this.scene.cameras.main.scrollX + 302; 
		this.y = this.scene.cameras.main.scrollY + 200;
		
	}
}