"use strict";

//Rock-Paper-Scissors-Lizard-Spock Game in Node.JS

// two player game
// user chooses to play against either the computer or another player
// player 1 choose a gesture/item
// validate input from player 1
// players 2 or the computer choose a gesture
// validate input from player 2 (validation not needed if playing against the computer)
// compare the gestures
// determine/display the winner
// repeate 2 more times for a total of "best out of 3"

const prompt = require("prompt-sync")();
const game = require("./gameClass");
const Game = game.Game;

let newGame = new Game();
newGame.runGame();