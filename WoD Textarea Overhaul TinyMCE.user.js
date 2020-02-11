// ==UserScript==
// @name         WoD Textarea Overhaul TinyMCE
// @namespace    github.com/DotIN13
// @version      1.0
// @description  Refreshing WoD textareas with TinyMCE v5
// @updateURL    https://github.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/raw/master/WoD%20Textarea%20Overhaul%20TinyMCE.user.js
// @author       DotIN13
// @match        http://canto.world-of-dungeons.org/wod/spiel/hero/profile.php?menukey=hero_profiles&session_hero_id=*
// @match        http://canto.world-of-dungeons.org/wod/spiel/forum/*
// @match        http://canto.world-of-dungeons.org/wod/spiel/dungeon/group.php*
// @match        http://canto.world-of-dungeons.org/wod/spiel/pm*
// @grant        GM_xmlhttpRequest
// @connect      cdn.tiny.cloud
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://cdn.tiny.cloud/1/ywt4e8tywe5b6elzc8f93q7e89loo38uw7l9335movroj7be/tinymce/5/tinymce.min.js",
        headers:{referer:"http://canto.world-of-dungeons.org/",origin:"http://canto.world-of-dungeons.org/"},
        onload: function(response) {
            let remoteScript = document.createElement('script');
            remoteScript.id = 'tinymceScript';
            remoteScript.innerHTML = response.responseText;
            document.body.appendChild(remoteScript);
            GM_xmlhttpRequest({
                method:"GET",
                url:"https://raw.githubusercontent.com/DotIN13/WoD_Textarea_Overhaul_TinyMCE/master/zh_CN.js",
                onload: function(response){
                    remoteScript = document.createElement("script");
                    remoteScript.id = 'tinymce_cn';
                    remoteScript.innerHTML = response.responseText;
                    document.body.appendChild(remoteScript);
                    tinymce.init(
                        {
                            selector: 'textarea',
                            language: "zh_CN",
                            plugins: "bbcode code autoresize charmap fullscreen searchreplace link image",
                            bbcode_dialect: "punbb",
                            image_dimensions: false,
                            min_height: 300,
                            min_width: 500,
                            max_height: 600,
                            content_css: "http://canto.world-of-dungeons.org/wod/css//skins/skin-1/skin-cn.css?1572386582",
                            toolbar: 'undo redo | bold italic underline forecolor | charmap link image searchreplace code fullscreen',
                            menubar: false,
                            contextmenu: false,
                            link_title: false
                        });
                }
            });
        }});

    //functions for romoving annoying WoD original resizer
    function removeResizeableDivMethod(divs)
    {
        var removeResizeableDiv;
        if (divs.length != 0)
        {
            removeResizeableDiv = function()
            {
                for (var i = divs.length - 1; i >= 0; i--)
                {
                    divs[i].parentNode.insertBefore(divs[i].lastChild, divs[i]);
                    divs[i].remove();
                }
            }
        }
        else
        {
            removeResizeableDiv = function()
            {
                return false;
            }
        }
        return removeResizeableDiv;
    }

    function processRm(divs)
    {
        var method = removeResizeableDivMethod(divs);
        method();
    }

    //prevent the left collumn from covering the source code dialog
    if (document.getElementsByClassName("gadget_fixed_container")[0])
    {
        document.getElementsByClassName("gadget_fixed_container")[0].setAttribute("style", "position: fixed; left: 0px; top: 0px; width: 160px; z-index: 1;");
    }

    //delete forum commentbox excessive space
    var resizeDiv = document.getElementsByTagName("textarea");
    resizeDiv[0].parentElement.innerHTML = resizeDiv[0].parentElement.innerHTML.replace(/&nbsp;/,"");

    //remove WoD original resizer
    processRm(document.getElementsByClassName("resizeable default"));
})();