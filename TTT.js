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
    

    //retrieve current value of cell through closure
    const getValue = () => value;

    return {
        getValue,
    }
}