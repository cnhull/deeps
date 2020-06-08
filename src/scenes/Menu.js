class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_test', './assets/Test_Track.mp3');
        this.load.audio('sfx_title', './assets/Title_Track.mp3');

        // load bg image and bubbles
        this.load.image('title_screen', './assets/bubblless_title_screen.png');
        this.load.image('small_bubbles', './assets/small_bubbles.png');
        this.load.image('med_bubbles', './assets/med_bubbles.png');
        this.load.image('large_bubbles', './assets/large_bubbles.png');
    }
create() {
        // Menu Display
        this.game.day_count = 0;
        this.game.relation = 0;
        
        // place background image
        this.title = this.add.image(0, 0,'title_screen').setOrigin(0, 0);
        
        // place bubble tilesprites
        this.smallBubbles = this.add.tileSprite(0, 0, 640, 960, 'small_bubbles').setOrigin(0, 0);
        this.medBubbles = this.add.tileSprite(0, 0, 640, 960, 'med_bubbles').setOrigin(0, 0);
        this.largeBubbles = this.add.tileSprite(0, 0, 640, 960, 'large_bubbles').setOrigin(0, 0);

        // Define title music variable
        var title_music;
        this.title_music = game.sound.add('sfx_title')
        
        // Start Title Music
        //this.title_music.play();

        // set up start button
        this.startButton = new TextButton(this, 290, 350, '      \n      ', game.buttonConfig, () => this.nextScene());

        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       
        
    }

    update() {
        // scroll bubbles
        this.smallBubbles.tilePositionY += 2;
        this.medBubbles.tilePositionY += 1.5;
        this.largeBubbles.tilePositionY += 1;
    }

    nextScene() {
        this.sound.play('sfx_select', {volume: 0.1});
        
        this.cameras.main.fadeOut(2000);
                    
        this.time.delayedCall(2000,
            () => {
                this.scene.start("talkingScene");
            }, 
        [], 
        this);
    }
}