


export default class Inventory extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
  }
    

  addGameObject(gameObject) {
    this.add(gameObject);
  }
  
  removeGameObject(gameObject) {
    this.remove(gameObject);
  }

  print(){
   /* var aux = this.y;
    this.each(function(objeto) {
      
      objeto.x = this.x;
      objeto.y = this.aux;
      objeto.visible = true; 
    
      aux = aux + 20; 
    
    });*/
  }

  

}