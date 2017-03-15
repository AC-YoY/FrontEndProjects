(function() {
    var log = function() {
        console.log.apply(console, arguments)
    }
    log("%cWelcome To Maiun!", "background: #ccc;font-size: 42px;")

    // 蓝色图标
    $(".pointer > span").hover(function() {
        $(this).addClass("pointer-change")
    }, function() {
        $(this).removeClass("pointer-change")
    })
    // nav的搜索栏动画
    $(".search-input").focus(function() {
        $(this).animate({
            width: "210"
        }, 300, function() {
        })
    })
    $(".search-input").blur(function() {
        $(this).animate({
            width: "140"
        }, 300, function() {
        })
    })
    // menu bar starts
    var timer = null
    $(".pointer").hover(function() {
        initMenus()
        // clearTimeout(timer)
        $(this).parent().find(".menu-mask").slideDown(200)
    }, function() {
        clearTimeout(timer)
        var that = $(this)
        timer = setTimeout(function() {
            that.parent().find(".menu-mask").hide()
        }, 10)
    })
    $(".menu-mask").hover(function() {
        clearTimeout(timer)
    }, function() {
        $(this).slideUp(100)

        // // 关闭菜单内容
        // $(".menu-ul > ul").hide()
        // $(".menu-div > div").hide()
        // $(".menu-about > div").hide()
        // $(".menu-content > div").hide()
        // $(".nav-4-empty-block").hide()
    })

    var initMenus = function() {
        $(".menu-ul > ul").hide()
        $(".menu-content > div").hide()
        $(".menu-div > div").hide()
        $(".menu-about > div").hide()

        $(".menu-left > ul > li:first-child").addClass("hover-back-color").css("color", "white").siblings().removeClass("hover-back-color").css("color", "#cbd0d4")
        $(".menu-ul > ul:first-child").show()
        $(".menu-content > div:first-child").show()
        $(".nav-4-empty-block").show()
        $(".menu-div > div:first-child").show()
        $(".menu-about > div:first-child").show()
    }

    // menu-left 也就是二级菜单的切换
    $(".menu-left li").hover(function() {
        $(this).siblings().removeClass("hover-back-color").css("color", "#cbd0d4")
        // 因为二级菜单有三种式样，所以必须保证他们都被正确关闭了
        $(".menu-ul > ul").hide()
        $(".menu-div > div").hide()
        $(".menu-about > div").hide()

        $(this).addClass("hover-back-color").css("color", "white")
        var index = $(this).index()
        // 注意，被打开的是 menu-num 类型的class 标签
        var className = ".menu-" + index
        $(className).show()
        $(".nav-4-empty-block").show()
    }, function() {
        // do nothing
    })

    // menu-right 也就是第三级菜单的切换
    $(".menu-ul > ul > li").hover(function() {
        $(".menu-content > div").hide()
        var index3 = $(this).index()
        var index2 = $(this).parent().index()
        var t = ".menu-" + index2 + "-" + index3
        $(this).parent().parent().parent().find(".menu-content").find(t).show()
    }, function() {
        //do nothing
    })
    // 导航栏结束

    // tab页切换 校园招聘
    $(".tabswitch-btn").click(function() {
        if(!$(this).hasClass("switch-active")) {
            $(this).siblings().removeClass("switch-active")
            $(this).addClass("switch-active")
            for(var i = 1; i < 6; i++) {
                var ele = ".card-switch-" + i
                $(ele).hide()
            }
            var index = $(this).index() + 1
            $(".card-switch-" + index).show()
        }
    })

    // tab页切换 关于企业
    $(".button-list > a").click(function() {
        $(this).siblings().removeClass("btn-active")
        $(this).addClass("btn-active")

        for(var i= 1; i < 5; i++) {
            var ele = ".switch-tab-" + i
            $(ele).hide()
        }
        var index = $(this).index() + 1
        var ele = ".switch-tab-" + index
        $(ele).show()
    })
    $(".button-list2 > a").click(function() {
        $(this).siblings().removeClass("btn-active")
        $(this).addClass("btn-active")

        for(var i= 1; i < 7; i++) {
            var ele = ".switch-tab-" + i
            $(ele).hide()
        }
        var index = $(this).index() + 1
        var ele = ".switch-tab-" + index
        $(ele).show()
    })

    // 这里是一些特殊效果
    $(".section-two-article").hover(function() {
        $(this).find("button").css("border-color", "#1784db")
        $(this).find("button").css("color", "#1784db")
    }, function() {
        $(this).find("button").css("border-color", "white")
        $(this).find("button").css("color", "black")
    })

    // 两个article的效果
    $(".section-one-article").hover(function() {
        $(this).find("a").css("color", "#1784db")
        $(this).find(".icon-right").attr("src", "./imgs/right-blue.jpg")
    }, function() {
        $(this).find("a").css("color", "black")
        $(this).find(".icon-right").attr("src", "./imgs/right-black.png")
    })

    // 触发hover效果
    // $(".template-card-img-1").hover(function() {
    //     log("enter")
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0) 60%, rgba(255,255,255,1)), url(./imgs/shanghai.png)")
    // }, function() {
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,1)), url(./imgs/shanghai.png)")
    // })
    // $(".template-card-img-2").hover(function() {
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0) 60%, rgba(255,255,255,1)), url(./imgs/shenzhen.png)")
    // }, function() {
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,1)), url(./imgs/shenzhen.png)")
    // })
    // $(".template-card-img-3").hover(function() {
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0) 60%, rgba(255,255,255,1)), url(./imgs/guangzhou.png)")
    // }, function() {
    //     $(this).css("background","linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,1)), url(./imgs/guangzhou.png)")
    // })

    // 首页底端动画
    $(".section-six-bg").hover(function() {
        $(this).find(".upblock-content").fadeIn(1000)
        $(this).find(".upblock-btn").fadeIn(1000)
        $(this).find(".upblock-icon-2").hide()
        $(this).find(".upblock-icon-1").addClass("upblock-icon-hover")
        $(this).find(".upblock-bg-cg").slideDown(400)

    }, function() {
        $(this).find(".upblock-icon-1").removeClass("upblock-icon-hover")
        $(this).find(".upblock-icon-2").stop().fadeIn(600)
        $(this).find(".upblock-content").stop().hide()
        $(this).find(".upblock-btn").stop().hide()
        $(this).find(".upblock-bg-cg").stop().slideUp(100)
    })

    // 不同的链接保存不同的tab序号。来调用不同的选项卡

    $(".menu-ul li").click(function() {
        var tabIndex = $(this).index()
        var pageIndex = $(this).parent().index()
        var href =  $(this).data("href")
        log(href)
        if(href.slice(1, 8) === "service") {
            if(pageIndex == 0) {
                localStorage["service-consult"] = tabIndex
            }else if(pageIndex == 1) {
                localStorage["service-dev"] = tabIndex
            }else if(pageIndex == 2) {
                localStorage["service-maintenance"] = tabIndex
            }else if(pageIndex == 3) {
                localStorage["service-train"] = tabIndex
            }
            location = "." + href
        }else if(href.slice(1, 7) === "employ") {
            if(pageIndex == 0) {
                localStorage["employ-school"] = tabIndex
            }else if(pageIndex == 1) {
                localStorage["employ-social"] = tabIndex
            }
            location = "." + href
        }
    })

})()
