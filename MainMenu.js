
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		/*
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		*/

		var white = this.add.sprite(300, 250, 'white');
		white.anchor.x = 0.5;
		white.anchor.y = 0.5;
		white.inputEnabled = true;
		white.events.onInputDown.add(this.startGame, this);

		var simonText = this.add.text(300, 190, " Simon Says ", 
		{ font: "65px Lobster", fill: "#000" , align: "center"});
		simonText.anchor.x = 0.5;
		simonText.anchor.y = 0.5;

		var playText = this.add.text(300, 310, " Start Game ", 
		{ font: "65px 'Indie Flower'", fill: "#000" , align: "center"});
		playText.anchor.x = 0.5;
		playText.anchor.y = 0.5;
	},

	startGame: function (pointer) {

		this.state.start('Game');

	}

};
