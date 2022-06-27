import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = .1;

// ES6 Class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.speed = 5;
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
    }

    // end player class
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image;
        this.width = image.width;
        this.height = image.height;

        // end constructor
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    // end platform class
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image;
        this.width = image.width;
        this.height = image.height;

        // end constructor
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    // end generic class
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}
// vars
let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let player = new Player();
let platforms = []
let genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  }),
]
  
  
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}
  
let scrollOffset = 0
  // end vars
function init() {

  platformImage = createImage(platform)
  
  player = new Player();
  // platforms
  platforms = [
    new Platform({
      x: platformImage.width*4+300 -3 + platformImage.width - platformSmallTallImage.width, y:270, image: createImage(platformSmallTall)
    }),
    new Platform({
      x:-1,y: 470, image: platformImage
    }),
    new Platform({
      x: platformImage.width-3, y:470, image: platformImage
    }),
    new Platform({
      x: platformImage.width*2+100, y:470, image: platformImage
    }),
    new Platform({
      x: platformImage.width*3+300 -2, y:470, image: platformImage
    }),
    new Platform({
      x: platformImage.width*4+300 -3, y:470, image: platformImage
    }),
    new Platform({
      x: platformImage.width*5+800 -3, y:470, image: platformImage
    })
  ]
    genericObjects = [
      new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
      }),
      new GenericObject({
        x: -1,
        y: -1,
        image: createImage(hills)
      }),
    ]

    scrollOffset = 0
    // end init
  }
    
  function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
      genericObject.draw()
    })


    platforms.forEach(platform => {
      platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x >100) {
        player.velocity.x = -player.speed
    } else { 
        player.velocity.x = 0
        
        // platform scroll
        if (keys.right.pressed) {
            scrollOffset +=player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            // background scroll
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= player.speed *.66
            })
        } else if (keys.left.pressed) {
            scrollOffset -=player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            // background scroll
            genericObjects.forEach(genericObject => {
              genericObject.position.x += player.speed *.66
            })
        }
    }

    // platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    
      })
      
    // win condition
    if (scrollOffset > platformImage.width*5+400) {
      console.log('you win')
    }  
      
    // lose condition
    if (player.position.y > canvas.height) {
      init()
    }
      
      
      // end animate function
}
init()
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
            player.velocity.y = -8
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