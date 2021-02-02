"use strict";

const player = require("./playerClass");
const Player = player.Player;

/*======================================================================*/

class Human extends Player {
	constructor(name) {
		super(name);
		this.score = 0;
	}
}

/*======================================================================*/

module.exports = {
   Human: Human
}