import Util from './class/util.js';

(function() {
    'use strict';

    const maxWidth = 500;
    const resize = (width) => {
        if (width > maxWidth) {
            width = maxWidth;
        }
        $('.client_channels_list_container').css('flex-basis', `${width}px`);
        $('.p-channel_sidebar').css('width', `${width}px`);
        $('#col_channels').css('width', `${width}px`);
        Util.settings.set(KEY, width);
    };

    const KEY = 'sidebar-width';
    const initWidth = Util.settings.get(KEY);

    window.addEventListener('load', () => {
        if (initWidth) {
            resize(initWidth);
        }
        const resizer = $('<div class="wamei-sidebar-resizer" style="position:absolute;right:-3px;top:0;height:100%;width:3px;cursor:col-resize;z-index:1000;" draggable="true"></div>')
            .on('drag', (event) => {
                resize(event.clientX);
            });
        $('.client_channels_list_container').css('max-width', `${maxWidth}px`).append(resizer);
    });
})();
