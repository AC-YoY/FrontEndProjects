var log = function() {
    console.log.apply(console, arguments)
}
var bindNav = function() {
    $(".site-nav-down").on("click", function(event) {
        var target = event.target
        // 测试 1. ok
            $(target).siblings(".site-nav-pulldown").addClass("pulldown-active")
            $(target).closest("li").addClass("nav-active")
        // End
    })
    $(".head-right").on("mouseleave", function(event) {
        $(".pulldown-active").removeClass("pulldown-active")
        $(".nav-active").removeClass("nav-active")
    })
    // J-nav 二级菜单
    var timer = null
    $(".J-nav li").hover(function(event) {
        // log($(event.target).index())
        $(".J-nav li").removeClass("J-nav-hovered")
        clearTimeout(timer)
        $(event.target).addClass("J-nav-hovered")
        $(".J-nav-serviceFloat").addClass("J-nav-sf-show")
    }, function(event) {
        clearTimeout(timer)
        var e = $(event.target)
        timer = setTimeout(function() {
            e.removeClass("J-nav-hovered")
            $(".J-nav-serviceFloat").removeClass("J-nav-sf-show")
        }, 200)
    })
    $(".J-nav-serviceFloat").mouseenter(function(event) {
        clearTimeout(timer)
    })
    $(".J-nav-serviceFloat").mouseleave(function() {
        $(".J-nav li").removeClass("J-nav-hovered")
        $(".J-nav-serviceFloat").removeClass("J-nav-sf-show")
    })
}
var bindShiftSearch = function() {
    // 搜索栏变色
    $(".search-shift").on("click", function(event) {
        if(!$(event.target).hasClass("shift-active-default")) {
            var index = $(event.target).data("type")
            $(".shift-active-default").removeClass("shift-active-default")
            $(".shift-active-1").removeClass("shift-active-1")
            $(".search-input").removeClass("search-input-active")
            $(".search-btn").removeClass("search-btn-active")
            if(index == 1) {
                $(event.target).addClass("shift-active-1")
                $(".search-input").addClass("search-input-active")
                $(".search-btn").addClass("search-btn-active")
            } else {
                $(event.target).addClass("shift-active-default")
            }
        }
    })
}
var bindSlider = function() {
    // slider轮播图效果
    $(".slider-img-box").hover(function(event) {
        var imgbox = $(event.target).closest(".slider-img-box")
        imgbox.find(".slider-btn").addClass("slider-btn-act")
    }, function(event){
        var imgbox = $(event.target).closest(".slider-img-box")
        imgbox.find(".slider-btn").removeClass("slider-btn-act")
    })
    $(".J-s-up .slider-btn").click(function(event) {
        var imgBox = $(event.target).closest(".slider-img-box")[0]
        var thumbBox = $(event.target).parent().siblings(".thumb-nails-box")
        var imgIdx = $(imgBox).data("index")
        if($(event.target).hasClass("slider-btn-left")) {
            var index = calcIndex(imgBox, imgIdx, -1)
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
        } else if ($(event.target).hasClass("slider-btn-right")) {
            var index = calcIndex(imgBox, imgIdx, 1)
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
        }
    })
    $(".J-s-up .thumb-nail").click(function(event) {
        var index = $(event.target).index()
        var imgBox = $(event.target).parent().siblings(".slider-img-box")[0]
        var thumbBox = $(event.target).parent()[0]
        if(!$(event.target).hasClass("thumb-active")) {
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
        }
    })
    $(".J-s-down .slider-btn").click(function(event) {
        var imgBox = $(event.target).closest(".slider-img-box")[0]
        var thumbBox = $(event.target).parent().siblings(".thumb-nails-box")
        var imgIdx = $(imgBox).data("index")
        if($(event.target).hasClass("slider-btn-left")) {
            var index = calcIndex(imgBox, imgIdx, -1)
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
            $(".J-s-mid i").text(index + 1)
        } else if ($(event.target).hasClass("slider-btn-right")) {
            var index = calcIndex(imgBox, imgIdx, 1)
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
            $(".J-s-mid i").text(index + 1)
        }
    })
    $(".J-s-down .thumb-nail").click(function(event) {
        var index = $(event.target).index()
        var imgBox = $(event.target).parent().siblings(".slider-img-box")[0]
        var thumbBox = $(event.target).parent()[0]
        if(!$(event.target).hasClass("thumb-active")) {
            imgActiveChange(imgBox, index)
            thumbActiveChange(thumbBox, index)
            $(".J-s-mid i").text(index + 1)
        }
    })
    var calcIndex = function(box, index, offset) {
        var total = $(box).data("images")
        var idx = (index + offset + total) % total
        return idx
    }
    var imgActiveChange = function(imgBox, index) {
        $(imgBox).find(".slider-active").removeClass("slider-active")
        $($(imgBox).find("img")[index]).addClass("slider-active")
        $(imgBox).data("index", index)
    }
    var thumbActiveChange = function(thumbBox, index) {
        $(thumbBox).find(".thumb-active").removeClass("thumb-active")
        $($(thumbBox).find("div")[index]).addClass("thumb-active")
        $(thumbBox).data("index", index)
    }
}
var bindMsg = function() {
    $(".msg-title").on("mouseover", "li", function(event) {
        var index = $(event.target).index()
        $(".msg-active").removeClass("msg-active")
        $($(".J-msgbox").find("ul")[index]).addClass("msg-active")
    })
}
var bindBelt = function() {
    /*
        这个部分结合Css一起使用的方法很有意思，
        写完觉得就好像不是我亲自想出来的一样
    */
    $(".J-seat-belt a").hover(function(event) {
        $(event.target).find("img").addClass("belt-active")
    }, function(event) {
        $(event.target).find("img").removeClass("belt-active")
    })
}
var __main = function() {
    bindNav()
    bindShiftSearch()
    bindSlider()
    bindMsg()
    bindBelt()
}
$(document).ready(function() {
    __main()
})
