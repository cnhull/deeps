class Loading extends Phaser.Scene {

    constructor() {
        super("loadingScene");
    }

    preload() {
        // preload all assets here!

        this.load.path = "./assets/";
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml');


        //json files
        this.load.json('dialog', 'json/dialog.json');
        this.load.json('day1', 'json/day1.json');
        this.load.json('day2', 'json/day2.json');

        //character sprites
        this.load.image('geneva', 'img/geneva.png');
        this.load.image('toby', 'img/toby.png');

        //Interface
        this.load.image('UI', 'img/UI.png');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('BookUI', 'img/blank_book.png');
        this.load.image('dialogbox1', 'img/dialogbox1.png');
        this.load.image('dialogbox2', 'img/dialogbox2.png');


        //Title
        this.load.image('title_screen', 'img/bubblless_title_screen.png');
        this.load.image('small_bubbles', 'img/small_bubbles.png');
        this.load.image('med_bubbles', 'img/med_bubbles.png');
        this.load.image('large_bubbles', 'img/large_bubbles.png');

        this.load.image('testfield', 'img/testing.png');
        this.load.image('dronefield', 'img/Drone_Field.png');
        this.load.image('bot_sprite', 'img/Bot.png');
        this.load.image('marker_sprite', 'img/Marker.png');

        //sfx
        this.load.audio('sfx_drop', 'sfx/Click1.mp3');
        this.load.audio('sfx_select', 'sfx/blip_select12.wav');
        this.load.audio('sfx_test', 'sfx/Test_Track.mp3');
        this.load.audio('sfx_title', 'sfx/Title_Track.mp3');
        this.load.audio('sfx_page', 'sfx/PageFlip.mp3');
        this.load.audio('sfx_click', 'sfx/Click2.mp3');
        this.load.audio('tran', 'sfx/Transition.mp3');


        //whatever the fuck these are supposed to be
         this.load.image('day0', 'img/DeepSea.png');
         this.load.image('day1', 'img/Day1.png');
         this.load.image('day2', 'img/Day2.png');
         this.load.image('day3', 'img/Day3.png');
         this.load.image('day4', 'img/Day4.png');
         this.load.image('day5', 'img/Day5.png');
         this.load.image('day6', 'img/Day6.png');
         this.load.image('day7', 'img/Day7.png');
         this.load.image('day8', 'img/Day8.png');
         this.load.image('day9', 'img/Day9.png');
         this.load.image('day10', 'img/Day10.png');
         this.load.image('day11', 'img/Day11.png');
         this.load.image('day12', 'img/Day12.png');
         this.load.image('day13', 'img/Day13.png');
         this.load.image('day14', 'img/Day14.png');
         this.load.image('day15', 'img/Day15.png');
         this.load.image('day16', 'img/Day16.png');

         this.load.image('weaver', 'img/Weaver.png'); // Toby Weaver UI Screen
         this.load.image('roy', 'img/Roy.png'); // Geneva Roy UI Screen
 
         // Load sound used in transitions 
         this.load.audio('tran', 'sfx/Transition.mp3');

        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        var progressBar = new Phaser.Geom.Rectangle(120, game.config.height/2, 400, 50);
        var progressBarFill = new Phaser.Geom.Rectangle(125, game.config.height/2 + 5, 290, 40);

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRectShape(progressBar);

        this.newGraphics.fillStyle(0x2c406a, 1);
        this.newGraphics.fillRectShape(progressBarFill);

        var loadingText = this.add.text(game.config.width/2, game.config.height/2 - 32,"Loading: ", { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
        this.load.on('complete', this.complete, {scene:this.scene});
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x2c406a, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(125, game.config.height/2 + 5, percentage*390, 40));
                
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
        console.log("P:" + percentage);
        
    }

    complete() {
        console.log("COMPLETE!");
        this.scene.start("menuScene");
    }

}