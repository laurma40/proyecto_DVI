


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
  }

  print(xFilemon, yFilemon){
    
    
   

    /*
    for(var i = 0; i<this.length; i++){
      console.log(this[i]);
      this[0].x = this.x;
      //objeto.y = this.aux;
      //objeto.setScale(0.08,0.08)
      //objeto.visible = true; 
    
      aux = aux + 20;
    }*/

    /*
    var elementos = this.list;
    elementos.forEach(function(elemento) {
      elemento.x = this.x;
    });*/

    var aux = yFilemon;

    this.iterate(function(elemento) {
     
      elemento.x = xFilemon;
      elemento.y = aux;
      elemento.setScale(2,2)
      elemento.visible = true;
 
      
     // console.log(elemento.x);
     // console.log(elemento.y);

      aux = aux + 30;
      
    }, this);

  }

  

}