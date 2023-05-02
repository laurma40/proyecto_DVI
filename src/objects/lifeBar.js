
export default class LifeBar extends Phaser.GameObjects.Graphics {
	/**
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	*/

	constructor(scene, x, y, valorInicial, largo, ancho) { 
		super(scene); 
        this.scene.add.existing(this); 
        this.scene.add.graphics();
        
        this.valorInicial = valorInicial;
		this.largo = largo;
		this.ancho = ancho;

    	this.fillStyle(0x222222, 0.8);
		this.fillRect(x, y, 100, 10);
		this.depth = 3;

	}

	/**
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
        

	}


	updateBar( valor, xNex, yNew ){
		this.clear();
		this.fillStyle(0xffffff, 1);
		this.fillRect(xNex, yNew, this.largo * ( valor /  this.valorInicial), this.ancho); // Ajusta la posición de la barra 
		
	}


}