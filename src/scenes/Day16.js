class Day16 extends Phaser.Scene {
    constructor() {
        super("day16");
    }

    preload() {
        this.load.image('day16', './assets/Day16.png');

    }



    create() {
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'day16').setOrigin(0, 0);
        
       
        
    }


    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            //this.test_music.stop();
            
            this.scene.start("menuScene"); 
        }

    }
}