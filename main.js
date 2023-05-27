const gameBoard=document.querySelector('#gameboard');
const infoDisplay=document.querySelector('#info');
const startCells=["","","","","","","","",""];

let turn="circle";
infoDisplay.textContent=`It is ${turn}'s turn`;


function createGameBoard(){
    startCells.forEach((cell,index)=>{
        const cellElement=document.createElement('div');
        cellElement.classList.add("square");
        cellElement.id=index;
        cellElement.addEventListener('click',handleCellClick);
        gameBoard.append(cellElement);
    })    
}

createGameBoard();   

function handleCellClick(e){
    const display=document.createElement('div');
    display.classList.add(turn);
    e.target.append(display);
    if(turn==="circle"){turn="cross";}
    else{turn="circle";}
    infoDisplay.textContent=`It is ${turn}'s turn`;
    e.target.removeEventListener('click',handleCellClick); 
    checkScore();
}

