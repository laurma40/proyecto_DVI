class Inventory extends Phaser.GameObjects.Container {
    constructor(scene, x, y, maxSlots) {
      super(scene, x, y);
      this.maxSlots = maxSlots;
      this.slots = [];
      this.slotSize = 32;
      this.padding = 2;
  
      
      // create the inventory slots
      for (let i = 0; i < maxSlots; i++) {
        let slot = scene.add.rectangle(i * (this.slotSize + this.padding), 0, this.slotSize, this.slotSize, 0x333333);
        slot.setOrigin(0);
        slot.setInteractive();
        slot.on('pointerdown', () => this.selectSlot(i));
        this.slots.push({ item: null, slot });
        this.add(slot);
      }
  
      // add the inventory to the scene
      scene.add.existing(this);
    }
  
    addItem(item) {
      for (let i = 0; i < this.maxSlots; i++) {
        if (this.slots[i].item === null) {
          item.setPosition(this.slots[i].slot.x + this.slotSize / 2, this.slotSize / 2);
          this.slots[i].item = item;
          this.add(item);
          break;
        }
      }
    }
  
    removeItem(item) {
      for (let i = 0; i < this.maxSlots; i++) {
        if (this.slots[i].item === item) {
          this.slots[i].item = null;
          this.remove(item);
          break;
        }
      }
    }
  
    selectSlot(index) {
      console.log(`Selected slot ${index}`);
    }
  }
  