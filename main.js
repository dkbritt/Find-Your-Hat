const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field, playerRow, playerCol) {
        this.field = field;
        
        // find start point of pathCharacter
        for (let row = 0; row < field.length; row++) {
            for (let col = 0; col < field[row].length; col++) {
                if (field[row][col] === pathCharacter) {
                    this.playerRow = playerRow;
                    this.playerCol = playerCol;
                }
            }
        }
    }

    print() {
        for (let row of this.field) {
            console.log(row.join(' '));
        }
    }

    movePlayer(direction) {
        let newRow = this.playerRow;
        let newCol = this.playerCol;

        if (direction === 'l') {
            newCol--;
        } else if (direction === 'r') {
            newCol++;
        } else if (direction === 'u') {
            newRow--;
        } else if (direction === 'd') {
            newRow++;
        }

        // Out of bounds check
        if (newRow < 0 || newRow >= this.field.length || newCol < 0 || newCol >= this.field[0].length) {
            console.log('You walked out of bounds! Game over!');
            process.exit();
        }

        // Fell in a hole check
        if (this.field[newRow][newCol] === hole) {
            console.log('You fell in a hole! Game over!');
            process.exit();
        }

        // Hat check
        if (this.field[newRow][newCol] === hat) {
            console.log('Congratulations! You found the hat!');
            process.exit();
        }

        // Move player -- keep track of movement with *
        this.field[this.playerRow][this.playerCol] = pathCharacter;
        this.playerRow = newRow;
        this.playerCol = newCol;
        this.field[this.playerRow][this.playerCol] = pathCharacter;

        return 'continue';
    }
}


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
], 0, 0);


function promptMove() {
    let move = prompt("Which direction would you like to move? ('L'-left, 'R'-right, 'U'-up, 'D'-down): ");
    move = move.toLowerCase();

    if (move === 'l' || move === 'r' || move === 'u' || move === 'd') {
        const result = myField.movePlayer(move);
        myField.print();
        if (result === 'continue') {
            promptMove();
        }
    } else {
        console.log('Please enter a valid direction.');
        promptMove();
    }
}

function play() {
    myField.print();
    promptMove();
}

// Run the game
play();



