

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
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }

    // end player class
}

const player = new Player();
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else { player.velocity.x = 0}
}

animate()

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            break
        case 83:
            console.log('down')
            break
    }
})



addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            break
        case 83:
            console.log('down')
            break
    }
})
