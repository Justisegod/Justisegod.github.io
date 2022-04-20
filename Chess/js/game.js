  class ChessApi {

    constructor() {
      this.maxGameDurationMinutes = 60;
      this.arrayCells = [];
      this.btnSettings = document.querySelector('.game__header-settings');
      this.gameSettingsMenu = document.querySelector('.menu');
      this.turnVolume = 0.1;
      
      this.board = {
        element : document.querySelector('.board'),
      }
    }

     countIt(seconds = 0, minutes = 0) {
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
          paintAllPeacesBack.call();
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
          paintPeace.call(i, 'transparent');
        }
      }
      
      timerId = setInterval(countdownTimerr, 1000);

      return timerId;
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
      // let previousCell = null;

      for(let row of arrayOfRows) {// get row
        // console.log(row);
        for(let cell of row) {
          // console.log(cell);
          this.arrayCells.push(cell);

          // cell.addEventListener('click', () => {
          //   this.unselectCell(previousCell);
          //   this.selectCell(cell);
          //   previousCell = cell;
          // });
        }
      }
    }
    
    selectCell(cell) {
      let cellClasses = cell.getAttribute('class').split(' ');
      let result = cellClasses.includes('selected--cell');

      if(!result){
        cell.classList.add(`selected--cell`);
      }else{
        
      }

      // console.log(cell, cellClasses, cell.hasAttribute('selected-cell'));
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
          this.btnSettings.style.transform = `rotate(45deg)`;
          this.playSound('sounds/gear.mp3', this.turnVolume);

          result = true;
        }else{
          this.gameSettingsMenu.classList.remove('menu-active');
          this.changeTextInElement(title, defaultTitle);
          this.btnSettings.style.transform = ``;
          this.playSound('sounds/gear.mp3', this.turnVolume);

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

          currentFigure : null,
          // currentFigure : {
          //   type : null,
          // }
        };
        // console.log(combineName);
      }
      console.log(this.board);
    }
    changeCurrentPosition(cellId, newCurrentFigure) {
      // this.board[cellId].currentFigure = this.board[cellId].defaultFigure;
      this.board[cellId].currentFigure = newCurrentFigure;
      this.board[cellId].isEmpty = false;
    }
    setDefaultFigurePosition() {
      let numberOfCell = '';
      let cellId = '';
      let currentFigure;

      for(let cell of this.arrayCells) {
        numberOfCell = cell.className.split(' ');
        numberOfCell = numberOfCell[0].split('--');
        cellId = numberOfCell[1];
        // currentFigure = this.board[cellId].defaultFigure;

        switch (cellId) {//set Dark side
          case 'A8':
            this.board[cellId].defaultFigure = Black.createFigure('rook', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);

            break;
          case 'A7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'B8':
            this.board[cellId].defaultFigure = Black.createFigure('knight', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'B7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'C8':
            this.board[cellId].defaultFigure = Black.createFigure('bishop', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'C7':
            this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
            case 'D8':
              console.log(this.board[cellId].node)
              this.board[cellId].defaultFigure = Black.createFigure('queen', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
  
              break;
            case 'D7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'E8':
              this.board[cellId].defaultFigure = Black.createFigure('king', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'E7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'F8':
              this.board[cellId].defaultFigure = Black.createFigure('bishop', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'F7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'G8':
              this.board[cellId].defaultFigure = Black.createFigure('knight', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'G7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'H8':
              this.board[cellId].defaultFigure = Black.createFigure('rook', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
                
              break;
            case 'H7':
              this.board[cellId].defaultFigure = Black.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
                
              break;
        
          default:
            break;
        }
        switch (cellId) {//set White side
          case 'A1':
            console.log(this.board[cellId].node)
            this.board[cellId].defaultFigure = White.createFigure('rook', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);

            break;
          case 'A2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'B1':
            this.board[cellId].defaultFigure = White.createFigure('knight', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'B2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'C1':
            this.board[cellId].defaultFigure = White.createFigure('bishop', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
          case 'C2':
            this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
            this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
            
            break;
            case 'D1':
              console.log(this.board[cellId].node)
              this.board[cellId].defaultFigure = White.createFigure('queen', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
  
              break;
            case 'D2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'E1':
              this.board[cellId].defaultFigure = White.createFigure('king', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'E2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'F1':
              this.board[cellId].defaultFigure = White.createFigure('bishop', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'F2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'G1':
              this.board[cellId].defaultFigure = White.createFigure('knight', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'G2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
              
              break;
            case 'H1':
              this.board[cellId].defaultFigure = White.createFigure('rook', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
                
              break;
            case 'H2':
              this.board[cellId].defaultFigure = White.createFigure('pawn', this.board[cellId].node);
              this.changeCurrentPosition(cellId, this.board[cellId].defaultFigure);
                
              break;
        
          default:
            break;
        }
      }
    }
    getAcceptedCells(figure) {// получаем тип фигуры, и возвращаем массив с разрещёнными ячейками в зависимости от типа
      let acceptedCells = [];
      const allCellsLetters = [
        'A','B','C','D','E','F','G','H'
      ];
      const mainFigureCellLetter = figure.node.classList[1].split('--')[1];// получаем букву текущей ячейки
      const currentFigurePosition = figure.node.classList[0].split('--')[1];// получаем полное название текущей ячейки
      const currentFigureNumber = currentFigurePosition.split(`${mainFigureCellLetter}`)[1];//получаем цифру текущей ячейки
      
      if(figure.currentFigure.type.toLowerCase() == 'pawn') {//определить как ходит пешка
        let counterFigureNumber = Number(currentFigureNumber);//делаем копию цифры текущей ячейки, котораю будем изменять
        let isFirstPawnTurn = figure.currentFigure == figure.defaultFigure ? true : false;// если стандартная позиция равна текущей
        let numForTurn = Number(currentFigureNumber);

        if(figure.currentFigure.side.toLowerCase() == 'white') {//если фигура белая
          let gotArray = [];// массив всех горизонтальных ячеек
          let numInArr;
          let FigureNumber = Number(currentFigureNumber);
  
          for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
            if(allCellsLetters[i] === mainFigureCellLetter) {
              numInArr = i;
              break;
            }
          }

          if(this.board[`${mainFigureCellLetter}${numForTurn + 1}`].currentFigure == null) {//если спереди нет фигуры
            numForTurn++;
            acceptedCells.push(this.board[`${mainFigureCellLetter}${numForTurn}`]);//получаем следущую ячейку

            if(isFirstPawnTurn && this.board[`${mainFigureCellLetter}${counterFigureNumber + 2}`].currentFigure == null) {//если это первый ход
              counterFigureNumber = Number(counterFigureNumber) + 2;
  
              acceptedCells.push(this.board[`${mainFigureCellLetter}${counterFigureNumber}`]);
            }else{
              counterFigureNumber++;
            }
          }

          gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber + 1}`]);
          gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber + 1}`]);
          for(let cell of gotArray) {
            if(cell != undefined) {
              if(cell.currentFigure != null && cell.currentFigure.side == 'Black'){//бить вражеские фигуры
                acceptedCells.push(cell);
              }
            }
          }

        }else{//если фигура чёрная
          let gotArray = [];// массив всех горизонтальных ячеек
          let numInArr;
          let FigureNumber = Number(currentFigureNumber);
  
          for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
            if(allCellsLetters[i] === mainFigureCellLetter) {
              numInArr = i;
              break;
            }
          }

          if(this.board[`${mainFigureCellLetter}${numForTurn - 1}`].currentFigure == null) {//если спереди нет фигуры
            numForTurn--;
            acceptedCells.push(this.board[`${mainFigureCellLetter}${numForTurn}`]);//получаем следущую ячейку

            if(isFirstPawnTurn && this.board[`${mainFigureCellLetter}${counterFigureNumber - 2}`].currentFigure == null) {//если это первый ход
              counterFigureNumber = Number(counterFigureNumber) - 2;
  
              acceptedCells.push(this.board[`${mainFigureCellLetter}${counterFigureNumber}`]);
            }else{
              counterFigureNumber--;
            }
          }

          gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber - 1}`]);
          gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber - 1}`]);

          for(let cell of gotArray) {
            if(cell != undefined) {
              if(cell.currentFigure != null && cell.currentFigure.side == 'White'){//бить вражеские фигуры
                acceptedCells.push(cell);
              }
            }
          }
        }

        // console.log(isFirstPawnTurn);
        
        return acceptedCells
      }
      if(figure.currentFigure.type.toLowerCase() == 'rook') {//определить как ходит слон
        getVerticalCells.call(this);//получаем все вертикальные ячейки
        getGorisontalCells.call(this);//получаем все горизонтальные ячейки
        return acceptedCells;
      }
      if(figure.currentFigure.type.toLowerCase() == 'bishop') {
        getDiagonalCells.call(this);
      }
      if(figure.currentFigure.type.toLowerCase() == 'knight'){//определить как ходит конь
        let gotArray = [];// массив всех горизонтальных ячеек
        let numInArr;
        let FigureNumber = Number(currentFigureNumber);

        for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
          if(allCellsLetters[i] === mainFigureCellLetter) {
            numInArr = i;
            break;
          }
        }

        gotArray.push(this.board[`${allCellsLetters[numInArr - 2]}${FigureNumber + 1}`]);//up side
        gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber + 2}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber + 2}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 2]}${FigureNumber + 1}`]);

        gotArray.push(this.board[`${allCellsLetters[numInArr - 2]}${FigureNumber - 1}`]);//down side
        gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber - 2}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber - 2}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 2]}${FigureNumber - 1}`]);

        cycle: for(let cell of gotArray) {
          if(cell == undefined) {
            continue cycle;
          }else{
            acceptedCells.push(cell);
          }
        }

        // console.log(`gotArray:`, gotArray, acceptedCells);
      }
      if(figure.currentFigure.type.toLowerCase() == 'queen'){//определить как ходит королева
        getVerticalCells.call(this);//получаем все вертикальные ячейки
        getGorisontalCells.call(this);//получаем все горизонтальные ячейки
        getDiagonalCells.call(this);//получаем все ячейки по диагонале
        return acceptedCells;
      }
      if(figure.currentFigure.type.toLowerCase() == 'king') {
        let gotArray = [];// массив всех горизонтальных ячеек
        let numInArr;
        let FigureNumber = Number(currentFigureNumber);

        for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
          if(allCellsLetters[i] === mainFigureCellLetter) {
            numInArr = i;
            break;
          }
        }

        gotArray.push(this.board[`${allCellsLetters[numInArr]}${FigureNumber + 1}`]);//up side
        gotArray.push(this.board[`${allCellsLetters[numInArr]}${FigureNumber - 1}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber - 1}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber + 1}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber + 1}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber - 1}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr + 1]}${FigureNumber}`]);
        gotArray.push(this.board[`${allCellsLetters[numInArr - 1]}${FigureNumber}`]);

        for(let cell of gotArray) {
          if(cell != undefined) {
            acceptedCells.push(cell);
          }
        }
      }
      

      function getVerticalCells(verticalCells = 'all') {//получаем все вертикальные ячейки
        if(verticalCells === 'all') {
            up: for(let i = currentFigureNumber; i < 9; i++) {
              if(this.board[`${mainFigureCellLetter}${i}`] != this.board[`${currentFigurePosition}`]) {//если не текущаяя ячейка
                  acceptedCells.push(this.board[`${mainFigureCellLetter}${i}`]);
                  if(this.board[`${mainFigureCellLetter}${i}`].currentFigure != null) break up;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
              }
            }
            down: for(let i = currentFigureNumber; i > 0; i--) {
              if(this.board[`${mainFigureCellLetter}${i}`] != this.board[`${currentFigurePosition}`] ) {//если не текущаяя ячейка
                  acceptedCells.push(this.board[`${mainFigureCellLetter}${i}`]);
                  if(this.board[`${mainFigureCellLetter}${i}`].currentFigure != null) break down;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
              }
            }
        }else{//получаем выбранные вертикальные ячейки 
          for(let i = 0; i < verticalCells.length; i++) {
            if(typeof(verticalCells[i]) == 'number') {
              acceptedCells.push(this.board[`${verticalCells[i]}`]);
            }
          }
        }

        return verticalCells;
      }
      function getGorisontalCells(gorisontalCells = 'all') {//получаем все горизонтальные ячейки
        if(gorisontalCells === 'all') {
            let gotArray = [];// массив всех горизонтальных ячеек
            let numInArr;

            for(let letter of allCellsLetters) {//получаем все горизонтальные ячейки
              gotArray.push(this.board[`${letter}${currentFigureNumber}`]);
            }
            for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
              if(allCellsLetters[i] === mainFigureCellLetter) {
                numInArr = i;
                break;
              }
            }

            right: for(let i = numInArr; i < gotArray.length; i++) {
              if(gotArray[i].currentFigure != this.board[`${currentFigurePosition}`].currentFigure) {
                acceptedCells.push(gotArray[i]);
                if(gotArray[i].currentFigure != null) break right;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
              }
            }
            left: for(let i = numInArr; i >= 0; i--) {
              if(gotArray[i].currentFigure != this.board[`${currentFigurePosition}`].currentFigure) {
                acceptedCells.push(gotArray[i]);
                if(gotArray[i].currentFigure != null) break left;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
              }
            }
        }else{//получаем выбранные горизонтальные ячейки 
          for(let i = 0; i < gorisontalCells.length; i++) {
            if(typeof(gorisontalCells[i]) == 'number'){
              acceptedCells.push(this.board[`${gorisontalCells[i]}`]);
            }
          }
        }
        console.log(acceptedCells);
        return gorisontalCells;
      }
      function getDiagonalCells() {
        let gotArray = [];// массив всех горизонтальных ячеек
        let numInArr;
        let currentNum = Number(currentFigureNumber);

        
        for(let i = 0; i < allCellsLetters.length; i++) {//получаем номер буквы в массиве букв allCellsLetters
          if(allCellsLetters[i] === mainFigureCellLetter) {
            numInArr = i;
            break;
          }
        }
        
        upleft: for(let i = numInArr; i >= 0; i--) {
          if(allCellsLetters[i] != mainFigureCellLetter){
            currentNum++;
            if(this.board[`${allCellsLetters[i]}${currentNum}`] != undefined) {
              acceptedCells.push(this.board[`${allCellsLetters[i]}${currentNum}`]);
              if(this.board[`${allCellsLetters[i]}${currentNum}`].currentFigure != null) break upleft;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
            }
          }else{
            continue upleft;
          }
        }
        currentNum = currentFigureNumber//обнуляем

        upright: for(let i = numInArr; i < allCellsLetters.length; i++) {
          if(allCellsLetters[i] != mainFigureCellLetter){
            currentNum++;
            if(this.board[`${allCellsLetters[i]}${currentNum}`] != undefined) {
              acceptedCells.push(this.board[`${allCellsLetters[i]}${currentNum}`]);
              if(this.board[`${allCellsLetters[i]}${currentNum}`].currentFigure != null) break upright;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
            }
          }else{
            continue upright;
          }
        }
        currentNum = currentFigureNumber//обнуляем

        downleft: for(let i = numInArr; i >= 0; i--) {
          if(allCellsLetters[i] != mainFigureCellLetter){
            currentNum--;
            if(this.board[`${allCellsLetters[i]}${currentNum}`] != undefined) {
              acceptedCells.push(this.board[`${allCellsLetters[i]}${currentNum}`]);
              if(this.board[`${allCellsLetters[i]}${currentNum}`].currentFigure != null) break downleft;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
            }
          }else{
            continue downleft;
          }
        }
        currentNum = currentFigureNumber//обнуляем

        downright:for(let i = numInArr; i < allCellsLetters.length; i++) {
          if(allCellsLetters[i] != mainFigureCellLetter){
            currentNum--;
            if(this.board[`${allCellsLetters[i]}${currentNum}`] != undefined) {
              acceptedCells.push(this.board[`${allCellsLetters[i]}${currentNum}`]);
              if(this.board[`${allCellsLetters[i]}${currentNum}`].currentFigure != null) break downright;//если встречается не пустая ячейка  пушим ее и заканчиваем цикл
            }
          }else{
            continue downright;
          }
        }
        console.log(acceptedCells);

      }

      return acceptedCells;
    }
    // как реализовать ход фигур по разному ?
    // как сделать так, чтобы слон ходил только по горизонтали и вертикали своей ячейки ?
    // - нужно парсить все ячейки, и если на ячейке которая на нашем пути стоит фигура, мы должны записать где именно стоит 
    // фигура и заблокировать перемешение на ячейку после этой фигуры включаяя и её ячейку. как отличать 
    // функция которая будет возвращать массив ячеек, доступных для ходьбы
    // A7 - A1, A8, B8, C8, D8, E8, F8, J8, G8 тоесть чтобы получить ячейки в которые может ходить rook нужно
    // - проверить все ячейки в букве в которой он стоит, кроме его (буква1 - 8)
    // -также все буквы с числом ячейки которая у фигуры
    // когда в ячейке будет чужая фигура
    // пешка ходит:
    // - 

    showNotification({top = 0, right = 0, bottom = 'unset', className, html}) {

      let notification = document.createElement('div');
      notification.className = "notification";
      if (className) {
        notification.classList.add(className);
      }
    
      notification.style.top = top + 'px';
      notification.style.right = right + 'px';
      notification.style.bottom = bottom + 'px';
      notification.style.position = `absolute`;
    
      notification.innerHTML = html;
      document.body.querySelector('.header__bottom').append(notification);
    
      setTimeout(() => notification.remove(), 1500);
    }

    closeGameOverlay() {
      const body = document.querySelector('.board');
      const gameOverlay = document.querySelector('.game__overlay');

      if(gameOverlay != undefined) {
        gameOverlay.remove();
      }
    }
    startGame() {
      for(let cell of Object.values(this.board)){//Удаляем фигуры
        if(cell != document.querySelector('.board') && cell.node.firstChild != null) {
          cell.node.firstChild.remove();
          console.log(cell);
        }
      }

      this.setDefaultFigurePosition.call(this);//раставляем фигуры снова
    }
    async endGame(team){
      const body = document.querySelector('.board');
      let gameOverlay = document.createElement('div');

      body.append(gameOverlay);

      gameOverlay.innerHTML = await
      `<h6>Game is Over</h6>
      <h6>The ${team} team Won</h6>
      <button class="repeat__game-btn" onclick="game.startGame(); game.closeGameOverlay();">repeat</button>
      <button class="close-overlay__btn" onclick="game.closeGameOverlay();">CLOSE</button>`;
      gameOverlay.style.position = `absolute`;
      gameOverlay.style.width = `100%`;
      gameOverlay.style.height = `100%`;
      gameOverlay.style.background = `rgb(0,0,0, 0.8)`;
      gameOverlay.style.color = `#fff`;
      gameOverlay.style.fontSize = `30px`;
      gameOverlay.style.padding = `auto`;
      gameOverlay.style.textAlign = `center`;
      gameOverlay.style.zIndex = `2`;
      gameOverlay.style.padding = `20px`;
      gameOverlay.style.display = `flex`;
      gameOverlay.style.flexDirection = `column`;
      gameOverlay.style.justifyContent = `space-around`;

      gameOverlay.classList.add('game__overlay');

      let repeatGameBtn = document.querySelector('.repeat__game-btn');
      repeatGameBtn.style.border = `0.1px solid #fff`;
      repeatGameBtn.style.background = `transparent`;
      repeatGameBtn.style.color = `#fff`;
      repeatGameBtn.style.margin = `20px`;
      repeatGameBtn.style.padding = `2px 0`;

      const closeGameOverlayBtn = document.querySelector('.close-overlay__btn');
      closeGameOverlayBtn.style.position = `absolute`;
      closeGameOverlayBtn.style.top = `0`;
      closeGameOverlayBtn.style.right = `0`;
      closeGameOverlayBtn.style.border = `0.1px solid #fff`;
      closeGameOverlayBtn.style.background = `transparent`;
      closeGameOverlayBtn.style.color = `#fff`;
    }

    moveFigure(figureToMove, figureToSwap) {
      let id = figureToMove.currentFigure.id;
      let createdFigure;
      figureToMove.node.firstChild.remove();  

      if(figureToSwap.currentFigure != null && figureToSwap.currentFigure.type === 'king' ) {// Если побили короля Game the End
        if(figureToSwap.currentFigure.side === 'White') {
          // alert(`the Black team won`);
        }else{
          // alert(`the White team won`);
        }
        this.playSound('sounds/victory.mp3', this.turnVolume);
        this.endGame.call(this, `${figureToMove.currentFigure.side.toUpperCase()}`);
      }

      if(figureToMove.currentFigure.side == 'Black') {
        createdFigure = Black.createFigure(figureToMove.currentFigure.type, figureToSwap.node, id);

      }else{
        createdFigure = White.createFigure(figureToMove.currentFigure.type, figureToSwap.node, id);
      }
      figureToSwap.currentFigure = createdFigure;// заменяем обьект currentFigure в ячейке куда мы ходили
      figureToMove.currentFigure = null;

      figureToMove.isEmpty = true;
      figureToSwap.isEmpty = false;
      this.playSound('sounds/make-turn.mp3', this.turnVolume);//звук хода

      // if(figureToSwap.currentFigure.side == 'Black') {
      //   BlackSide.figuresWasLost(figureToSwap);
      // }else{
      //   WhiteSide.figuresWasLost(figureToSwap);
      // }

    }

    moveFigureOnBoard() {
      
      function getFigureOnClick() {
        let figureToMove;
        let figureToSwap;
        let firstFigureWasSelected = false;
        let secondFigureWasSelected = false;
        let acceptedСellsToMove;//массив разрешённых ячеек для ходьбы
        
        for(const cell of Object.values(this.board)) {
          if(cell != document.querySelector('.board')) {
            cell.node.addEventListener('click', () => {//нажимаем на ячейку


              if(firstFigureWasSelected) {//Если первая фигура была выбрана
                figureToSwap = cell;
                firstFigureWasSelected = false;

                if(figureToSwap.currentFigure != null && figureToMove.currentFigure.side == figureToSwap.currentFigure.side){// если друж фигура то стоп
                  this.unselectCell(figureToMove.node);// убрать выделение клетки
                  this.removeCircleToCells(acceptedСellsToMove);
                  return 'Frendly Figure';
                }
                
                if(acceptedСellsToMove.includes(figureToSwap)) {//Если клетка, на которую вы нажимаете находится в массиве разрешённых ходов 
                  this.moveFigure(figureToMove, figureToSwap);
                }else{
                  this.showNotification({
                    top: 'unset', // 10px от верхней границы окна (по умолчанию 0px)
                    right: 10, // 10px от правого края окна (по умолчанию 0px)
                    bottom: 10,
                    html: "Фигура так не ходит!", // HTML-уведомление
                    className: "welcome" // дополнительный класс для div (необязательно)
                  });
                }

                secondFigureWasSelected = true;
                this.unselectCell(figureToMove.node);// убрать выделение клетки
                this.removeCircleToCells(acceptedСellsToMove);//убрать куда можно ходить

                // console.log(figureToMove, figureToSwap, firstFigureWasSelected);\\

                return true;// заканчиваем
                }else{
                          
                }
            
                if(!firstFigureWasSelected && cell.node.firstChild != null) {
                  figureToMove = cell;//получаем фигуру в ячейке сохраняем фигуру
                  firstFigureWasSelected = true;

                  acceptedСellsToMove = this.getAcceptedCells(figureToMove);// получаем массив разрешённых ячеек для ходьбы
                  this.selectCell(figureToMove.node);//добавить выделение клетки

                  this.addCircleToCells(acceptedСellsToMove, figureToMove);//показываем куда можно ходить
                  // console.log(figureToMove, figureToSwap);
                  // console.log(acceptedСellsToMove);
                }else{
                  firstFigureWasSelected = false;
                  // this.paintAcceptedCells(acceptedСellsToMove);//убрать куда можно ходить

                  // this.unselectCell(figureToMove.node);// убрать выделение клетки
                }
              // console.log(firstFigureWasSelected,figureToMove, cell.node.firstChild);
            });
          }
          // console.log(cell);
        }
      }
      getFigureOnClick.call(this);
    }

    addCircleToCells(arrOfCells, currentFigure) {
      for(let cell of arrOfCells) {
        if(!cell.node.className.split(' ').includes('accepted--cell')) {
          cell.node.classList.add('accepted--cell');

          if(cell.currentFigure != null) {
            cell.node.firstChild.style.position = "relative";
            cell.node.firstChild.style.zIndex = "2";

            if(currentFigure.currentFigure.side != cell.currentFigure.side) {//Если сторона фигур не од одинакова
              cell.node.style.backgroundImage = `linear-gradient(180deg, #ffb629 0, #ffa537 10%, #ff9243 20%, #ff7e4b 30%, #ff6951 40%, #f25353 50%, #d93f53 60%, #c22f54 70%, #ad2355 80%, #9b1b56 90%, #8c1859 100%)`;
              cell.node.style.border = `0.1px solid #58D689 `;
            }
            // cell.node.style.background = `linear-gradient(217deg, rgba(255,0,0, 0.8), rgba(255,0,0,0) 70.71%)`;
            // this.removeCircleToCells([cell]);

          }
        }
      }
    }
    removeCircleToCells(arrOfCells) {
      for(let cell of arrOfCells) {
        cell.node.classList.remove('accepted--cell');
        cell.node.style.backgroundImage = `unset`;
        cell.node.style.border = `unset `;

      }
    }

    //если она не пустая получаем фигуру в ячейке
    //сохраняем фигуру и её классы
    //нажимаем на другую ячейку, если она пустая, удаляем фигуру с первой ячейки, и записываем в пустую ячейку


     playSound(src, volume = 1, playbackRate = 1) {// функция воспроизведения звука
      let song = document.createElement('audio');
      song.classList.add('sound-of-turn');
      song.setAttribute('preload', 'auto');
      song.innerHTML = `<source src=${src} type="audio/mp3">`;

      song.volume = volume;//громкость
      song.playbackRate = playbackRate;//скорость воспроизведения

      if (song.paused) {
        song.play();
      } else {
        song.pause();
      }
    
      return song;
    }
}

