export default class Puertas extends Phaser.GameObjects.Sprite {
	/**
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

    constructor(scene, x, y, color, frontal, mensajePuerta, bloqueadaInicio) { 
		super(scene, x, y, 'puertas'); 
		this.setScale(0.8,0.8);
		this.scene.add.existing(this); //Añadimos la puerta a la escena
		this.scene.physics.add.existing(this);
		this.body.immovable = true;

		if(bloqueadaInicio == null) this.bloqueada = true;
		else this.bloqueada = bloqueadaInicio;

		this.color = color;
		

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

		if(this.bloqueada){
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
		}else{
			this.play('openDoor');
			this.body.enable = false;
		}
		
		//crear fuentes
		if(mensajePuerta == null) this.texto = "Cerrada...";
		else this.texto = mensajePuerta;
		
		this.setVisible(frontal);
    }

	getColor(){
		return this.color;
	}
    /**
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
        super.preUpdate(t, dt);
	}

	
}
