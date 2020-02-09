// ==UserScript==
// @name         WoD Textarea Overhaul TinyMCE
// @namespace    github.com/DotIN13
// @version      0.1
// @require      https://cdn.tiny.cloud/1/ywt4e8tywe5b6elzc8f93q7e89loo38uw7l9335movroj7be/tinymce/5/tinymce.min.js
// @require      https://github.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/raw/master/zh_CN.js
// @updateURL    https://github.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/raw/master/WoD%20Textarea%20Overhaul%20TinyMCE.user.js
// @description  Refreshing Wod textareas with TinyMCE
// @author       DotIN13
// @match        http://canto.world-of-dungeons.org/*
// @grant        none
// ==/UserScript==

(function()
{
    'use strict';

    //prevent the left collumn from covering the source code dialog
    document.getElementsByClassName("gadget_fixed_container")[0].setAttribute("style", "position: fixed; left: 0px; top: 0px; width: 160px; z-index: 1;");

    //romove annoying WoD original resizer
    var textareas = document.querySelectorAll("textarea");
    console.log(textareas);
    for (var i = 0; i < textareas.length; i++)
    {
        textareas[i].removeAttribute("onmouseover");
    }
    console.log("resizer removed.")

    //init tinyMCE
    tinymce.init(
    {
        selector: 'textarea',
        language: "zh_CN",
        plugins: "bbcode code",
        toolbar: 'undo redo | bold italic underline | code',
    });
})();