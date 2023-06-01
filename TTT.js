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

    function checkLine (a,b,c) {
        return ((a != 0) && (a == b) && (a == c));
    }

    function checkWinner (bd) {      // win logic function, what is bd in argument? the array?
        
            // check down
            /*
            for (r = 0; r < 3; r++)
                for (c = 0; c < 3; c++)
                    if (checkLine(bd[r][c], bd[r+1][c], bd[r+2][c])) {
                        return bd[r][c]; 
                    }
                    
            
           
                    
                // check right, works but not if down check is enabled
            for (r = 0; r < 3; r++)
                for (c = 0; c < 3; c++)
                    if (checkLine(bd[r][c], bd[r][c+1], bd[r][c+2])) {
                        return bd[r][c];
                    }
                    
               */  //check down
                    for (c = 0; c < 3; c++)
                        if (checkLine(bd[0][c], bd[1][c], bd[2][c])) {
                            return bd[0][c]; 
                        }  
                    
                    // check right
                    for (r = 0; r < 3; r++)
                        if (checkLine(bd[r][0], bd[r][1], bd[r][2])) {
                        return bd[r][0];
                        }
                    
                    
            return 0;          
    };

    const playRound = (row, column) => {
        gameBoard.playMove(row, column, getActivePlayer().token);

        


        

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
        checkWinner
    };            // temporary, players will be included in future functions that
                   // will be returned instead
}

const gc = gameController();

// right check
gc.playRound(0,0);  //p1
gc.playRound(1,0); //p2
gc.playRound(0,1); //p1
gc.playRound(2,2); //p2
gc.playRound(0,2); //p1

/*
// down check
gc.playRound(0,0);  //p1
gc.playRound(0,1); //p2
gc.playRound(1,0); //p1
gc.playRound(2,2); //p2
gc.playRound(2,0); //p1

*/

function checkArray (a) {
    for (r = 0; r < 3; r++)
        for (c = 0; c < 3; c++)
            console.log(a[r][c], a[r+1][c], a[r+2][c]);  
}