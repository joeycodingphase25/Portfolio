

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = innerHeight;

const gravity = .1;

// ES6 Class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.width = 30;
        this.height = 30;
        this.velocity = {
            x:0,
            y:0
        };

        // end constructor 
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y
        this.draw()

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }

    // end player class
}

const player = new Player();
player.update()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()




