const playSpace = (function(){
    const buildSpace = () => {
        const tiles = document.querySelectorAll('.space-tile');
        for (i = 0; i < tiles.length; i++){
            tiles[i].addEventListener('click', tileClicked);
        }
    };

    const clearSpace = () => {
        const tiles = document.querySelectorAll('.space-tile');
        document.getElementById('info').textContent = `It's Player ${playerX.getSign()}'s Turn`;
        turnCount = 0;
        for (i = 0; i < tiles.length; i++){
            tiles[i].textContent = '';
        }
    };

    let turnCount = 0;

    const getTurn = () => turnCount;

    const nextTurn = () => turnCount++;

    return {buildSpace, clearSpace, getTurn, nextTurn};
})();

function Player(sign){
    const getSign = () => sign;

    let playedTiles = [];

    const tilesOwned = () => playedTiles.length;

    const addTile = (index) => {
        return playedTiles.push(Number.parseInt(index));
    };

    let hasWon = false;

    const playerWon = () => hasWon;

    const winCheck = () => {
        winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (win in winConditions){
            if (playedTiles.includes(winConditions[win][0]) && 
            playedTiles.includes(winConditions[win][1]) && 
            playedTiles.includes(winConditions[win][2])){
                document.getElementById('info').textContent = `Player ${sign} Wins`;
                hasWon = true;
                return true;
            }
        }
        return false;
    }

    const clearPlayer = () => {
        playedTiles = []
        hasWon = false;
    };

    return {getSign, addTile, winCheck, clearPlayer, tilesOwned, playerWon};
}

function turn(playerOne, playerTwo, event){
    if(!playerOne.playerWon() && !playerTwo.playerWon() && event.target.textContent === ''){
        playerOne.addTile(event.target.getAttribute('data-index'));
        event.target.textContent = playerOne.getSign();
        document.getElementById('info').textContent = `It's Player ${playerTwo.getSign()}'s Turn`;
        playerOne.winCheck();
        checkTie();
        playSpace.nextTurn();
    }
}

function tileClicked(event){
    if(playSpace.getTurn() % 2 === 0){
        turn(playerX, playerO, event);
    }else{
        turn(playerO, playerX, event);
    }
}

function checkTie(){
    const boardState = playerX.tilesOwned() + playerO.tilesOwned();
    if (boardState === 9 && playerX.winCheck() === false && playerO.winCheck() === false){
        document.getElementById('info').textContent = `It's A Tie`;
    }
}

function resetGame(){
    playerX.clearPlayer();
    playerO.clearPlayer();
    playSpace.clearSpace();
}

const playerX = Player('X');
const playerO = Player('O');
playSpace.buildSpace();
document.querySelector('.clear-btn').addEventListener('click', () => {resetGame()});