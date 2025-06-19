const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field;
        this.playerRow = 0;
        this.playerCol = 0;
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

    static generateField(width, height, percentage) {
        // Create 2d field with width/height and fill with field characters '░'
        const field = [];
        for (let row = 0; row < height; row++) {
            field[row] = [];
            for (let col = 0; col < width; col++) {
                field[row][col] = fieldCharacter;
            }
        }

        // Set pathCharacter '*' to starting position
        field[0][0] = pathCharacter;

        // Place hat randomly (avoid [0][0])
        let hatRow = 0;
        let hatCol = 0;

        while (hatRow === 0 && hatCol === 0) {
            hatRow = Math.floor(Math.random() * height);
            hatCol = Math.floor(Math.random() * width);
        }

        field[hatRow][hatCol] = hat;


        // Place holes (avoid [0][0] and hat position)
        const totalCells = width * height;
        const numOfHoles = Math.floor(totalCells * percentage);
        let holesPlaced = 0;

        while (holesPlaced < numOfHoles) {
            let holeRow = Math.floor(Math.random() * height);
            let holeCol = Math.floor(Math.random() * width);

            // Avoid hat and [0][0] positions. Dont overwrite another hole
            if ((holeRow !== 0 || holeCol !== 0) && field[holeRow][holeCol] === fieldCharacter) {
                field[holeRow][holeCol] = hole;
                holesPlaced++;
            }
        }

        return field;
        
    }
}


// const myField = new Field([
//   ['*', '░', 'O'],
//   ['░', 'O', '░'],
//   ['░', '^', '░'],
// ], 0, 0);


function fieldSetup() {
    let validWidth, validHeight, validPercent = false;
    let fieldWidth, fieldHeight, fieldPercent;

    console.log("\n\nWelcome to 'Find-Your-Hat'! Let's create a custom field.");
    console.log("***                                                  ***\n");


    while (!validWidth) {
        fieldWidth = prompt("Enter a field width (between 2-50): ");
        fieldWidth = Number(fieldWidth);

        // If the fieldWidth entered is Not-a-number, or is a number, but not between 2-10, then ask the user to try again
        if (isNaN(fieldWidth) || (typeof fieldWidth === 'number' && (fieldWidth < 2 || fieldWidth > 50))) {
            console.log('Sorry, please enter a valid width.');
        } else {
            validWidth = true;
        }      
    }

    while (!validHeight) {
        fieldHeight = prompt("Enter a field height (between 2-50): ");
        fieldHeight = Number(fieldHeight);

        // If the fieldWidth entered is Not-a-number, or is a number, but not between 2-10, then ask the user to try again
        if (isNaN(fieldHeight) || (typeof fieldHeight === 'number' && (fieldHeight < 2 || fieldHeight > 50))) {
            console.log('Sorry, please enter a valid height.');
        } else {
            validHeight = true;
        }  
    }

    while (!validPercent) {
        fieldPercent = prompt("What percentage of the board should be holes? (Max is 50): ");
        fieldPercent = Number(fieldPercent);

        // If the fieldWidth entered is Not-a-number, or is a number, but not between 2-10, then ask the user to try again
        if (isNaN(fieldPercent) || (typeof fieldPercent === 'number' && (fieldPercent < 0 || fieldPercent > 50))) {
            console.log('Sorry, please enter a valid percentage (do not inclue the % symbol).');
        } else {
            validPercent = true;
        }   
    }    

    // let numOfHoles = fieldWidth * fieldHeight

    console.log(`Your field is ${fieldWidth} wide, ${fieldHeight} tall. ${fieldPercent}% of holes`);

    return [fieldWidth, fieldHeight, fieldPercent]

}

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

const [width, height, percent] = fieldSetup(); // get user input
const generatedField = Field.generateField(width, height, percent/100); // generate the 2D array
const myField = new Field(generatedField); // create Field instance at starting position
myField.print();
promptMove();



