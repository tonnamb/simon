
BasicGame.Preloader = function (game) {

	// this.background = null;
	// this.preloadBar = null;

	// this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		/*
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'images/title.jpg');
		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here
		*/
		this.load.image('blue', 'images/blue.png');
		this.load.image('green', 'images/green.png');
		this.load.image('red', 'images/red.png');
		this.load.image('yellow', 'images/yellow.png');
		this.load.image('white', 'images/white.png');
		this.load.image('whiteEasy', 'images/white_easy.png');
		this.load.image('whiteHard', 'images/white_hard.png');
		this.load.image('reset', 'images/reset.png');

		this.load.audio('sound0', 'sounds/simonSound0.mp3');
		this.load.audio('sound1', 'sounds/simonSound1.mp3');
		this.load.audio('sound2', 'sounds/simonSound2.mp3');
		this.load.audio('sound3', 'sounds/simonSound3.mp3');

	},

	create: function () {

		this.state.start('MainMenu');

	}

};
