


export default class Inventory extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
  }
    

  addGameObject(gameObject) {
    if(this.length > 3){
      this.add(gameObject);
    }
   
  }
  
  removeGameObject(gameObject) {
    this.remove(gameObject);
  }

  print(){
    var aux = this.y;
    this.each(function(objeto) {
      
      console.log("inventario lleno");
      objeto.x = this.x;
      objeto.y = this.aux;
      objeto.setScale(0.08,0.08)
      objeto.visible = true; 
    
      aux = aux + 20; 
    
    });
  }

  

}