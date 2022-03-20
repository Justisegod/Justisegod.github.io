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
      
      this.board = {
        element : document.querySelector('.board'),
      }
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
         document.querySelectorAll('.board__item--G'),
         document.querySelectorAll('.board__item--H'),
      ]
      let previousCell = null;

      for(let row of arrayOfRows) {// get row
        // console.log(row);
        for(let cell of row) {
          // console.log(cell);
          this.arrayCells.push(cell);

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
      let result = cellClasses.includes('selected--cell');

      if(!result){
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
    createBoardObject() {
      let numberOfCell = '';
      let cellId = '';
      let combineName = '';

      for(let cell of this.arrayCells) {// Get cellID
        numberOfCell = cell.className.split(' ');
        numberOfCell = numberOfCell[0].split('--');
        cellId = numberOfCell[1];

        combineName = '.board__item--' + cellId;//Получаем имя класса елемента

        this.board[cellId] = {//Записываем в момент цикла свойства снизу
          node: document.querySelector(combineName),// елемент узел
          isEmpty : true,
          defaultFigure: null,

          currentFigure : {
            type : null,
          }
        };
        // console.log(combineName);
      }
      console.log(this.board);
    }
    changeCurrentPosition(cellId) {
      this.board[cellId].currentFigure = this.board[cellId].defaultFigure;
      this.board[cellId].isEmpty = false;
    }
    setDefaultFigurePosition() {
      let numberOfCell = '';
      let cellId = '';

      for(let cell of this.arrayCells) {
        numberOfCell = cell.className.split(' ');
        numberOfCell = numberOfCell[0].split('--');
        cellId = numberOfCell[1];
        
        switch (cellId) {//set Dark side
          case 'A8':
            console.log(this.board[cellId].node)
            this.board[cellId].defaultFigure = Black.createFigure('rook', this.board[cellId].node);
            this.changeCurrentPosition(cellId);

            break;
          case 'A7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'B8':
            this.board[cellId].defaultFigure = Black.createFigure('knight', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'B7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'C8':
            this.board[cellId].defaultFigure = Black.createFigure('bishop', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'C7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
            case 'D8':
              console.log(this.board[cellId].node)
              this.board[cellId].defaultFigure = Black.createFigure('queen', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
  
              break;
            case 'D7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'E8':
              this.board[cellId].defaultFigure = Black.createFigure('king', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'E7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'F8':
              this.board[cellId].defaultFigure = Black.createFigure('bishop', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'F7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'G8':
              this.board[cellId].defaultFigure = Black.createFigure('knight', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'G7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'H8':
              this.board[cellId].defaultFigure = Black.createFigure('rook', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
                
              break;
            case 'H7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
                
              break;
        
          default:
            break;
        }
        switch (cellId) {//set White side
          case 'A1':
            console.log(this.board[cellId].node)
            this.board[cellId].defaultFigure = White.createFigure('rook', this.board[cellId].node);
            this.changeCurrentPosition(cellId);

            break;
          case 'A2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'B1':
            this.board[cellId].defaultFigure = White.createFigure('knight', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'B2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'C1':
            this.board[cellId].defaultFigure = White.createFigure('bishop', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
          case 'C2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId);
            
            break;
            case 'D1':
              console.log(this.board[cellId].node)
              this.board[cellId].defaultFigure = White.createFigure('queen', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
  
              break;
            case 'D2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'E1':
              this.board[cellId].defaultFigure = White.createFigure('king', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'E2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'F1':
              this.board[cellId].defaultFigure = White.createFigure('bishop', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'F2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'G1':
              this.board[cellId].defaultFigure = White.createFigure('knight', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'G2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
              
              break;
            case 'H1':
              this.board[cellId].defaultFigure = White.createFigure('rook', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
                
              break;
            case 'H2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId);
                
              break;
        
          default:
            break;
        }
      }
    }
    
}


class BlackSide {
  constructor() {
    this.sideName = 'Black'; 
    this.counterId = 0;
    this.pawn = {
      src: `img/figures/b-pawn.webp`,
      type: 'pawn',
    };
    this.rook = {
      src: `img/figures/b-rook.webp`,
      type: 'rook',
    };
    this.knight = {
      src: `img/figures/b-horse.webp`,
      type: 'knight',
    };
    this.bishop = {
      src: `img/figures/b-bishop.webp`,
      type: 'bishop',
    };
    this.queen = {
      src: `img/figures/b-queen.webp`,
      type: 'queen',
    };
    this.king = {
      src: `img/figures/b-king.webp`,
      type: 'king',
    };
    this.figuresWasLost = [];
    this.figuresWasbeaten = [];
  }
  
  createFigure(type,where) {
    const typeWithoutConvert = type;
    this.counterId++;
    type = this.convertType(type);

    // if(this.sideName.toLowerCase() = "black") let sideName = b;
    
    where.innerHTML = `<div class="-${typeWithoutConvert} id_${this.counterId} figure"></div>`;//вставляем созданный див
    let createdFigure = where.firstChild;
    createdFigure.style.background = `url(${type}) center / 75% 85% no-repeat`;

    console.log(this.counterId, type, createdFigure);
    return {
      type: typeWithoutConvert,
      id: this.counterId,
      node: createdFigure,
      side: this.sideName,
    };
  }
  convertType(type) {
    if(type == 'pawn'.toLowerCase()) return this.pawn.src; 
    if(type == 'rook'.toLowerCase()) return this.rook.src; 
    if(type == 'knight'.toLowerCase()) return this.knight.src; //horse
    if(type == 'bishop'.toLowerCase()) return this.bishop.src; 
    if(type == 'queen'.toLowerCase()) return this.queen.src; 
    if(type == 'king'.toLowerCase()) return this.king.src; 
  }
}

class WhiteSide {
  constructor() {
    this.sideName = 'Black'; 
    this.counterId = 0;
    this.pawn = {
      src: `img/figures/w-pawn.webp`,
      type: 'pawn',
    };
    this.rook = {
      src: `img/figures/w-rook.webp`,
      type: 'rook',
    };
    this.knight = {
      src: `img/figures/w-horse.webp`,
      type: 'knight',
    };
    this.bishop = {
      src: `img/figures/w-bishop.webp`,
      type: 'bishop',
    };
    this.queen = {
      src: `img/figures/w-queen.webp`,
      type: 'queen',
    };
    this.king = {
      src: `img/figures/w-king.webp`,
      type: 'king',
    };
    this.figuresWasLost = [];
    this.figuresWasbeaten = [];
  }
  
  createFigure(type,where) {
    const typeWithoutConvert = type;
    this.counterId++;
    type = this.convertType(type);

    // if(this.sideName.toLowerCase() = "black") let sideName = b;
    
    where.innerHTML = `<div class="-${typeWithoutConvert} id_${this.counterId} figure"></div>`;//вставляем созданный див
    let createdFigure = where.firstChild;
    createdFigure.style.background = `url(${type}) center / 75% 85% no-repeat`;

    console.log(this.counterId, type, createdFigure);
    return {// возврат обьекта
      type: typeWithoutConvert,
      id: this.counterId,
      node: createdFigure,
      side: this.sideName,
    };
  }
  convertType(type) {
    if(type == 'pawn'.toLowerCase()) return this.pawn.src; 
    if(type == 'rook'.toLowerCase()) return this.rook.src; 
    if(type == 'knight'.toLowerCase()) return this.knight.src; //horse
    if(type == 'bishop'.toLowerCase()) return this.bishop.src; 
    if(type == 'queen'.toLowerCase()) return this.queen.src; 
    if(type == 'king'.toLowerCase()) return this.king.src; 
  }
}
  
  const game = new ChessApi();
  const White = new WhiteSide();
  const Black = new BlackSide();

  game.drawBoard();//устанавливаем размер игральной доски
  game.parseAllCells();//вешает на все ячейки евент
  game.bindMenu();//заставляет меню работать
  game.createBoardObject();//создание таблици в js с привязкой в html
  game.setDefaultFigurePosition();








// 1) нужно построить игровую доску в js 
// - доска будет обьектом board со свойствами названий ячеек,
//  каждая ячейка будет обьектом,
//   со своими свойствами, главные из них фигура, которя стоит на этой ячейке, цвет ячейки 
// создаём  обьект board 
// 
// 
// 
// 









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