import Battery from "../objects/battery.js";
import Armario from "../objects/armario.js";
import Bed from "../objects/bed.js";
import Puertas from "../objects/puertas.js"
import level from "./level.js";
import Llave from "../objects/llave.js";
import CabezaPesanta from "../objects/cabezaPesanta.js";

/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class SecondLevel extends level {
	
	constructor() {
		super('secondLevel');
	}
	
	preload(){
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		const config = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		  };		
		this.nocheSonido = this.sound.add('nocheSonido',config);
		this.nocheSonido.volume = 0.1;
		this.nocheSonido.play();
        var text = this.add.text(100, 350, 'Noche 2', { fontFamily: 'silkscreenregular', fontSize: '24px', fill: '#ffffff' });
        text.setOrigin(0.5);
        text.setDepth(1); // asegura que el texto aparezca sobre la imagen
        var textTweens = this.tweens.add({
            targets: text,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 2000, // duración de la animación en milisegundos
            ease: 'Linear', // tipo de interpolación de la animación
            yoyo: true, // hace que la animación se reproduzca en sentido inverso
            onComplete: function () {
                setTimeout(function () {
                    this.nocheSonido.stop();
                    this.creacionMapa();//sustituir por el create de antes
                }.bind(this)); // espera 1 segundo antes de cambiar de escena
            },
            onCompleteScope: this // asegura que la segunda animación se agregue al objeto correcto
        });    

	}

	update() {
        super.update();

    }

	creacionMapa() {
		
		super.create();

		this.t_caja = this.map.addTilesetImage('cajas');
		this.cajasLayer = this.map.createLayer('Cajas/CajasNivel2',this.t_caja);
		this.cajasLayer.setDepth(1.8);
		this.cajasLayer.setVisible(true);
		this.cajasColisiones = this.map.createLayer('Cajas/colisionesCajasNivel2',this.t_caja);
		this.cajasLayer.setDepth(1.8);
		this.cajasColisiones.setVisible(false);
		this.cajasColisiones.setCollision(7809);
		this.physics.add.collider(this.player, this.cajasColisiones);

		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('ObjetosNivel2', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('Armarios', {name: "armario1", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('ObjetosNivel2', {name: "cama", classType: Bed, key: 'bed'});
		this.puertaMarron = new Puertas(this, 661, 1714, "marron", true, "Prueba Puerta", false);
		this.puertaMarron.setDepth(1.8);
        this.puertaRoja= new Puertas(this, 1739, 1714, "rojo", true, "Que raro, la puerta está cerrada. ¿Dónde estará la llave?", true);
        this.puertaRoja.setDepth(1.8);
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cogePila, null, this.player);
		this.physics.add.collider(this.puertaMarron, this.player, this.player.abrirPuerta, null, this.player);
        this.physics.add.collider(this.puertaRoja, this.player, this.player.abrirPuerta, null, this.player);


        //Llave nivel 2 --> 510, 1537
        this.llaveRoja = new Llave(this, 510, 1537,'rojo');
        this.physics.add.overlap(this.llaveRoja, this.player, this.player.cogeObjeto, null, this.player);



        let path = this.add.path(1037,1790)
			.lineTo(1037,1957)
			.lineTo(1372,1957)
            .lineTo(1372,1790);

		this.cabezaPesanta = new CabezaPesanta(this, 1037,1785,path);
		this.physics.add.overlap(this.cabezaPesanta, this.player, this.player.cercaPesanta, null, this.player);

	}

    entradaHabitacion(){
		if(this.player.wKey.isDown || this.player.aKey.isDown){
			this.muroInteriorLayer.setVisible(false);
			this.puertaMarron.setVisible(false);
			this.puertaRoja.setVisible(false);
		}else if(this.player.sKey.isDown || this.player.dKey.isDown){
			this.muroInteriorLayer.setVisible(true);
			this.puertaMarron.setVisible(true);
			this.puertaRoja.setVisible(true);
		}
	};
   
}