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
		this.playerOne = new Player();
		this.playerTwo = new Player();

		this.gestures = [];

		this.gestures.push(new Gesture("Rock"));
		this.gestures.push(new Gesture("Paper"));
		this.gestures.push(new Gesture("Scissors"));
		this.gestures.push(new Gesture("Lizard"));
		this.gestures.push(new Gesture("Spock"));

		this.numberOfGames = 0;
	}

	runGame() {
		this.displayRules();
	}

	displayRules() {
		console.log("Welcome to Rock-Paper-Scissors-Lizard-Spock!");
		console.log("Two players will pick a gesture with which to battle their opponent.");
		console.log("If the first player chooses to play against the computer, the computer will choose its gestures at random.");
		console.log("The match will consist of 3 rounds.");
		console.log("The first player to win at least 2 rounds is the winner of the match.")
	}
}

/*====================================================================*/

class Player {
	constructor(name) {
		this.score = 0;
		this.name = name;
	}

	chooseGesture(gesture) {
		let choice = prompt("Please select a gesture/item.");
	}
}

class Human extends Player {
	constructor(name) {

	}
}

class Computer extends Player {
	constructor(name) {

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
