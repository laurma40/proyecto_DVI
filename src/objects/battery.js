import LifeBar from "./lifeBar.js";

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
		this.scene.physics.add.existing(this);

		//(guardo la carga total por si se quiere haer una barra o algo)
		
		if(cargaInicial == null) this.carga = 600; //pongo una carga por defecto
		else this.carga = cargaInicial;

		//var cargaTotl = cargaInicial; //(guardo la carga total por si se quiere haer una barra o algo)

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
		this.scene.anims.create({
			key: 'dos',
			frames: scene.anims.generateFrameNumbers('battery', {start:2, end:2}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'tres',
			frames: scene.anims.generateFrameNumbers('battery', {start:3, end:3}),
			frameRate: 1,
			repeat: 0
		});


		this.progressBar = new LifeBar(this.scene, this.x - 15, this.y + 20,  this.carga, 20, 3);
		this.progressBar.visible = false;

		this.play('on');

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
		
		if(this.carga <= 0){ //si la carga baja de 0 se gasta
			this.play('off');
			this.setScale(0.04,0.04);
			this.depth = 0; 
			this.progressBar.visible = false;
		}
		else{
			this.progressBar.visible = true;
			this.progressBar.updateBar(this.carga, this.x - 10 , this.y + 15);
		}
		
		

		
		console.log(this.carga);
	}

	updateBar(){

		this.progressBar.updateBar(this.carga, this.x - 10 , this.y + 15);
	}

}

