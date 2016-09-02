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

    var arrSections = []; // array of unloaded section ID
    $('section').each(function(i, ele) {
        if (i > 0) {
            arrSections.push(ele.id);
        }
    });
    console.log(arrSections);

    // check current scroll for loading sections
    var currentScrollTop = $(document).scrollTop();
    for (var i = 0; i < arrSections.length; i++) {
        var checkingSectionId = arrSections[0]; // removed '0' element
        if (currentScrollTop > $('#'+checkingSectionId).offset().top - window.innerHeight / 2) {
            loadSection(checkingSectionId);
            arrSections.splice(0, 1); // remove loaded section ID
        }
    }

    // lazyload when scrolling
    $(document).scroll(function() {
        if (arrSections.length > 0) {
            var nextSectionId = arrSections[0];
            var docScrollTop = $(document).scrollTop();
            var nextOffset = $('#'+nextSectionId).offset().top - window.innerHeight / 2;
            if (docScrollTop > nextOffset) {
                loadSection(nextSectionId);
                arrSections.splice(0, 1); // remove loaded section ID
                console.log('---------arrSections after',arrSections);
            }
        }
    });


    function loadSection(sectionId) {
        console.log('load ', sectionId);
        var $section = $('#' + sectionId);
        $section.children('.opacity-0').removeClass('opacity-0');
        console.log('aload.length ',$section.find('*[data-aload]').length);
        $section.find('*[data-aload]').each(function(i, ele) {
            console.log(ele);
            aload(ele);
        });
        if (sectionId === 'about') {

        } else if (sectionId === 'aboutDetail') {

        } else if (sectionId === 'testimonial') {

        } else if (sectionId === 'portfolio') {
            var mapProjects = {};
            $('.filter-projects button').each(function(i, ele) {
                var filter = $(this).data('filter');
                if (filter !== 'all') {
                    mapProjects[filter] = $('#listProjects > a.' + filter);
                }
            })

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
                $projects.masonry("layout")
            })

            // filter projects
            $('.filter-projects button').click(function() {
                if ($(this).hasClass('button--primary')) {
                    return;
                }
                $(this).siblings().removeClass('button--primary');
                $(this).addClass('button--primary');

                var filter = $(this).data('filter');
                if (filter === 'all') {
                    for (key_filter in mapProjects) {
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
                $('iframe').each(function() {
                    this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
                });
            });
        } else if (sectionId === 'blogs') {

        }
    }

});
