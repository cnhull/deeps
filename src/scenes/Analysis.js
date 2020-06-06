class Analysis extends Phaser.Scene {
    constructor() {
        super("analysisScene");
    }

    preload(){
        this.load.image('UI', './assets/BlankUI.png');
        this.load.image('BookUI', './assets/blank_book.png');
        this.load.image('arrow', './assets/arrow.png');
        
         // Add drone interaction audio
         this.load.audio('sfx_page', './assets/PageFlip.mp3');
         this.load.audio('sfx_click', './assets/Click2.mp3');

    }

    create(){

        

        // Continue text configs
        let resultConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }
        // Item display text configs
        let itemConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }

        

        // Load Background/meter
        this.add.tileSprite(0, 0, 640, 480, 'BookUI').setOrigin(0, 0);
        this.add.tileSprite(0, 0, 640, 480, 'UI').setOrigin(0, 0);
        
        this.meter = new Arrow(this, 15, 228, 'arrow', 0, 30).setOrigin(0,0);

        // Item Arrays used to fill data 
        var uselessData;
        this.uselessData = ["An Old Boot", "3D Scan of a Cuddle Fish", "Broken Rocks", "Angler Fish Eye", "Thermal Scan of Rocks", "Shark Leftovers", "Audio Recording of Cuddle Fish Mating"];
        var strangeData;
        this.strangeData = ["Blurred Image of a Hand", "Crackling Audio that Sounds like Singing", "A Faded Image of a Humanoid Shape", "A Cuddle Fish"];
        var usefulData;
        this.usefulData =  ["Sample of a Prime Micro Organism", "Fossilized Mirco Plankton", "A Stromatolite", "Location of a Deep Sea Trench"];
        
        // Define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        
        // Call getData() to get data for the drones
        this.getData();
        
        // Displays text of current item being looked at 
        this.itemText = this.add.text(120, 220, ''+this.game.data1, itemConfig);
        
        // Used to progress to next scene
        this.chatAdv = this.add.text(120, 350, 'Press -Space- to Continue!', resultConfig);

        // Variable keeps track of what item is being looked at
        var count;
        this.count = 1;

        // Buttons For Display
        this.leftArrow = new TextButton(this, 100, 222, '      \n       ', game.buttonConfig, () => {this.decreasePage(),this.updatePage()});
        this.rightArrow = new TextButton(this, 495, 222, '       \n       ', game.buttonConfig, () => {this.increasePage(),this.updatePage()});
        this.saveButton = new TextButton(this, 97, 85, '                        \n                        ', game.buttonConfig, () => {this.saveThis(),this.updatePage()});
        this.discardButton = new TextButton(this, 355, 85, '                        \n                        ', game.buttonConfig, () => {this.discardThis(),this.updatePage()});

        this.doThingsRight();
       
    }

    doThingsRight(){
        console.log("tryuing to do things right");
        console.log("global day is " + game.globalDay);
        if(game.globalDay == 1){
            console.log("aaaaaaaaaaaaits 1");
            this.scene.start("talkingScene");
        }
        if(game.globalDay == 2){
            console.log("aaaaaaaaaaaits 2")
        }

    }
        

    update(){

        this.meter.y = 228 + ((this.game.relation) * -7);
        if(this.meter.y < 118){
            this.meter.y = 118;
        }
        else if(this.meter.y > 338){
            this.meter.y = 338;
        }

        // Load into conversation scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log(this.game.relation);
            this.scene.start("talkingScene");
        }
        
    }

    // Discard Data of Current Page
    discardThis(){
        if(this.count == 1){
            if(this.game.data1 != 'Submitted!'){
                this.sound.play('sfx_click');
                this.game.data1 = 'Discarded!';
                this.game.itemValue1 = 0;
            }
        }
        else if(this.count == 2){
            if(this.game.data2 != 'Submitted!'){
                this.sound.play('sfx_click');
                this.game.data2 = 'Discarded!';
                this.game.itemValue2 = 0;
            }
        }
        else if(this.count == 3){
            if(this.game.data3 != 'Submitted!'){
                this.sound.play('sfx_click');
                this.game.data3 = 'Discarded!';
                this.game.itemValue3 = 0;
            }        
        }
        else if(this.count == 4){
            if(this.game.data4 != 'Submitted!'){
                this.sound.play('sfx_click');
                this.game.data4 = 'Discarded!';
                this.game.itemValue4 = 0;
            }     
        }
        else if(this.count == 5){
            if(this.game.data5 != 'Submitted!'){
                this.sound.play('sfx_click');
                this.game.data5 = 'Discarded!';
                this.game.itemValue5 = 0;
            }     
        }

     }

    // Save Data of Current Page
    saveThis(){
        if(this.count == 1){
            if(this.game.data1 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data1 = 'Submitted!';
                this.game.relation = this.game.relation + this.game.itemValue1;
                this.game.itemValue1 = 0;
            }
        }
        else if(this.count == 2){
            if(this.game.data2 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data2 = 'Submitted!';
                this.game.relation = this.game.relation + this.game.itemValue2;
                this.game.itemValue2 = 0;
            }
        }
        else if(this.count == 3){
            if(this.game.data3 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data3 = 'Submitted!';
                this.game.relation = this.game.relation + this.game.itemValue3;
                this.game.itemValue3 = 0;
            }        
        }
        else if(this.count == 4){
            if(this.game.data4 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data4 = 'Submitted!';
                this.game.relation = this.game.relation + this.game.itemValue4;
                this.game.itemValue4 = 0;
            }     
        }
        else if(this.count == 5){
            if(this.game.data5 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data5 = 'Submitted!';
                this.game.relation = this.game.relation + this.game.itemValue5;
                this.game.itemValue5 = 0;
            }     
        }

     }

     increasePage(){
        if(this.count != 5){
            this.sound.play('sfx_page');
            this.count = this.count + 1;
        }

     }

     decreasePage(){
        if(this.count != 1){
            this.sound.play('sfx_page');
            this.count = this.count - 1;
        }

     }

    // Changes Page Displayed
    updatePage(){
        if(this.count == 1){
            
            this.itemText.setText(''+this.game.data1);
        }
        else if(this.count == 2){
            
            this.itemText.setText(''+this.game.data2);
        }
        else if(this.count == 3){
            
            this.itemText.setText(''+this.game.data3);
        }
        else if(this.count == 4){
            
            this.itemText.setText(''+this.game.data4);
        }
        else if(this.count == 5){
            
            this.itemText.setText(''+this.game.data5);
        }

     }

    /*
    The getData function is used to give random data elements to the global variables.
    This function uses the global variables that keep track of where drones are sent 
    along with what the current day in the cycle is to determine what kind of data the
    drones bring back. Based on what location the drone(s) are sent, they are given a 
    number from 1-100 that will be used to determine what kind of data is recieved from
    the location. The 1-100 range is used to replicate percentage usage, as each location
    has different rates of data production based on type. The data produced is saved in the global
    variable data(1-5) and the relation value, which is based on that type of data recieved, 
    which is saved in itemValue(1-5)

    */
    getData(){

        // Game Part 1
        if(this.game.day_count < 5 ){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 75){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() * this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 75 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 5){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 90){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 90){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 75){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 75 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 5){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -4;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 75){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 75 && this.game.bot3Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 5){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 75){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 75 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 5){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 90){
                    this.game.data4= this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 75){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 75 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 5){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 90){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 90){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
        }
        // Game Part 2
        if(this.game.day_count < 9 &&  this.game.day_count > 4){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 75){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 75 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 5){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 90){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 90){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 75){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 75 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 5){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 75){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 75 && this.game.bot3Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 5){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 75){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 75 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 5){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 90){
                    this.game.data4= this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 75){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 75 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 5){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 90){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 90){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
        }
        // Game Part 3
        if(this.game.day_count < 13 &&  this.game.day_count > 8){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 75){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 75 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 5){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 90){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 90){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 75){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 75 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 5){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 75){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 75 && this.game.bot3Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 5){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 75){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 75 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 5){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 90){
                    this.game.data4= this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 75){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 75 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 5){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 90){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 90){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
        }
        // Game Part 4(Final Phase)
        if(this.game.day_count < 16 &&  this.game.day_count > 12){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 75){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 75 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 1;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }
            else if(this.game.bot1Loc == 5){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 90){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 90){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -4;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 75){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 75 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 1;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            else if(this.game.bot2Loc == 5){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -4;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 75){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 75 && this.game.bot3Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 1;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            else if(this.game.bot3Loc == 5){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -4;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 75){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 75 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 1;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            else if(this.game.bot4Loc == 5){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 90){
                    this.game.data4= this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -4;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 75){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 75 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 1;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
            else if(this.game.bot5Loc == 5){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 90){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 90){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -4;
                }
            }
        }


     }

     
}