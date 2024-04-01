var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameOverElement = document.getElementById('game-over');
var playAgainButton = document.getElementById('play-again');

var grid = 16;
var count = 0;
var score = 0;
var gameRunning = true;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var apple = {
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid,
    exists: true
};

var orange = {
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid,
    exists: false
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    if (gameRunning) {
        requestAnimationFrame(loop);
    }
    if (++count < 6) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = '#4caf50';
    snake.cells.forEach(function(cell, index) {
        if (index === 0) {
            context.fillStyle = '#0000ff'; // make the head of the snake blue
        } else {
            context.fillStyle = '#4caf50';
        }
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        if (apple.exists && cell.x === apple.x && cell.y === apple.y) {
            score++;
            snake.maxCells++;
            apple.exists = false;
            orange.exists = true;
            orange.x = getRandomInt(0, 25) * grid;
            orange.y = getRandomInt(0, 25) * grid;
        }

        if (orange.exists && cell.x === orange.x && cell.y === orange.y) {
            score += 2;
            snake.maxCells += 2;
            orange.exists = false;
            apple.exists = true;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                gameOver();
            }
        }
    });

    if (apple.exists) {
        context.fillStyle = '#ff0000';
        context.fillRect(apple.x, apple.y, grid-1, grid-1);
    }

    if (orange.exists) {
        context.fillStyle = '#ff8000'; // Orange color
        context.fillRect(orange.x, orange.y, grid-1, grid-1);
    }
}

function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
}

playAgainButton.addEventListener('click', function() {
    gameOverElement.style.display = 'none';
    gameRunning = true;
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.exists = true;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
    orange.exists = false;
    score = 0;
    document.getElementById('score').innerHTML = 'Score: ' + score;
    loop();
});

document.addEventListener('keydown', function(e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && snake.dx === 0) {
            /* left swipe */
            snake.dx = -grid;
            snake.dy = 0;
        } else if (snake.dx === 0) {
            /* right swipe */
            snake.dx = grid;
            snake.dy = 0;
        }
    } else {
        if (yDiff > 0 && snake.dy === 0) {
            /* up swipe */
            snake.dy = -grid;
            snake.dx = 0;
        } else if (snake.dy === 0) {
            /* down swipe */
            snake.dy = grid;
            snake.dx = 0;
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

requestAnimationFrame(loop);
