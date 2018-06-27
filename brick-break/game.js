/*
* 
* Created by dycho on 2018-06-26
* 
* */

var Game = function (loads) {
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

    window.fps = 30
    var runLoop = function () {
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

        setTimeout(function () {
            runLoop()
        }, 1000/fps)
    }

    var flag = []
    for (var i = 0; i < loads.length; i++) {
        var p = loads[i]
        var img = new Image()
        img.src = p
        img.onload = function () {
            flag.push(1)
            if (flag.length === loads.length) {
                g.run()
            }
        }
    }

    g.run = function () {
        setTimeout(function () {
            runLoop()
        }, 1000/fps)
    }

    return g
}