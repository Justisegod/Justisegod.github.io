
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
        let counterFigureNumber = currentFigureNumber;//делаем копию цифры текущей ячейки, котораю будем изменять
        let isFirstPawnTurn = figure.currentFigure == figure.defaultFigure ? true : false;// если стандартная позиция равна текущей
        let numForTurn = currentFigureNumber;

        if(figure.currentFigure.side.toLowerCase() == 'white') {//если фигура белая
          if(isFirstPawnTurn) {//если это первый ход
            counterFigureNumber = Number(counterFigureNumber) + 2;
            numForTurn++;

            acceptedCells.push(this.board[`${mainFigureCellLetter}${numForTurn}`]);
          }else{
            counterFigureNumber++;
          }
          acceptedCells.push(this.board[`${mainFigureCellLetter}${counterFigureNumber}`]);
        }else{//если фигура чёрная
          if(isFirstPawnTurn) {//если это первый ход
            counterFigureNumber = Number(counterFigureNumber) - 2;
            numForTurn--;

            acceptedCells.push(this.board[`${mainFigureCellLetter}${numForTurn}`]);
          }else{
            counterFigureNumber--;
          }
          acceptedCells.push(this.board[`${mainFigureCellLetter}${counterFigureNumber}`]);
        }

        console.log(isFirstPawnTurn);
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

    moveFigure(figureToMove, figureToSwap) {
      let id = figureToMove.currentFigure.id;
      let createdFigure;
      figureToMove.node.firstChild.remove();  

      if(figureToMove.currentFigure.side == 'Black') {
        createdFigure = Black.createFigure(figureToMove.currentFigure.type, figureToSwap.node, id);

      }else{
        createdFigure = White.createFigure(figureToMove.currentFigure.type, figureToSwap.node, id);
      }
      figureToSwap.currentFigure = createdFigure;// заменяем обьект currentFigure в ячейке куда мы ходили
      figureToMove.currentFigure = null;

      figureToMove.isEmpty = true;
      figureToSwap.isEmpty = false;

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
                  console.log('Фигура так не ходит');
                }

                secondFigureWasSelected = true;
                this.unselectCell(figureToMove.node);// убрать выделение клетки
                this.removeCircleToCells(acceptedСellsToMove);//убрать куда можно ходить

                // console.log(figureToMove, figureToSwap, firstFigureWasSelected);

                return true;// заканчиваем
                }else{
                          
                }
            
                if(!firstFigureWasSelected && cell.node.firstChild != null) {
                  figureToMove = cell;//получаем фигуру в ячейке сохраняем фигуру
                  firstFigureWasSelected = true;

                  acceptedСellsToMove = this.getAcceptedCells(figureToMove);// получаем массив разрешённых ячеек для ходьбы
                  this.selectCell(figureToMove.node);//добавить выделение клетки

                  this.addCircleToCells(acceptedСellsToMove);//показываем куда можно ходить
                  // console.log(figureToMove, figureToSwap);
                  // console.log(acceptedСellsToMove);
                }else{
                  firstFigureWasSelected = false;
                  this.paintAcceptedCells(acceptedСellsToMove);//убрать куда можно ходить

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

    addCircleToCells(arrOfCells) {
      for(let cell of arrOfCells) {
        if(!cell.node.className.split(' ').includes('accepted--cell')) {
          cell.node.classList.add('accepted--cell');

          if(cell.currentFigure != null) {
            cell.node.firstChild.style.position = "relative";
            cell.node.firstChild.style.zIndex = "2";

            cell.node.style.background = `linear-gradient(217deg, rgba(255,0,0, 0.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0, 0.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255, 0.8), rgba(0,0,255,0) 70.71%);`;
            this.removeCircleToCells([cell]);

          }
        }
      }
    }
    removeCircleToCells(arrOfCells) {
      for(let cell of arrOfCells) {
        cell.node.classList.remove('accepted--cell');
      }
    }

    //если она не пустая получаем фигуру в ячейке
    //сохраняем фигуру и её классы
    //нажимаем на другую ячейку, если она пустая, удаляем фигуру с первой ячейки, и записываем в пустую ячейку
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