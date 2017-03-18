$(document).ready(function() {
    var href = location.href.slice(location.href.lastIndexOf("/") + 1)
    var index = localStorage[href]

    $(".button-list2 > a").removeClass("btn-active").eq(index).addClass("btn-active")
    for(var i = 1; i < 10; i++) {
        var ele = ".switch-tab-" + i
        $(ele).hide()
    }

    var ele = ".switch-tab-" + ++index
    $(ele).show()
})
