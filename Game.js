
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
    this.numStages = 5;
    this.colorSequence = [];
    this.colorDict = {0: 'red', 1: 'blue', 2: 'green', 3: 'yellow'};
    this.colorDictRev = {'red': 0, 'blue': 1, 'green': 2, 'yellow': 3};
    this.colorFlashEvent = null;
    this.colorFlashCounter = 0;
    this.playerInput = [];
    this.roundCounter = 1;
    this.roundText = null;
    this.tryAgainText = null;
    this.resetButton = null;

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

        this.resetButton = this.add.sprite(580, 480, 'reset');
        this.resetButton.anchor.x = 1.0;
        this.resetButton.anchor.y = 1.0;
        this.resetButton.inputEnabled = true;
        this.resetButton.events.onInputDown.add(this.quitGame, this);

        this.countdownCounter = 3;
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

        this.colorSequence = [];
        for (var i = 0; i < this.numStages; i += 1) {
            this.colorSequence.push(this.game.rnd.integerInRange(0,3));
        }
        console.log(this.colorSequence);

        this.roundText = this.game.add.text(300, 20, 'Round: 1',
        { font: "50px 'Indie Flower'", fill: "#fff" , align: "center"});
        this.roundText.anchor.x = 0.5;

        this.tryAgainText = this.game.add.text(300, 480, '',
        { font: "40px 'Indie Flower'", fill: "#fff" , align: "center"});
        this.tryAgainText.anchor.x = 0.5;
        this.tryAgainText.anchor.y = 1.0;

        this.roundCounter = 1;
        this.roundShow(this.roundCounter);

    },

    roundShow: function (round) {
        
        // Make tiles unclickable during flash show
        this.red.s.inputEnabled = false;
        this.red.s.events.onInputDown.removeAll();
        this.blue.s.inputEnabled = false;
        this.blue.s.events.onInputDown.removeAll();
        this.green.s.inputEnabled = false;
        this.green.s.events.onInputDown.removeAll();
        this.yellow.s.inputEnabled = false;
        this.yellow.s.events.onInputDown.removeAll();

        // Update roundText
        this.roundText.setText('Round: ' + round);

        this.colorFlashCounter = 0;
        
        // This line will call the flashUpdate immediately, without waiting 1 second
        // (this.flashUpdate.bind({thisObj: this, round: round}))();

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
            // start playerTurn
            this.thisObj.playerTurn(this.round);
        }

        this.thisObj.colorFlashCounter += 1;

    },

    playerTurn: function (round) {

        this.playerInput = [];

        // Make tiles clickable
        this.red.s.inputEnabled = true;
        this.red.s.events.onInputDown.removeAll();
        this.red.s.events.onInputDown.add(this.updatePlayerInput('red'), {thisObj: this, round: round});
        this.red.s.events.onInputDown.add(this.flashTileFactory('red'), this);

        this.blue.s.inputEnabled = true;
        this.blue.s.events.onInputDown.removeAll();
        this.blue.s.events.onInputDown.add(this.updatePlayerInput('blue'), {thisObj: this, round: round});
        this.blue.s.events.onInputDown.add(this.flashTileFactory('blue'), this);

        this.green.s.inputEnabled = true;
        this.green.s.events.onInputDown.removeAll();
        this.green.s.events.onInputDown.add(this.updatePlayerInput('green'), {thisObj: this, round: round});
        this.green.s.events.onInputDown.add(this.flashTileFactory('green'), this);

        this.yellow.s.inputEnabled = true;
        this.yellow.s.events.onInputDown.removeAll();
        this.yellow.s.events.onInputDown.add(this.updatePlayerInput('yellow'), {thisObj: this, round: round});
        this.yellow.s.events.onInputDown.add(this.flashTileFactory('yellow'), this);

    },

    flashTile: function (color) {
        this[color].s = this.add.sprite(this[color].x, this[color].y, color + 'Shine');
        // Return to original sprite after 0.5 second
        this.game.time.events.add(0.5 * Phaser.Timer.SECOND, 
            function () {
                this[color].s = this.add.sprite(this[color].x, this[color].y, color);
            }, this);
    },

    flashTileFactory: function (color) {
        return function () {
            this[color].s = this.add.sprite(this[color].x, this[color].y, color + 'Shine');
            // Return to original sprite after 0.5 second
            this.game.time.events.add(0.5 * Phaser.Timer.SECOND, 
                function () {
                    this[color].s = this.add.sprite(this[color].x, this[color].y, color);
                }, this);
        }
    },

    updatePlayerInput: function (color) {
        return function () {
            if (this.thisObj.playerInput.length < this. round) {
                this.thisObj.playerInput.push( this.thisObj.colorDictRev[color] );
            }
            console.log(this.thisObj.playerInput);
            // Clicked maximum times
            if (this.thisObj.playerInput.length === this.round) {
                if (JSON.stringify(this.thisObj.playerInput) === JSON.stringify(this.thisObj.colorSequence.slice(0, this.round))) {
                    // Correct sequence
                    console.log('Match!');
                    // Clear playerInput
                    this.thisObj.playerInput = [];
                    // Hide try again text
                    this.thisObj.tryAgainText.setText('');
                    // Show correct text
                    this.thisObj.roundText.setText('Correct!');
                    if (this.thisObj.roundCounter === this.thisObj.numStages) {
                        // Win!
                        console.log('You win!');
                    } else {
                        // Start next round
                        this.thisObj.roundCounter += 1;
                        // Add 1 second of wait time before start next round
                        this.thisObj.game.time.events.add(Phaser.Timer.SECOND,
                            function () {
                                this.thisObj.roundShow(this.thisObj.roundCounter);
                            }, this);
                    }
                    
                } else {
                    // Wrong sequence
                    console.log('Not Match!');
                    // Clear playerInput
                    this.thisObj.playerInput = [];
                    // Show try again text
                    this.thisObj.tryAgainText.setText('Try again');
                    // Restart round
                    this.thisObj.roundShow(this.thisObj.roundCounter);
                }
            }
        }
    }

};
