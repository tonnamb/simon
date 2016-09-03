
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

    this.red = null;
    this.blue = null;
    this.green = null;
    this.yellow = null;
    this.countdownCounter = 3;
    this.countdownText = null;
    this.countdownEvent = null;

};

BasicGame.Game.prototype = {

    create: function () {

        this.red = this.add.sprite(140, 90, 'red');
        this.blue = this.add.sprite(310, 90, 'blue');
        this.green = this.add.sprite(140, 260, 'green');
        this.yellow = this.add.sprite(310, 260, 'yellow');

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

    }

};
