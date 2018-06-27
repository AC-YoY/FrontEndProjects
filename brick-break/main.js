/**
 * Created by 建苍 on 2018/6/23.
 */


var loadLevel = function (n) {
    n = n - 1
    var l = levels[n]
    var blocks = []
    for (var i = 0; i < l.length; i++) {
        var p = l[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}


function __main () {
    function enableDebugMode (flag) {
        if (!flag) {
            return
        }
        // 这部分是为了debug
        window.addEventListener('keyup', function (e) {
            var key = e.key
            if (key === 'p') {
                paused = !paused
            } else if ('123456789'.includes(key)) {
                blocks = loadLevel(Number(key))
            }
        })
        e('#id-range').addEventListener('input', function (e) {
            var n = e.target.value
            if (n == 0) {
                n = 1
            }
            window.fps = n
        })
    }
    enableDebugMode(true)

    var images = [
        './old/ball.png',
        './old/block.png',
        './old/paddle.png',
    ]
    var game = Game(images)
    var paddle = Paddle()
    var ball = Ball()
    var paused = false
    var blocks = []
    var score = 0

    blocks = loadLevel(1)

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
        if (paused) {
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            ball.bounce()
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.collide(ball)) {
                b.kill()
                ball.bounce()
            }
        }
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)

        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (b.alive) {
                game.drawImage(b)
            }
        }

        game.context.fillText('得分 ' + score, 20, 290)
    }
}

__main()
