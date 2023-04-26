export default class PauseMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'pauseMenu' });
  }

  create() {
    // create a sprite

    // Create a dark background for the pause menu
    const bg = this.add.rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.5).setOrigin(0);

    // Add text for the pause menu title
    const title = this.add.text(this.sys.game.canvas.width / 2, 50, 'PAUSED', { fontFamily: 'silkscreenregular', fontSize: '64px', color: '#ffffff' }).setOrigin(0.5);

    // Add a "Resume" button to return to the game
    const resumeButton = this.add.text(this.sys.game.canvas.width / 2, 125, 'Reanudar', { fontFamily: 'silkscreenregular', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
    resumeButton.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });
    resumeButton.on('pointerdown', () => {
      this.scene.resume('firstLevel');
      this.scene.stop('pauseMenu');
    });

    // Add a "Quit" button to return to the main menu
    const quitButton = this.add.text(this.sys.game.canvas.width / 2, 175, 'Menu principal', { fontFamily: 'silkscreenregular', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
    quitButton.setInteractive({ cursor: 'url(assets/vertopal.com_cursorHover.png), pointer' });
    quitButton.on('pointerdown', () => {
      this.scene.stop('firstLevel');
      this.scene.stop('pauseMenu');
      setTimeout(function () {
        this.scene.start('title');
      }.bind(this), 300); // espera 0.3 segundos antes de cambiar de escena
    });
   
    var imagePresent = this.add.image(this.sys.game.canvas.width/2,300, 'controllers');
    imagePresent.setScale(0.45);

  }
}
  