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

        super.create();

		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('ObjetosNivel1', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('ObjetosNivel1', {name: "armario", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('ObjetosNivel1', {name: "cama", classType: Bed, key: 'bed'});
		this.puertaMarron = new Puertas(this, 661, 1714, "marron", true, "Prueba Puerta", false);
		this.puertaMarron.setDepth(1.8);
        this.puertaAzul= new Puertas(this, 1739, 1714, "azul", true, "Que raro, la puerta está cerrada. ¿Dónde estará la llave?", true);
        this.puertaAzul.setDepth(1.8);
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cojePila, null, this.player);
		this.physics.add.collider(this.puertaMarron, this.player, this.player.abrirPuerta, null, this.player);
        this.physics.add.collider(this.puertaAzul, this.player, this.player.abrirPuerta, null, this.player);



        //Llave nivel 2 --> 510, 1537
        this.llaveAzul = new Llave(this, 510, 1537,'azul');
        this.physics.add.overlap(this.llaveAzul, this.player, this.player.cojeObjeto, null, this.player);



        let path = this.add.path(1037,1790)
			.lineTo(1037,1957)
			.lineTo(1372,1957)
            .lineTo(1372,1790);

		this.cabezaPesanta = new CabezaPesanta(this, 1037,1785,path);
		this.physics.add.overlap(this.cabezaPesanta, this.player, this.player.cercaPesanta, null, this.player);


	}
	update() {
        super.update();

    }
    entradaHabitacion(){
		if(this.player.wKey.isDown || this.player.aKey.isDown){
			this.muroInteriorLayer.setVisible(false);
			this.puertaMarron.setVisible(false);
			this.puertaAzul.setVisible(false);
		}else if(this.player.sKey.isDown || this.player.dKey.isDown){
			this.muroInteriorLayer.setVisible(true);
			this.puertaMarron.setVisible(true);
			this.puertaAzul.setVisible(true);
		}
	};
   

}