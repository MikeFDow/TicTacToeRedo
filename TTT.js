// Module for Game Board

const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // create 2D array in console
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // method for getting entire board for UI to render
    const getboard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }


    // playMove function for checking available spaces and if move is valid,
    //  add arguments

    // !!check that availableCells is working after changing intial value of indexes from 0

    const playMove = () => {
        const availableCells = board.filter((row) => row.map((cell) => cell.getValue().value = 0));
        // if statement for invalid move check goes here
        console.log(availableCells);
    }

    return {
        getboard,
        printBoard,
        playMove
    }
})(); // may need to change this from IIFE!





// cell represents one square on board
function Cell() {
    let value = 0;   // initial value

    // accept move to change value of cell
    const addToken = (player) => {
        value = player;
        return value;
    }

    //retrieve current value of cell through closure
    const getValue = () => value;

    return {
        getValue,
        addToken
    }
}


// GameController module/function. Controls flow of game, win logic

// NOTE on switchplayer function: returns player two when called but when getActiveplayer
// is called, still player one

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {

    

    const players = [
        {
            name : playerOneName,
            token : 1
        },
        {
            name : playerTwoName,
            token : 2
        }
    ];

    let activePlayer = players[0];

    
/*
    const switchPlayerTurn = () => {  // ternary operator
        return activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
*/
    function switchPlayer() {
        if (activePlayer = players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
        return activePlayer;
    };

    const getActivePlayer = () => activePlayer; 

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn'`);
    };

    return {
        getActivePlayer,
        switchPlayer,
        players,
        printNewRound
    };            // temporary, players will be included in future functions that
                   // will be returned instead
}