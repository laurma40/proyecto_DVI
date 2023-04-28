export default class Puertas extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

    constructor(scene, x, y, color, frontal, mensajePuerta, bloqueadaInicio) { 
		super(scene, x, y, 'puertas'); // todo menos la escena son opcionales
		this.setScale(0.8,0.8);
		this.scene.add.existing(this); //Añadimos el armario a la escena
		this.scene.physics.add.existing(this);
		this.body.immovable = true;

		if(bloqueadaInicio == null) this.bloqueada = true;
		else this.bloqueada = bloqueadaInicio;

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
		if(mensajePuerta == null) this.texto = "Que raro, la puerta está cerrada. ¿Dónde estará la llave?";
		else this.texto = mensajePuerta;
		this.textoEscribiendose = false;
		this.retroText = this.scene.add.bitmapText(100,100,'fuente','', 16);
		this.retroText.setTint(0xffffff);
		this.retroText.setDepth(4);


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
		if (this.retroText) {
			this.retroText.x = this.scene.cameras.main.scrollX + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
			this.retroText.y = this.scene.cameras.main.scrollY + 10; // posicionar el texto en la esquina superior izquierda, dejando 10 píxeles de margen
		}

	}

	escribirTexto() {
		if (!this.textoEscribiendose) {
			this.textoEscribiendose = true;
			if (this.retroText) {
				var aux = '';  
				for (var i = 0; i < this.texto.length; i++) {
					setTimeout((index) => {
						aux = aux + this.texto[index]; 
						this.retroText.setText(aux);
						if (index === this.texto.length - 1) {
							this.textoEscribiendose = false;
						}
					}, i * 100, i);
				}
			}
		}
	} 
}
