


export default class Inventory extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.depth = 5;
  }
    

  addGameObject(gameObject) {
    if(this.length <= 4){
      this.add(gameObject);
    }
  }
  
  removeGameObject(gameObject) {
    this.remove(gameObject);
    gameObject.destroy();
  }

  print(xFilemon, yFilemon){

    var aux = yFilemon;

    this.iterate(function(elemento) {
     
      elemento.x = xFilemon;
      elemento.y = aux;
      elemento.setScale(2,2)
      elemento.visible = true;

      aux = aux + 30;
      
    }, this);

  }
  getLlave(colorBuscado){
    let encontrado = false;
    this.iterate(function(elemento) {
      if(elemento.getColorLlave() == colorBuscado){
        encontrado = true;
        this.removeGameObject(elemento);
      }
    }, this);
    return encontrado;
  }

  

}