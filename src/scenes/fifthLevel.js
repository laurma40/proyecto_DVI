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
export default class FifthLevel extends level {
	
	constructor() {
		super('fifthLevel');
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
        var text = this.add.text(100, 350, 'Noche 5', { fontFamily: 'silkscreenregular', fontSize: '24px', fill: '#ffffff' });
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
		this.cajasLayer = this.map.createLayer('Cajas/CajasNivel4',this.t_caja);
		this.cajasLayer.setDepth(1.8);
		this.cajasLayer.setVisible(true);
		this.cajasColisiones = this.map.createLayer('Cajas/colisionesCajasNivel4',this.t_caja);
		this.cajasLayer.setDepth(1.8);
		this.cajasColisiones.setVisible(false);
		this.cajasColisiones.setCollision(7809);
		this.physics.add.collider(this.player, this.cajasColisiones);

		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		this.pilas = this.map.createFromObjects('ObjetosNivel5', {name: "pila",classType: Battery, key: 'battery' });
		this.armarios = this.map.createFromObjects('Armarios', {name: "armario1", classType: Armario, key: 'armario'});
		this.armarios2 = this.map.createFromObjects('Armarios', {name: "armario2", classType: Armario, key: 'armario'});
		this.bed = this.map.createFromObjects('ObjetosNivel5', {name: "cama", classType: Bed, key: 'bed'});
		this.puertaMarron = new Puertas(this, 661, 1714, "marron", true, "Ahora esta puerta tampoco se abre", true);
		this.puertaMarron.setDepth(1.8);
        this.puertaRoja= new Puertas(this, 1739, 1714, "rojo", true, "Cerrada otra vez", true);
        this.puertaRoja.setDepth(1.8);
        this.puertaAzul= new Puertas(this, 1945, 1034, "azul", false, "Esta puerta azul no se abre...", true);
        this.puertaAzul.setDepth(1.8);
		this.physics.add.overlap(this.bed, this.player, this.player.dormir, null, this.player);
        this.physics.add.overlap(this.armarios, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.armarios2, this.player, this.player.interactuarArmario, null, this.player);
		this.physics.add.overlap(this.pilas, this.player, this.player.cogePila, null, this.player);
		this.physics.add.collider(this.puertaMarron, this.player, this.player.abrirPuerta, null, this.player);
        this.physics.add.collider(this.puertaAzul, this.player, this.player.abrirPuerta, null, this.player);
        this.physics.add.collider(this.puertaRoja, this.player, this.player.abrirPuerta, null, this.player);




        //Llave nivel 5 --> 1636, 1524 && 1898, 1026 (cocina) && 1272, 433(nieve) && 2054,1569        
        this.llaveRoja = new Llave(this, 2054, 1569,'rojo');
        this.physics.add.overlap(this.llaveRoja, this.player, this.player.cogeObjeto, null, this.player);
        this.llaveAzul = new Llave(this, 1636, 1524,'azul');
        this.physics.add.overlap(this.llaveAzul, this.player, this.player.cogeObjeto, null, this.player);
        this.llaveMarron = new Llave(this, 1898, 1026,'marron');
        this.physics.add.overlap(this.llaveMarron, this.player, this.player.cogeObjeto, null, this.player);
        this.llaveMarron2 = new Llave(this, 1272, 433,'marron');
        this.physics.add.overlap(this.llaveMarron2, this.player, this.player.cogeObjeto, null, this.player);



        let path = this.add.path(1037,1790)
			.lineTo(1037,1957)
			.lineTo(1372,1957)
            .lineTo(1372,1790);

		this.cabezaPesanta = new CabezaPesanta(this, 1037,1785,path);
		this.physics.add.overlap(this.cabezaPesanta, this.player, this.player.cercaPesanta, null, this.player);

        let path2 = this.add.path(1800,1815)
            .lineTo(2100,1815)
            .lineTo(2100,1200);

        this.cabezaPesanta2 = new CabezaPesanta(this, 1800,1820,path2);
        this.physics.add.overlap(this.cabezaPesanta2, this.player, this.player.cercaPesanta, null, this.player);


        let path3 = this.add.path(2030,1300)
			.lineTo(2030,900);

		this.cabezaPesanta3 = new CabezaPesanta(this, 2030,1305,path3);
		this.physics.add.overlap(this.cabezaPesanta3, this.player, this.player.cercaPesanta, null, this.player);

        let path4 = this.add.path(280,600)
            .lineTo(400,1000);

        this.cabezaPesanta4 = new CabezaPesanta(this, 280,605,path4);
        this.physics.add.overlap(this.cabezaPesanta4, this.player, this.player.cercaPesanta, null, this.player);

        let path5 = this.add.path(280,1000)
            .lineTo(400,1500);

        this.cabezaPesanta5 = new CabezaPesanta(this, 280,1005,path5);
        this.physics.add.overlap(this.cabezaPesanta5, this.player, this.player.cercaPesanta, null, this.player);

        let path6 = this.add.path(280,1600)
            .lineTo(400,1500);

        this.cabezaPesanta6 = new CabezaPesanta(this, 280,1605,path6);
        this.physics.add.overlap(this.cabezaPesanta6, this.player, this.player.cercaPesanta, null, this.player);

        let path7 = this.add.path(1500, 1700)
            .lineTo(1850, 1700);

        this.cabezaPesanta7 = new CabezaPesanta(this, 1500, 1705,path7);
        this.physics.add.overlap(this.cabezaPesanta7, this.player, this.player.cercaPesanta, null, this.player);

         
        let path8 = this.add.path(2030,900)
            .lineTo(2030, 600)
            .lineTo(1750, 600);

        this.cabezaPesanta8 = new CabezaPesanta(this, 2030, 905, path8);
        this.physics.add.overlap(this.cabezaPesanta8, this.player, this.player.cercaPesanta, null, this.player);
    

        let path9 = this.add.path(1700, 500)
            .lineTo(2100, 500)
            .lineTo(2100, 900);

        this.cabezaPesanta9 = new CabezaPesanta(this, 1700, 505, path9);
        this.physics.add.overlap(this.cabezaPesanta9, this.player, this.player.cercaPesanta, null, this.player);

        let path10 = this.add.path(1212, 444)
            .lineTo(960, 444)
            .lineTo(960, 742);

        this.cabezaPesanta10 = new CabezaPesanta(this, 1212, 449,path10);
        this.physics.add.overlap(this.cabezaPesanta10, this.player, this.player.cercaPesanta, null, this.player);
        
        let path11 = this.add.path(960, 742)
            .lineTo(1354, 742)
            .lineTo(1354, 540);

        this.cabezaPesanta11 = new CabezaPesanta(this, 960, 745,path11);
        this.physics.add.overlap(this.cabezaPesanta11, this.player, this.player.cercaPesanta, null, this.player);
        
         

	}

    entradaHabitacion(){
		if(this.player.wKey.isDown || this.player.aKey.isDown){
			this.muroInteriorLayer.setVisible(false);
			this.puertaMarron.setVisible(false);
			this.puertaAzul.setVisible(false);
            this.puertaRoja.setVisible(false);
		}else if(this.player.sKey.isDown || this.player.dKey.isDown){
			this.muroInteriorLayer.setVisible(true);
			this.puertaMarron.setVisible(true);
			this.puertaRoja.setVisible(true);
		}
	};

}