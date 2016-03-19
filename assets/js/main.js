// plugins
$.fn.typingAnimation = function(callback) {
    if (this.length === 0) {
        return;
    }
    $('.cursor-typed').removeClass('cursor-typed');
    $ele = this;
    var str = $ele.html(),
        delayTime = $ele.data('delay') || 0,
        i = 0,
        isTag,
        text;
    str = str.replace(/\s+/g, ' '); // trim all spaces
    $ele.empty();
    $ele.removeClass('hide');
    $ele.show();
    $ele.addClass('cursor-typed');

    // wait a bit for loading effect
    setTimeout(function() {
        $ele.removeClass('cursor-typed');
        type();
    }, delayTime);

    function type() {
        text = str.slice(0, ++i);
        if (text === str) { // done loop
            while ($ele.children().length) {
                $ele = $ele.children().last();
            }
            $ele.addClass('cursor-typed');
            if ($.isFunction(callback)) {
                callback();
            }
            return;
        }
        $ele.html(text);
        var char = text.slice(-1);
        if (char === '<') isTag = true;
        if (char === '>') isTag = false;
        if (isTag) return type();
        setTimeout(type, 80);
    };
};

// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
window.os = {
    isOpera: isOpera,
    isFirefox: isFirefox,
    isSafari: isSafari,
    isIE: isIE,
    isEdge: isEdge,
    isChrome: isChrome,
    isBlink: isBlink,
}

// detect if IE : from http://stackoverflow.com/a/16657946      
var ie = (function() {
    var undef, rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rvNum = ua.indexOf('rv:');
        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
}());


// disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179                  
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [32, 37, 38, 39, 40],
    wheelIter = 0;

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function touchmove(e) {
    preventDefault(e);
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
}

function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
}


$(function() {
    // show article after document ready
    document.querySelector('article').style.display = 'block';

    // add typing animation for home page
    $('#welcomeContainer').typingAnimation(function() {
        var $section = $('#welcomeContainer').parent();
        $('#welcomeContainer').addClass('is-darkBackgrounded');
        $section.addClass('is-darkBackgrounded');
        $section.find('.section-backgroundImage').fadeIn(500);
        $section.find('.section-gradient').fadeIn(500);
    });

    // scroll animation
    var layoutContent = document.querySelector('article');
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("ucbrowser") === -1) { // not UCBrowser
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    var offset = $(layoutContent).scrollTop() + target.offset().top - 25;
                    var scrollAnimation = TweenLite.to(window, 2, {
                        scrollTo: {
                            y: offset
                        },
                        ease: Power4.easeOut
                    });
                    scrollAnimation.duration(1);
                    return false;
                }
            }
        });
    }

    // mickey

    // Featured image loaded behavior
    $('.section-backgroundImage img').imagesLoaded()
        .done(function(instance) {
            $('.post-featuredImage').addClass('is-loaded');
        });

    // Modal toggle behavior
    $('.modal-toggle-wrapper').click(function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            disable_scroll()
            $('#menu-button-container').fadeOut();
        } else {
            enable_scroll();
            $('#menu-button-container').fadeIn();
        }
        $('.modal-toggle-bubble').toggleClass('active');
        $('.modal-toggle-bubbleShadow').toggleClass('active');
        $('.modal-toggle-close-wrapper').toggleClass('active');
        $('.fullscreenModal').toggleClass('active');
    });

    // Prevent default anchor event and make a share popup
    $.fn.sharePopup = function(e, intWidth, intHeight, blnResize) {

        e.preventDefault();
        intWidth = intWidth || '750';
        intHeight = intHeight || '500';
        strResize = (blnResize ? 'yes' : 'no');

        //// Set title and open popup with focus on it
        var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
            strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
            objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
    }

    $('.shareButton').on('click', function(e) {
        $(this).sharePopup(e);
    });

    $(document).scroll(function() {
        // Show modal toggle after scrolling 300px
        var docScrollTop = $(document).scrollTop();
        $('.modal-toggle-group').toggleClass('active', (docScrollTop >= 300 && docScrollTop <= $('.section--subscribe').offset().top - 300));
        if ((docScrollTop < 300 || docScrollTop > $('.section--subscribe').offset().top - 300) && $('.modal-toggle-bubble').hasClass('active')) {
            $('.modal-toggle-wrapper').click();
        }
        // brand name
        $('.brand-name-container').toggleClass('transparent', $(document).scrollTop() >= 100);
    });
});