let flashlightRadius = 50;
let doorX, doorY, doorWidth, doorHeight;

function setup() {
    createCanvas(1920, 1080);
    noStroke();
    
    doorWidth = 40;
    doorHeight = 70;
    doorX = random(100, 900); //make a door randomly across the canvas between 100 and 900
    doorY = random(100, 900);
    
    textSize(18);
    fill(255); 
}

function draw() {
    background(0);
    
    drawFlashlight(mouseX, mouseY); //follow mouse
    
    drawDoor(); //Make the door in the canvas
    
    fill(255);
    text("Find the exit", 20, 30); 
}

function drawFlashlight(x, y) { //Make the flashlight, follow the X and Y position of mouse
    for (let r = flashlightRadius; r > 0; r -= 4) {
        let opacity = map(r, 0, flashlightRadius, 0, 150); //radious of r
        let colorVal = map(r, 0, flashlightRadius, 255, 200); //color
        
        fill(colorVal, colorVal - 50, 0, opacity); //fill color of circle
        ellipse(x, y, r * 2, r * 2); //Draw the circle that mimic's a flashlight
    }
}

function drawDoor() {
    let d = dist(mouseX, mouseY, doorX + doorWidth / 2, doorY + doorHeight / 2);
    
    if (d < flashlightRadius) {
        fill(139, 69, 19);
        rect(doorX, doorY, doorWidth, doorHeight);
        
        if (mouseIsPressed && d < flashlightRadius) { //if the door is clciked, check for the radious and move to the next game
            window.location.href = 'SquareGame.html';
        }
    } else {
        fill(0);
        rect(doorX, doorY, doorWidth, doorHeight); //if the radious of the mouse is outside of the radious, the door is in black
    }
}
