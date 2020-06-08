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
            fontSize: '14px',
            
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }

        

        // Load Background/meter
        this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'UI').setOrigin(0, 0);
        this.deductfield = this.add.tileSprite(0, 0, 640, 480, 'BookUI').setOrigin(0, 0);
        this.meter = new Arrow(this, 15, game.settings.meterY, 'arrow', 0, 30).setOrigin(0,0);

        // Item Arrays used to fill data 
        this.uselessData = ["An Old Boot", "3D Scan of a Cuttlefish", "Broken Rocks", "Angler Fish Eye", "Thermal Scan of Rocks",
                            "Shark Leftovers", "Audio Recording of\nCuttlefish Mating", "A Chunk of Coral", "An Angry Hermit Crab", 
                            "A Shriveled Sea Anemone"];
        this.strangeData = ["Blurred Image of a Hand", "Crackling Audio that\nSounds like Singing", "A Faded Image\nof a Humanoid Shape", 
                            "A Cuttlefish", "Squid Corpse with a Bite Mark", "An Iridescent Scale", "A Long Fingernail", 
                            "A Strand of\nGreen Hair", "A Bloody Tooth", "A Photo of Ruins"];
        this.usefulData =  [this.getCrinoidData(), this.getPlanktonData(), this.getWaterData(), this.getTrenchData(), this.getCrabData(),
                            this.getAmphipodData(), this.getSnowData(), this.getStarfishData(), this.getWormData(), this.getCucData(),
                            this.getTunicateData()];
        
        // Define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        
        // Call getData() to get data for the drones
        this.getData();
        
        // Displays text of current item being looked at 
        
        this.itemText = this.add.text(170, 195, ''+this.game.data1, this.itemConfig);
        this.itemText.setColor('#000000');
        
        
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
        this.meter.y = 228 + ((game.workStatus) * -7);
        if(this.meter.y < 118){
            this.meter.y = 118;
        }
        else if(this.meter.y > 338){
            this.meter.y = 338;
        }
        this.game.settings.meterY = this.meter.y;
        console.log("work status is: " + game.workStatus);

        // Load into conversation scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log(game.workStatus);
            this.scene.start("talkingScene");
        }
        
    }

    // Discard Data of Current Page
    discardThis(){
        if(this.count == 1){
            if(this.game.data1 != 'Submitted!' && this.game.data1 != 'Discarded!' ){
                this.sound.play('sfx_click');
                this.game.data1 = 'Discarded!';
                this.game.itemValue1 = 0;
                game.workStatus = game.workStatus - 1; 
            }
        }
        else if(this.count == 2){
            if(this.game.data2 != 'Submitted!' && this.game.data2 != 'Discarded!' ){
                this.sound.play('sfx_click');
                this.game.data2 = 'Discarded!';
                this.game.itemValue2 = 0;
                game.workStatus = game.workStatus - 1;
            }
        }
        else if(this.count == 3){
            if(this.game.data3 != 'Submitted!' && this.game.data3 != 'Discarded!' ){
                this.sound.play('sfx_click');
                this.game.data3 = 'Discarded!';
                this.game.itemValue3 = 0;
                game.workStatus = game.workStatus - 1;
            }        
        }
        else if(this.count == 4){
            if(this.game.data4 != 'Submitted!' && this.game.data4 != 'Discarded!' ){
                this.sound.play('sfx_click');
                this.game.data4 = 'Discarded!';
                this.game.itemValue4 = 0;
                game.workStatus = game.workStatus - 1;
            }     
        }
        else if(this.count == 5){
            if(this.game.data5 != 'Submitted!' && this.game.data5 != 'Discarded!' ){
                this.sound.play('sfx_click');
                this.game.data5 = 'Discarded!';
                this.game.itemValue5 = 0;
                game.workStatus = game.workStatus - 1;
            }     
        }

     }

    // Save Data of Current Page
    saveThis(){
        if(this.count == 1){
            if(this.game.data1 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data1 = 'Submitted!';
                game.workStatus = game.workStatus + this.game.itemValue1;
                this.game.itemValue1 = 0;
            }
        }
        else if(this.count == 2){
            if(this.game.data2 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data2 = 'Submitted!';
                game.workStatus = game.workStatus + this.game.itemValue2;
                this.game.itemValue2 = 0;
            }
        }
        else if(this.count == 3){
            if(this.game.data3 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data3 = 'Submitted!';
                game.workStatus = game.workStatus + this.game.itemValue3;
                this.game.itemValue3 = 0;
            }        
        }
        else if(this.count == 4){
            if(this.game.data4 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data4 = 'Submitted!';
                game.workStatus = game.workStatus + this.game.itemValue4;
                this.game.itemValue4 = 0;
            }     
        }
        else if(this.count == 5){
            if(this.game.data5 != 'Discarded!'){
                this.sound.play('sfx_click');
                this.game.data5 = 'Submitted!';
                game.workStatus = game.workStatus + this.game.itemValue5;
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

     // generate random data for underwater trench location. returns a string
    getTrenchData() {
        // generate random integer values for latitude, longitude, and depth within specified range
        var latitude = (Math.random() * (18 - 9) + 9).toFixed(4);
        var longitude = (Math.random() * (100 - 70) + 70).toFixed(4);
        var depth = Math.round((Math.random() * (9000 - 4000) + 4000));

        // create a string with the random data
        this.trenchString = `Location of a Deep Sea Trench\n\nCoordinates: ${latitude}°N ${longitude}°W\nDepth: ${depth} m`;

        // return generated string
        return this.trenchString;
    }

    // generate random data for fossilized crinoid. returns a string
    getCrinoidData() {
        // generate random integer values for length, age, and depth within specified range
        var length = Math.round((Math.random() * (40 - 1) + 1));
        var age = Math.round((Math.random() * (488 - 1) + 1));
        var depth = Math.round((Math.random() * (9000 - 6000) + 6000));

        // create a string with the random data
        this.crinoidString = `Fossilized Crinoid\n\nLength: ${length} m\nAge: ${age} mya\nDepth: ${depth} m`;

        // return generated string
        return this.crinoidString;
    }
    // generate random data for zooplankton. returns a string
    getPlanktonData() {
        // generate random values for length, weight, and depth within specified range and round to 2 decimal places
        var length = (Math.random() * (5000 - 153) + 153).toFixed(2);
        var weight = (Math.random() * (5.25 - 0.02) + 0.02).toFixed(2);
        var depth = (Math.random() * (6000 - 4000) + 4000).toFixed(2);

        // create a string with the random data
        this.planktonString = `Zooplankton\n\nLength: ${length} μm\nWeight: ${weight} microg\nDepth: ${depth} m`;

        // return generated string
        return this.planktonString;
    }

    // generate random data for seawater sample. returns a string
    getWaterData() {
        // generate random integer values for salinity, oxygen concentration, and density within specified range
        var salinity = (Math.random() * (1.031 - 1.017) + 1.017).toFixed(4);
        var oxygen = Math.round((Math.random() * (9 - 4) + 4));
        var density = (Math.random() * (1.0273 - 1.0240) + 1.0240).toFixed(4);

        // create a string with the random data
        this.waterString = `Seawater Sample\n\nSalinity: ${salinity} sg\nOxygen Concentration: ${oxygen} mg/L\nDensity: ${density} g/cm\u00B3`;

        // return generated string
        return this.waterString;
    }
    // generate random data for a crab. returns a string
    getCrabData() {
        // decide what kind of crab it is
        var crabType = ["Angular", "Galatheid", "Boxer"];
        var crab = crabType[Math.floor(Math.random() * crabType.length)];
        // generate random integer values for length, weight, and age within specified range
        var length = (Math.random() * (3 - 0.5) + 0.5).toFixed(2);
        var weight = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
        var age = Math.round((Math.random() * (36 - 2) + 2));

        // create a string with the random data
        this.crabString = `A Live ${crab} Crab\n\nLength: ${length} in\nWeight: ${weight} lb\nAge: ${age} months`;

        // return generated string
        return this.crabString;
    }

    // generate random data for an amphipod. returns a string
    getAmphipodData() {
        // decide what species of amphipod it is
        var familyArray = ["Ampeliscoidea", "Gammaroidea", "Stegocephaloidea", "Talitroidea", "Caprelloidea",
                             "Phtisicoidea", "Cyamidae", "Scinoidea", "Lanceoloidea", "Vibilioidea", "Ingolfiellidae"];
        var family = familyArray[Math.floor(Math.random() * familyArray.length)];
        // generate random integer values for length and depth within specified range
        var length = Math.round((Math.random() * (280 - 1) + 1));
        var depth = Math.round((Math.random() * (5300 - 3800) + 3800));

        // create a string with the random data
        this.amphipodString = `An Amphipod\n\nFamily: ${family}\nLength: ${length} mm\nDepth: ${depth} m`;

        // return generated string
        return this.amphipodString;
    }
    // generate random data for a marine snow sample. returns a string
    getSnowData() {
        // generate random integer values for size and carbon within specified range
        var size = Math.round((Math.random() * (200 - 1) + 1));
        var carbon = Math.round((Math.random() * (50 - 1) + 1));

        // create a string with the random data
        this.snowString = `Marine Snow Sample\n\nSize: ${size} μm\nDIC: ${carbon} mg C m\u207B\u00B2 d\u207B\u00B9`;

        // return generated string
        return this.snowString;
    }

    // generate random data for a freyella starfish. returns a string
    getStarfishData() {
        // decide what species of freyella it is
        var freyellaArray = ["attenuata", "breviispina", "dimorpha", "elegans", "felleyra",
                             "giardi", "hexactis", "loricata", "propinqua", "remex", "vitjazi"];
        var freyellaSpecies = freyellaArray[Math.floor(Math.random() * freyellaArray.length)];
        // generate random integer values for arm length and depth within specified range
        var length = Math.round((Math.random() * (310 - 110) + 110));
        var depth = Math.round((Math.random() * (4000 - 2000) + 2000));

        // create a string with the random data
        this.starfishString = `A Freyella Starfish\n\nSpecies: ${freyellaSpecies}\nArm Length: ${length} mm\nDepth: ${depth} m`;

        // return generated string
        return this.starfishString;
    }
    // generate random data for a tube worm. returns a string
    getWormData() {
        // generate random integer values for legnth, diameter, and temperature within specified range
        var length = (Math.random() * (3 - 1) + 1).toFixed(2);
        var diameter = Math.round((Math.random() * (5 - 3) + 3));
        var temp = (Math.random() * (30 - 2) + 2).toFixed(2);

        // create a string with the random data
        this.wormString = `Giant Tube Worm\n(Riftia pachyptila)\n\nLength: ${length} m\nDiameter: ${diameter} cm\nTemp: ${temp} °C`;

        // return generated string
        return this.wormString;
    }

    // generate random data for a sea cucumber. returns a string
    getCucData() {
        // decide what order of sea cucumber it is
        var orderArray = ["Apodida", "Aspidochirotida", "Dendrochirotida", "Elasipodida", "Molpadida"];
        var order = orderArray[Math.floor(Math.random() * orderArray.length)];
        // generate random integer values for length and volume within specified range
        var length = Math.round((Math.random() * (30 - 10) + 10));
        var volume = Math.round((Math.random() * (600 - 400) + 400));

        // create a string with the random data
        this.cucString = `A Sea Cucumber\n\nOrder: ${order}\nLength: ${length} cm\nVolume: ${volume} cm\u00B3`;

        // return generated string
        return this.cucString;
    }
    // generate random data for a tunicate. returns a string
    getTunicateData() {
        // decide what class of tunicate it is
        var classArray = ["Ascidiacea", "Thaliacea", "Larvacea"];
        var tunicateClass = classArray[Math.floor(Math.random() * classArray.length)];
        // generate random integer values for length and age within specified range
        var length = Math.round((Math.random() * (100 - 1) + 1));
        var age = Math.round((Math.random() * (36 - 1) + 1));

        // create a string with the random data
        this.tunicateString = `A Tunicate\n\nClass: ${tunicateClass}\nLength: ${length} cm\nAge: ${age} months`;

        // return generated string
        return this.tunicateString;
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
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 75 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -1;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 95){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
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
                    this.game.itemValue1 = -2;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 75){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 75 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
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
                    this.game.itemValue2 = -2;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 75){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 75 && this.game.bot3Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
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
                    this.game.itemValue3 = -2;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 75){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 75 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
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
                    this.game.itemValue4 = -2;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 75){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 75 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
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
                    this.game.itemValue5 = -2;
                }
            }
        }
        // Game Part 2
        if(this.game.day_count < 9 &&  this.game.day_count > 4){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 80){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 80 && this.game.bot1Loc <= 93){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 93){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 93){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 93){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }
            else if(this.game.bot1Loc == 5){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 85){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 85){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 80){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 80 && this.game.bot2Loc <= 93){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 93){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 93){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 93){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            else if(this.game.bot2Loc == 5){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 85){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 85){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 80){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 80 && this.game.bot3Loc <= 93){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 93){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 93){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 93){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            else if(this.game.bot3Loc == 5){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 85){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 85){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 80){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 80 && this.game.bot4Loc <= 93){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 93){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 93){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 93){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            else if(this.game.bot4Loc == 5){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 85){
                    this.game.data4= this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 85){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 80){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 80 && this.game.bot5Loc <= 93){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 93){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 93){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 93){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
            else if(this.game.bot5Loc == 5){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 85){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 85){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
        }
        // Game Part 3
        if(this.game.day_count < 13 &&  this.game.day_count > 8){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 80){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 80 && this.game.bot1Loc <= 90){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 90){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 93){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 93){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
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
                    this.game.itemValue1 = -2;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 80){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 80 && this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 90){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 90){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
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
                    this.game.itemValue2 = -2;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 80){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 80 && this.game.bot3Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 90){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 90){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
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
                    this.game.itemValue3 = -2;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 80){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 80 && this.game.bot4Loc <= 90){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 90){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 90){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
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
                    this.game.itemValue4 = -2;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 80){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 80 && this.game.bot5Loc <= 90){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 90){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 93){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 93){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
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
                    this.game.itemValue5 = -2;
                }
            }
        }
        // Game Part 4(Final Phase)
        if(this.game.day_count < 16 &&  this.game.day_count > 12){
            // Item for Bot 1
            if(this.game.bot1Loc == 1 || this.game.bot1Loc == 2 || this.game.bot1Loc == 3){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 70){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 70 && this.game.bot1Loc <= 88){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 88){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
                }
            }
            else if(this.game.bot1Loc == 4){
                this.game.bot1Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot1Loc <= 10){
                    this.game.data1 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue1 = 2;
                }
                else if(this.game.bot1Loc > 10 && this.game.bot1Loc <= 93){
                    this.game.data1 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue1 = -2;
                }
                else if(this.game.bot1Loc > 95){
                    this.game.data1 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue1 = -2;
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
                    this.game.itemValue1 = -2;
                }
            }

            // Item for Bot 2
            if(this.game.bot2Loc == 1 || this.game.bot2Loc == 2 || this.game.bot2Loc == 3){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 70){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 70 && this.game.bot2Loc <= 88){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 88){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
                }
            }
            else if(this.game.bot2Loc == 4){
                this.game.bot2Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot2Loc <= 10){
                    this.game.data2 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue2 = 2;
                }
                else if(this.game.bot2Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data2 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue2 = -2;
                }
                else if(this.game.bot2Loc > 95){
                    this.game.data2 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue2 = -2;
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
                    this.game.itemValue2 = -2;
                }
            }
            // Item for Bot 3
            if(this.game.bot3Loc == 1 || this.game.bot3Loc == 2 || this.game.bot3Loc == 3){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 70){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 70 && this.game.bot3Loc <= 88){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 88){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
                }
            }
            else if(this.game.bot3Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot3Loc <= 10){
                    this.game.data3 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue3 = 2;
                }
                else if(this.game.bot3Loc > 10 && this.game.bot2Loc <= 95){
                    this.game.data3 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue3 = -2;
                }
                else if(this.game.bot3Loc > 95){
                    this.game.data3 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue3 = -2;
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
                    this.game.itemValue3 = -2;
                }
            }
            // Item for Bot 4
            if(this.game.bot4Loc == 1 || this.game.bot4Loc == 2 || this.game.bot4Loc == 3){
                this.game.bot4Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 70){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 70 && this.game.bot4Loc <= 88){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 88){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
                }
            }
            else if(this.game.bot4Loc == 4){
                this.game.bot3Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot4Loc <= 10){
                    this.game.data4 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue4 = 2;
                }
                else if(this.game.bot4Loc > 10 && this.game.bot4Loc <= 95){
                    this.game.data4 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue4 = -2;
                }
                else if(this.game.bot4Loc > 95){
                    this.game.data4 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue4 = -2;
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
                    this.game.itemValue4 = -2;
                }
            }
            // Item for Bot 5
            if(this.game.bot5Loc == 1 || this.game.bot5Loc == 2 || this.game.bot5Loc == 3){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 70){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 70 && this.game.bot5Loc <= 88){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 88){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
                }
            }
            else if(this.game.bot5Loc == 4){
                this.game.bot5Loc = Math.floor(Math.random() * 100) + 1;
                if(this.game.bot5Loc <= 10){
                    this.game.data5 = this.usefulData[Math.floor(Math.random() *this.usefulData.length)];
                    this.game.itemValue5 = 2;
                }
                else if(this.game.bot5Loc > 10 && this.game.bot5Loc <= 95){
                    this.game.data5 = this.uselessData[Math.floor(Math.random() *this.uselessData.length)];
                    this.game.itemValue5 = -2;
                }
                else if(this.game.bot5Loc > 95){
                    this.game.data5 = this.strangeData[Math.floor(Math.random() *this.strangeData.length)];
                    this.game.itemValue5 = -2;
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
                    this.game.itemValue5 = -2;
                }
            }
        }


     }

     
}