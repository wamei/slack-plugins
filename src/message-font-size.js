import MessageFontSizeStyle from './class/message-font-size-style.js';

(function() {
    'use strict';

    const style = new MessageFontSizeStyle();
    $(document).on('keyup', function(e) {
        if (!e.altKey) {
            return;
        }
        if (e.keyCode == 187) {
            style.increase();
        } else if (e.keyCode == 189) {
            style.decrease();
        } else if (e.keyCode == 48) {
            style.reset();
        }
    });
})();
