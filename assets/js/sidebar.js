(function() {
    // sidebar
    var bodyEl = document.body,
        container = document.getElementById('container'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = false,
        morphEl = document.getElementById('morph-shape'),
        s = Snap(morphEl.querySelector('svg')),
        path = s.select('path'),
        initialPath = path.attr('d'),
        steps = morphEl.getAttribute('data-morph-open').split(';'),
        stepsTotal = steps.length,
        isAnimating = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        var recentPosts = document.querySelector('.sidebar-recentPosts');
        Ps.initialize(recentPosts, {});
        // close the menu element if the target it´s not the menu element or one of its descendants..
        container.addEventListener('click', function(ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });

        $('#menu-button').click(function() {
            toggleMenu();
        });
    }

    function toggleMenu() {
        if (isAnimating) return false;
        isAnimating = true;
        if (isOpen) {
            $(bodyEl).removeClass('show-menu');
            // animate path
            setTimeout(function() {
                // reset path
                path.attr('d', initialPath);
                isAnimating = false;
                // enable_scroll();
            }, 300);
        } else {
            // disable_scroll();
            $(bodyEl).addClass('show-menu');
            // animate path
            var pos = 0,
                nextStep = function(pos) {
                    if (pos > stepsTotal - 1) {
                        isAnimating = false;
                        return;
                    }
                    path.animate({ 'path': steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); });
                    pos++;
                };

            nextStep(pos);
        }
        isOpen = !isOpen;
        $('#menu-button').toggleClass('open');
    }

    init();


})();