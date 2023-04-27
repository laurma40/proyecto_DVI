export default class Puertas extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

    constructor(scene, x, y, color, frontal) { 
		super(scene, x, y, 'puertas'); // todo menos la escena son opcionales
		this.setScale(0.8,0.8);
		this.scene.add.existing(this); //Añadimos el armario a la escena
		this.scene.physics.add.existing(this);
		this.body.immovable = true;

		this.color = color;
		this.setVisible(frontal);

        this.scene.anims.create({
			key: 'closeRed',
			frames: scene.anims.generateFrameNumbers('puertas', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'closeBlue',
			frames: scene.anims.generateFrameNumbers('puertas', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'closeBrown',
			frames: scene.anims.generateFrameNumbers('puertas', {start:2, end:2}),
			frameRate: 1,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'closeGrey',
			frames: scene.anims.generateFrameNumbers('puertas', {start:3, end:3}),
			frameRate: 1,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'openDoor',
			frames: scene.anims.generateFrameNumbers('puertas', {start:4, end:4}),
			frameRate: 1,
			repeat: 0
		});

		switch(color){
            case 'azul':
                this.play('closeBlue');
                break;
            case 'gris':
                this.play('closeGrey');
                break;
            case 'marron':
                this.play('closeBrown');
                break;
            case 'rojo':
                this.play('closeRed');
                break;
        }

    }

	getColor(){
		return this.color;
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
