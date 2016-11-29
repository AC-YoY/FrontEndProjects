var AjaxApi = function (url) {
    this.url = url
}
AjaxApi.prototype.get = function (path, callback) {
    var option = {
        url: this.url + path,
        type: 'get',
        async: false,
        success: function (a) {
            log('success')
            callback(a)
        },
        error: function () {
            log('error')
        },
    }
    $.ajax(option)
}
AjaxApi.prototype.post = function (path, data, callback) {
    var option = {
        url: this.url + path,
        type: 'post',
        contentType: 'application/json',
        data: data,
        success: function (a) {
            log('success')
            callback(a)
        },
        error: function () {
            log('error')
        },
    }
    $.ajax(option)
}
// 自己拓展方法
/*
var laa = new AjaxApi('http://localhost:8082')
laa.all(log)
var obj = {task:"XXX",id:100}
laa.add(obj,log)
*/
