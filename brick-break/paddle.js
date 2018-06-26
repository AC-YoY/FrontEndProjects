/*
* 
* Created by dycho on 2018-06-26
* 
* */

var Paddle = function () {
    var image = imageFromPath('./old/paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        w: 150,
        h: 22,
        speed: 5,
    }
    o.move = function (x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }
    o.moveRight = function () {
        o.move(o.x + o.speed)
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
