var log = function() {
    console.log.apply(console, arguments)
}
/*
开启后访问localhost:8082，默认就是DailyTask
*/
var express = require('express')
var app = express()
// 交互数据格式
var bodyParser = require('body-parser')
app.use(bodyParser.json())
// 后端保存保存的数据

// 默认给参数行数据 加一个 标识
var id = 0
var todoList = []
// app.use(express.static('static'))
app.use(express.static('icon'))

var sendHTML = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, function(err, data) {
        console.log(`读取到html文件${path}是： `, data)
        response.send(data)
    })
}
app.get('/', function(req, res) {
    sendHTML('DailyTask.html', res)
})
app.post('/add', function(req, res) {
    var obj = {
        id: id,
        time: req.body.time,
        task: req.body.task,
        // 这个没做
        // status: req.body.status,
    }
    id++
    todoList.push(obj)
    res.send(obj)
})
app.get('/all', function(req, res) {
    res.send(JSON.stringify(todoList))
})
app.get('/delete/*', function(req, res) {
    var delID = req.params[0]
    for (var i = 0; i < todoList.length; i++) {
        var ele = todoList[i]
        if (ele.id == delID) {
            break
        }
    }
    todoList.splice(i, 1)
    res.send(ele)
})
var server = app.listen(8082, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
