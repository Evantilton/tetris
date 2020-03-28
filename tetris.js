const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

//making the 2d matrix for the T piece
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]

// function collide(arena, player) {
//     const [m,o]
// }

function createMatrix (w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}

function draw() {
    //this draws the board, 000 is code for black
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    //this checks the board and because we want 0 to be blank, 
    //we check if it's not zero and color that piece
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}
let dropCounter = 0;
//this is milliseconds, so every 1 second
//it drops the piece every 1 second
let dropInterval = 1000;
let lastTime = 0;
//this keeps it continually updating on every move
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
}
const arena = createMatrix(12, 20);
console.log(arena);
console.table(arena);
//sets the position of the piece the player controls 
const player = {
    pos: {x: 5,y: 5},
    matrix: matrix,
}

document.addEventListener('keydown', event => {
    console.log(event);
    if (event.keyCode === 37) {
        player.pos.x--;
    } else if (event.keyCode === 39) {
        player.pos.x++;
    } else if (event.keyCode === 40 ) {
        player.pos.y++;
        //this is so it doesn't drop twice immediately, this adds
        //a second delay before the next auto drop
        dropCounter = 0;
    }
});
update();