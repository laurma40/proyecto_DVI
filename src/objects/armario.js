export default class Armario extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

    constructor(scene, x, y) { 
		super(scene, x, y, 'armario'); // todo menos la escena son opcionales
		this.setScale(0.1,0.1);
		this.scene.add.existing(this); //Añadimos el armario a la escena
		this.scene.physics.add.existing(this);

        this.scene.anims.create({
			key: 'open',
			frames: scene.anims.generateFrameNumbers('armario', {start:4, end:7}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'close',
			frames: scene.anims.generateFrameNumbers('armario', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'closed',
			frames: scene.anims.generateFrameNumbers('armario', {start:4, end:4}),
			frameRate: 1,
			repeat: 0
		});

        this.play('closed');
    }
    /**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
        super.preUpdate(t, dt);
	}
}
