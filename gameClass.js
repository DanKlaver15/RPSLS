"use strict";

const prompt = require("prompt-sync")();
const human = require("./humanClass");
const Human = human.Human;
const computer = require("./computerClass");
const Computer = computer.Computer;
const gesture = require("./gestureClass");
const Gesture = gesture.Gesture;
const Color = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
}

/*======================================================================*/

class Game {
	constructor() {

		this.gestures = [];

		this.gestures.push(new Gesture("rock"));
		this.gestures.push(new Gesture("paper"));
		this.gestures.push(new Gesture("scissors"));
		this.gestures.push(new Gesture("lizard"));
		this.gestures.push(new Gesture("spock"));

	}

	runGame() {

		this.displayRules();
		console.log("Please enter the number (1-2) of human players");
		let numPlayers = parseInt(prompt());
		while (numPlayers !== 1 && numPlayers !== 2) {
			console.log("I'm sorry but your entry was invalid.  Please enter either a '1' or a '2' for the number of human players that will be playing.");
			numPlayers = parseInt(prompt());
		}

		if (numPlayers === 1) {
			this.playerOne = new Human("Player 1");
			this.playerTwo = new Computer("Player 2");
		}
		else if (numPlayers === 2) {
			this.playerOne = new Human("Player 1");
			this.playerTwo = new Human("Player 2");
		}
		

		while (this.playerOne.score < 2 && this.playerTwo.score < 2) {
			if (numPlayers === 1) {
				console.log("Player 1, please choose a gesture (" + this.objectToArray().toString() + ").");
				let result1 = this.cleanResponse(prompt());
				while (!this.validateUserGesture(result1)) {
					console.log("Your entry was invalid." + "Player 1, please choose a gesture (" + this.objectToArray().toString() + ").");
					result1 = this.cleanResponse(prompt());
				}
				let randomNumber = this.playerTwo.generateRandomNumber();
				let result2 = this.objectToArray()[randomNumber];
				this.compareGestures(result1, result2);
			}

			else if (numPlayers === 2) {
				console.log("Player 1, please choose a gesture (" + this.objectToArray().toString() + ").");
				let result1 = this.cleanResponse(prompt());
				while (!this.validateUserGesture(result1)) {
					console.log("Your entry was invalid. " + "Player 1, please choose a gesture (" + this.objectToArray().toString() + ").");
					result1 = this.cleanResponse(prompt());
				}
				console.log("Player 2, please choose a gesture (" + this.objectToArray().toString() + ").");
				let result2 = this.cleanResponse(prompt());
				while (!this.validateUserGesture(result2)) {
					console.log("Your entry was invalid. " + "Player 2, please choose a gesture (" + this.objectToArray().toString() + ").");
					result2 = this.cleanResponse(prompt());
				}
				this.compareGestures(result1, result2);
			}
		}

		this.displayGameWinner();
		this.askRepeatGame();		 

	}

	displayRules() {
		console.log("Welcome to Rock-Paper-Scissors-Lizard-Spock!");
		console.log("You may choose from the following gestures: " + this.objectToArray().toString());
		console.log("Two players will pick a gesture with which to battle their opponent.");
		console.log("Player 1 may choose to play against another player or the computer.")
		console.log("If the first player chooses to play against the computer, the computer will choose its gestures at random.");
		console.log("The match will consist of 3 rounds.");
		console.log("The first player to win at least 2 rounds is the winner of the match.")
	}

	displayGameWinner() {
		if(this.playerOne.score > this.playerTwo.score) {
		  console.log(this.playerOne.name + " wins this game!" + "\n");
		}
		else {
		  console.log(this.playerTwo.name + " wins this game!" + "\n");
		}
	 }
	
	validateUserGesture(gesture) {
		if (this.objectToArray().includes(gesture)) {
			return true;
		}
		else {
			return false;
		}
	}

	objectToArray() {
		let simpleArray = [];
		for (let i = 0; i < this.gestures.length; i++) {
			simpleArray.push(Object.values(this.gestures[i]));
		}
		simpleArray = simpleArray.toString().split(",");
		return simpleArray;
	}

	compareGestures(gesture1, gesture2) {
		let actions1 = ["crushes", "covers", "cuts", "poisons", "smashes"];
		let defeats1 = ["lizard", "rock", "paper", "spock", "scissors"];
		let actions2 = ["crushes", "disproves", "decapitates", "eats", "vaporizes"];
		let defeats2 = ["scissors", "spock", "lizard", "paper", "rock"];
		if (this.objectToArray().indexOf(gesture1) === this.objectToArray().indexOf(gesture2)) {
			console.log("You have both chosen " + gesture1 + ". Please repeat the round.")
			prompt();
		}
		else if (this.objectToArray().indexOf(gesture1) === defeats1.indexOf(gesture2)) {
			this.playerOne.score ++;
			console.log(gesture1 + " " + actions1[this.objectToArray().indexOf(gesture1)] + " " + gesture2 + ".  " + this.addColor(Color.FgGreen, "Player 1", Color.Reset) + " wins this round!" + "\r\n");
		}
		else if (this.objectToArray().indexOf(gesture1) === defeats2.indexOf(gesture2)) {
			this.playerOne.score ++;
			console.log(gesture1 + " " + actions2[this.objectToArray().indexOf(gesture1)] + " " + gesture2 + ".  " + this.addColor(Color.FgGreen, "Player 1", Color.Reset) + " wins this round!" + "\r\n");
		}
		else if (this.objectToArray().indexOf(gesture2) === defeats1.indexOf(gesture1)) {
			this.playerTwo.score ++;
			console.log(gesture2 + " " + actions1[this.objectToArray().indexOf(gesture2)] + " " + gesture1 + ".  " + this.addColor(Color.FgGreen, "Player 2", Color.Reset) + " wins this round!" + "\r\n");
		}
		else {
			this.playerTwo.score ++;
			console.log(gesture2 + " " + actions2[this.objectToArray().indexOf(gesture2)] + " " + gesture1 + ".  " + this.addColor(Color.FgGreen, "Player 2", Color.Reset) + " wins this round!" + "\r\n");
		}
	}

	askRepeatGame() {
		console.log("Would you like to play again? Enter 'yes' to begin a new game or type 'exit' button to stop playing.");
		let repeatGame = prompt();
		if (repeatGame.trim().toLowerCase() === 'exit') {
			console.log("Goodbye!");
			return;
		}
		else {
			while (repeatGame.trim().toLowerCase() !== "exit" && repeatGame.toLowerCase().trim() !== "yes") {
				console.log("Your response was invalid. Please enter 'yes' to begin a new game or 'exit' to stop playing.");
				repeatGame = prompt();
			}
			if (repeatGame.trim().toLowerCase() === "exit") {
				console.log("Goodbye!");
				return;
			}
			else if (repeatGame.toLowerCase().trim() === "yes") {
				let additionalGame = new Game();
				additionalGame.runGame();
			}
		}
	}

	cleanResponse(str) {
		return str.toLowerCase().trim();
	}

	addColor(color, string, reset) {	// Example: FgGreen === "\x1b[32m"
		return (color + string + reset);
	}
}

/*====================================================================*/

module.exports = {
   Game: Game
}