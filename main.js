'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' '],
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
	console.log('   0  1  2');
	console.log('0 ' + board[0].join(' | '));
	console.log('  ---------');
	console.log('1 ' + board[1].join(' | '));
	console.log('  ---------');
	console.log('2 ' + board[2].join(' | '));
};

//Declaring a function that determines the winner horizontally
const horizontalWin = () => {
	if (
		(board[0][0] == 'X' && board[0][1] == 'X' && board[0][2] == 'X') ||
		(board[1][0] == 'X' && board[1][1] == 'X' && board[1][2] == 'X') ||
		(board[2][0] == 'X' && board[2][1] == 'X' && board[2][2] == 'X') ||
		(board[0][0] == 'O' && board[0][1] == 'O' && board[0][2] == 'O') ||
		(board[1][0] == 'O' && board[1][1] == 'O' && board[1][2] == 'O') ||
		(board[2][0] == 'O' && board[2][1] == 'O' && board[2][2] == 'O')
	)
		return true;
	// Your code here to check for horizontal wins
};

//Declaring a function that determines the winner vertically
const verticalWin = () => {
	if (
		(board[0][0] == 'X' && board[1][0] == 'X' && board[2][0] == 'X') ||
		(board[0][1] == 'X' && board[1][1] == 'X' && board[2][1] == 'X') ||
		(board[0][2] == 'X' && board[1][2] == 'X' && board[2][2] == 'X') ||
		(board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == 'O') ||
		(board[0][1] == 'O' && board[1][1] == 'O' && board[2][1] == 'O') ||
		(board[0][2] == 'O' && board[1][2] == 'O' && board[2][2] == 'O')
	)
		return true;
	// Your code here to check for vertical wins
};
//Declaring a function that determines the winner diagonally
const diagonalWin = () => {
	if (
		(board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') ||
		(board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X') ||
		(board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O') ||
		(board[0][2] == 'O' && board[1][1] == 'O' && board[2][0] == 'O')
	)
		return true;
	// Your code here to check for diagonal wins
};

//Declaring a function that determines when an 'X' or an 'O' is used per player turn
const changeMarker = () => {
	// if (playerTurn == 'X') {
	// 	playerTurn = 'O';
	// } else {
	// 	playerTurn = 'X';
	// }
	playerTurn === 'X' ? (playerTurn = 'O') : (playerTurn = 'X');
};

//Checking for win horizontally, vertically amd diagonally.  If no winner, it will change
//the marker and proceed.
const checkForWin = () => {
	if (horizontalWin() || verticalWin() || diagonalWin()) {
		return true;
	} else {
		return false;
	}
	// Your code here call each of the check for types of wins
};

const reset = () => {
	board = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' '],
	];
};

//Game Board function that determines if a space is empty, will prompt a player for
// their marker to place, will then change the marker according to player turn and
//check for a win.  If not a win, the marker will change and it will be the next player
//turn.  If space is occupied, a message will appear stating the space is taken.
const ticTacToe = (row, column) => {
	if (board[row][column] == ' ') {
		board[row][column] = playerTurn;
		if (checkForWin()) {
			console.log(`Congrats, ${playerTurn} wins! `);
			reset();
		} else {
			changeMarker();
		}
	} else {
		console.log('Space is taken. Please try again');
	}
	// Your code here to place a marker on the board
	// then check for a win
};

const getPrompt = () => {
	printBoard();
	console.log("It's Player " + playerTurn + "'s turn.");
	rl.question('row: ', (row) => {
		rl.question('column: ', (column) => {
			ticTacToe(row, column);
			getPrompt();
		});
	});
};

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {
	describe('#ticTacToe()', () => {
		it('should place mark on the board', () => {
			ticTacToe(1, 1);
			assert.deepEqual(board, [
				[' ', ' ', ' '],
				[' ', 'X', ' '],
				[' ', ' ', ' '],
			]);
		});
		it('should alternate between players', () => {
			ticTacToe(0, 0);
			assert.deepEqual(board, [
				['O', ' ', ' '],
				[' ', 'X', ' '],
				[' ', ' ', ' '],
			]);
		});
		it('should check for vertical wins', () => {
			board = [
				[' ', 'X', ' '],
				[' ', 'X', ' '],
				[' ', 'X', ' '],
			];
			assert.equal(verticalWin(), true);
		});
		it('should check for horizontal wins', () => {
			board = [
				['X', 'X', 'X'],
				[' ', ' ', ' '],
				[' ', ' ', ' '],
			];
			assert.equal(horizontalWin(), true);
		});
		it('should check for diagonal wins', () => {
			board = [
				['X', ' ', ' '],
				[' ', 'X', ' '],
				[' ', ' ', 'X'],
			];
			assert.equal(diagonalWin(), true);
		});
		it('should detect a win', () => {
			ticTacToe(0, 0);
			ticTacToe(0, 1);
			ticTacToe(1, 1);
			ticTacToe(0, 2);
			ticTacToe(2, 2);
			assert.equal(checkForWin(), true);
		});
	});
} else {
	getPrompt();
}
