const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        for (let row of this.field) {
            console.log(row.join(' '));
        }
    }
}


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


myField.print();


function promptMove() {
    let move = prompt("Which direction would you like to move? ('L'-left, 'R'-right, 'U'-up, 'D'-down): ");
    move = move.toLowerCase();

    if (move === 'l' || move === 'r' || move === 'u' || move === 'd') {
        makeMove(move)
    } else {
        console.log('Please enter a valid direction.');
        promptMove();
    }
}

function makeMove(move) {
    if (move === 'l') {

    } else if (move === 'r') {

    } else if (move === 'u') {

    } else if (move === 'd') {
        
    }
}

promptMove();



