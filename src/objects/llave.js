export default class Llave extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y, color) { //paso el color por el constructor
		super(scene, x, y, 'llave'); 
		this.setScale(1,1);
		this.scene.add.existing(this); //Añadimos la llave a la escena
		this.scene.physics.add.existing(this);

		//guardo el color de la llave
		this.color = color;


		this.scene.anims.create({
			key: 'gris',
			frames: scene.anims.generateFrameNumbers('llave', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'marron',
			frames: scene.anims.generateFrameNumbers('llave', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'rojo',
			frames: scene.anims.generateFrameNumbers('llave', {start:2, end:2}),
			frameRate: 1,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'azul',
			frames: scene.anims.generateFrameNumbers('llave', {start:3, end:3}),
			frameRate: 1,
			repeat: 0
		});


		switch(color){
            case 'azul':
                this.play('azul');
                break;
            case 'gris':
                this.play('gris');
                break;
            case 'marron':
                this.play('marron');
                break;
            case 'rojo':
                this.play('rojo');
                break;
        }

	}

	getColorLlave(){
		return this.color;
	}

	/**
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		
	}


}