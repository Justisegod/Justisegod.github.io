//Импортируем Chess API
// let ChessWebAPI = require('chess-web-api');

// let chessAPI = new ChessWebAPI();




document.addEventListener('DOMContentLoaded', function () {
    function drawBoard(){
        const header = document.querySelector('.header');
        const footer = document.querySelector('.footer');
        const board = document.querySelector('.board');
        const game = document.querySelector('.game');
        // const gameHeight = game.clientHeight - header.clientHeight - footer.clientHeight;
        const gameContainer = document.querySelector('.game__container');
        let gameContainerWSize = gameContainer.clientWidth;
    
        function setBoardSize(width = gameContainer.clientWidth, height = gameContainer.clientWidth) {
            board.style.width = `${width}px`;
            board.style.height = `${height}px`;
        }
        if(board.clientWidth < 600) {
            setBoardSize();
        }
    
    
    
    }
    drawBoard();
    
   

    function countIt(seconds = 0, minutes = 0) {
      // id таймера
      let timerId = null;
    
      // получаем элементы, содержащие компоненты даты
      const $minutes = document.querySelector('.timer__minutess');
      const $seconds = document.querySelector('.timer__secondss');
      //узнаём полное количество секунд, 
      let allSeconds = minutes * 60 + seconds;
      //делим круг таймера на 4 части
      let oneHalfOfRound = allSeconds / 4;
      //половинки счётчика 
      let round = [
        document.querySelector('.timer-body__item--two'),
        document.querySelector('.timer-body__item--four'),
        document.querySelector('.timer-body__item--three'),
        document.querySelector('.timer-body__item--one'),
      ]
      //index for round 
      let roundIndex = 0;

      function countdownTimerr() {
        seconds--;
        allSeconds--;

        if(minutes === 0 & seconds <= 0) {
          clearInterval(timerId);
          paintAllPeacesBack();
          console.log('the Time is over');
        }
        if(seconds <= 0 & minutes > 0) {
          seconds = 60;
          minutes--;
        }
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;

        //Обновляем части счётчика, закрашивая в белый
        if(allSeconds % Math.round(oneHalfOfRound) == 0 & allSeconds > 0) {
          paintPeace(roundIndex++,'#fff');
        }
      }
      function paintPeace(index ,hex = '#fff') {
        if(index >= 4) {
          index = 0;
        }

        round[index].style.background = `${hex}`;
        console.log(`Painted by ${hex}`, index, allSeconds, oneHalfOfRound, Math.round(oneHalfOfRound));
      }
      function paintAllPeacesBack() {// закрашивает все части после конца таймера
        for(let i = 0; i < 4; i++) {
          paintPeace(i, 'transparent');
        }
      }
      
      timerId = setInterval(countdownTimerr, 1000);
    }
    countIt(10, 0);
  });
  
































// const timer = document.querySelector('.timer-body__counter');
// function startCounter(seconds = 0, minutes = 0) {
    
//     // if(minutes < 10) {
//     //     minutes = '0' + minutes;
//     // }
//     // if(seconds < 10) {
//     //     seconds = '0' + seconds;
//     // }

//     function printTime() {
//        console.log(timer.textContent = `${minutes}:${seconds}`);
//     }

//     function timerUpdate() {
//         if(seconds > 0) {
//             printTime();
//         }
//         if(seconds <= 0 && minutes > 0) {
//             minutes--;
//             seconds = 60;
//             printTime();
//         }else{
//             console.log('timer was stopped');
//         }

//         printTime();
//     }
//     let key = setInterval(timerUpdate, 1000);
// }
// startCounter();