const list = document.querySelectorAll('.list');
const addTableBtn = document.querySelector('.button');

function addTask() {
    const btn = document.querySelector('.add__btn');
    const addBtn = document.querySelector('.add__item-btn');
    const cancelBtn = document.querySelector('.cancel__item-btn');
    const textarea = document.querySelector('.form__textarea');
    const form = document.querySelector('.form');

    let value;

// change bacground
    let app = document.querySelector('.app'); 
    let changeBgBtn = document.querySelector('.change__btn');
    let bgIndex = 0;
    let phonesMassive = [
        'url(images/bg-min.png)',
        'url(images/bg-purple-sea.jpg)',
        'url(images/bg-street-min.jpg)',
        'url(images/bg-space.jpg)',
        'url(images/bg1-min.png)',
        'url(images/bg-beach.jpg)'
    ];
    
    changeBgBtn.addEventListener('click', () =>{
        
        if(bgIndex < phonesMassive.length) {
            app.style.backgroundImage = phonesMassive[bgIndex];

            bgIndex++;
        } else {
            bgIndex = 0;
            app.style.backgroundImage = phonesMassive[bgIndex];
        }
        console.log(bgIndex);
        
    });
// </change bacground>

    


    btn.addEventListener('click', () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        textarea.addEventListener('input', (event) => {
            value = event.target.value;

            if(value){
                addBtn.style.display = 'block';
            } else {
                addBtn.style.display = 'none';
            }
        });
    })

    cancelBtn.addEventListener('click', () => {
        textarea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';
    });

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('list__item');
        newItem.draggable = true;
        newItem.textContent = value;
        list[0].append(newItem);

        textarea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';

        dragNdrop();

    })

}

addTask();

function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards__item');
    board.innerHTML = `
    <span class="title" contenteditable="true">Введите название</span>
    <div class="list"></div>  
    <div class="close">
          <span class="close__menu"></span>
    </div>  
    `;
    boards.append(board);

    chageTitle();
    dragNdrop();
    delBoard();

}
addTableBtn.addEventListener('click', addBoard);


function chageTitle() {
    const titles = document.querySelectorAll('.title');

    titles.forEach(title => {
        title.addEventListener('click', (event) => {

            let casheName = event.target.textContent;
            event.target.textContent = '';
            console.log(casheName);
        });
    })
}

chageTitle();


let draggedItem = null;

function dragNdrop() {
    const listItems = document.querySelectorAll('.list__item');
    const lists = document.querySelectorAll('.list');

    for(let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() =>{
                item.style.display = 'none';
                // console.log(item);
            }, 0)
        });

        item.addEventListener('dragend', () =>{
            setTimeout(() =>{
                item.style.display = 'block';
                draggedItem = null;
            }, 0)
        });

        item.addEventListener('dblclick', () => {
            item.remove();
        })


        for(let j = 0; j < lists.length; j++){
            const list = lists[j];

            list.addEventListener('dragover', event =>{
                event.preventDefault();
            })

            list.addEventListener('dragenter', function(event) {
                event.preventDefault();
                this.style.backgroundColor = 'rgba(0,0,0, .3)';
            })

            list.addEventListener('dragleave', function (event) {
                this.style.backgroundColor = 'rgba(0,0,0, 0)';
            })

            list.addEventListener('drop', function (event) {
                this.style.backgroundColor = 'rgba(0,0,0, 0)';
                this.append(draggedItem);
            })
        }
    }
}

dragNdrop();



function delBoard() {

    const boards = document.querySelectorAll('.boards');
    const lists = document.querySelectorAll('.boards__item');
    const closeTable = document.querySelectorAll('.close');


    for(let i = 0; i < closeTable.length; i++){

        closeTable[i].addEventListener('click', () => {
            lists[i].remove();

        });
    }

    
    
}

delBoard();