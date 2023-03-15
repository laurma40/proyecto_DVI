
export default class Battery extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y, cargaInicial) { //paso la carga por el constructor para poder cambiarla depende del nivel
		super(scene, x, y, 'battery'); // todo menos la escena son opcionales
		this.setScale(0.04,0.04);
		this.scene.add.existing(this); //Añadimos la pila a la escena
		

		//(guardo la carga total por si se quiere haer una varra o algo)
		var cargaTotl = cargaInicial;
		this.carga = cargaTotl;
		this.enUso = false; //hará falta parfa mostrar la barra de carga


		// Creamos las animaciones de nuestra caja
		this.scene.anims.create({
			key: 'on',
			frames: scene.anims.generateFrameNumbers('battery', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'off',
			frames: scene.anims.generateFrameNumbers('battery', {start:1, end:1}),
			frameRate: 1,
			repeat: 0
		});


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
	

	}


	descarga(){
		
		this.carga--; 
		
		if(this.carga >= 0){ //si la carga baja de 0 se gasta
			this.play('off');
		}
		
		console.log(this.carga);
	}


}