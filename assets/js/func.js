// $(window).on('load', function() {
//     var lastScrollTop = Cookies.get("scroll-pos")
//     if (lastScrollTop) {
//         $(window).scrollTop(lastScrollTop);
//         Cookies.remove('scroll-pos');
//     }
//     else {
//         window.scrollTo(0, 0);
//         return;
//     }
// });

$(window).on('hashchange', function(){
    var lastScrollTop = Cookies.get("scroll-pos")
    if (typeof (history.pushState) != "undefined") {
        history.pushState(null, $("head title").text(), "./");
    }
    if (lastScrollTop) {
        $(window).scrollTop(lastScrollTop);
        Cookies.remove('scroll-pos');
        history.replaceState({}, $("head title").text(), "");
    }
    else {
        window.scrollTo(0, 0);
        return;
    }
});

$(window).on('beforeunload', function(){
    var lastScrollTop = Cookies.get("scroll-pos")
    if (lastScrollTop) {
        $(window).scrollTop(lastScrollTop);
        Cookies.remove('scroll-pos');
    }
    else {
        window.scrollTo(0, 0);
        return;
    }
});

$("#engtoggle").on('click', function(e) {
    alert("something");
})

$("#jptoggle").on('click', function(e) {
    alert("something");
})

$("#lightmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop());

    if ($("#main").hasClass("dark_mode_main")) {
        $("#bg_banner").attr("src", "images/bg_l.gif");
        $("#main section").css("border-top", "solid 6px #f4f4f4");
        $(".features article").css("border-top", "solid 3px #f4f4f4");

        toggleDarkMode();
    }
})

$("#darkmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop());

    if (!$("#main").hasClass("dark_mode_main")) {
        $("#bg_banner").attr("src", "images/bg_d.gif");
        $("#main section").css("border-top", "solid 6px #282828");
        $(".features article").css("border-top", "solid 3px #282828");

        toggleDarkMode();
    }
})

function toggleDarkMode() {
    $("#main").toggleClass("dark_mode_main");
    $("#header").toggleClass("dark_mode_header");
    $("#header a").toggleClass("dark_mode_text");
    $("#tagline").toggleClass("dark_mode_text_alt");
    $("#logo").toggleClass("dark_mode_text");

    // $("#header nav ul li a.active").toggleClass("dark_mode_header");
    //$("#nav ul li a.active").toggleClass("dark_mode_scroll");
}