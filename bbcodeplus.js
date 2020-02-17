(function() {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var html2bbcode = function(s) {
        s = global$1.trim(s);
        var rep = function(re, str) {
            s = s.replace(re, str);
        };
        rep(/<a.*?href=\".*?item.*?\".*?>(.*?)<\/a>/gi, '[item:$1]');
        return s;
    };
    var bbcode2html = function(s) {
        s = global$1.trim(s);
        var rep = function(re, str) {
            s = s.replace(re, str);
        };
        rep(/\[item:(.*?)\]/gi, '<a href="http://canto.world-of-dungeons.org/wod/spiel/hero/item.php?name=$1">$1</a>');
        return s;
    };
    var Convert = {
        html2bbcode: html2bbcode,
        bbcode2html: bbcode2html
    };

    function Plugin() {
        global.add('bbcodeplus', function(editor) {
            editor.on('BeforeSetContent', function(e) {
                e.content = Convert.bbcode2html(e.content);
            });
            editor.on('PostProcess', function(e) {
                if (e.set) {
                    e.content = Convert.bbcode2html(e.content);
                }
                if (e.get) {
                    e.content = Convert.html2bbcode(e.content);
                }
            });
        });
    }

    Plugin();

}());