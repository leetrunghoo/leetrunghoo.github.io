---
layout: post
title: What is Markdown?
date: 2016-03-09 2:05:00 
excerpt: "This is intended as a quick reference and showcase Markdown."
categories: tech
tags: code, markdown, jekyll
image:
  feature: markdown.png
  style: "top: 50px; width: 80%; height: auto; opacity: 1"
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

## Introduction

[Markdown](http://daringfireball.net/projects/markdown/ "Markdown's homepage"){:target="_blank"} was made by [John Gruber](https://en.wikipedia.org/wiki/John_Gruber "Wikipedia"){:target="_blank"}, and he says:

> "Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid [XHTML (or HTML)](https://developer.mozilla.org/en-US/docs/Glossary/XHTML "HTML5 and HTML/XHTML"){:target="_blank"}".

Let's take a look on how it works by the example I made on Codepen. The text on the left is writing in Markdown syntax and the output is on the right. You can play around by editing it:
<p data-height="480" data-theme-id="0" data-slug-hash="ZWEgew" data-default-tab="result" data-user="leetrunghoo" class='codepen'>See the Pen <a href='http://codepen.io/leetrunghoo/pen/ZWEgew/'>simple Markdown editor with Vuejs & Marked</a> by Trung Ho (<a href='http://codepen.io/leetrunghoo'>@leetrunghoo</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Yeah, that's so simple, isn't it? :smile: If you write in HTML, it could be like this: 

```html
<h2>Introduce myself</h2>
<h3>My name is Trung.</h3>
<p>I'm <em>friendly</em>, <strong>funny</strong> and <del>fucking</del> <em><strong>handsome</strong></em>  😎</p>
<p>I like:</p>
<ul>
<li>Learning new things.</li>
<li>Making new friends.</li>
<li>Playing the guitar and the piano.</li>
</ul>
<hr>
<blockquote>
<p>"Find your passion and find a way to get paid for it." - someone said 😋</p>
</blockquote>
```

An advantage of writing content with Markdown is that it is free from the angle brackets and tags used in HTML, so it feels and looks more like "content" than "code". You can even write HTML code in a Markdown file. It is lightweight and superb easy to use therefore you don't need any [WYSIWYG editor](http://summernote.org/ "example for WYSIWYG editor"){:target="_blank"} plugin. Markdown is a great choice when you focus on creating web content like blog or news.

Who are using it? A lot, including [Github](https://help.github.com/articles/about-writing-and-formatting-on-github/ "about-writing-and-formatting-on-github"){:target="_blank"} and [Stackoverflow](http://stackoverflow.com/editing-help "editing-help"){:target="_blank"}.

GitHub uses Markdown with adding a few unique writing features for styling all forms of writing, called **GitHub Flavored Markdown** and the next part of this blog is about its cheatsheet.

## Markdown Cheat Sheet

1. [Headers](#1)
1. [Paragraphs](#2)
1. [Emphasis](#3)
1. [Blockquotes](#4)
1. [Links](#5)
1. [Images](#6)
1. [Lists](#7)
1. [Code and Syntax Highlighting](#8)
1. [Table](#9)
1. [Horizontal Rule](#10)
1. [Mentions](#11)
1. [Task Lists](#12)
1. [Emoji](#13)

---

### Headers <a name="1"></a> [[back to list]](#markdown-cheat-sheet)

```
# Level 1 Header (H1)
## Level 2 Header (H2)
##### Level 5 Header (H5)
```

# Level 1 Header (H1)

## Level 2 Header (H2)

##### Level 5 Header (H5)

---

### Paragraphs <a name="2"></a> [[back to list]](#markdown-cheat-sheet)

```
One or more consecutive lines of text separated by one or more blank lines.
 
This is another paragraph.
```
One or more consecutive lines of text separated by one or more blank lines.
 
This is another paragraph.

```
To create a line break,  
end a line in a paragraph with two or more spaces.
```
To create a line break,  
end a line in a paragraph with two or more spaces.

---

### Emphasis <a name="3"></a> [[back to list]](#markdown-cheat-sheet)

```
**bold text**, __bold text__, *italic text*, _italic text_, ~~Strikethrough~~
```
**bold text**, __bold text__, *italic text*, _italic text_, ~~Strikethrough~~

---

### Blockquotes <a name="4"></a> [[back to list]](#markdown-cheat-sheet)

    > "Trung, you look like an famous actor"
    > *someone said*

>"Trung, you look like an famous actor!"
>*someone said*

---

### Links <a name="5"></a> [[back to list]](#markdown-cheat-sheet)

    <http://leetrunghoo.com>
    [This is my website](http://leetrunghoo.com)
    [Link with title](http://leetrunghoo.com "my website")
    [Open link in new tab](http://leetrunghoo.com "click to open in new tab"){:target="_blank"}
    Jump to the specified anchor point on the same page, [to the top](#top)
    This is [an example][id] reference-method link.

    [id]: http://leetrunghoo.com

<http://leetrunghoo.com>
[This is my website](http://leetrunghoo.com)
[Link with title](http://leetrunghoo.com "my website")
[Open link in new tab](http://leetrunghoo.com "click to open in new tab"){:target="_blank"}
Jump to the specified anchor point on the same page, [to the top](#top)
This is [an example][id] reference-method link.

[id]: http://leetrunghoo.com

---

### Images <a name="6"></a> [[back to list]](#markdown-cheat-sheet)
The syntaxt is almost the same with [Links](#links), just adding `!` at the beginning.

    ![Alt text](/assets/img/hero/trungho.jpg "Trung Ho")

![Alt text](/assets/img/trungho.jpg "Trung Ho")

---

### Lists <a name="7"></a> [[back to list]](#markdown-cheat-sheet)

```
- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Ordered
1. Number 1
2. Number 2
1. Number 3
```
- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Ordered
1. Number 1
2. Number 2
1. Number 3

Definition lists

    Apple
    : A kind of fruit
    : A computer company

Apple
: Pomaceous fruit of plants of the genus Malus.
: An american computer company.

```
Term 1
Term 2
: Definition
```

Term 1
Term 2
: Definition

---

### Code and Syntax Highlighting <a name="8"></a> [[back to list]](#markdown-cheat-sheet)

```
Inline `code`
```
Inline `code`

You can create a standard block code by a tab space or "fences" 

    ```
    Sample text here...
    ```

Output:

```
Sample text here...
```

For syntax highlighting, write the language name after \`\`\`

    ```js
    var foo = function (bar) {
      return bar++;
    };
    console.log(foo(5));
    ```

Output:

```js
var foo = function (bar) {
  return bar++;
};
console.log(foo(5));
```

Another way to present syntax highlighting is using Liquid

```text
{% raw %}
{% highlight js linenos %}
// "linenos" argument for including line numbers
var foo = function (bar) {
  return bar++;
};
console.log(foo(5));
{% endhighlight %}
{% endraw %}
```

Output:

{% highlight js linenos %}
// `linenos` argument for including line numbers
var foo = function (bar) {
  return bar++;
};
console.log(foo(5));
{% endhighlight %}

---

### Table <a name="9"></a> [[back to list]](#markdown-cheat-sheet)

Colons can be used to align columns.

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

    Markdown | Less | Pretty
    --- | --- | ---
    *Still* | `renders` | **nicely**
    1 | 2 | 3

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

---

### Horizontal Rule <a name="10"></a> [[back to list]](#markdown-cheat-sheet)

There are 3 ways to write a horizontal rule

    ---
    ***
    ___

---

### Mentions <a name="11"></a> [[back to list]](#markdown-cheat-sheet)

Typing an @ symbol, followed by a username, will notify that person to come and view the comment. Ex: Hey @leetrunghoo - like your blog

---

### Task Lists <a name="12"></a> [[back to list]](#markdown-cheat-sheet)

    + [x] This is a complete item
    + [ ] This is an incomplete item

- [x] This is a complete item
- [ ] This is an incomplete item

---

### Emoji <a name="13"></a> [[back to list]](#markdown-cheat-sheet)

GitHub Flavored Markdown supports Emoji :+1: :smile: :heart: 
Let's check out the [Emoji Cheat Sheet](http://www.emoji-cheat-sheet.com/){:target="_blank"}.

---

Reference:
<https://help.github.com/categories/writing-on-github/>{:target="_blank"}
<https://guides.github.com/features/mastering-markdown/>{:target="_blank"}
<http://daringfireball.net/projects/markdown/>{:target="_blank"}