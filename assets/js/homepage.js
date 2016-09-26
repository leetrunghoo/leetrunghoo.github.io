$(function() {
    // add typing animation for home page
    var $typingElement = $('#welcomeContainer .container');
    $typingElement.typingAnimation(function() {
        setTimeout(function() {
            $typingElement.addClass('color-white');
            var $section = $('#welcome');
            $section.find('.section-backgroundImage').removeClass('opacity-0');
            $section.find('.section-gradient').removeClass('opacity-0');
            $('#welcomeContainer .trigger').removeClass('hide');
        }, 500);
    });

    // bind event to trigger of Welcome section
    var layoutContent = document.querySelector('article');
    $('#welcomeContainer').on('click', '.trigger', function() {
        var offset = $(layoutContent).scrollTop() + $('#about').offset().top;
        $('html, body').animate({
            scrollTop: offset
        }, 700, 'easeOutQuint');
    });


    function loadSection(sectionId, nextSectionId) {
        console.info('load section: ' + sectionId);
        var $section = $('#' + sectionId);
        var $nextSection = $('#' + nextSectionId);
        $section.children('.opacity-0').removeClass('opacity-0');
        // lazyload by aload
        $section.find('*[data-aload]').each(function(i, ele) {
            aload(ele);
        });
        // preload resource of next section for better experience
        $nextSection.find('*[data-aload]').each(function(i, ele) {
            aload(ele);
        });

        if (sectionId === 'portfolio') {
            NProgress.start();
            $section.imagesLoaded(function(ele) {
                NProgress.done();
            });

            var mapProjects = {};
            $('.filter-projects button').each(function(i, ele) {
                var filter = $(this).data('filter');
                if (filter !== 'all') {
                    mapProjects[filter] = $('#listProjects > a.' + filter);
                }
            });

            var flagCom = true;
            var flagPet = true;
            var flagOther = true;
            var $projects = $('#listProjects');
            $projects.masonry({
                transitionDuration: '0.5s',
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });
            $projects.imagesLoaded().progress(function() {
                $projects.masonry("layout");
            });

            // filter projects
            $('.filter-projects button').click(function() {
                if ($(this).hasClass('button--primary')) {
                    return;
                }
                $(this).siblings().removeClass('button--primary');
                $(this).addClass('button--primary');

                var filter = $(this).data('filter');
                if (filter === 'all') {
                    for (var key_filter in mapProjects) {
                        if (mapProjects.hasOwnProperty(key_filter)) {
                            if (mapProjects[key_filter].length > 0 && $('#listProjects a.' + key_filter).length === 0) {
                                $projects.append(mapProjects[key_filter]);
                                $projects.masonry('appended', mapProjects[key_filter]);
                            }
                        }
                    }
                } else {
                    $projects.masonry('remove', $('#listProjects a:not(.' + filter + ')'));
                    if (mapProjects[filter].length > 0 && $('#listProjects a.' + filter).length === 0) {
                        $projects.append(mapProjects[filter]);
                        $projects.masonry('appended', mapProjects[filter]);
                    }
                }
                $projects.masonry('layout');
            });
        } else if (sectionId === 'blogs') {
            NProgress.start();
            $section.imagesLoaded(function(ele) {
                NProgress.done();
            });
        }

    }

    // scroll to top after reload/go back 
    window.onbeforeunload = function() {
        document.body.style.opacity = 0;
        window.scrollTo(0, 0);
    }


    var arrSections = []; // array of unloaded section ID
    $('section').each(function(i, ele) {
        if (i > 0) {
            arrSections.push(ele.id);
        }
    });
    // lazyload when scrolling
    $(document).scroll(function() {
        if (arrSections.length > 0) {
            var sectionId = arrSections[0];
            var nextSectionId = arrSections[1];
            var docScrollTop = $(document).scrollTop();
            var nextOffset = $('#' + sectionId).offset().top - window.innerHeight / 2;
            if (docScrollTop > nextOffset) {
                loadSection(sectionId, nextSectionId);
                arrSections.splice(0, 1); // remove loaded section ID
            }
        }
    });

    var listSwiper = {};
    // open popup event
    $(document).on('opened', '.remodal', function() {
        // init swiper in project popup
        var remodalId = $(this).data('remodal-id');
        if (!listSwiper[remodalId]) {
            new Swiper($(this).children('.swiper-container')[0], {
                autoplay: 3000,
                preloadImages: false,
                lazyLoading: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                slidesPerView: 1,
                spaceBetween: 10
            });
            listSwiper[remodalId] = true;
        }
        // load youtube iframe
        $(this).find('*[data-aload]').each(function(i, ele) {
            aload(ele);
        });
    });
    // stop playing video after closing popup
    $(document).on('closed', '.remodal', function(e) {
        $('iframe').each(function() {
            this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
    });

});
