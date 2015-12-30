$(function () {
    var layoutContent = document.querySelector('.mdl-layout__content');
    var header_h = document.querySelector('header').clientHeight;

    typeEffect($("#page_hello_introduce"));

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                //                $(layoutContent).animate({
                //                    scrollTop: $(layoutContent).scrollTop() + target.offset().top - header_h;
                //                }, 500);
                var offset = $(layoutContent).scrollTop() + target.offset().top - header_h;
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

    function typeEffect($ele, callback) {
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
        setTimeout(function () {
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
});