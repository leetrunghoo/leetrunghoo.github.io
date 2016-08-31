$(function() {

    // add typing animation for home page
    $('#welcomeContainer').typingAnimation(function() {
        setTimeout(function() {
            $('#welcomeContainer').addClass('color-white');
            var $section = $('#welcomeContainer').parent();
            $section.find('.section-backgroundImage').removeClass('opacity-0');
            $section.find('.section-gradient').removeClass('opacity-0');
        }, 200);
    });


    // Masonry
    var mapProjects = {};
    $('.filter-projects button').each(function(i, ele) {
        var filter = $(this).data('filter');
        if (filter !== 'all') {
            mapProjects[filter] = $('#projects > a.' + filter);
        }
    })

    var flagCom = true;
    var flagPet = true;
    var flagOther = true;
    var $projects = $('#projects');
    $projects.masonry({
        transitionDuration: '0.5s',
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });
    $projects.imagesLoaded().progress(function() {
        $projects.masonry("layout")
    })

    // filter projects
    $('.filter-projects button').click(function() {
        console.log(mapProjects);
        if ($(this).hasClass('button--primary')) {
            return;
        }
        $(this).siblings().removeClass('button--primary');
        $(this).addClass('button--primary');

        var filter = $(this).data('filter');
        if (filter === 'all') {
            for (key_filter in mapProjects) {
                if (mapProjects.hasOwnProperty(key_filter)) {
                    if (mapProjects[key_filter].length > 0 && $('#projects a.' + key_filter).length === 0) {
                        console.log('append', mapProjects[key_filter]);
                        $projects.append(mapProjects[key_filter]);
                        $projects.masonry('appended', mapProjects[key_filter]);
                    }
                }
            }
        } else {
            $projects.masonry('remove', $('#projects a:not(.' + filter + ')'));
            if (mapProjects[filter].length > 0 && $('#projects a.' + filter).length === 0) {
                $projects.append(mapProjects[filter]);
                $projects.masonry('appended', mapProjects[filter]);
            }
        }
        $projects.masonry('layout');
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

        $(this).find('iframe').each(function(i, iframe) {
            aload(iframe[0]);
        })
    });
    // stop playing video after closing popup
    $(document).on('closed', '.remodal', function(e) {
        $('iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
        });
    });


});
