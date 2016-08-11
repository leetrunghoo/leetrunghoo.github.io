$(function() {
    var apiKey = '986e904143a37c668876552671aacde9',
        authorId = localStorage.getItem('demo_authorId') || 'nhienhy', //99002729@N07
        // photo quality = 3: low, 5: med, 8: high, 9: xhigh
        qThumb = localStorage.getItem('demo_qThumb') || 5,
        qPhoto = localStorage.getItem('demo_qPhoto') || 8,
        perPage = 10,
        startPage = 0,
        arrQuality = ['_s', '_q', '_t', '_m', '_n', '', '_z', '_c', '_b', '_h'],
        listLoadedImg = {};

    $('#txtFlickr').val(authorId);
    $('#selectThumbQuality').val(qThumb);
    $('#selectPhotoQuality').val(qPhoto)

    // Main content container
    var $container = $('#container');

    // Masonry 
    $container.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });

    // $('[data-remodal-id=modal]').remodal({hashTracking: false});

    // init lightGallery
    var gallery = initLightGallery();

    function initLightGallery() {
        return $container.lightGallery({
            thumbnail: true,
            animateThumb: true,
            showThumbByDefault: true,
            showAfterLoad: false,
            getCaptionFromTitleOrAlt: false,
            hash: false
        }).data('lightGallery');
    }

    // Remodal event
    $(document).on('confirmation', '.remodal', function() {
        var flagReload = false;
        if ($('#selectThumbQuality').val() && $('#selectThumbQuality').val() !== qThumb) {
            qThumb = $('#selectThumbQuality').val();
            localStorage.setItem('demo_qThumb', qThumb);
            flagReload = true;
        }
        if ($('#selectPhotoQuality').val() && $('#selectPhotoQuality').val() !== qPhoto) {
            qPhoto = $('#selectPhotoQuality').val();
            localStorage.setItem('demo_qPhoto', qPhoto);
            flagReload = true;
        }
        if ($('#txtFlickr').val() && $('#txtFlickr').val() !== authorId) {
            authorId = $('#txtFlickr').val();
            localStorage.setItem('demo_authorId', authorId);
            flagReload = true;
        }
        if (flagReload) {
            $container.empty();
            gallery.destroy(true);
            gallery = initLightGallery();
            startLoadImages();
        }
    });
    $(document).on('cancellation', '.remodal', function() {
        $('#txtFlickr').val(authorId);
        $('#selectThumbQuality').val(qThumb);
        $('#selectPhotoQuality').val(qPhoto);
    });

    // when view photo detail => load larger photo
    $container.on('onAfterSlide.lg', function() {
        $('#tempImg').remove();
        setTimeout(function() {
            var thumbLink = $('.lg-thumb-item.active img').attr('src');
            var detailLink = $('.lg-current .lg-img-wrap img').attr('src');
            if (!listLoadedImg[detailLink]) { // check cached img
                $('.lg-current .lg-img-wrap img').attr('src', thumbLink);
                $container.append('<img src="' + detailLink + '" id="tempImg" style="display: none">');
                $('#tempImg').imagesLoaded(function() {
                    console.log('loaded image: ' + detailLink);
                    $('.lg-current .lg-img-wrap img').attr('src', detailLink);
                    listLoadedImg[detailLink] = true;
                    $('#tempImg').remove();
                });
            }
        }, 100);
    });


    console.log('-----------loadImages');
    startLoadImages();

    function startLoadImages() {
        startPage = 0;
        loadImages(++startPage, function() {
            // make sure body has scroll therefore be able to do infinitescroll
            if (document.body.scrollHeight <= window.innerHeight) {
                loadImages(++startPage);
            }
        });
    }

    function loadImages(page, callback) {
        console.log('loadImages page: ' + page);
        authorId = authorId || $('txtFlickr').val();
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&user_id=' + authorId + '&per_page=' + perPage + '&page=' + page + '&format=json&nojsoncallback=1';
        $.getJSON(url, function(response) {
            if (response.stat === 'ok') {
                var imgages = '';
                // if (qThumb === 10 || qPhoto === 10) { // call rest to get sizes' link
                //     for (var i = 0; i < response.photos.photo.length; i++) {
                //         var photo = response.photos.photo[i];
                //         getPhotoSizes(photo.id, function(response) {
                //             var link = response.sizes.size[+qThumb];
                //             var link_detail = response.sizes.size[+qPhoto];
                //             imgages += '<a href="' + link_detail + '" ><img class="grid-item " src="' + link + '"" alt="' + photo.title + '" style="display: none" ></a>';
                //             if (i === response.photos.photo.length - 1) {
                //                 appendImages($(imgages), callback);
                //             }
                //         });
                //     }
                // } else { // combine string to get sizes' link
                for (var i = 0; i < response.photos.photo.length; i++) {
                    var photo = response.photos.photo[i];
                    console.log(qPhoto + ' ' + arrQuality[+qPhoto]);
                    var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qThumb] + '.jpg';
                    var link_detail = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qPhoto] + '.jpg';
                    imgages += '<a href="' + link_detail + '" ><img class="grid-item " src="' + link + '"" alt="' + photo.title + '" style="display: none" ></a>';
                }
                appendImages($(imgages), callback);
                // }
            }
        });
    }

    function appendImages($newEle, callback) {
        $container.append($newEle);
        $newEle.each(function(index) {
            var $a = $(this);
            var $img = $a.find('img');
            $img.imagesLoaded(function(ele) {
                console.log('loaded img: ', $img.attr('src'));
                $img.show();
                $container.masonry('appended', $img, true);
                $container.masonry('layout');
                gallery.$items = gallery.$items.add($a);
                gallery.init();
            });
        });
        $newEle.imagesLoaded(function() {
            console.log('====loaded all====');
            if (callback) {
                callback();
            }
        });
    }

    function getPhotoSizes(id, callback) {
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + id + '&format=json&nojsoncallback=1';
        $.getJSON(url, function(response) {
            callback(response);
        });
    }

    // infinite scroll
    var loadingImages = false;
    $(document).scroll(function() {
        var docScrollTop = $(document).scrollTop();
        var endScroll = $(document).height() - $(window).height() - 200;
        if (!loadingImages && (docScrollTop > endScroll)) {
            loadingImages = true;
            loadImages(++startPage, function() {
                loadingImages = false;
            });
        }
    });
});
