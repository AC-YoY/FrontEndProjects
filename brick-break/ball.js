/*
* 
* Created by dycho on 2018-06-26
* 
* */

var Ball = function () {
    var image = imageFromPath('./old/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speedX: 6,
        speedY: -6,
        fired: false,
    }
    o.fire = function () {
        o.fired = true
    }
    o.move = function () {
        if (o.fired) {
            if (o.x >= 400 || o.x <= 0) {
                o.speedX *= -1
            } else if (o.y >= 300 || o.y <= 0) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function () {
        o.speedY *= -1
    }
    return o
}
