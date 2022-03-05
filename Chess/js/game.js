


function drawBoard(){
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const board = document.querySelector('.board');
    const game = document.querySelector('.game');
    const gameHeight = game.clientHeight - header.clientHeight - footer.clientHeight;
    const gameContainer = document.querySelector('.game__container');
    let gameContainerWSize = gameContainer.clientWidth;

    function setBoardSize(width = gameContainer.clientWidth, height = gameContainer.clientWidth) {
        board.style.width = `${width}px`;
        board.style.height = `${height}px`;
    }
    if(board.clientWidth < 600) {
        setBoardSize();
    }



    console.log(gameHeight);
}
drawBoard();