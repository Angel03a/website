let circles = [];
let survivalTime = 0;
let playerRadius = 10;

function setup() {
    createCanvas(700, 700);
    frameRate(60);
    survivalTime = 0;
}

function draw() {
    background(220);

    if (random() < 0.02) {
        circles.push(new RandomCircle());
    }

    for (let i = circles.length - 1; i >= 0; i--) { //make random circles fall from top to bottom
        circles[i].update();
        circles[i].display();

        if (dist(mouseX, mouseY, circles[i].x, circles[i].y) < playerRadius + circles[i].radius) {
            resetGame();
            break;
        }
    }

    fill(0);
    noStroke();
    ellipse(mouseX, mouseY, playerRadius * 2, playerRadius * 2);

    survivalTime += deltaTime / 1000;

    if (survivalTime >= 20) { //Check the 20 seconds of survival of the player
        fill(0, 255, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("20 Seconds Survived!", width / 2, height / 2);
    }
}

function resetGame() { //if the player gets hit, reset
    circles = []; //Clear array of falling circles
    survivalTime = 0; //Reset the seconds to 0
    fill(255, 0, 0); 
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Reset!", width / 2, height / 2);
    noLoop();
    setTimeout(() => { //reset the game, make a loop with 2000 (seconds) to start again
        loop();
    }, 2000);
}

class RandomCircle {
    constructor() {
        this.x = random(width);
        this.y = 0;
        this.radius = random(15, 40); //Random radious between 15 and 40
        this.speed = random(2, 4); //rando speed between 2 and 4
    }

    update() {
        this.y += this.speed;
        if (this.y > height) { //increase Y position by the speed
            this.y = 0;
            this.x = random(width); //if the circle gets out of view, reset at a new X location and new random radious
            this.radius = random(15, 40);
        }
    }

    display() {
        fill(255, 0, 0); //draw the player's circle
        noStroke();
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}
