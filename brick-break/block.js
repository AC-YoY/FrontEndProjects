/*
* 
* Created by dycho on 2018-06-26
* 
* */

var Block = function (position) {
    // position 是 [0, 0, 0] 格式
    var p = position
    var image = imageFromPath('./old/block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lives: p[2] || 1
    }
    o.kill = function () {
        log('kill')
        o.lives--
        if (o.lives === 0) {
            o.alive = false
        }
    }
    o.collide = function (item) {
        return o.alive && rectIntersect(o, item)
    }
    return o
}
