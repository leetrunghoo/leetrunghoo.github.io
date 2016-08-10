$(function() {
    var apiKey = '986e904143a37c668876552671aacde9',
        authorId = '99002729@N07',
        qThumb = $('selectThumbQuality').val(),
        qPhoto = $('selectPhotoQuality').val(),
        gallery = '';
    perPage = 10,
        startPage = 0,
        arrQuality = ['_m', '', '_b'];

    // Main content container
    var $container = $('#container');

    // Masonry 
    $container.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });

    // Remodal event
    $(document).on('confirmation', '.remodal', function() {
        console.log('---', $('#txtFlickr').val());
        if ($('#txtFlickr').val() && $('#txtFlickr').val() !== authorId) {
            authorId = $('#txtFlickr').val();
            console.log(authorId);
            $container.empty();
            if (gallery) {
                gallery.destroy(true);
            }
            startLoadImages();
        }
        qThumb = $('#selectThumbQuality').val();
        qPhoto = $('#selectPhotoQuality').val();
    });
    $(document).on('cancellation', '.remodal', function() {
        $('#txtFlickr').val('');
        $('#selectThumbQuality').val(qThumb);
        $('#selectPhotoQuality').val(qPhoto);
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
                for (var i = 0; i < response.photos.photo.length; i++) {
                    var photo = response.photos.photo[i];
                    var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+$('#selectThumbQuality').val()] + '.jpg';
                    var link_large = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + arrQuality[+$('#selectPhotoQuality').val()] + '.jpg';

                    console.log(link);
                    console.log(link_large);
                    imgages += '<a href="' + link + '" ><img class="grid-item " src=' + link + ' style="display: none" ></a>';

                }
                var $newEle = $(imgages);
                $container.append($newEle);

                $newEle.each(function(index) {
                    var $img = $(this).find('img');
                    $img.imagesLoaded(function(ele) {
                        console.log('loaded img: ', $img.attr('src'));
                        $img.show();
                        $container.masonry('appended', $img, true);
                        $container.masonry('layout');
                    });
                });
                $newEle.imagesLoaded(function() {
                    console.log('loaded all');
                    // Init lightGallery
                    // TODO: refresh lightGallery everytime added photo
                    if (gallery) {
                        gallery.destroy(true);
                    }
                    gallery = $container.lightGallery({
                        thumbnail: true,
                        animateThumb: true,
                        showThumbByDefault: true,
                        subHtmlSelectorRelative: true,
                        hash: false
                    }).data('lightGallery');
                    if (callback) {
                        callback();
                    }
                });
            }
        });
    }

    function getPhotoInfo(id) {
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + id + '&format=json&nojsoncallback=1';
        $.getJSON(url, function(response) {

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
