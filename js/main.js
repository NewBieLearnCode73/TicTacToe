import {
    getCellElementAtIdx,
    getCellElementList,
    getCurrentTurnElement,
    getGameStatusElement,
    getReplayButtonElement
} from "./selectors.js";
import {TURN, CELL_VALUE, GAME_STATUS} from "./constants.js";
import {checkGameStatus} from "./utils.js";

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
let isGameEnded = false;
let cellValues = new Array(9).fill("");

function toggleTurn(){
    currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;

    const currentTurnElement = getCurrentTurnElement();
    if(currentTurnElement){
        currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS);
        currentTurnElement.classList.add(currentTurn);
    }
}

function updateGameStatus(newGameStatus){
    gameStatus = newGameStatus;

    const gameStatusElement = getGameStatusElement();
    if(!gameStatusElement) return

    gameStatusElement.textContent = newGameStatus
}

function showReplayButton(){
    const replayButton = getReplayButtonElement();
    if(replayButton) replayButton.classList.add('show');
}

function hightlightWinCell(winPositions){
    if(!Array.isArray(winPositions) || winPositions.length !== 3){
        throw new Error("Invalid win position");
    }

    for(const position of winPositions){
        const cell = getCellElementAtIdx(position);
        if(cell) cell.classList.add('win');
    }
}


function handleCeilClick(ceil, index){
    const isClicked = ceil.classList.contains(TURN.CROSS) || ceil.classList.contains(TURN.CIRCLE);
    const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
    if(isClicked || isEndGame){
        return;
    }


    // set selected cell
    ceil.classList.add(currentTurn);

    // update cellValues
    cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

    // toggle turn
    toggleTurn();

    // check game status
    const game = checkGameStatus(cellValues);
    switch (game.status) {
        case GAME_STATUS.ENDED:{
            updateGameStatus(game.status);
            showReplayButton();
            break;
        }

        case GAME_STATUS.X_WIN:
        case GAME_STATUS.O_WIN: {
            updateGameStatus(game.status);
            showReplayButton();
            hightlightWinCell(game.winPositions);
            break;
        }


        default:
            // playing
    }


    console.log('click', ceil, index);
}

function initCeilElementList(){
    // Lấy được danh sách
    const cellElementList = getCellElementList();

    // Duyệt qua danh sách, gắn sự kiện
    cellElementList.forEach((cell, index)=>{
        cell.addEventListener('click' , ()=> handleCeilClick(cell, index))
    })
}

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */

(
    ()=>{
        initCeilElementList();
    }
)();