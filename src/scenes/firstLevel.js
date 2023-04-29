import Battery from "../objects/battery.js";
import Armario from "../objects/armario.js";
import Bed from "../objects/bed.js";
import Puertas from "../objects/puertas.js"
import level from "./level.js";

/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class FirstLevel extends level {
	
	constructor() {
		super('firstLevel');
	}
	
	preload(){
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

        super.create();


		const t_caja = this.map.addTilesetImage('cajas');
		this.cajasLayer = this.map.createLayer('Cajas/CajasNivel1',t_caja);
		this.cajasLayer.setDepth(1.8);
		this.cajasColisiones = this.map.createLayer('Cajas/colisionesCajasNivel1',this.t_muro);
		console.log(this.t_muro);
		this.cajasColisiones.setDepth(1.8);
		this.cajasColisiones.setCollision(1280);
		console.log(this);


		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('ObjetosNivel1', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('ObjetosNivel1', {name: "armario", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('ObjetosNivel1', {name: "cama", classType: Bed, key: 'bed'});
		this.puertaMarron = new Puertas(this, 661, 1714, "marron", true, "Prueba Puerta", false);
		this.puertaMarron.setDepth(1.8);
        this.puertaAzul= new Puertas(this, 1739, 1714, "azul", true, "Prueba Puerta", false);
        this.puertaAzul.setDepth(1.8);
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cojePila, null, this.player);
		this.physics.add.collider(this.puertaMarron, this.player, this.player.abrirPuerta, null, this.player);
        this.physics.add.collider(this.puertaAzul, this.player, this.player.abrirPuerta, null, this.player);

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
