// ==UserScript==
// @name         WoD Textarea Overhaul TinyMCE
// @namespace    github.com/DotIN13
// @version      0.3
// @description  Refreshing WoD textareas with TinyMCE v5
// @require      https://cdn.tiny.cloud/1/ywt4e8tywe5b6elzc8f93q7e89loo38uw7l9335movroj7be/tinymce/5/tinymce.min.js
// @require      https://github.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/raw/master/zh_CN.js
// @updateURL    https://github.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/raw/master/WoD%20Textarea%20Overhaul%20TinyMCE.user.js
// @author       DotIN13
// @match        http://canto.world-of-dungeons.org/wod/spiel/hero/profile.php?menukey=hero_profiles&session_hero_id=*
// @match        http://canto.world-of-dungeons.org/wod/spiel/forum/*
// @match        http://canto.world-of-dungeons.org/wod/spiel/dungeon/group.php*
// @match        http://canto.world-of-dungeons.org/wod/spiel/pm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //romove annoying WoD original resizer
    new MutationObserver(function(mutations) {
    if (document.getElementsByTagName('textarea')[0]) {
        var seltextarea = document.getElementsByTagName('textarea')[0];
        if (seltextarea) {
            seltextarea.removeAttribute("onmouseover");
            this.disconnect();// disconnect the observer
        }
    }
    }).observe(document, {childList: true, subtree: true});

    //prevent the left collumn from covering the source code dialog
    document.getElementsByClassName("gadget_fixed_container")[0].setAttribute("style", "position: fixed; left: 0px; top: 0px; width: 160px; z-index: 1;");

    tinymce.init(
    {
        selector: 'textarea',
        language: "zh_CN",
        plugins: "bbcode code autoresize",
        min_height:300,
        max_height: 800,
        toolbar: 'undo redo | bold italic underline | code',
    });
})();