/*
* 
* Created by dycho on 2018-06-26
* 
* */

var log = console.log.bind(console)

var e = ele => document.querySelector(ele)

function imageFromPath (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersect = function (a, b) {
    // if (b.y > a.y && b.y < a.y + a.image.height) {
    //     if (b.x > a.x && b.x < a.x + a.image.width) {
    //         return true
    //     }
    // }
    // return false
    // a 坐标
    var minx1 = a.x
    var miny1 = a.y
    var maxx1 = a.x + a.image.width
    var maxy1 = a.y + a.image.height
    // b 坐标
    var minx2 = b.x
    var miny2 = b.y
    var maxx2 = b.x + b.image.width
    var maxy2 = b.y + b.image.height
    // 计算相交的矩形
    var minx = Math.max(minx1, minx2)
    var miny = Math.max(miny1, miny2)
    var maxx = Math.min(maxx1, maxx2)
    var maxy = Math.min(maxy1, maxy2)

    return minx < maxx && miny < maxy
}

