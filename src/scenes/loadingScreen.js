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
        progressBox.fillStyle(0x222222, 0.5);
        progressBox.fillRect(130, 200, 320, 50);
        
        var silkscreen_font = new FontFace('Silkscreen_Regular', 'url(fonts/silkscreen-regular-webfont.woff2)');

        var width = this.sys.game.canvas.width;
        var height = this.sys.game.canvas.height;
        var loadingText = this.make.text({
            x: width / 2 - 10,
            y: height / 2 - 10,
            text: 'Loading...',
            style: {
                fontFamily: 'silkscreenregular',
                fontSize: '12px'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2 - 10,
            y: height / 2 + 25,
            text: '0%',
            style: {
                fontFamily: 'silkscreenregular',
                fontSize: '16px'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2 - 10,
            y: height / 2 + 60,
            text: '',
            style: {
                fontFamily: 'silkscreenregular',
                fontSize: '10px'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(140, 210, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        //Assets de 'title'
        this.load.image('start', 'assets/start3.png');
		this.load.image('start2', 'assets/start4.png');
        this.load.image('inicio', 'assets/casaInicio_v2.jpeg');
		this.load.image('over', 'assets/gameOver2.png');
		this.load.image('retry', 'assets/retry12.png');
		this.load.image('retry2', 'assets/retry22.png');
		this.load.image('soundon', 'assets/sound_on.png');
		this.load.image('soundoff', 'assets/sound_off.png');
		this.load.audio('titlesong', ['assets/audio/titlesong.mp3', 'assets/audio/titlesong.ogg']);
		this.load.audio('rain', 'assets/audio/zapsplat_nature_thunder_distant_or_high_above_very_light_rain_001_45552.mp3');

        //Assets de 'firstLevel'
        this.load.bitmapFont('fuente', 'assets/fuentes/ComicSansMs.png','assets/fuentes/ComicSansMs.xml');
		this.load.spritesheet('cabezaPesanta', 'assets/pesanta-580-500.png', {frameWidth: 580, frameHeight: 500});
		this.load.spritesheet('filemon', 'assets/filemon-250-400.png', {frameWidth: 250, frameHeight: 400});
		this.load.spritesheet('battery', 'assets/SpriteSheet_Batery3.png',{frameWidth: 280, frameHeight: 370});
		this.load.spritesheet('luz', 'assets/luz.png',{frameWidth: 100, frameHeight: 100});
		this.load.spritesheet('bed', 'assets/cama_530_330.png', {frameWidth: 530, frameHeight: 330});
		//this.load.spritesheet('llave', 'assets/llaves_de_colores.png', {frameWidth: 48, frameHeight: 40});
        this.load.spritesheet('llave', 'assets/llaves_de_colores.png', {frameWidth: 30, frameHeight: 20});
		this.load.spritesheet('armario', 'assets/armario-125-125.png', {frameWidth: 125, frameHeight: 125});
		//Cargamos el archivo JSON necesario para importar el Tilemap
		this.load.tilemapTiledJSON('tilemap','assets/Tilemap/MapaPiso1Definitivo.json');
		//Cargamos los tilesets necesarios para poder crear el mapa
		this.load.image('nuevosMuros','assets/Tilemap/nuevosMuros.jpeg');
		//this.load.image('puertas','../../assets/Tilemap/puertas.png');
		this.load.image('mapaImg','assets/Tilemap/mapaCapa.png');

        
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        this.scene.start('title'); //Cambiamos a la escena de juego
	}
}
