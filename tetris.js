const canvas = document.getElementById('tetris');

const context = canvas.getContext('2d')

//sets the color to black, 000 is black
context.fillstyle = '#000'

context.fillRect(0,0, canvas.width, canvas.height);

//making the 2d matrix for the T piece
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
]

//because we want each 0 to be nothing, if it's not zero (1) we set it to red
matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = 'red'
            //left, top, width, height
            context.fillRect(x, y, 1, 1):
        }
    });
});