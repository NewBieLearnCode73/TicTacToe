import {getCellElementList, getCurrentTurnElement} from "./selectors.js";
import {TURN} from "./constants.js";

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
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

function handleCeilClick(ceil, index){
    const isClicked = ceil.classList.contains(TURN.CROSS) || ceil.classList.contains(TURN.CIRCLE);
    if(isClicked){
        return;
    }


    // set selected cell
    ceil.classList.add(currentTurn);
    // toggle turn
    toggleTurn();


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