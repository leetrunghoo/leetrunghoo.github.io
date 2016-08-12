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

    // check url params
    var pAuthorId = getParameterByName('authorid');
    console.log('url param AuthorId: ', pAuthorId);
    var pPhotoUrl = getParameterByName('photourl');
    console.log('url param photourl: ', pPhotoUrl);
    if (pAuthorId && pAuthorId !== authorId) {
        authorId = pAuthorId;
        localStorage.setItem('demo_authorId', authorId);
    }
    if (pPhotoUrl) {
        var a = '<a href="' + pPhotoUrl + '" ><img class="grid-item " src="' + pPhotoUrl + '"" style="display: none" ></a>';
        var $a = $(a);
        $container.append($a);
        var $img = $a.find('img');
        $img.imagesLoaded(function(ele) {
            console.info('+++loaded img from url param: ', $img.attr('src'));
            $img.show();
            $container.masonry('appended', $img, true);
            $container.masonry('layout');
            gallery.$items = gallery.$items.add($a);
            gallery.init();
            $a.click();
            $container.one('onBeforeClose.lg', function() {
                var newUrl = deleteUrlParam('photourl');
                changeUrl(newUrl);
                reloadPhotos();
            });
        });
    } else {
        console.info('------start loading photos------');
        startLoadImages();
    }

    // Remodal event
    $(document).on('confirmation', '.remodal', function() {
        var flagReloadPhotos = false;
        if ($('#selectThumbQuality').val() && $('#selectThumbQuality').val() !== qThumb) {
            qThumb = $('#selectThumbQuality').val();
            localStorage.setItem('demo_qThumb', qThumb);
            flagReloadPhotos = true;
        }
        if ($('#selectPhotoQuality').val() && $('#selectPhotoQuality').val() !== qPhoto) {
            qPhoto = $('#selectPhotoQuality').val();
            localStorage.setItem('demo_qPhoto', qPhoto);
            flagReloadPhotos = true;
        }
        var authorIdValue = $('#txtFlickr').val();
        if (authorIdValue && authorIdValue.indexOf('http') > -1) {
            authorIdValue = authorIdValue.split('/photos/')[1];
            authorIdValue = authorIdValue.split('/')[0];
        }
        if (authorIdValue && authorIdValue !== authorId) {
            authorId = authorIdValue;
            localStorage.setItem('demo_authorId', authorIdValue);
            var slash = '';
            if (location.pathname.substring(location.pathname.length - 1, location.pathname.length) !== '/') {
                slash = '/';
            }
            changeUrl(location.origin + location.pathname + slash + '?authorid=' + authorIdValue);
            flagReloadPhotos = true;
        }
        if (flagReloadPhotos) {
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

    function reloadPhotos() {
        $container.empty();
        gallery.destroy(true);
        gallery = initLightGallery();
        startLoadImages();
    }

    // when view photo detail => load larger photo
    $container.on('onAfterSlide.lg', function() {
        $('#tempImg').remove();
        setTimeout(function() {
            var thumbLink = $('.lg-thumb-item.active img').attr('src');
            var detailLink = $('.lg-current .lg-img-wrap img').attr('src');

            // change url without refreshing
            var newUrl = deleteUrlParam('photourl') + '&photourl=' + detailLink;
            changeUrl(newUrl);

            if (!listLoadedImg[detailLink]) { // check cached img
                $('.lg-current .lg-img-wrap img').attr('src', thumbLink);
                $container.append('<img src="' + detailLink + '" id="tempImg" style="display: none">');
                $('#tempImg').imagesLoaded(function() {
                    // console.info('loaded image: ' + detailLink);
                    $('.lg-current .lg-img-wrap img').attr('src', detailLink);
                    listLoadedImg[detailLink] = true;
                    $('#tempImg').remove();
                });
            }
        }, 100);
    });
    $container.one('onCloseAfter.lg', function() {
        var newUrl = deleteUrlParam('photourl');
        changeUrl(newUrl);
    });

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
                // combine string to get sizes' link
                for (var i = 0; i < response.photos.photo.length; i++) {
                    var photo = response.photos.photo[i];
                    var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qThumb] + '.jpg';
                    var link_detail = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qPhoto] + '.jpg';
                    imgages += '<a href="' + link_detail + '" ><img class="grid-item " src="' + link + '"" alt="' + photo.title + '" style="display: none" ></a>';
                }
                appendImages($(imgages), callback);
            }
        });
    }

    function appendImages($newEle, callback) {
        $container.append($newEle);
        $newEle.each(function(index) {
            var $a = $(this);
            var $img = $a.find('img');
            $img.imagesLoaded(function(ele) {
                // console.info('loaded img: ', $img.attr('src'));
                $img.show();
                $container.masonry('appended', $img, true);
                $container.masonry('layout');
                gallery.$items = gallery.$items.add($a);
                gallery.init();
            });
        });
        $newEle.imagesLoaded(function() {
            console.info('====loaded all====');
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

});

// helper functions
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUrlVars(url) {
    var hash;
    var myJson = {};
    if (url.indexOf('?') < 0) {
        return '';
    }
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}

function deleteUrlParam(paramName) {
    var json = getUrlVars(location.href);
    if (json[paramName]) {
        delete json[paramName];
    }
    var newParamsUrl = Object.keys(json).map(function(k) {
        return k + '=' + json[k]
    }).join('&');
    console.log('newParamsUrl', newParamsUrl);
    var slash = '';
    if (location.pathname.substring(location.pathname.length - 1, location.pathname.length) !== '/') {
        slash = '/';
    }
    return location.origin + location.pathname + slash + '?' + newParamsUrl;
}

function changeUrl(newUrl) {
    window.history.pushState("object or string", document.title, newUrl);
}
