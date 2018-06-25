/**
 * Created by 建苍 on 2018/6/23.
 */

function imageFromPath (path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function () {
    var image = imageFromPath('./old/paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 5,
    }
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveRight = function () {
        o.x += o.speed
    }
    o.collide = function (item) {
        if (item.image.height + item.y > o.y) {
            if (item.x > o.x && item.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}
var Ball = function () {
    var image = imageFromPath('./old/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speedX: 6,
        speedY: 6,
        fired: false,
    }
    o.fire = function () {
        o.fired = true
    }
    o.move = function () {
        if (o.fired) {
            console.log('move')
            if (o.x >= 400 || o.x <= 0) {
                o.speedX *= -1
            } else if (o.y >= 300 || o.y <= 0) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
}

var rectIntersect = function (a, b) {
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
    return false
}

var Block = function () {
    var image = imageFromPath('./old/block.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        w: 50,
        h: 20,
        alive: true,
    }
    o.kill = function () {
        console.log('kill')
        o.alive = false
    }
    o.collide = function (item) {
        return rectIntersect(o, item) || rectIntersect(item, o)
    }
    return o
}

var Game = function () {
    var g = {
        keys: {},   // key: boolean
        events: {}, // key: callback
    }
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext('2d')
    g.canvas = canvas
    g.context = ctx

    // 事件注册机制
    window.addEventListener('keydown', function (e) {
        g.keys[e.key] = true
    })
    window.addEventListener('keyup', function (e) {
        g.keys[e.key] = false
    })

    // 暴露的方法
    g.registerAction = function (key, callBack) {
        g.events[key] = callBack
    }
    g.drawImage = function (item) {
        g.context.drawImage(item.image, item.x, item.y)
    }

    g.update = function () {}

    g.draw = function () {}

    setInterval(function () {
        // events, 执行注册函数
        var events = Object.keys(g.events)
        for (let i = 0; i < events.length; i++) {
            var key = events[i]
            if (g.keys[key]) {
                g.events[key]()
            }
        }
        // update
        g.update()
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000/60)

    return g
}

function __main () {
    var game = Game()
    var paddle = Paddle()
    var ball = Ball()
    var block = Block()

    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    game.update = function () {
        ball.move()
        if (paddle.collide(ball)) {
            // TODO: ball.反弹()
            ball.speedY *= -1
        }
        if (block.collide(ball)) {
            block.kill()
        }
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        if (block.alive) {
            game.drawImage(block)
        }
    }
}

__main()
