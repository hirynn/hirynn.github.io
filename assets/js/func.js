var themes = {
    darkmode: {
        "main_bg": "#121212",
        "main_color": "white",
        "header_bg": "#682747",
        "text_color": "rgba(255, 255, 255, 0.6)",
        "text_alt_color": "#E579AB",
        "main_section_border_top": "solid 6px #282828",
        "features_article_border_top": "solid 3px #282828",
        "footer_bg": "#222222",
        "wrapper_bg": "#121212",
        "footer_icons": "rgba(255, 255, 255, 0.6)",
        "text_logo_color": "rgba(255, 255, 255, 0.8)",
    },

    lightmode: {
        "main_bg": "white", 
        "main_color": "black",
        "header_bg": "#2D848A",
        "text_color": "#d2f2e9",
        "text_alt_color": "#d2f2e9",
        "main_section_border_top": "solid 6px #f4f4f4",
        "features_article_border_top": "solid 3px #f4f4f4",
        "footer_bg": "#fafafa",
        "wrapper_bg": "#fff",
        "footer_icons": "#b7eadc",
        "text_logo_color": "white",
    }
}


$(window).on('hashchange', function(){
    // handling scroll position when dark/light mode is changed
    var lastScrollTop = Cookies.get("scroll-pos")
    if (typeof (history.pushState) != "undefined") {
        history.pushState(null, $("head title").text(), "./");
    }
    if (lastScrollTop) {
        $(window).scrollTop(lastScrollTop);
        Cookies.remove('scroll-pos');
    }
    else {
        window.scrollTo(0, 0);
        return;
    }
});

$(window).on('beforeunload', function(){
    // if page is refreshed it should go to top
    window.scrollTo(0, 0);
});

$(window).on('DOMContentLoaded', function(){
    // handles rendering of light/dark mdoe 
    var setTheme = localStorage.getItem("theme")
    if (setTheme == undefined)
        localStorage.setItem("theme", "lightmode");

    var root = document.documentElement.style;
    window.__onSetTheme = function() {};
    window.__setTheme = function(themeName) {
        var theme = themes[themeName];
        var banner = "";
        if (themeName == "lightmode")
            banner = "images/bg_l.gif";
        else 
            banner = "images/bg_d.gif";

        $("#bg_banner").attr("src", banner);

        Object.keys(theme).forEach(function(key) {
            // Set global custom properties on root element
            root.setProperty("--" + key, theme[key]);
            window.__onSetTheme(theme)
        });
    }

    var setTheme = localStorage.getItem("theme");
    window.__setTheme(setTheme == undefined ? "lightmode" : setTheme);
});

$("#engtoggle").on('click', function(e) {
    alert("something");
})

$("#jptoggle").on('click', function(e) {
    alert("something");
})

$("#lightmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop(), {expires: 1});

    if (localStorage.getItem("theme") == "darkmode") {
        localStorage.setItem("theme", "lightmode"); 
        
        window.__setTheme(localStorage.getItem("theme"));
    }
})

$("#darkmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop(), {expires: 1});

    if (localStorage.getItem("theme") == "lightmode") {
        localStorage.setItem("theme", "darkmode")
        
        window.__setTheme(localStorage.getItem("theme"));
    }
})