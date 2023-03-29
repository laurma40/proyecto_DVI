


export default class Inventory extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    
    // Crear un Graphics para dibujar los elementos del inventario
    this.graphics = new Phaser.GameObjects.Graphics(this.scene);
    this.scene.add.graphics();
    this.add(this.graphics);

    scene.add.existing(this.graphics);

    this.graphics.fillStyle(0x222222, 0.8);
		this.graphics.fillRect(x, y, 100, 10);
    

    //this.scene.add.graphics(this.graphics);
    
    // Establecer el tamaño y la apariencia del inventario
    /*
    this.width = 200;
    this.height = 100;
    this.graphics.fillStyle(0x000000, 0.8);
    this.graphics.fillRect(x, y, this.width, this.height);
    
    // Ocultar el inventario por defecto
    //this.visible = false;
    
    // Inicializar el índice del objeto seleccionado a -1 (ninguno seleccionado)
    this.objetoSeleccionado = -1;
    
    // Agregar los huecos vacíos al inventario
    for (let i = 0; i < 6; i++) {
      const fila = Math.floor(i / 4);
      const columna = i % 4;
      const x = columna * 40 + 10;
      const y = fila * 40 + 10;
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.strokeRect(x, y, 30, 30);
    }*/
  }
  /*
  
  agregarObjeto(objeto) {
    // Agregar el objeto a la lista de elementos del inventario
    this.add(objeto);
    
    // Calcular la posición del objeto dentro del inventario
    const indice = this.list.length - 1;
    const fila = Math.floor(indice / 4);
    const columna = indice % 4;
    const x = columna * 40 + 10;
    const y = fila * 40 + 10;
    
    // Dibujar el objeto en el Graphics del inventario
    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRect(x, y, 30, 30);
  }
  
  seleccionarSiguiente() {
    // Desseleccionar el objeto actual (si hay alguno seleccionado)
    if (this.objetoSeleccionado >= 0 && this.objetoSeleccionado < this.list.length) {
      this.getChildAt(this.objetoSeleccionado).setScale(1);
      this.objetoSeleccionado = -1;
    }
    
    // Seleccionar el siguiente objeto (circularmente)
    if (this.list.length > 0) {
      this.objetoSeleccionado++;
      if (this.objetoSeleccionado >= this.list.length) {
        this.objetoSeleccionado = 0;
      }
      this.getChildAt(this.objetoSeleccionado).setScale(1.2);
    }
  }
  
  soltarObjeto() {
    // Soltar el objeto seleccionado (si hay alguno seleccionado)
    if (this.objetoSeleccionado >= 0 && this.objetoSeleccionado < this.list.length) {
      const objeto = this.getChildAt(this.objetoSeleccionado);
      this.remove(objeto, false);
      objeto.setScale(1);
      objeto.x = this.scene.input.activePointer.x;
      objeto.y = this.scene.input.activePointer.y;
      this.scene.add.existing(objeto);
    }
  }
  
  mostrar() {
    this.visible = true;
    this.scene.input.keyboard.on("keydown-R", this.seleccionarSiguiente, this);
    this.scene.input.keyboard.on("keydown-E", this.soltarObjeto, this);
  }
  
  ocultar() {
    this.visible = false;
    this.scene.input.keyboard.off("keydown-R", this.seleccionarSiguiente, this);
    this.scene.input.keyboard.off("keydown-E", this.soltarObjeto, this);
  }*/
}
  