
// const App = {
//     data() {
//         return {
//             counter: 0,
//             title: 'Список заметок',
//             placeholderString: 'Введите название заметки',
//             inputValue: '',
//             notes: ['Заметка 1' , 'Заметка 2']
//         }
//     },
//     methods: {
//         inputChangeHandler() {
//             // console.log('inputChangeHandler', event.target.value);
//             this.inputValue = event.target.value;
//         },
//         addNewNote() {
//             if(this.inputValue !== '') {
//                 this.notes.push(this.inputValue);
//                 this.inputValue = '';
//             }
            
//         },
//         deleteNote(index) {
//             console.log(this.notes[index]);
//             this.notes.splice(index, 1);
//         },
//         toUpperCase(item) {
//             return item.toUpperCase();
//         }
//         // inputKeyPress(event) {
//         //     console.log(event.key);
//         //     if(event.key === 'Enter') {
//         //         this.addNewNote();
//         //     }
//         // }
//     }
// }

// const app = Vue.createApp(App)

// app.mount('#app')



const App = {
    data() {
        return {
            notes: ['Note 1','Note 2'],
            inputPlaceholderString: 'Enter the note',
            inputValue: '',
            counter: 0,
            toUpperCaseOnClick: false,
        }
    },
    methods: {
        inputChangeHandler() {
            // console.log('inputChangeHandler', event.target.value);
            this.inputValue = event.target.value;
        },
        addNewNote(){
            if(this.inputValue !== '') {
                this.notes.push(this.inputValue);
                this.inputValue = '';
            }
        },
        inputKeyPress() {
            // console.log(event.key);
            if(event.key === 'Enter') {
                this.addNewNote();
            }
        },
        deleteNote(index) {
            // console.log(index);
            this.notes.splice(index, 1);
        },
       
        toUpperCase(index) {
            if(this.toUpperCaseOnClick == false){
                console.log('on');
                this.notes[index] = this.notes[index].toUpperCase();
                this.toUpperCaseOnClick = true;
            }else{
                this.notes[index] = this.notes[index].toLowerCase();
                this.toUpperCaseOnClick = false;

            }
            
            console.log(this.toUpperCaseOnClick);
        },
    },
    computed: {
        doubleCountComputed() {
            console.log('doubleCountComputed');
            return this.notes.length * 2;
        }  
    },
    watch: {
        inputValue(value) {
            console.log(value);
        }
    }
}

const app = Vue.createApp(App);
app.mount('#app');