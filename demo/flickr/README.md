#Demo Flickr with Rest Api

<https://leetrunghoo.com/demo/flickr/>

## Introduction

[Flickr](https://flickr.com){:target="_blank"} is one of the most popular websites for sharing photos, owned by Yahoo. However, it's quite slow and inconvenient when browsing photo. For example, when you view a list of photos and click on a photo, it'll redirect to "photo detail" page, and the only what to go back is choosing "Back to photostream", then it's gonna reload the list of photos page again. I was confusing when I use Flickr for the first time, I wonder why they don't use a popup for viewing detail of the photo, or single page web app. That's the reason why I made this demo in order to see how much I can improve Flickr.

[This simple demo](https://leetrunghoo.com/demo/flickr/){:target="_blank"} is only focus on browsing photos by showing up all photos of a user. You need to input user_id or a link of a photo in Setting. Moreover, you can config the quality of photos (the higher, the slower loading speed).

The result is good, this demo is much faster than Flickr when browsing photos.

__List of photos - main page:__
![list of photos](/assets/img/hero/flickr.jpg "list of photos")
<br/>
__Popup for photo detail:__
![view photo detail](/assets/img/posts/flickr2.jpg "view photo detail")

## Technology

This is just a demo so I tried to keep it as simple a possible.

- I'm using public rest api by Flickr <https://www.flickr.com/services/api/> to get the data.
- I handle infinite scrolling by watching scroll event.
- JQuery
- Masonry (for main layout)
- Lightgallery (for photo's popup)
- simplePagination (for pagnation)
- NProgress (for loading indicator)
- Remodal (for simple popup)
