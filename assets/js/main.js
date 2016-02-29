$.fn.typingAnimation = function(callback) {
    if (this.length === 0) {
        return;
    }
    $ele = this;
    $(".cursor-typed").removeClass("cursor-typed");
    var str = $ele.html(),
        delayTime = $ele.data("delay") || 0,
        i = 0,
        isTag,
        text;
    str = str.replace(/\s+/g, ' '); // trim all spaces
    $ele.empty();
    $ele.addClass("cursor-typed");

    // wait a bit for loading effect
    setTimeout(function() {
        $ele.removeClass("cursor-typed");
        type();
    }, delayTime);

    function type() {
        text = str.slice(0, ++i);
        if (text === str) { // done loop
            while ($ele.children().length) {
                $ele = $ele.children().last();
            }
            $ele.addClass("cursor-typed");
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
$(".typingAnimation").typingAnimation();

$(function() {
    var layoutContent = document.querySelector('.mdl-layout__content');

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var offset = $(layoutContent).scrollTop() + target.offset().top;
                TweenMax.to(layoutContent, 1, {
                    scrollTo: {
                        y: offset
                    },
                    ease: Power2.easeOut
                });
                return false;
            }
        }
    });

    // mickey

    // Featured image loaded behavior
    $('.section-backgroundImage img').imagesLoaded()
        .done(function(instance) {
            $('.post-featuredImage').addClass('is-loaded');
        });

    // Modal toggle behavior
    $('.modal-toggle-wrapper').click(function() {
        $(this).toggleClass('active');
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

    $('.shareButton').on("click", function(e) {
        $(this).sharePopup(e);
    });

    $(document).scroll(function() {
        // Show modal toggle after scrolling 300px
        $('.modal-toggle-group').toggleClass('active', $(document).scrollTop() >= 300);
        // brand name
        $('.brand-name-container').toggleClass('transparent', $(document).scrollTop() >= 100);
    });
});
