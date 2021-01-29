"use strict";
//Rock-Paper-Scissors-Lizard-Spock Game

// two player game
// user chooses to play against either the computer or another player
// player 1 choose a gesture/item
// validate input from player 1
// players 2 or the computer choose a gesture
// validate input from player 2 (validation not needed if playing against the computer)
// compare the gestures
// determine/display the winner
// repeate 2 more times for a total of "best out of 3"

class Game {
	constructor() {
		this.playerOne = new Player("Player 1");	//Can I use an if statement here to determine if I need a new Human or Computer subclass?
		this.playerTwo = new Player("Player 2");	//Or can I declare new human/computer subclasses in the runGame() method?

		this.gestures = [];

		this.gestures.push(new Gesture("rock"));
		this.gestures.push(new Gesture("paper"));
		this.gestures.push(new Gesture("scissors"));
		this.gestures.push(new Gesture("lizard"));
		this.gestures.push(new Gesture("spock"));

	}

	runGame() {
		
		this.displayRules();

		let numPlayers = parseInt(prompt("Please enter the number (1-2) of human players"));
		while (numPlayers !== 1 && numPlayers !== 2) {
			numPlayers = parseInt(prompt("I'm sorry but your entry was invalid.  Please enter either a '1' or a '2' for the number of human players that will be playing."));
		}

		while (this.playerOne.score < 2 || this.playerTwo.score < 2) {
			if (numPlayers = 1) {
				let result1 = prompt("Player 1, please choose a gesture.").toLowerCase().trim();
				while (!this.validateUserGesture(result1)) {
					console.log("Your entry was invalid.");
					result1 = prompt("Player 1, please choose a gesture.").toLowerCase().trim();;
				}	
			}

			if (numPlayers = 2) {
				let result1 = prompt("Player 1, please choose a gesture.").toLowerCase().trim();
				while (!this.validateUserGesture(result1)) {
					console.log("Your entry was invalid.");
					result1 = prompt("Player 1, please choose a gesture.").toLowerCase().trim();;
				}
				let result2 = prompt("Player 2, please choose a gesture.").toLowerCase().trim();
				while (!this.validateUserGesture(result2)) {
					console.log("Your entry was invalid.");
					result2 = prompt("Player 2, please choose a gesture.").toLowerCase().trim();;
				}
				this.compareGestures(result1, result2);
			}
		}


		this.displayGameWinner();
	}

	displayRules() {
		console.log("Welcome to Rock-Paper-Scissors-Lizard-Spock!");
		console.log("Two players will pick a gesture with which to battle their opponent.");
		console.log("Player 1 may choose to play against another player or the computer.")
		console.log("If the first player chooses to play against the computer, the computer will choose its gestures at random.");
		console.log("The match will consist of 3 rounds.");
		console.log("The first player to win at least 2 rounds is the winner of the match.")
	}

	displayGameWinner() {
		if(this.playerOne.score > this.playerTwo.score) {
		  console.log(this.playerOne.name + " wins this game!");
		}
		else {
		  console.log(this.playerTwo.name + " wins this round!");
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
		let defeats1 = ["scissors", "rock", "paper", "spock", "scissors"];
		let defeats2 = ["lizard", "spock", "lizard", "paper", "rock"];
		if (this.gestures.indexOf(gesture1) === defeats1.indexOf(gesture2) || this.gestures.indexOf(gesture1) === defeats2.indexOf(gesture2)) {
			this.playerOne.score ++;
			console.log("Player 1 wins this round!");
		}
		else {
			this.playerTwo.score ++;
			console.log("Player 2 wins this round!");
		}
	}
}

/*====================================================================*/

class Player {
	constructor(name) {
		this.name = name;
		this.score = 0;
	}

	chooseGesture(gestureArray) {
		let choice = prompt("Please select a gesture.");
		return choice;
	}
	
}

class Human extends Player {
	constructor(name) {
		super(name);
		this.score = 0;
	}
}

class Computer extends Player {
	constructor(name) {
		super(name);
		this.score = 0;
	}

	generateRandomNumber() {
		let randomNumber = Math.floor(Math.random() * this.numberOfSides) + 1;
		return randomNumber;
	 }
}

/*====================================================================*/

class Gesture {
	constructor(name) {
		this.name = name;
	}
}

/*====================================================================*/

let game = new Game();
game.runGame();
