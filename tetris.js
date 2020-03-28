const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

//making the 2d matrix for the T piece
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]

function collide(arena, player) {
    const [m,o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
            (arena[y + o.y] &&
            arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

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
    drawMatrix(arena, {x: 0, y: 0});
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

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

//this controls the movement of each direction
// and keeps it so it won't exit the arena
function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }

    }
}

//creating the rotation of the grid
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
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
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}
const arena = createMatrix(12, 20);

//sets the position of the piece the player controls 
const player = {
    pos: {x: 5,y: 5},
    matrix: matrix,
}

document.addEventListener('keydown', event => {
    console.log(event);
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40 ) {
        playerDrop(); 
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 87) {
        playerRotate(1);
    }
});
update();