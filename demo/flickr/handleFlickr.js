$(function() {
    var apiKey = '986e904143a37c668876552671aacde9',
        userId = localStorage.getItem('demo_userId') || 'hin-stone', //99002729@N07
        // photo quality = 3: low, 5: med, 8: high, 9: xhigh
        qThumb = localStorage.getItem('demo_qThumb') || 5,
        qPhoto = localStorage.getItem('demo_qPhoto') || 8,
        perPage = 100,
        startPage = 0,
        perPart = 10,
        startPhotoIndex = 0,
        arrListPhotos = [],
        arrQuality = ['_s', '_q', '_t', '_m', '_n', '', '_z', '_c', '_b', '_h'],
        listLoadedImg = {}; // use for checking cached detail photos

    // load default setting
    $('#txtFlickr').val(userId);
    $('#selectThumbQuality').val(qThumb);
    $('#selectPhotoQuality').val(qPhoto)

    // append user_id to url
    if (location.href.indexOf('user_id') < 0) {
        var slash = '';
        if (location.pathname.substring(location.pathname.length - 1, location.pathname.length) !== '/') {
            slash = '/';
        }
        changeUrl(location.origin + location.pathname + slash + '?user_id=' + userId);
    }

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

    $('.pagination').pagination({
        items: 0,
        itemsOnPage: 100,
        displayedPages: 3,
        edges: 1,
        hrefTextPrefix: '',
        selectOnClick: false,
        prevText: '',
        nextText: '',
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
            console.log(pageNumber);
            $container.empty();
            gallery.destroy(true);
            gallery = initLightGallery();
            loadPage(pageNumber);
            $('.pagination.bottom').hide();
            $(document).scrollTop(0);
            return false;
        },
        onInit: function() {
            // Callback triggered immediately after initialization
        }
    });

    // check url params
    var pAuthorId = getParameterByName('user_id');
    console.log('url param AuthorId: ', pAuthorId);
    var pPhotoUrl = getParameterByName('photo_url');
    console.log('url param photo_url: ', pPhotoUrl);
    if (pAuthorId && pAuthorId !== userId) {
        userId = pAuthorId;
        $('#txtFlickr').val(userId);
        localStorage.setItem('demo_userId', userId);
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
                var newUrl = deleteUrlParam('photo_url');
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
        var userIdValue = $('#txtFlickr').val();
        if (userIdValue && userIdValue.indexOf('http') > -1) {
            userIdValue = userIdValue.split('/photos/')[1];
            userIdValue = userIdValue.split('/')[0];
        }
        if (userIdValue && userIdValue !== userId) {
            userId = userIdValue;
            localStorage.setItem('demo_userId', userIdValue);
            changeUrl(location.origin + location.pathname + '?user_id=' + userIdValue);
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
        $('#txtFlickr').val(userId);
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
            if (!detailLink) {
                return;
            }
            // change url without refreshing
            var newUrl = deleteUrlParam('photo_url') + '&photo_url=' + detailLink;
            changeUrl(newUrl);
            // check cached img
            if (!listLoadedImg[detailLink]) {
                $('.lg-current .lg-img-wrap img').attr('src', thumbLink); // use Thumbnail photo for detail while loading
                $container.append('<img src="' + detailLink + '" id="tempImg" style="display: none">');
                $('#tempImg').imagesLoaded(function() {
                    // check current viewing thumb photo has same ID with detail photo
                    var currentImgUrl = $('.lg-current .lg-img-wrap img').attr('src') || '';
                    var currentImgId = currentImgUrl.substring(currentImgUrl.lastIndexOf('/') + 1, currentImgUrl.lastIndexOf('.'));
                    currentImgId = currentImgId.split('_')[0];
                    if (detailLink.indexOf(currentImgId) > 0) {
                        $('.lg-current .lg-img-wrap img').attr('src', detailLink);
                    }
                    listLoadedImg[detailLink] = true;
                    $('#tempImg').remove();
                });
            }
        }, 100);
    });
    $container.on('onCloseAfter.lg', function() {
        var newUrl = deleteUrlParam('photo_url');
        changeUrl(newUrl);
    });

    // infinite scroll
    var loadingImages = false;
    $(document).scroll(function() {
        if (startPhotoIndex < perPage) {
            var docScrollTop = $(document).scrollTop();
            var endScroll = $(document).height() - $(window).height() - 200;
            if (!loadingImages && (docScrollTop > endScroll)) {
                loadingImages = true;
                NProgress.start();
                loadImages(function() {
                    NProgress.done();
                    loadingImages = false;
                });
            }
        }
        if ($(document).scrollTop() > $(window).height()) {
            $('.pagination.bottom').show();
        }
    });

    function startLoadImages() {
        startPage = 0;
        loadPage(++startPage, function() {
            // make sure body has scroll therefore be able to do infinitescroll
            if (document.body.scrollHeight <= window.innerHeight) {
                loadPage(++startPage);
            }
        });
    }

    function loadPage(page, callback) {
        console.log('loadImages page: ' + page);
        NProgress.start();
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&user_id=' + userId + '&per_page=' + perPage + '&page=' + page + '&format=json&nojsoncallback=1';
        $.getJSON(url, function(response) {
            if (response.stat === 'ok') {
                arrListPhotos = response.photos.photo;
                startPhotoIndex = 0;
                $('.pagination').pagination('updateItems', response.photos.total);
                loadImages(function() {
                    NProgress.done();
                    if (callback) {
                        callback();
                    }
                });
            } else {
                NProgress.done();
            }
        }, function() {
            NProgress.done();
        });
    }

    function loadImages(callback) {
        console.log(' startPhotoIndex: ' + startPhotoIndex);
        var photos = arrListPhotos.slice(startPhotoIndex, startPhotoIndex + perPart);
        startPhotoIndex += perPart;
        var imgages = '';
        // combine string to get sizes' link
        for (var i = 0; i < photos.length; i++) {
            var photo = photos[i];
            var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qThumb] + '.jpg';
            var link_detail = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+qPhoto] + '.jpg';
            imgages += '<a href="' + link_detail + '" ><img class="grid-item " src="' + link + '"" alt="' + photo.title + '" style="display: none" ></a>';
        }
        appendImages($(imgages), callback);
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
    return location.origin + location.pathname + '?' + newParamsUrl;
}

function changeUrl(newUrl) {
    window.history.pushState("object or string", document.title, newUrl);
}
