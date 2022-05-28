const statusDisplay = document.querySelector('.status');

let gameActive = true;                                      //set game into active
let currentPlayer = "X";                                    //player 1 will play as X
let gameState = ["", "", "", "", "", "", "", "", ""];       

const winningMessage = () => `Winner: Player ${currentPlayer}!`;    //display message announcing the winner
const drawMessage = () => `It's a draw!`;                           //display message in case of draw (tie)
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;  //mechanics of the game

statusDisplay.innerHTML = currentPlayerTurn();               

//winning combinations (base on the given data cell index )
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//sets and returns the cell clicked by currentPlayer to HTML
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//changing of currentPlayer, modify and display
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//validates the winning condition (results) of the game
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];      //traverse the winning combination
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //if none of the players gets the winning condition, continue
        if (a === '' || b === '' || c === '') {
            continue;
        }
        //detects a winning combination
        if (a === b && b === c) {
            //change color for winning cells
            document.querySelectorAll('.cell').forEach(
                function (cell) {
                    const cellIndex = parseInt(cell.getAttribute('data-cell-index')); //returns the value in the cell
                    if (winCondition.includes(cellIndex)) {
                        cell.style.backgroundColor = "#2a1c53";
                        cell.style.color = "white";
                        cell.style.transition = "all 1s";
                    };
                }
            );
            //set roundWon to TRUE
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(); //display the winning message
        gameActive = false;         //stop the game, unable the cells
        return;
    }

    //for draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();    //display draw message
        gameActive = false;     //stop the game, unable the cells
        return;
    }

    handlePlayerChange();
}

//clicking the cells
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //returns the value in cell

    //enables the cell if the game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//restart the game after player won the game (restart button)
function handleRestartGame() {
    gameActive = true;          //set game to active again
    currentPlayer = "X";        //set player 1 to play as X
    gameState = ["", "", "", "", "", "", "", "", ""];   //reset the gameState
    statusDisplay.innerHTML = currentPlayerTurn();      //changing of players
    //returns all cell elements and clear the display
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
//returns cell elements and enables the clicking
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame); //enables to restart again
