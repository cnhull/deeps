class Talking extends Phaser.Scene {
    constructor() {
        super("talkingScene");

        // dialog constants
        this.DBOX_X = 0;			    // dialog box x-position
        this.DBOX_Y = 0;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	// dialog box font key

        this.TEXT_X = 96;            // text w/in dialog box x-position
        this.TEXT_Y = 266;            // text w/in dialog box y-position
        this.TEXT_SIZE = 16;        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 449;    // max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 534;            // next text prompt x-position
        this.NEXT_Y = 369;            // next text prompt y-position

        this.OTHER_NAME_X = 290;
        this.OTHER_NAME_Y = 238;

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.convo = 0;			// current "conversation" array
        this.line = 0;			// current line of conversation
        this.currentSpeaker = null;		// current speaker
        this.lastSpeaker = null;	// last speaker
        this.typing = false;		// flag to lock player input while text is "typing"
        this.displayText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.homer = null;
        this.minerva = null;
        this.neptune = null;
        this.jove = null;
        this.tweenDuration = 500;

        this.temp = null;
        this.num = null;

        this.holdA = null;
        this.holdB = null;
        this.holdNext = null;
        this.click = null;

        this.day = null;
        this.daynum = null;

        this.OFFSCREEN_X = 750;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 119;

    }

    create() {
        // parse dialog from JSON file
        //this.dialog = this.cache.json.get('dialog');
        //let aa = 'dialog'
        this.day = [
            this.cache.json.get('dialog'),
            this.cache.json.get('day1'),
            this.cache.json.get('day2')

        ]
        this.daynum = game.globalDay;
        //let day1 = this.cache.json.get('dialog');
        //this.dialog = this.cache.json.get('dialog');

        
        this.dialog = this.day[this.daynum];
        this.current = this.dialog.conv1;


        this.toby = this.add.sprite(this.OFFSCREEN_X, centerY + 1/2*mod, 'toby').setOrigin(0, 1);
        this.geneva = this.add.sprite(this.OFFSCREEN_X, centerY + 1/2*mod, 'geneva').setOrigin(0, 1);
        this.dim = this.add.rectangle(centerX, 0, 640, 480, 0x000000).setOrigin(0, 0);
        this.dim.alpha = 0;

        this.box1 = this.add.tileSprite(0, 0, 640, 480, 'dialogbox1').setOrigin(0, 0);
        this.box1.alpha = 1;
        this.box2 = this.add.tileSprite(0, 0, 640, 480, 'dialogbox2').setOrigin(0, 0);
        this.box2.alpha = 0;

        this.nameText = this.add.bitmapText(this.OTHER_NAME_X, this.OTHER_NAME_Y, this.DBOX_FONT, 'NAME', this.TEXT_SIZE).setOrigin(0.5, 0.5);
        this.ingramName = this.add.bitmapText(this.OTHER_NAME_X - 4*mod, this.OTHER_NAME_Y, this.DBOX_FONT, 'INGRAM', this.TEXT_SIZE).setOrigin(0.5, 0.5);

        

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);

        // initialize dialog text objects (with no text)
        this.displayText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);


        this.megaDim = this.add.rectangle(0, 0, 640, 480, 0x000000).setOrigin(0, 0);
        this.megaDim.alpha = 0;
        //this.clickButton = new TextButton(this, this.NEXT_X, this.NEXT_Y, '[CLICK]',  game.buttonConfig, () => this.checkType()).setOrigin(1);//.setStyle(menuConfig);
        //this.clickButton.alpha = 0;
        //sthis.add.existing(this.clickButton);

        this.testButton = new TextButton(this, this.NEXT_X, this.NEXT_Y, '[CLICK]',  game.buttonConfig, () => this.next(this.holdNext)).setOrigin(1);//.setStyle(menuConfig);
        this.testButton.alpha = 0;
        this.add.existing(this.testButton);

        this.cont = this.add.bitmapText(centerX, centerY, 'gem_font', 'Click anywhere to continue', 16).setOrigin(0.5);
        this.cont.alpha = 0;

        this.nextConvButton = new TextButton(this, this.NEXT_X, this.NEXT_Y, '[CLICK]',  game.buttonConfig, () => this.nextConv()).setOrigin(1);
        this.nextConvButton.alpha = 0;
        this.add.existing(this.nextConvButton);



        this.fullButton = new TextButton(this, centerX, centerY, '   ', game.buttonConfig, () => this.nextConv()).setOrigin(0.5);//.setStyle(menuConfig);
        this.fullButton.setFontSize(680);
        this.fullButton.alpha = 0;

        this.dayButton = new TextButton(this, centerX, centerY, '   ', game.buttonConfig, () => this.nextDay(this.day)).setOrigin(0.5);//.setStyle(menuConfig);
        this.dayButton.setFontSize(680);
        this.dayButton.alpha = 0;

        this.buttonA = new TextButton(this, centerX, centerY - 4*mod, 'asdf', game.buttonConfig, () => this.applyChoice(this.holdA)).setOrigin(0.5, 0.5);
        this.buttonA.alpha = 0;
        this.add.existing(this.buttonA);
        this.buttonB = new TextButton(this, centerX, centerY - 2*mod , 'lugikfg', game.buttonConfig, () => this.applyChoice(this.holdB)).setOrigin(0.5, 0.5);
        this.buttonB.alpha = 0;
        this.add.existing(this.buttonB);

        // ready the character dialog images offscreen

        this.neptune = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'neptune').setOrigin(0, 1);
        this.jove = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'jove').setOrigin(0, 1);

        // input
        cursors = this.input.keyboard.createCursorKeys();
        this.add.tileSprite(0, 0, 640, 480, 'UI').setOrigin(0, 0);
        this.skipButton = new TextButton(this, button4, buttonY, 'Skip->',  game.buttonConfig, () => this.skip()).setOrigin(0.5, 0.5);
        this.add.existing(this.skipButton);

        // start dialog
        this.checkType2("start");
        //this.typeText();
    }

    update() {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.typing) {
            // trigger dialog
            //this.typeText();
        }
    }

    skip(){
        this.go("end");

    }

    nextConv(){
        if(this.current.next){
            console.log(this.current);
            console.log(this.dialog[this.current.next]);
            this.current = this.dialog[this.current.next];
            console.log(this.current);

            if(!this.current.requires && !this.current.confilcts){
                console.log("no nothing, keep going");
                this.go("start");
            }

            if(this.current.requires && this.current.conflicts){
                if(!this.checkReq() || !this.checkConf()){
                    this.nextConv();
                }
                if(this.checkReq() && this.checkConf()){
                    this.go("start");
                }
            }

            if(this.current.requires && !this.current.conflicts){
                if(this.checkReq()){
                    console.log("check req returned true");
                    console.log(this.current);
                    this.go("start");

                }
                else if(!this.checkReq()){
                    console.log("check req returned false");
                    this.nextConv();
                }
    
            }

            if(this.current.conflicts && !this.current.requires){
                if(this.checkConf()){
                    console.log("check conflicts returned true");
                    this.go("start");
                }
                else if(!this.checkConf()){
                    this.nextConv();
                }
            }

        }
        console.log("nothing left");
        this.nextConvButton.alpha = 0;
        this.fullButton.alpha = 0;
        this.cont.alpha = 0;

    }
    
    go(name){
        this.VisibleBox();
        this.checkType2(name);
        this.nextConvButton.alpha = 0;
        this.fullButton.alpha = 0;
        this.cont.alpha = 0;
    }

    VisibleBox(){
        this.dialogbox.visible = true;
        this.displayText.alpha = 1;

    }

    InvisibleBox(){
        this.dialogbox.visible = false;
        this.displayText.alpha = 0;
    }

    checkReq(){
        let req = this.current.requires;
        console.log(this.current.requires);
        console.log(game.dec);
        for(var items in req){
            if(!game.dec.has(req[items])){
                return false;
            }
        }
        return true;
    }

    checkConf(){
        let conf = this.current.conflicts;
        for(var items in conf){
            if(game.dec.has(conf[items])){
                return false;
            }
        }
        console.log("no conflicts, returning true");
        return true;
    }

    checkType2(scene){
        this.nextConvButton.alpha = 0;
        this.fullButton.alpha = 0;
        this.cont.alpha = 0;
        let hold = this.current[scene];
        if(hold.type == "conv"){
            this.makeConv(scene);
        }
        if(hold.type == "choice"){
            this.makeChoice(scene);
        }
        if(hold.type != "conv" && hold.type != "choice"){
            console.log("what am i...?");
            console.log(scene);
        }
        if(hold.type == "end"){
            this.endScene();
        }
        if(hold.type == "endOfDay"){
            this.endDay();
        }

    }

    makeConv(scene){
        this.megaDim.alpha = 0;
        let hold = this.current[scene];
        this.checkSpeaker(scene);
        this.typing = true;
        this.typewriter(hold.display);
        this.holdNext = hold.next;

    }

    makeChoice(scene){
        this.megaDim.alpha = 0.5;
        let hold = this.current[scene];
        this.testButton.alpha = 0;
        this.buttonA.text = hold.choices.A.text;
        this.holdA = hold.choices.A.target;
        this.buttonA.alpha = 1;
        this.buttonB.text = hold.choices.B.text;
        this.holdB = hold.choices.B.target;
        this.buttonB.alpha = 1;
    }

    endScene(){
        console.log('End of Conversations');
        this.megaDim.alpha = 0.75
        // tween out prior speaker's image
        if(this.currentSpeaker) {
            this.lastSpeaker = this.currentSpeaker;
            //this.fadeOut();
        }
        // make text box invisible
        //this.InvisibleBox();
        this.testButton.alpha = 0;
        this.nextConv();
        //this.nextConvButton.alpha = 1;
        //this.fullButton.alpha = 1;
        //this.cont.alpha = 1;
    }

    endDay(){
        this.skipButton.alpha = 0;
        this.megaDim.alpha = 0.75;
        console.log("inside of end day function");
        if(this.currentSpeaker) {
            console.log("im gonna fade out");
            if(this.currentSpeaker !== "ingram"){
              this.lastSpeaker = this.currentSpeaker;  
            }
            
            this.fadeOut();
        }
        // make text box invisible
        this.InvisibleBox();
        this.testButton.alpha = 0;



        this.dayButton.alpha = 1;
        this.cont.alpha = 1;


    }

    nextDay(){
        console.log("inside next day function");
        this.dayButton.alpha = 0;

            if(this.daynum <= this.day.length){
                //this.daynum += 1;
                game.globalDay +=1;
                this.daynum = game.globalDay;
                this.dialog = this.day[this.daynum];
                console.log(this.dialog);
                if(!this.dialog){
                    console.log("the end but not a good one");
                    this.cont.alpha = 0; 
                    this.megaDim.alpha = 1;
                    this.skipButton.alpha = 0;
                    return;
                }
                this.current = this.dialog.conv1;
                console.log(this.dialog);
                console.log(this.current);
                this.scene.start("droneScene")
                //this.go("start");
            }
            else{
                console.log("the end :)");
                this.cont.alpha = 0; 
                this.megaDim.alpha = 1;
                this.skipButton.alpha = 0;
            }
    }

    applyChoice(val){
        this.buttonA.alpha = 0;
        this.buttonB.alpha = 0;
        console.log("before");
        console.log(game.dec);
        game.dec.add(val);
        console.log("after");
        console.log(game.dec);
        this.checkType2(val);
    }

    next(val){
        this.checkType2(val);
    }




    typewriter(lines){
            // create a timer to iterate through each letter in the dialog text
            //this.typing = true;
            this.skipButton.alpha = 0;
            this.testButton.alpha = 0;
            this.displayText.maxWidth = this.TEXT_MAX_WIDTH;
            this.displayText.text = "";
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: lines.length - 1,
                callback: () => { 
                    // concatenate next letter from lines
                    this.displayText.text += lines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.testButton.alpha = 1;
                        //this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.typing = false;
                        this.skipButton.alpha = 1;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });        
    }

    checkSpeaker(scene){
        let hold = this.current[scene]
        console.log("checking speaker");
        // check if there's a new speaker (for exit/enter animations)
        if(hold.speaker) {
            if(this.currentSpeaker){
                if(this.currentSpeaker !== "ingram"){
                  this.lastSpeaker = this.currentSpeaker;  
                }
                
            }
            this.currentSpeaker = hold.speaker;
            if(this.currentSpeaker !== "ingram"){
                this.nameText.alpha = 1;
                this.nameText.text = this.currentSpeaker.toUpperCase();
                this.ingramName.alpha = 0.5;
                this.dim.alpha = 0;


            }
            else if(this.currentSpeaker == "blank"){
                console.log("CAN YOU DO WHAT I ASK FOR FUCKING ONCE");
                this.nameText.text = "";
                this.dim.alpha = 0.75;
            }
            else{
                this.ingramName.alpha = 1;
                this.nameText.alpha = 0.5;
                this.dim.alpha = 0.5;
            }

            //console.log(this.convo + " " + " " + this.line + " " + [this.convo][this.line]);
            // tween out prior speaker's image
            if(this.lastSpeaker) {
                //this.fadeOut();
            }
            // tween in new speaker's image
            this.fadeIn();

            console.log(this.currentSpeaker);
        }

        if(this.currentSpeaker == "ingram"){
            this.box2.alpha = 0;
            console.log("ooga booga");
        }
        else{
            this.box2.alpha = 1;
            console.log("badabing badaboom");
        }
    }

    fadeIn(){
        this.tweens.add({
            targets: this[this.currentSpeaker],
            alpha: 1,
            x: centerX + 50,
            duration: this.tweenDuration,
            ease: 'Linear'
        });
    }

    fadeOut(){
        console.log("fading out");
        console.log(this.lastSpeaker);
        this.tweens.add({
            targets: this[this.lastSpeaker],
            alpha: 0,
            x: this.OFFSCREEN_X,
            duration: this.tweenDuration,
            ease: 'Linear'
        });        
    }

}