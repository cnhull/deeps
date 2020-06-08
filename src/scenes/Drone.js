class Drone extends Phaser.Scene {
    constructor() {
        super("droneScene");
    }

    preload() {
        // Load images needed for scene
        this.load.image('dronefield', './assets/Drone_Field.png');
        this.load.image('bot_sprite', './assets/Bot.png');
        this.load.image('marker_sprite', './assets/Marker.png');
        this.load.image('UI', './assets/BlankUI.png');
        this.load.image('arrow', './assets/arrow.png');
        
        this.load.video('on', './assets/screenOn.mp4');

        // Add drone interaction audio
        this.load.audio('sfx_drop', './assets/Click1.mp3');
    }

    create() {
        // Define title track
        var title_music;
        this.title_music = game.sound.add('sfx_title');

        
        
        
        
        // Enable needed keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // These variables keep track of how many drones aren't sent to each location
        var score1;       // Location 1 Counter
        var score2;       // Location 2 Counter
        var score3;       // Location 3 Counter
        var score4;       // Location 4 Counter
        var score5;       // Location 5 Counter
        this.score1 = 0;
        this.score2 = 0;
        this.score3 = 0;
        this.score4 = 0;
        this.score5 = 0;
        
        // Instructional text configs
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
        }
        // Score text configs
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:15
        }

        // Draw locational stand ins
        this.location01 = new Spot(this, 95, 115, 'marker_sprite', 0, 30).setOrigin(0,0);  // Counter 1 for Location 1
        this.location02 = new Spot(this, 190, 215, 'marker_sprite', 0, 30).setOrigin(0,0); // Counter 2 for Location 2
        this.location03 = new Spot(this, 260, 95, 'marker_sprite', 0, 30).setOrigin(0,0);  // Counter 3 for Location 3
        this.location04 = new Spot(this, 355, 180, 'marker_sprite', 0, 30).setOrigin(0,0); // Counter 4 for Location 4
        this.location05 = new Spot(this, 455, 125, 'marker_sprite', 0, 30).setOrigin(0,0); // Counter 5 for Location 5

        
        // Draw map background
        this.dronefield = this.add.tileSprite(0, 0, 640, 480, 'dronefield').setOrigin(0, 0);
        this.background = this.add.tileSprite(0, 0, 640, 480, 'UI').setOrigin(0, 0);

        // Controls Fadeout/Fadein of the Images
        this.cameras.main.once('camerafadeincomplete', function (camera) {

        });
        this.cameras.main.fadeIn(2500);
        
        // Add text to screen
        this.droneTitle = this.add.text(346, 432, 'SEND', textConfig);
        this.droneTitle = this.add.text(220, 432, 'RESET', textConfig);
        //this.droneTitle = this.add.text(300, 70, 'Press -X- to send the Drones!', textConfig);
        this.meter = new Arrow(this, 15, game.settings.meterY, 'arrow', 0, 30).setOrigin(0,0);
        

        // Add counters
        this.counter01 = this.add.text(110, 145, ''+this.score1, scoreConfig);
        this.counter02 = this.add.text(210, 240,  ''+this.score2, scoreConfig);
        this.counter03 = this.add.text(270, 115,  ''+this.score3, scoreConfig);
        this.counter04 = this.add.text(365, 210,  ''+this.score4, scoreConfig);
        this.counter05 = this.add.text(460, 145,  ''+this.score5, scoreConfig);

        // Add Bots 
        this.bot01 = new Bot(this, 130, 340, 'bot_sprite', 0, 30).setOrigin(0,0);
        this.bot02 = new Bot(this, 210, 340, 'bot_sprite', 0, 30).setOrigin(0,0);
        this.bot03 = new Bot(this, 290, 340, 'bot_sprite', 0, 30).setOrigin(0,0);
        this.bot04 = new Bot(this, 370, 340, 'bot_sprite', 0, 30).setOrigin(0,0);
        this.bot05 = new Bot(this, 450, 340, 'bot_sprite', 0, 30).setOrigin(0,0);

        // Buttons for UI
        this.sendButton = new TextButton(this, 332, 430, '          \n          ', game.buttonConfig, () => {this.sendDrones()});
        this.resetButton = new TextButton(this, 203, 430, '          \n          ', game.buttonConfig, () => {this.resetDrones()});
     }


    update() {
        this.meter.y = 228 + ((this.game.relation) * -7);
        if(this.meter.y < 118){
            this.meter.y = 118;
        }
        else if(this.meter.y > 338){
            this.meter.y = 338;
        }
        this.game.settings.meterY = this.meter.y;
        
        // Checks if mouse should be dragging a drone
        // and sets the drone x/y to the mouse x/y
        if(game.input.mousePointer.isDown && this.checkCollision(this.bot01)){
            this.bot01.x = game.input.mousePointer.x-this.bot01.width/2;
            this.bot01.y = game.input.mousePointer.y-this.bot01.height/2;
        }
        else if(game.input.mousePointer.isDown && this.checkCollision(this.bot02)){
            this.bot02.x = game.input.mousePointer.x-this.bot02.width/2;
            this.bot02.y = game.input.mousePointer.y-this.bot02.height/2;
        }
        else if(game.input.mousePointer.isDown && this.checkCollision(this.bot03)){
            this.bot03.x = game.input.mousePointer.x-this.bot03.width/2;
            this.bot03.y = game.input.mousePointer.y-this.bot03.height/2;
        }
        else if(game.input.mousePointer.isDown && this.checkCollision(this.bot04)){
            this.bot04.x = game.input.mousePointer.x-this.bot04.width/2;
            this.bot04.y = game.input.mousePointer.y-this.bot04.height/2;
        }
        else if(game.input.mousePointer.isDown && this.checkCollision(this.bot05)){
            this.bot05.x = game.input.mousePointer.x-this.bot05.width/2;
            this.bot05.y = game.input.mousePointer.y-this.bot05.height/2;
        }

        // ------Check location/bot collisions-------
        /*
        The following code check if a drone is dragged and dropped on a location.
        If drone is dropped on a location, the drone is removed and the counter of 
        that location is increased by one and the global variable bot(1-5)Loc that 
        corresponds with that location is saved. This will be used in Deduction.js 
        to decide what kind of data the drone will recieve. 
        */

        // Location 1/Drone Interaction Check
        // Location1/Bot1
        if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot01, this.location01)){
            this.sound.play('sfx_drop');
            this.bot01.x = 1000;
            this.score1 = this.score1 + 1;
            this.game.bot1Loc = 1;  
            this.counter01.setText(''+this.score1);
            
        }
        // Location1/Bot2
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot02, this.location01)){
            this.sound.play('sfx_drop');
            this.bot02.x = 1000;
            this.score1 += 1;
            this.game.bot2Loc = 1; 
            this.counter01.setText(''+this.score1);
            
        }
        // Location1/Bot3
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot03, this.location01)){
            this.sound.play('sfx_drop');
            this.bot03.x = 1000;
            this.score1 += 1;
            this.game.bot3Loc = 1;  
            this.counter01.setText(''+this.score1);
        }
        // Location1/Bot4
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot04, this.location01)){
            this.sound.play('sfx_drop');
            this.bot04.x = 1000;
            this.score1 += 1; 
            this.game.bot4Loc = 1; 
            this.counter01.setText(''+this.score1);
            
        }
        // Location1/Bot5
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot05, this.location01)){
            this.sound.play('sfx_drop');
            this.bot05.x = 1000;
            this.score1 += 1;
            this.game.bot5Loc = 1;  
            this.counter01.setText(''+this.score1);
            
        }

        // Location 2 Check/Drone Interaction Check
        // Location2/Bot1
        if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot01, this.location02)){
            this.sound.play('sfx_drop');
            this.bot01.x = 1000;
            this.score2 = this.score2 + 1;
            this.game.bot1Loc = 2; 
            this.counter02.setText(''+this.score2);
        }
        // Location2/Bot2
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot02, this.location02)){
            this.sound.play('sfx_drop');
            this.bot02.x = 1000;
            this.score2 += 1; 
            this.game.bot2Loc = 2; 
            this.counter02.setText(''+this.score2);
        }
        // Location2/Bot3
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot03, this.location02)){
            this.sound.play('sfx_drop');
            this.bot03.x = 1000;
            this.score2 += 1;
            this.game.bot3Loc = 2;  
            this.counter02.setText(''+this.score2);
        }
        // Location2/Bot4
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot04, this.location02)){
            this.sound.play('sfx_drop');
            this.bot04.x = 1000;
            this.score2 += 1; 
            this.game.bot4Loc = 2; 
            this.counter02.setText(''+this.score2);
        }
        // Location2/Bot5
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot05, this.location02)){
            this.sound.play('sfx_drop');
            this.bot05.x = 1000;
            this.score2 += 1;
            this.game.bot5Loc = 2;  
            this.counter02.setText(''+this.score2);
            
        }

        // Location 3 Check/Drone Interaction Check
        // Location3/Bot1
        if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot01, this.location03)){
            this.sound.play('sfx_drop');
            this.bot01.x = 1000;
            this.score3 = this.score3 + 1; 
            this.game.bot1Loc = 3; 
            this.counter03.setText(''+this.score3);
            
        }
        // Location3/Bot2
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot02, this.location03)){
            this.sound.play('sfx_drop');
            this.bot02.x = 1000;
            this.score3 += 1; 
            this.game.bot2Loc = 3; 
            this.counter03.setText(''+this.score3);
            
        }
        // Location3/Bot3
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot03, this.location03)){
            this.sound.play('sfx_drop');
            this.bot03.x = 1000;
            this.score3 += 1; 
            this.game.bot3Loc = 3; 
            this.counter03.setText(''+this.score3);
        }
        // Location3/Bot4
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot04, this.location03)){
            this.sound.play('sfx_drop');
            this.bot04.x = 1000;
            this.score3 += 1; 
            this.game.bot4Loc = 3; 
            this.counter03.setText(''+this.score3);
            
        }
        // Location3/Bot5
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot05, this.location03)){
            this.sound.play('sfx_drop');
            this.bot05.x = 1000;
            this.score3 += 1;
            this.game.bot5Loc = 3;  
            this.counter03.setText(''+this.score3);
            
        }

        // Location 4 Check/Drone Interaction Check
        // Location4/Bot1
        if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot01, this.location04)){
            this.sound.play('sfx_drop');
            this.bot01.x = 1000;
            this.score4 = this.score4 + 1;
            this.game.bot1Loc = 4; 
            this.counter04.setText(''+this.score4);
        }
        // Location4/Bot2
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot02, this.location04)){
            this.sound.play('sfx_drop');
            this.bot02.x = 1000;
            this.score4 += 1; 
            this.game.bot2Loc = 4; 
            this.counter04.setText(''+this.score4);
        }
        // Location4/Bot3
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot03, this.location04)){
            this.sound.play('sfx_drop');
            this.bot03.x = 1000;
            this.score4 += 1; 
            this.game.bot3Loc = 4; 
            this.counter04.setText(''+this.score4);
        }
        // Location4/Bot4
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot04, this.location04)){
            this.sound.play('sfx_drop');
            this.bot04.x = 1000;
            this.score4 += 1; 
            this.game.bot4Loc = 4; 
            this.counter04.setText(''+this.score4);
        }
        // Location4/Bot5
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot05, this.location04)){
            this.sound.play('sfx_drop');
            this.bot05.x = 1000;
            this.score4 += 1;
            this.game.bot5Loc = 4;  
            this.counter04.setText(''+this.score4);
        }

        // Location 5 Check/Drone Interaction Check
        // Location5/Bot1
        if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot01, this.location05)){
            this.sound.play('sfx_drop');
            this.bot01.x = 1000;
            this.score5 = this.score5 + 1; 
            this.game.bot1Loc = 5; 
            this.counter05.setText(''+this.score5);
        }
        // Location5/Bot2
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot02, this.location05)){
            this.sound.play('sfx_drop');
            this.bot02.x = 1000;
            this.score5 += 1; 
            this.game.bot2Loc = 5; 
            this.counter05.setText(''+this.score5);
        }
        // Location5/Bot3
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot03, this.location05)){
            this.sound.play('sfx_drop');
            this.bot03.x = 1000;
            this.score5 += 1; 
            this.game.bot3Loc = 5; 
            this.counter05.setText(''+this.score5);
        }
        // Location5/Bot4
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot04, this.location05)){
            this.sound.play('sfx_drop');
            this.bot04.x = 1000;
            this.score5 += 1; 
            this.game.bot4Loc = 5; 
            this.counter05.setText(''+this.score5);
        }
        // Location5/Bot5
        else if(!(game.input.mousePointer.isDown) && this.checkCollision2(this.bot05, this.location05)){
            this.sound.play('sfx_drop');
            this.bot05.x = 1000;
            this.score5 += 1; 
            this.game.bot5Loc = 5; 
            this.counter05.setText(''+this.score5);
        }
        // Send Drones but only when all 5 are assigned
        

    }

    sendDrones(){
        if((this.score1+this.score2+this.score3+this.score4+this.score5) == 5){
            this.sound.play('sfx_drop');
            this.scene.start("analysisScene"); // Load into the deduction scene
        }
    }
     

    resetDrones(){
        this.scene.start("droneScene");
    }

    // Mouse and bot interaction check
    checkCollision(bot) {
        if (game.input.mousePointer.x < bot.x + bot.width && 
            game.input.mousePointer.x > bot.x && 
            game.input.mousePointer.y < bot.y + bot.height &&
            game.input.mousePointer.y > bot.y) {
                return true;
        } else {
            return false;
        }
    }

    // Mouse and location spot check
    checkCollision2(bot, spot) {
        // simple AABB checking
        if (bot.x < spot.x + spot.width && 
            bot.x > spot.x && 
            bot.y < spot.y + spot.height &&
            bot.y > spot.y) {
                return true;
        } else {
            return false;
        }
    }
}