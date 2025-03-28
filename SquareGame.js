let squares = [];
let selectedSquare = null;
let isFirstClick = true;
let resetTimer = 0; //Timer for resetting the squares
let squareSize = 90;
let canvasSize = 500;

function setup() {
    createCanvas(canvasSize, canvasSize);
    drawSquares();
}

function drawSquares() {
    background(220);
    squares = [];

    //Random color for the 3 aligned squares
    let specialColor = color(random(255), random(255), random(255));

    //Grid of squares and also make sure to have 3 random squares of the same color
    let randomPositions = [];
    
    //3 Random positions
    while (randomPositions.length < 3) {
        let randX = floor(random(0, width / squareSize)) * squareSize;
        let randY = floor(random(0, height / squareSize)) * squareSize;
        let pos = { x: randX, y: randY };

        // Ensure no duplicate positions
        if (!randomPositions.some(p => p.x === pos.x && p.y === pos.y)) {
            randomPositions.push(pos);
        }
    }

    //Place those three random color squares, across X and Y.
    for (let pos of randomPositions) {
        squares.push({ x: pos.x, y: pos.y, size: squareSize, color: specialColor });
    }

    //Create the rest of the grid squares with random colors
    for (let x = 0; x < width; x += squareSize) {
        for (let y = 0; y < height; y += squareSize) {
            let square = {
                x: x,
                y: y,
                size: squareSize,
                color: color(random(255), random(255), random(255)), // Random color for most squares
            };
            
            //Only add the square if it's not one of the random aligned squares
            if (!randomPositions.some(p => p.x === square.x && p.y === square.y)) {
                squares.push(square);
            }
        }
    }

    //Draw squares
    for (let i = 0; i < squares.length; i++) {
        let sq = squares[i];
        fill(sq.color);
        rect(sq.x, sq.y, sq.size, sq.size);
    }
}

//Detect the row of squares of the same color
function checkForWinningCondition() {
    //Horizontal check
    for (let y = 0; y < height / squareSize; y++) {
        for (let x = 0; x < width / squareSize - 2; x++) {
            let first = squares.find(sq => sq.x === x * squareSize && sq.y === y * squareSize);
            let second = squares.find(sq => sq.x === (x + 1) * squareSize && sq.y === y * squareSize);
            let third = squares.find(sq => sq.x === (x + 2) * squareSize && sq.y === y * squareSize);
            if (first.color.levels.every((value, index) => value === second.color.levels[index] && value === third.color.levels[index])) {
                return true;
            }
        }
    }

    //Vertical check
    for (let x = 0; x < width / squareSize; x++) {
        for (let y = 0; y < height / squareSize - 2; y++) {
            let first = squares.find(sq => sq.x === x * squareSize && sq.y === y * squareSize);
            let second = squares.find(sq => sq.x === x * squareSize && sq.y === (y + 1) * squareSize);
            let third = squares.find(sq => sq.x === x * squareSize && sq.y === (y + 2) * squareSize);
            if (first.color.levels.every((value, index) => value === second.color.levels[index] && value === third.color.levels[index])) {
                return true;
            }
        }
    }

    return false;
}

function mousePressed() {
    for (let i = 0; i < squares.length; i++) {
        let sq = squares[i];
        if (mouseX > sq.x && mouseX < sq.x + sq.size && mouseY > sq.y && mouseY < sq.y + sq.size) {
            if (isFirstClick) {
                selectedSquare = sq;
                isFirstClick = false;
            } else {
                let tempX = sq.x;
                let tempY = sq.y;

                sq.x = selectedSquare.x;
                sq.y = selectedSquare.y;
                selectedSquare.x = tempX;
                selectedSquare.y = tempY;

                isFirstClick = true;
            }
            break;
        }
    }
    redrawSquares();
}

//Place all squares again
function redrawSquares() {
    background(220);
    for (let i = 0; i < squares.length; i++) {
        let sq = squares[i];
        fill(sq.color);
        rect(sq.x, sq.y, sq.size, sq.size);
    }
}

function draw() {
    resetTimer += deltaTime;

    if (resetTimer >= 3000) { //3000ms = 3 seconds
        resetTimer = 0;
        drawSquares(); //Every 3 seconds, reset the squares
    }

    if (checkForWinningCondition()) {
        window.location.href = "RedCircles.html"; //Move to the next game if success
    }
}
