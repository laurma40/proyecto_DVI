export default class PauseMenu extends Phaser.Scene {
    constructor() {
      super({ key: 'pauseMenu' });
    }
  
    create() {
      // create a sprite
  
      // Create a dark background for the pause menu
      const bg = this.add.rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.5).setOrigin(0);
  
      // Add text for the pause menu title
      const title = this.add.text(this.sys.game.canvas.width / 2, 100, 'PAUSED', { fontFamily: 'silkscreenregular', fontSize: '64px', color: '#ffffff' }).setOrigin(0.5);
  
      // Add a "Resume" button to return to the game
      const resumeButton = this.add.text(this.sys.game.canvas.width / 2, 200, 'Resume', { fontFamily: 'silkscreenregular', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
      resumeButton.setInteractive({ useHandCursor: true, cursor: 'url(assets/cursorImg/cursorHover.cur), pointer' });
      resumeButton.on('pointerdown', () => {
        this.scene.resume('firstLevel');
        this.scene.stop('pauseMenu');
      });
  
      // Add a "Quit" button to return to the main menu
      const quitButton = this.add.text(this.sys.game.canvas.width / 2, 300, 'Quit', { fontFamily: 'silkscreenregular', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
      quitButton.setInteractive({ useHandCursor: true, cursor: 'url(assets/cursorImg/cursorHover.cur), pointer' });
      quitButton.on('pointerdown', () => {
        this.scene.stop('firstLevel');
        this.scene.start('MainMenu');
        this.scene.stop('pauseMenu');
      });
    }
  }
  