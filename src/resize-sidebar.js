import Util from './class/util.js';

(function() {
    'use strict';

    const maxWidth = 500;
    const resize = (width) => {
        if (!width) {
            return width;
        } else if (width > maxWidth) {
            width = maxWidth;
        }
        $('.client_channels_list_container').css('flex-basis', `${width}px`);
        $('.p-channel_sidebar').css('width', `${width}px`);
        $('#col_channels').css('width', `${width}px`);
        $('#loading-zone').css('left', `${width}px`);
        return width;
    };

    const KEY = 'sidebar-width';
    const initWidth = Util.settings.get(KEY);

    resize(initWidth);
    Util.executeOnLoad('$(\'.p-channel_sidebar__section_heading\').length > 0', () => {
        resize(initWidth);
        const resizer = $('<div class="wamei-sidebar-resizer" style="position:absolute;right:-3px;top:0;height:100%;width:3px;cursor:col-resize;z-index:1000;" draggable="true"></div>')
            .on('drag', (event) => {
                resize(event.clientX);
            }).on('dragend', (event) => {
                let width = event.clientX;
                width = resize(width);
                Util.settings.set(KEY, width);
            });
        $('.client_channels_list_container').css('max-width', `${maxWidth}px`).append(resizer);
    });
})();
