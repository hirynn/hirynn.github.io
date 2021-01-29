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
        "header_h2_text": "#E579AB",
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
        "header_h2_text": "#4acaa8",
    }
}

var langs = {
    jp: "jp", 
    en: "en", 
}

var siteThemes = {
    lightmode: "lightmode", 
    darkmode: "darkmode",
}


$(window).on('hashchange', function(){
    handleScrollPos();
});

$(window).on('beforeunload', function(){
    return;
});

$(window).on('DOMContentLoaded', function(){
    // handles rendering of eng/jp
    var lang = localStorage.getItem("lang");
    Cookies.set('filename', window.location.pathname);
    //localStorage.setItem("filename", window.location.pathname);

    if (lang == undefined) 
        localStorage.setItem("lang", langs["en"]);

    if (lang == langs["jp"]) {
        // var filename = localStorage.getItem("filename");

        // if (filename == undefined || !filename.includes("index_jp")) {
        //     window.location.replace("./index_jp.html");
        // }

        if (Cookies.get('filename') == undefined || Cookies.get('filename').includes("index_en")) {
            Cookies.set('filename', window.location.href);
            window.location.replace("./index_jp.html");
        }
    }
    else if (lang == langs["en"]) {
        // var filename = localStorage.getItem("filename");

        // if (filename == undefined || !filename.includes("index_en")) {
        //     window.location.replace("./index_en.html");
        // }

        if (Cookies.get('filename') == undefined || Cookies.get('filename').includes("index_jp")) {
            Cookies.set('filename', window.location.href);
            window.location.replace("./index_en.html");
        }
    }

    // handles rendering of light/dark mode
    var setTheme = localStorage.getItem("theme")
    if (setTheme == undefined)
        localStorage.setItem("theme", siteThemes["lightmode"]);

    var root = document.documentElement.style;
    window.__onSetTheme = function() {};
    window.__setTheme = function(themeName) {
        var theme = themes[themeName];
        var banner = "images/bg_l.gif"; // default
        if (themeName == siteThemes["lightmode"])
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
    window.__setTheme(setTheme == undefined ? siteThemes["lightmode"] : setTheme);
    handleScrollPos();
    history.pushState(null, $("head title").text(), "./");
});

$("#engtoggle").on('click', function(e) {  
    let lang = localStorage.getItem("lang");
    localStorage.setItem("scroll-pos", $(window).scrollTop());

    if (lang == undefined || lang == langs["jp"])
        if (typeof (history.pushState) != "undefined") {
            localStorage.setItem("lang", langs["en"]);
            window.location.replace("./index.html");
        }
})

$("#jptoggle").on('click', function(e) {
    let lang = localStorage.getItem("lang");
    localStorage.setItem("scroll-pos", $(window).scrollTop());

    if (lang == undefined || lang == langs["en"])
        if (typeof (history.pushState) != "undefined") {
            localStorage.setItem("lang", langs["jp"]);
            window.location.replace("./index_jp.html");
        }
})

$("#lightmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop(), {expires: 1});

    if (localStorage.getItem("theme") == siteThemes["darkmode"]) {
        localStorage.setItem("theme", siteThemes["lightmode"]); 
        
        window.__setTheme(localStorage.getItem("theme"));
    }
})

$("#darkmode").on('click', function(e) {
    Cookies.set('scroll-pos', $(window).scrollTop(), {expires: 1});

    if (localStorage.getItem("theme") == siteThemes["lightmode"]) {
        localStorage.setItem("theme", siteThemes["darkmode"])
        
        window.__setTheme(localStorage.getItem("theme"));
    }
})

function handleScrollPos()
{
    var lastScrollTop = Cookies.get("scroll-pos")
    var scroll = localStorage.getItem("scroll-pos");

    if (typeof (history.pushState) != "undefined") {
        history.pushState(null, $("head title").text(), "./");
    }
    if (lastScrollTop) {
        $(window).scrollTop(lastScrollTop);
        Cookies.remove('scroll-pos');
    }
    else if (scroll != undefined) {
        $(window).scrollTop(scroll);
        localStorage.removeItem("scroll-pos");
    }
    else {
        window.scrollTo(0, 0);
    }
}