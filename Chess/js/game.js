//Импортируем Chess API
// let ChessWebAPI = require('chess-web-api');

// let chessAPI = new ChessWebAPI();




document.addEventListener('DOMContentLoaded', function () {
    
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
  

  class ChessApi {

    constructor() {
      this.maxGameDurationMinutes = 60;
      this.arrayCells = [];
      this.btnSettings = document.querySelector('.game__header-settings');
      this.gameSettingsMenu = document.querySelector('.menu');
    }
    
    drawBoard(){
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
    
    parseAllCells() {
      const arrayOfRows = [
         document.querySelectorAll('.board__item--A'),
         document.querySelectorAll('.board__item--B'),
         document.querySelectorAll('.board__item--C'),
         document.querySelectorAll('.board__item--D'),
         document.querySelectorAll('.board__item--E'),
         document.querySelectorAll('.board__item--F'),
         document.querySelectorAll('.board__item--J'),
         document.querySelectorAll('.board__item--H'),
      ]
      let previousCell = null;

      for(let row of arrayOfRows) {// get row
        // console.log(row);
        for(let cell of row) {
          // console.log(cell);
          cell.addEventListener('click', () => {
            this.unselectCell(previousCell);
            this.selectCell(cell);
            previousCell = cell;
          });
        }
      }
    }
    selectCell(cell) {
      let cellClasses = cell.getAttribute('class').split(' ');

      if(!cell.hasAttribute('selected--cell')){
        cell.classList.add(`selected--cell`);
      }else{
        this.unselectCell(cell);
      }

      console.log(cell, cellClasses, cell.hasAttribute('selected-cell'));
      return cell;
    }
    unselectCell(cell) {
      if(cell != null) {
        cell.classList.remove('selected--cell');
      }
    }
    bindMenu() {
      const title = document.querySelector('.game__header-title');
      const defaultTitle = title.textContent;
      let classList = this.gameSettingsMenu.className.split(' ');// got classlist
      let result = classList.includes('menu-active');

      this.btnSettings.addEventListener('click', () => {
        if(!result) {
          this.gameSettingsMenu.classList.add('menu-active');
          this.changeTextInElement(title, 'Настройки');
          result = true;
        }else{
          this.gameSettingsMenu.classList.remove('menu-active');
          this.changeTextInElement(title, defaultTitle);
          result = false;
        }
        console.log(result)
      });
    }
    changeTextInElement(element, text) {
      element.textContent = `${text}`;
    }
    // seclectCell(count = 'all') {
    //   let countToSelect = count;

    //   if(count === 'all') 
    // } 
   
}

  
  const game = new ChessApi();

  game.drawBoard();//устанавливаем размер игральной доски
  game.parseAllCells();//вешает на все ячейки евент
  game.bindMenu();//заставляет меню работать





























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