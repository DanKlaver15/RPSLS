"use strict";

const player = require("./playerClass");
const Player = player.Player;

/*======================================================================*/

class Computer extends Player {
	constructor(name) {
		super(name);
		this.score = 0;
	}

	generateRandomNumber() {
		let randomNumber = Math.floor(Math.random() * 5);
		return randomNumber;
	 }
}

/*======================================================================*/

module.exports = {
   Computer: Computer
}