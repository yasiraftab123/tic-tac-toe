const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach(function(box,index){
        box.innerText="";
        // box.style.PointerEvents="all";
        // box.classList.remove(".win");
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    });
    gameInfo.innerText=`Current Player ${currentPlayer}`;
    newGameBtn.classList.remove("active");
}
initGame();

function swapTurn()
{
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else
    {
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPositions.forEach(function(position){

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
         (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) 
        {
            answer=gameGrid[position[0]];
            boxes.forEach(function(box){
                box.style.pointerEvents="none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer!=="")
    {
        gameInfo.innerText=`Winner is ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let count=0;
    gameGrid.forEach(function(box){
        if(box!=="")
        count++;
    });
    if(count===9)
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]=="")
    {
        gameGrid[index]=currentPlayer;
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach(function(box,index){
    box.addEventListener('click',function(){
        handleClick(index);
    });
});

newGameBtn.addEventListener('click',initGame);