class BlackSide {
  constructor() {
    this.sideName = 'Black'; 
    this.counterId = 1;
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
  
  createFigure(type,where, id = this.counterId) {
    const typeWithoutConvert = type;
    this.counterId++;
    type = this.convertType(type);

    
    where.innerHTML = `<div class="${typeWithoutConvert} id_${id} figure"></div>`;//вставляем созданный див
    let createdFigure = where.firstChild;
    createdFigure.style.background = `url(${type}) center / 75% 85% no-repeat`;

    console.log(id, type, createdFigure);
    return {
      type: typeWithoutConvert,
      id: id,
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
//Логика создания функции хода разных фигур
//они должны брать позицию из this.board.айди фигуры
//менять currentPosition
//функция должна менять позицию фигуры, и понимать как ходит фигура 
//
class WhiteSide {
  constructor() {
    this.sideName = 'White'; 
    this.counterId = 16;
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
  
  createFigure(type,where, id = this.counterId) {
    const typeWithoutConvert = type;
    this.counterId++;
    type = this.convertType(type);

    where.innerHTML = `<div class="${typeWithoutConvert} id_${id} figure"></div>`;//вставляем созданный див
    let createdFigure = where.firstChild;
    createdFigure.style.background = `url(${type}) center / 75% 85% no-repeat`;

    console.log(id, type, createdFigure);
    return {
      type: typeWithoutConvert,
      id: id,
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
  game.moveFigureOnBoard();

// 1) нужно построить игровую доску в js 
// - доска будет обьектом board со свойствами названий ячеек,
//  каждая ячейка будет обьектом,
//   со своими свойствами, главные из них фигура, которя стоит на этой ячейке, цвет ячейки 
// создаём  обьект board 

game.showNotification({
  top: 10, // 10px от верхней границы окна (по умолчанию 0px)
  right: 10, // 10px от правого края окна (по умолчанию 0px)
  html: "Hello!", // HTML-уведомление
  className: "welcome" // дополнительный класс для div (необязательно)
});



