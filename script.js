const cells = document.querySelectorAll(".cell");
const btn = document.querySelector("button");
const board = document.querySelector(".board");
const turn = document.querySelector(".turn");
const xClass = "x";
const oClass = "o";
let oTurn;
const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();

function startGame(){
    oTurn = true;
    turn.textContent =`Current turn is: ${oClass}`;
    cells.forEach(cell=>{
        cell.classList.remove("x"); 
        cell.classList.remove("o");
        board.classList.remove("boardDisabled");
        cell.addEventListener("click", handleClick, {once:true})
    })

}   

function handleClick(e){
    const cell = e.target
    const currentClass = oTurn ? oClass : xClass;
    addMark(cell,currentClass);
    if(checkWin(currentClass)){
        gameOver();
    };
    switchTurn();
    restart();
}

function addMark(cell,currentClass){
    cell.classList.add(currentClass);
} 

function switchTurn(){
    oTurn = !oTurn;
    turn.textContent = oTurn ? `Current turn is: ${oClass}` : `Current turn is: ${xClass}`
}

function restart(){
     btn.addEventListener("click", startGame);
}

function checkWin(currentClass){
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function gameOver(){
    const winner = oTurn ? alert("O's wins") : alert("X's wins");
    board.classList.add("boardDisabled");
}
