$(document).ready(function() {
    var href = location.href.slice(location.href.lastIndexOf("/") + 1)
    var index = localStorage[href]

    $(".tabswitch-btn").removeClass("switch-active").eq(index).addClass("switch-active")
    for(var i = 1; i < 10; i++) {
        var ele = ".card-switch-" + i
        $(ele).hide()
    }

    var ele = ".card-switch-" + ++index
    $(ele).show()
})
