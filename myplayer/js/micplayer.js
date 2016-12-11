var log = function() {
    console.log.apply(console, arguments)
}
// 定义资源
var micPlayer = function() {
    this.songRes = [
        {
            url: "./file/雪肌精_Ad.mp3",
            pic: "./file/singer_1.jpg",
            song: "雪肌精_Ad",
            singer: "新桓结衣",
        },
        {
            url: "./file/史诗.mp3",
            pic: "./file/singer_2.jpg",
            song: "史诗",
            singer: "蛋堡",
        },
        {
            url: "./file/雪肌精_Ad2.mp3",
            pic: "./file/singer_1.jpg",
            song: "雪肌精_Ad2",
            singer: "新桓结衣",
        },
    ]
    this.index = 0
    // 0 repeat 1 random 2 sort by list
    this.mode = 0
}
micPlayer.prototype = {
    constructor: micPlayer,
    init: function() {
        initSongList()
        load()
        bindAll()
    },
    play: function() {
        $("#player")[0].play()
        $(".circle").css("animation-play-state", "running")
    },
    pause: function() {
        $("#player")[0].pause()
        $(".circle").css("animation-play-state", "paused")
    },
    playPrevious: function() {
        calcIndex(-1)
        load()
        setSlide(0)
        setCurrent(0)
    },
    playNext: function() {
        calcIndex(1)
        load()
        setSlide(0)
        setCurrent(0)
    },
    playRandom: function() {
        randomIndex()
        load()
        setSlide(0)
        setCurrent(0)
    }
}
var calcIndex = function(offset) {
    var len = player.songRes.length
    player.index = (player.index + offset + len) % len
}
var player = new micPlayer()
var load = function () {
    var resource = player.songRes[player.index]
    $("#player").prop("src", resource.url)
    $(".background").css("background-image", `url('${resource.pic}')`)
    $(".circle").css("background-image", `url('${resource.pic}')`)
    $(".currentSong").text(resource.song + " - " + resource.singer)
}
var bindKey = function() {
    $(".btnArea").on("click", ".btn", function(e) {
        var target = $(e.target)
        if(target.hasClass("glyphicon-start")) {
            target.removeClass("glyphicon-start")
            target.addClass("glyphicon-pause")
            player.play()
        } else if(target.hasClass("glyphicon-pause")) {
            target.removeClass("glyphicon-pause")
            target.addClass("glyphicon-start")
            player.pause()
        } else if(target.hasClass("glyphicon-step-backward")) {
            switch(player.mode) {
                case 0:
                    switchMusic(player.playPrevious)
                    break
                case 1:
                    switchMusic(player.playRandom)
                    break
                case 2:
                default:
            }
        } else if(target.hasClass("glyphicon-step-forward")) {
            switch(player.mode) {
                case 0:
                    switchMusic(player.playNext)
                    break
                case 1:
                    switchMusic(player.playRandom)
                    break
                case 2:
                default:
            }
        } else if(target.hasClass("glyphicon-random") ||
                target.hasClass("glyphicon-sort-by-order") ||
                target.hasClass("glyphicon-repeat")) {
            var list = ["glyphicon-repeat", "glyphicon-random", "glyphicon-sort-by-order"]
            for(var i = 0; i < list.length; i++) {
                target.removeClass(list[i])
            }
            player.mode = (player.mode + 1) % 3
            target.addClass(list[player.mode])
        } else if(target.hasClass("glyphicon-th-list")) {
            displayChange()
        }
    })
}
var bindAudioEvents = function() {
    $("#player").on("canplay", function() {
        setDuration($("#player")[0].duration)
    })
    $("#player").on("timeupdate", function() {
        var p = $("#player")[0]
        setCurrent(p.currentTime)
        var value = p.currentTime / p.duration * 100
        setSlide(value)
        changePosition(value)
    })
    $("#player").on("ended", function() {
        // 0 repeat 1 random 2 sort by list
        if(player.mode == 0) {
            $("#player").prop("loop", true)
        }
    })
}
var bindSlider = function() {
    $(".slider").change(function() {
        var value = $(".slider").val()
        changePosition(value)
        setPlayTimeByPer(value)
    })
}
var bindAll = function() {
    bindKey()
    bindAudioEvents()
    bindSlider()
}
var initSongList = function() {
    var resource = player.songRes
    for(var i = 0; i < resource.length; i++) {
        var t = `<li>${resource[i].song} - ${resource[i].singer}</li>`
        $(".songlist").append(t)
    }
}
var displayChange = function() {
    $('.songlist').fadeToggle(1000)
    $('.circle').fadeToggle(1000)
}
var formatTime = function(time) {
    var t = Math.floor(time)
    var minutes = Math.floor(t / 60)
    var seconds = t - (60 * minutes)
    if(seconds < 10) {
        seconds = "0" + seconds
    }
    return `${minutes}:${seconds}`
}
var setSlide = function(value) {
    $(".slider")[0].value = value
}
var setDuration = function(duration) {
    var t = formatTime(duration)
    $(".time2").text(t)
}
var setCurrent = function(current) {
    var t = formatTime(current)
    $(".time1").text(t)
}
var changePosition = function(position) {
    $(".mask").css("width",`calc(${position}% - 4px)`)
}
var setPlayTimeByPer = function(percent) {
    var time = percent * $("#player")[0].duration / 100
    $("#player")[0].currentTime = time
}
var randomIndex = function() {
    player.index = Math.floor(Math.random() * 3)
}
var switchMusic = function(method) {
    if(!$("#player")[0].paused) {
        player.pause()
        method()
        player.play()
    } else {
        method()
    }
}
