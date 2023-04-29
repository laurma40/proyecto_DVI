/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class endScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'endScene' });
	}
	
	preload(){
        
	}

    
	create() {

    this.sonidoWin = this.sound.add('sonWin');
		this.sonidoWin.volume = 0.1;
		this.sonidoWin.play();
		this.sonidoWin.rate = 0.5;

    var text = this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'FIN', { fontFamily: 'silkscreenregular', fontSize: '24px', fill: '#ffffff' });
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
                this.sorpresa();//sustituir por el create de antes
            }.bind(this)); // espera 1 segundo antes de cambiar de escena
        },
        onCompleteScope: this // asegura que la segunda animación se agregue al objeto correcto
    });   
	}


  sorpresa() {
    //Pintamos un fondo
    var back = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'tv');
    back.setScale(0.75);
    back.setAlpha(0.60);

      // Añadimos la imagen a la escena
    const image = this.add.image(300, 400, 'coco');
    image.setScale(0.40);

    const config = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.chillido = this.sound.add('chillidoHorror', config);
    this.horror = this.sound.add('horrorAtmosfera', config);
    this.chillido.play();
    this.horror.play();

   // image.setTint(0xff0000);

    this.time.addEvent({
        delay: 100,
        callback: function() {
            image.setAlpha(Phaser.Math.Between(0.2, 1));
            back.setAlpha(Phaser.Math.Between(0.2, 1));
        },
        loop: true
    });

    image.setAlpha(0.5);
    back.setAlpha(0.5);

    this.time.addEvent({
      delay: 50,
      callback: function() {
          const xOffset = Phaser.Math.Between(-5, 5);
          const yOffset = Phaser.Math.Between(-5, 5);
          image.x += xOffset;
          image.y += yOffset;
          back.x += xOffset;
          back.y += yOffset;
      },
      loop: true
    });
  
    // En el método create() de la escena siguiente
    setTimeout(() => {
      this.chillido.stop();
      this.horror.stop();
      this.scene.start('gameOver');
    }, 5000); // 5000 milisegundos = 5 segundos
  }
}
