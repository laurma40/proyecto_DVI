/**
 * Escena principal de juego.
 * @extends Phaser.Scenes
 */
export default class loadingScreen extends Phaser.Scene {
	
	constructor() {
		super({ key: 'loadingScreen' });
	}
	
	preload(){
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        var width = this.sys.game.canvas.width;
        var height = this.sys.game.canvas.height;

        progressBox.fillStyle(0x222222, 0.5);
        progressBox.fillRect(width/2-150, 200, 300, 25);
        
        var silkscreen_font = new FontFace('Silkscreen_Regular', 'url(fonts/silkscreen-regular-webfont.woff2)');

        var loadingText = this.make.text({
            x: width / 2 - 40,
            y: height / 2 - 20,
            text: 'Cargando...',
            style: { fontFamily: 'silkscreenregular', fontSize: '12px' }
        });
        
        var percentText = this.make.text({
            x: width / 2 - 18,
            y: height / 2 + 2,
            style: { fontFamily: 'silkscreenregular', fontSize: '16px' }
        });
        
        var assetText = this.make.text({
            x: width / 2 - 148,
            y: height / 2 + 25,
            style: { fontFamily: 'silkscreenregular', fontSize: '6px' }
        });
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width/2-145, 205, 290 * value, 15);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Cargando asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image('fondo-present', 'assets/fondo-present.png');
        this.load.image('logo', 'assets/logo-studio2.png');
        this.load.image('start', 'assets/start3.png');
		this.load.image('start2', 'assets/start4.png');
        this.load.image('inicio', 'assets/casaInicio_v2.jpeg');
		this.load.image('over', 'assets/gameOver2.png');
		this.load.image('retry', 'assets/retry12.png');
		this.load.image('retry2', 'assets/retry22.png');
        this.load.image('complete', 'assets/complete.png');
        this.load.image('home1', 'assets/home1.png');
        this.load.image('home2', 'assets/home2.png');
        this.load.image('next1', 'assets/next1.png');
        this.load.image('next2', 'assets/next2.png');
        this.load.image('tv', 'assets/fondoGameOver.jpeg');

		this.load.image('soundon', 'assets/sound_on.png');
		this.load.image('soundoff', 'assets/sound_off.png');

		this.load.audio('titlesong', ['assets/audio/titlesong.mp3', 'assets/audio/titlesong.ogg']);
		this.load.audio('rain', 'assets/audio/zapsplat_nature_thunder_distant_or_high_above_very_light_rain_001_45552.mp3');
        this.load.audio('sonlinterna', 'assets/audio/zapsplat_household_torch_flashlight_maglite_switch_on_or_off_001.mp3');
        this.load.audio('sonCoger', 'assets/audio/zapsplat_foley_money_bank_note_polymer_grab_snatch_hand_002_76013.mp3');
        this.load.audio('sonGameOver', 'assets/audio/tradio_interference.mp3');
        this.load.audio('sonGrito', 'assets/audio/human-18-month-toddler-boy-scream-001.mp3');
        this.load.audio('sonGameOver', 'assets/audio/tradio_interference.mp3');
        this.load.audio('sonWin', 'assets/audio/win.mp3');
        this.load.audio('sonPuerta', 'assets/audio/zapsplat_household_door_wooden_old_slightly_rotten_close_004_97951.mp3');
        this.load.audio('sonPesanta', 'assets/audio/zapsplat_horror_monster_ogre_single_weak_snarl_97943.mp3');


        this.load.image('cursorCustom', 'assets/vertopal.com_cursorHover.png');
        this.load.image('controllers', 'assets/controles.png');

        this.load.bitmapFont('fuente', 'assets/fuentes/ComicSansMs.png','assets/fuentes/ComicSansMs.xml');

