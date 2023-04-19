
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


        console.log("BARAAAAAAAAAAAAAAAAAAAAAAAA");

    	this.fillStyle(0x222222, 0.8);
		this.fillRect(x, y, 100, 10);
		this.depth = 3;


		//this.lifeText = new Phaser.GameObjects.Text(scene, x - 70, y, valorInicial, { color: '#ffffff', fontSize: '12px' });
		//scene.add.existing(this.lifeText);
	

	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
        

	}


	updateBar( valor, xNex, yNew ){
		this.clear();
		this.fillStyle(0xffffff, 1);
		this.fillRect(xNex, yNew, this.largo * ( valor /  this.valorInicial), this.ancho); // Ajusta la posición de la barra de vida aquí

		//96
		//this.lifeText.setText(valor);
		
	}


}