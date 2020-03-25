const canvas = document.getElementById('tetris');

const context = canvas.getContext('2d');

context.scale(20, 20);
    //sets the color to black, 000 is black
    context.fillstyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);



//making the 2d matrix for the T piece
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]

function draw() {
    //sets the color to black, 000 is black
    context.fillstyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    //because we want each 0 to be nothing, if it's not zero (1) we set it to red
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                //left, top, width, height
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
    console.log(deltaTime);
    draw();
    requestAnimationFrame(update);
}

//sets the position of the piece the player controls
const player = {
    pos: {x: 5,y: 5},
    matrix: matrix,
}

update();