		this.load.spritesheet('cabezaPesanta', 'assets/pesanta-580-500.png', {frameWidth: 580, frameHeight: 500});
		this.load.spritesheet('filemon', 'assets/filemon-250-400.png', {frameWidth: 250, frameHeight: 400});
		this.load.spritesheet('battery', 'assets/SpriteSheet_Batery3.png',{frameWidth: 280, frameHeight: 370});
		this.load.spritesheet('luz', 'assets/luz.png',{frameWidth: 100, frameHeight: 100});
		this.load.spritesheet('bed', 'assets/cama_530_330.png', {frameWidth: 530, frameHeight: 330});
		//this.load.spritesheet('llave', 'assets/llaves_de_colores.png', {frameWidth: 48, frameHeight: 40});
        this.load.spritesheet('llave', 'assets/llaves_de_colores.png', {frameWidth: 30, frameHeight: 20});
		this.load.spritesheet('armario', 'assets/armario-125-125.png', {frameWidth: 125, frameHeight: 125});
        this.load.spritesheet('puertas', 'assets/puertasSprite.png', {frameWidth: 100, frameHeight: 100});
		//Cargamos el archivo JSON necesario para importar el Tilemap
		this.load.tilemapTiledJSON('tilemap','assets/Tilemap/MapaPiso1Definitivo.json');

		//Cargamos los tilesets necesarios para poder crear el mapa
		this.load.image('nuevosMuros','assets/Tilemap/nuevosMuros.jpeg');
		//this.load.image('puertas','../../assets/Tilemap/puertas.png');
		this.load.image('mapaImg','assets/Tilemap/mapaCapa.png');

        this.load.image('noPausado', 'assets/pausa.png');
        this.load.image('pausado', 'assets/reanuda.png');

        this.load.image('caja', 'assets/Tilemap/cajas.jpg');

	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

        this.sonido();

        this.rain = this.sound.add('rain',true);
        this.rain.play();

        this.skip();

        var image = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2, 'logo');
        image.setAlpha(0); // establece la transparencia a 0 al inicio
        image.setScale(0.5);

        var text = this.add.text(400, 300, 'Presenta', { fontFamily: 'silkscreenregular', fontSize: '32px', fill: '#ffffff' });
        text.setOrigin(0.5);
        text.setVisible(false); // establece la visibilidad en false
        text.setDepth(1); // asegura que el texto aparezca sobre la imagen

        var imagePresent = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2, 'fondo-present');
        imagePresent.setOrigin(0.5);
        imagePresent.setScale(0.1);
        imagePresent.setVisible(false); // establece la visibilidad en false
        imagePresent.setDepth(1);

        var imgTweens = this.tweens.add({
            targets: image,
            alpha: 1,
            duration: 2000, // duración de la animación en milisegundos
            ease: 'Linear', // tipo de interpolación de la animación
            yoyo: true, // hace que la animación se reproduzca en sentido inverso
            onComplete: function () {
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
                            var presentTweens = this.tweens.add({
                                targets: imagePresent,
                                alpha: {
                                    from: 0,
                                    to: 1
                                },
                                duration: 4000, // duración de la animación en milisegundos
                                ease: 'Linear', // tipo de interpolación de la animación
                                yoyo: true, // hace que la animación se reproduzca en sentido inverso
                                onComplete: function () {
                                    setTimeout(function () {
                                        this.rain.stop();
                                        this.scene.start('title');
                                    }.bind(this), 1000); // espera 1 segundo antes de cambiar de escena
                                },
                                onCompleteScope: this // asegura que la segunda animación se agregue al objeto correcto
                            });
                            imagePresent.setVisible(true); // cambia la visibilidad del texto a true
                        }.bind(this), 1000); // espera 1 segundo antes de cambiar de escena
                    },
                    onCompleteScope: this // asegura que la segunda animación se agregue al objeto correcto
                });
                text.setVisible(true); // cambia la visibilidad del texto a true
            },
            onCompleteScope: this // asegura que la segunda animación se agregue al objeto correcto

        });
	}

    
	skip() {

		this.input.keyboard.on('keydown-B', function (event) {

            this.rain.stop();
            this.scene.start('title');

		}.bind(this));

	}

    sonido(){

		this.input.keyboard.on('keydown-M', function (event) {
			console.log('La tecla M ha sido presionada');
			if (!this.sound.mute) {
				this.sound.setMute(true);

			  } else {
				this.sound.setMute(false);
			}
		}.bind(this));
	
	}
}
