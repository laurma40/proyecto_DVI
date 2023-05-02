import LifeBar from "./lifeBar.js";

export default class Battery extends Phaser.GameObjects.Sprite {
	/**
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y, cargaInicial) { //paso la carga por el constructor para poder cambiarla depende del nivel
		super(scene, x, y, 'battery'); 
		this.setScale(0.04,0.04);
		this.scene.add.existing(this); //Añadimos la pila a la escena
		this.scene.physics.add.existing(this);

		
		if(cargaInicial == null) this.carga = 500; //pongo una carga por defecto
		else this.carga = cargaInicial;


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
		
		//console.log(this.carga);
	}

	updateBar(){

		this.progressBar.updateBar(this.carga, this.x - 10 , this.y + 15);
	}

}

