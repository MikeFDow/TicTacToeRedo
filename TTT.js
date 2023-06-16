// DOM and UI

const container = document.querySelector('.container');

const spaces = document.querySelectorAll('div.boardSpace');

const playerwinbox = document.querySelector('#playerwin');


// Module for Game Board

let moveCheck = "valid";

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
   


    // playMove function for checking available spaces and if move is valid

    const playMove = (row, column, player) => {
        // const availableCells = board.filter((row) => row.map((cell) => cell.getValue().value = 0));
        // if statement for invalid move check 
        if(gameBoard.printBoard()[row][column] === 0) {
            board[row][column].addToken(player);
            moveCheck = "valid";
        } else {
            console.log("invalid move");
            moveCheck = "invalid";
        };
    };

    return {
        getboard,
        printBoard,
        playMove,
        board,
        //printUIBoard
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
            token : "X"
        },
        {
            name : playerTwoName,
            token : "O"
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

    function popupShow () {
        document.getElementById("startover").style.visibility = "visible";
        document.getElementById("playerwin").style.visibility ="visible";
    };

    function endGame () {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gameBoard.board[r][c].addToken(0);
                
            }
        }
        spaces.forEach((div) => {
            div.textContent = "";
        });
        playerwinbox.textContent = "";
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
                
                result = bd[r][0];
            }

        //check diagonal down right
        if (checkLine(bd[0][0], bd[1][1], bd[2][2])) {
            
            result = bd[0][0];
        }

        //check diagonal down left
        if (checkLine(bd[0][2], bd[1][1], bd[2][0])) {
            
            result = bd[0][2];
        }

        if (result == "X") {
            console.log("player one wins");
            popupShow();
            playerwinbox.textContent = "Player One Wins";
        } else if (result == "O") {
            console.log("player two wins");
            popupShow();
            playerwinbox.textContent = "Player Two Wins";
        }
                        
                        
        return result;          
    };

    const playRound = (row, column) => {
        
        gameBoard.playMove(row, column, getActivePlayer().token);
        
        console.log(moveCheck);
        if(moveCheck === "valid") {

            

            // checkWinner(gameBoard.printBoard());
        

            switchPlayerTurn();
            printNewRound();
            
        } else {
            console.log("moveCheck is invalid");
            return;
        };
    }



    function detectSpace (div) {
        let clickedSpace = div.id;
        let row = 1;
        let column = 1;
        switch (clickedSpace) {
    
            case "one":
                row = 0;
                column = 0;
                break;
            case "two":
                row = 0;
                column = 1;
                break;
            case "three":
                row = 0;
                column = 2;
                break;
            case "four":
                row = 1;
                column = 0;
                break;
            case "five":
                row = 1;
                column = 1;
                break;
            case "six":
                row = 1;
                column = 2;
                break;
            case "seven":
                row = 2;
                column = 0;
                break;
            case "eight":
                row = 2;
                column = 1;
                break;
            case "nine":
                row = 2;
                column = 2;
                break;
        }
        gc.playRound(row, column);
        div.textContent = gameBoard.printBoard()[row][column];
        gc.checkWinner(gameBoard.printBoard());
        
    }
    
    
    
    spaces.forEach((div) => {
        div.addEventListener('click', () => {
            detectSpace(div);
            
        });
    });



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
gc.playRound(1,0);  //p1
gc.playRound(2,2); //p2
gc.playRound(0,1); //p1
gc.playRound(1,1); //p2
gc.playRound(2,0); //p1

*/



