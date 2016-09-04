
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

		var white = this.add.sprite(300, 130, 'white');
		white.anchor.x = 0.5;
		white.anchor.y = 0.5;

		var simonText = this.add.text(300, 130, " Simon Says ", 
		{ font: "70px Lobster", fill: "#000" , align: "center"});
		simonText.anchor.x = 0.5;
		simonText.anchor.y = 0.5;

		var whiteEasy = this.add.sprite(300, 300, 'whiteEasy');
		whiteEasy.anchor.x = 0.5;
		whiteEasy.anchor.y = 0.5;

		var easyText = this.add.text(300, 300, " Easy Mode ", 
		{ font: "50px 'Indie Flower'", fill: "#000" , align: "center"});
		easyText.anchor.x = 0.5;
		easyText.anchor.y = 0.5;
		easyText.inputEnabled = true;
		easyText.events.onInputDown.add(this.startGame, this);

		var whiteHard = this.add.sprite(300, 410, 'whiteHard');
		whiteHard.anchor.x = 0.5;
		whiteHard.anchor.y = 0.5;

		var hardText = this.add.text(300, 410, " Hard Mode ", 
		{ font: "50px Righteous", fill: "#000" , align: "center"});
		hardText.anchor.x = 0.5;
		hardText.anchor.y = 0.5;

	},

	startGame: function (pointer) {

		this.state.start('Game');

	}

};
