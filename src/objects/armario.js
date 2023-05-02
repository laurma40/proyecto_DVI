export default class Armario extends Phaser.GameObjects.Sprite {
	/**
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

    constructor(scene, x, y) { 
		super(scene, x, y, 'armario'); 
		this.setScale(1,1);
		this.scene.add.existing(this); //Añadimos el armario a la escena
		this.scene.physics.add.existing(this);
		this.body.immovable = true;


        this.scene.anims.create({
			key: 'open',
			frames: scene.anims.generateFrameNumbers('armario', {start:0, end:14}),
			frameRate: 12,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'close',
			frames: scene.anims.generateFrameNumbers('armario', {start:14, end:0}),
			frameRate: 12,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'closed',
			frames: scene.anims.generateFrameNumbers('armario', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});

        this.play('closed');
		this.depth = 1.8;
    }
    /**
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
        super.preUpdate(t, dt);
	}
}
