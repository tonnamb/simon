
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    */
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.red = {};
    this.blue = {};
    this.green = {};
    this.yellow = {};
    this.countdownCounter = 3;
    this.countdownText = null;
    this.countdownEvent = null;
    this.numStep = 20;
    this.colorSequence = [];
    this.colorDict = {0: 'red', 1: 'blue', 2: 'green', 3: 'yellow'};
    this.colorFlashEvent = null;
    this.colorFlashCounter = 0;

};

BasicGame.Game.prototype = {

    create: function () {

        this.red.x = 140;
        this.red.y = 90;
        this.red.s = this.add.sprite(this.red.x, this.red.y, 'red');
        
        this.blue.x = 310;
        this.blue.y = 90;
        this.blue.s = this.add.sprite(this.blue.x, this.blue.y, 'blue');

        this.green.x = 140;
        this.green.y = 260;
        this.green.s = this.add.sprite(this.green.x, this.green.y, 'green');

        this.yellow.x = 310;
        this.yellow.y = 260;
        this.yellow.s = this.add.sprite(this.yellow.x, this.yellow.y, 'yellow');

        this.countdownText = this.game.add.text(300, 20, 'Countdown: 3',
        { font: "50px 'Indie Flower'", fill: "#fff" , align: "center"});
        this.countdownText.anchor.x = 0.5;

        this.countdownEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.countdownUpdate, this);

    },

    quitGame: function () {

        this.state.start('MainMenu');

    },

    countdownUpdate: function () {

        this.countdownCounter -= 1;

        if (this.countdownCounter > 0) {
            // 1st and 2nd loop            
            this.countdownText.setText('Countdown: ' + this.countdownCounter);
        } else if (this.countdownCounter === 0) {
            // 3rd loop
            this.countdownText.setText('Go!');
        } else {
            // 4th loop
            this.countdownText.destroy();
            this.game.time.events.remove(this.countdownEvent);
            this.startGame();
        }

    },

    startGame: function () {

        for (var i = 0; i < this.numStep; i += 1) {
            this.colorSequence.push(this.game.rnd.integerInRange(0,3));
        }

        this.roundShow(3);

        /* Make tiles clickable
        this.red.s.inputEnabled = true;
        this.red.s.events.onInputDown.add(this.flashTileFactory('red'), this);

        this.blue.s.inputEnabled = true;
        this.blue.s.events.onInputDown.add(this.flashTileFactory('blue'), this);

        this.green.s.inputEnabled = true;
        this.green.s.events.onInputDown.add(this.flashTileFactory('green'), this);

        this.yellow.s.inputEnabled = true;
        this.yellow.s.events.onInputDown.add(this.flashTileFactory('yellow'), this);
        */

    },

    roundShow: function (round) {
        
        this.colorFlashCounter = 0;
        // Immediately call the flashUpdate
        // Without this line, the game will wait 1 second before the loop starts
        (this.flashUpdate.bind({thisObj: this, round: round}))();
        // Loop calling flashUpdate
        this.colorFlashEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.flashUpdate, {thisObj: this, round: round});

    },

    flashUpdate: function () {

        if (this.thisObj.colorFlashCounter < this.round) {
            // call flashTile
            this.thisObj.flashTile( this.thisObj.colorDict[ this.thisObj.colorSequence[ this.thisObj.colorFlashCounter ] ] );
        } else {
            // Remove colorFlashEvent to stop loop
            this.thisObj.game.time.events.remove(this.thisObj.colorFlashEvent);
            // Reset colorFlashCounter
            this.thisObj.colorFlashCounter = 0;
        }

        this.thisObj.colorFlashCounter += 1;

    },

    flashTile: function (color) {
        this[color].s = this.add.sprite(this[color].x, this[color].y, color + 'Shine');
        // Return to original sprite
        this.game.time.events.add(0.5 * Phaser.Timer.SECOND, 
            function () {
                this[color].s = this.add.sprite(this[color].x, this[color].y, color);
            }, this);
    },

    flashTileFactory: function (color) {
        return function () {
            this[color].s = this.add.sprite(this[color].x, this[color].y, color + 'Shine');
            // Return to original sprite
            this.game.time.events.add(Phaser.Timer.SECOND, 
                function () {
                    this[color].s = this.add.sprite(this[color].x, this[color].y, color);
                }, this);
        }
    }

};
