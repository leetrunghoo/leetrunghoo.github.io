---
layout: post
title:  "Introduce Learn English - progressive web app"
excerpt: "This is a Progressive Web App for learning English"
categories: Project
tags: PetProject ProgressiveWebApp
image:
  hero: /assets/img/hero/learnenglish.png
  heroStyle: 
  thumbnail: /assets/img/thumbnail/learnenglish.png
  thumbnailStyle:
bgGradientOpacity: darker
---

[Learn English](https://learnenglish.leetrunghoo.com){:target="_blank"} is a Progressive Web App for learning English that I made for personal use and for learning new tech. It's totally free, and I would like to share it with everyone, hope it helps.
For those who don't know what Progressive Web App means, I copy this definition from [Google Developers](https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/)

Progressive Web Apps (PWA) are:

- Progressive - Work for every user, regardless of browser choice because they’re built with progressive enhancement as a core tenet.
- Responsive - Fit any form factor: desktop, mobile, tablet, or whatever is next.
Connectivity independent - Enhanced with service workers to work offline or on low quality networks.
- App-like - Feel like an app to the user with app-style interactions and navigation because they’re built on the app shell model.
- Fresh - Always up-to-date thanks to the service worker update process.
- Safe - Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with.
- Discoverable - Are identifiable as “applications” thanks to W3C manifests and service worker registration scope allowing search engines to find them.
- Re-engageable - Make re-engagement easy through features like push notifications.
- Installable - Allow users to “keep” apps they find most useful on their home screen without the hassle of an app store.
- Linkable - Easily share via URL and not require complex installation.

Thanks to [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest){:target="_blank"} and [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers){:target="_blank"}, PWA could do those amazing things. I love the web, and I always want to try the latest technology to push the limit of the web.

## Demo key features

**1. Text-to-Speech:** When opened a lesson, you can click on the links to listen. You can choose using mp3 (default) or Web Speech. If using Web Speech, you can change the voice, the voice speed and use the web without network (it used Speech Synthesis that only supported by Chrome, Opera, Safari & Edge 14).

**2. Practise speaking:** You can practice speaking to find out you pronounce right or not (it used Speech Recognition that only supported by Chrome và Opera). 

<iframe width="100%" height="320" src="https://www.youtube.com/embed/L_4ZDqVbOKo" frameborder="0" allowfullscreen></iframe>

**3. Work Offline:** Thanks to Service Worker, the web can work offline or when the network is not stable (only supported by Chrome, Opera & Firefox)

<iframe width="100%" height="320" src="https://www.youtube.com/embed/vpVN7uuOHzE" frameborder="0" allowfullscreen></iframe>

**4. App-like:** Just add to the home screen of a smartphone and works like a native app. Without installing!

<iframe width="100%" height="320" src="https://www.youtube.com/embed/TrtP4qwl3qo" frameborder="0" allowfullscreen></iframe>

**5. Fast, very fast:** I use new tech to make it as fast as possible. On below demo, I used Chome Android on 3G network and it took about 1s to load the web (cleared cache). It was almost instant loading when revisiting the web.

<iframe width="100%" height="320" src="https://www.youtube.com/embed/nuJf_K5fxn0" frameborder="0" allowfullscreen></iframe>

## About the project

- This is an opensource project, Github link: <https://github.com/leetrunghoo/learnenglish>{:target="_blank"}
- Firsly I need the content for my web app so I wrote a simple crawler/scraper runs on Nodejs to scrape the data from <http://www.talkenglish.com>{:target="_blank"}, then all json data are uploaded to Github.
- I want to keep this project simple and lightweight so currently I'm using: 
	- Nodejs (for running crawler on backend & development enviroment)
	- Service Worker (for PWA, I use sw-precache for generating sw file)
	- Jquery
	- Materializecss (CSS framework) 
	- Sass (preprocessor css) 
	- Masonry (for Masonry Layout)
	- Handlebar (html template)
	- Web Speech API
	- Gulp (automating tasks while deleloping)
	- Browsersync (for live-server & for testing UI in multi-devices)
	- Github Page (for hosting from your GitHub repository)
	- Cloudflare (for https & optimization) 

## How to run

__Requirement:__ installed nodejs & npm

1. Install all dependencies (in package.json).<br/>
	```
	npm install
	```

2. Then running default gulp task for development mode, without generating service worker and uncss for faster live-reload.<br/>
	```
	gulp
	```

	Or with flag --production when it's ready for production.<br/>
	```
	gulp --production
	```

## License

Learn English is created by Trung Ho (<https://leetrunghoo.com>), and released under MIT license.

---

Reference:

- <https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/>
- <https://developer.mozilla.org/en-US/docs/Web/Manifest>
- <https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers>
