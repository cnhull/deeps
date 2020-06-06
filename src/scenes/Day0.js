class Day0 extends Phaser.Scene {
    constructor() {
        super("day0");
    }

    preload() {
        // Preloading Images For Day
        this.load.image('weaver', './assets/Weaver.png'); // Toby Weaver UI Screen
        this.load.image('roy', './assets/Roy.png'); // Geneva Roy UI Screen
        this.load.image('UI', './assets/BlankUI.png'); // Blank UI Screen
        this.load.audio('sfx_select', './assets/blip_select12.wav'); // Text Chamge Sound Effect
        this.load.image('arrow', './assets/arrow.png');
    }



    create() {
        
        // Text Configuration For Talking 
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            //backgroundColor: '#000000',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        // Text Configuration For Advancement Text
        let nextConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            //backgroundColor: '#000000',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        // Button Configuration
        let buttonConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 325
        }
        
        // Loading Needed Key Functions
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Dayfield Is The Main Background of the Scene, Usually One of the Three UI(Weaver, Roy, Blank)
        if(this.game.day_count == 1){
            this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'weaver').setOrigin(0, 0);
        }else{
            this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'roy').setOrigin(0, 0);
        }

        this.meter = new Arrow(this, 15, 228, 'arrow', 0, 30).setOrigin(0,0);

        // Controls Fadeout/Fadein of the Images
        this.cameras.main.once('camerafadeincomplete', function (camera) {
            //camera.fadeOut(2000);
        });
        this.cameras.main.fadeIn(2500);

        // Day 0 Intro(Weaver)
        this.intro1 = this.add.text(120, 260, '*BZZZ BZZZ BZZZ BZZZ* \nSomeone is calling you!', textConfig);
        
        // Advancement Text
        this.chatAdv = this.add.text(180, 340, 'Press -Space- to Continue!', textConfig);

        // chatText Keeps Track of Where in the Day's Dialog/Sequence you are
        var chatText;
        this.chatText = -2;
        
    }


    update() {
        this.meter.y = 228 + ((this.game.relation) * -7);
        if(this.meter.y < 118){
            this.meter.y = 118;
        }
        else if(this.meter.y > 338){
            this.meter.y = 338;
        }
        
        // Restart Game(Used For Testing)
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene"); 
        }

        // Space Advances the Dialog For Now
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.game.day_count == 1){
                // Text 1
                if(this.chatText == -2){
                
                  this.chatText += 1;
                  this.sound.play('sfx_select');
                   this.intro1.setText('The caller ID reads T. WEAVER. Tobias Weaver, \nhead researcher of your department at the \nagency. Roy calls him unfocused...');
                }
                // Text 2
                else if(this.chatText == -1){
                    
                    this.chatText += 1;
                    this.sound.play('sfx_select');
                    this.intro1.setText('Weaver: Hello, Dr. Ingram! I hope you are \nwell. Hopefully you have recieved the new \ndrones that the agency has sent to assist \nyou with your research.');
                }
                // Text 3
                else if(this.chatText == 0){
                    
                    this.chatText += 1;
                    this.sound.play('sfx_select');
                    this.intro1.setText('Weaver: We have sent you 10 drones, but, \nunfortunately, sent only 5 chargers for \nthem. This means you can use 5 drones \nper day while you analyze any data past \nretrieved by the other units.');
                }
                // Text 4
                else if(this.chatText == 1){
                    
                    this.chatText += 1;
                    this.sound.play('sfx_select');
                    this.intro1.setText('Weaver: Remember to report all useful data \npertaining to your research to the agency. \nGeneva will want results fast and won\'t \nbe fond of any off  course data entries!');
                }
                // Text 5
                else if(this.chatText == 2){
                    this.chatText += 1;
                    this.sound.play('sfx_select');
                    this.intro1.setText('Weaver: But Ingram... if you do, by chance, \nfind anything unique down there, make sure \nto let me know. What Geneva Roy doesn\'t \nknow won\'t hurt her! ');
                }
                // Text 6
                else if(this.chatText == 3){
                    this.chatText += 1;
                    this.sound.play('sfx_select');
                    this.intro1.setText('Good Luck, Doctor Ingram!');
                } 
                // Fadeout and Load into the next day
                else if(this.chatText == 4){
                    
                    this.cameras.main.fadeOut(2000);
                    
                    
                    this.scene.start("dayScene");
                                        
                } 
            }
        }
    }
}