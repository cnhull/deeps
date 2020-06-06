class Day7 extends Phaser.Scene {
    constructor() {
        super("day7");
    }

    preload() {
        this.load.image('day7', './assets/Day7.png');

    }



    create() {
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'day7').setOrigin(0, 0);
        
        var timeCheck;
        this.timeCheck = 1;
        
    }


    update() {
        this.timeCheck += 1;
        //console.log(this.timeCheck);
        if(this.timeCheck >= 250){
            this.game.day_count += 1;
            this.scene.start("dayScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            //this.test_music.stop();
            
            this.scene.start("menuScene"); 
        }

    }
}