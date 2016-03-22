(function() {

    var docElem = window.document.documentElement,
        scrollVal,
        isRevealed,
        noscroll,
        isAnimating,
        container = document.getElementById('container'),
        trigger = container.querySelector('button.trigger');

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function scrollPage() {
        scrollVal = scrollY();

        if (noscroll && !window.os.isIE) {
            if (scrollVal < 0) return false;
            // keep it that way
            window.scrollTo(0, 0);
        }

        if (classie.has(container, 'notrans')) {
            classie.remove(container, 'notrans');
            return false;
        }

        if (isAnimating) {
            return false;
        }

        if (scrollVal <= 0 && isRevealed) {
            toggle(0);
        } else if (scrollVal > 0 && !isRevealed) {
            toggle(1);
        }
    }

    function toggle(reveal) {
        isAnimating = true;
        if (reveal) {
            classie.add(container, 'modify');
            $('#menu-button').addClass('change-color');
        } else {
            noscroll = true;
            // disable_scroll();
            classie.remove(container, 'modify');
            $('#menu-button').removeClass('change-color');
        }

        // simulating the end of the transition:
        setTimeout(function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if (reveal) {
                noscroll = false;
            }
        }, 300);
    }

    // refreshing the page...
    var pageScroll = scrollY();
    noscroll = pageScroll === 0;


    if (pageScroll) {
        isRevealed = true;
        classie.add(container, 'notrans');
        classie.add(container, 'modify');
        $('#menu-button').addClass('change-color');
    }

    window.addEventListener('scroll', scrollPage);
    trigger.addEventListener('click', function() { toggle('reveal'); });


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
        // Show modal toggle after scrolling 300px and hide it when nearly scroll to the end
        var docScrollTop = $(document).scrollTop();
        $('.modal-toggle-group').toggleClass('active', (docScrollTop >= 300 && docScrollTop <= $('.section--subscribe').offset().top - 300));
        if ((docScrollTop < 300 || docScrollTop > $('.section--subscribe').offset().top - 300) && $('.modal-toggle-bubble').hasClass('active')) {
            $('.modal-toggle-wrapper').click();
        }
    });
})();