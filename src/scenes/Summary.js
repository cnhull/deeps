class Summary extends Phaser.Scene {
    constructor() {
       super("summaryScene");
        
    }
    init(data){
        this.res1 = data.level01;
        this.res2 = data.level02;
        this.res3 = data.level03;
        this.res4 = data.level04;
        this.res5 = data.level05;
      }

    preload() {
        
        this.load.image('dayfield', './assets/Day_Field.jpg');
        

    }



    create() {

         // Test room button config
         let resultConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }

        this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'dayfield').setOrigin(0, 0);
        
        // Display test room messages
        this.loc1 = this.add.text(180, 10, 'Drones Sent to Location 1: '+this.res1, resultConfig);
        this.loc2 = this.add.text(180, 50, 'Drones Sent to Location 2: '+this.res2, resultConfig);
        this.loc3 = this.add.text(180, 90, 'Drones Sent to Location 3: '+this.res3, resultConfig);
        this.loc4 = this.add.text(180, 130,'Drones Sent to Location 4: '+this.res4, resultConfig);
        this.loc5 = this.add.text(180, 170,'Drones Sent to Location 5: '+this.res5, resultConfig);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //this.dayfield = this.add.tileSprite(0, 0, 640, 480, 'dayfield').setOrigin(0, 0);
        console.log("Error Check4");
    }


    update() {
        console.log("Error Check3");
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            //this.test_music.stop();
            
            this.scene.start("menuScene"); 
        }

    }






























}