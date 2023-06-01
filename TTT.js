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
        return boardWithCellValues;
        
    }


    // playMove function for checking available spaces and if move is valid,
    //  add arguments

    // !!check that availableCells is working after changing intial value of indexes from 0

    const playMove = (row, column, player) => {
        const availableCells = board.filter((row) => row.map((cell) => cell.getValue().value = 0));
        // if statement for invalid move check goes here
        board[row][column].addToken(player);
    };

    return {
        getboard,
        printBoard,
        playMove,
        board
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
    

    const switchPlayerTurn = () => {  // ternary operator
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };


    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn'`);
    };

    function endGame () {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gameBoard.board[r][c].addToken(0);
            }
        }
        
    }

    function checkLine (a,b,c) {
        return ((a != 0) && (a == b) && (a == c));
    }

    function checkWinner (bd) {      // win logic function, what is bd in argument? the array?
        let result = 0;
        // check down
        for (c = 0; c < 3; c++)
            if (checkLine(bd[0][c], bd[1][c], bd[2][c])) {
                
                result = bd[0][c]; 
            
            }  
                        
        // check right
        for (r = 0; r < 3; r++)
             if (checkLine(bd[r][0], bd[r][1], bd[r][2])) {
                console.log("endgame");
                return bd[r][0];
            }

        //check diagonal down right
        if (checkLine(bd[0][0], bd[1][1], bd[2][2])) {
            console.log("endgame");
            return bd[0][0];
        }

        //check diagonal down left
        if (checkLine(bd[0][2], bd[1][1], bd[2][0])) {
            console.log("end game");
            return bd[0][2];
        }

        if (result == 1) {
            console.log("player one wins");
            endGame();
        } else if (result == 2) {
            console.log("player two wins");
            endGame();
        }
                        
                        
        return result;          
    };

    const playRound = (row, column) => {
        gameBoard.playMove(row, column, getActivePlayer().token);

        

        checkWinner(gameBoard.printBoard());
        

        switchPlayerTurn();
        printNewRound();
    }

    return {
        activePlayer,
        switchPlayerTurn,
        getActivePlayer,
        players,
        printNewRound,
        playRound,
        checkWinner,
        endGame
    };            // temporary, players will be included in future functions that
                   // will be returned instead
}

const gc = gameController();

/*
// check
gc.playRound(0,2);  //p1
gc.playRound(1,0); //p2
gc.playRound(1,1); //p1
gc.playRound(1,2); //p2
gc.playRound(2,0); //p1
*/




function checkArray (a) {
    for (r = 0; r < 3; r++)
        for (c = 0; c < 3; c++)
            console.log(a[r][c], a[r+1][c], a[r+2][c]);  
}