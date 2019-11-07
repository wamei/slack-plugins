import Util from './class/util.js';

(function() {
    'use strict';

    const mentionColorLight = '#ddebd7';
    const mentionHoverColorLight = '#e7efe4';
    const mentionColorDark = '#2f4626';
    const mentionHoverColorDark = '#436337';
    const mention = (message, target) => {
        if (!message.querySelector(target)) {
            return;
        }
        let mentionColor = mentionColorLight;
        let mentionHoverColor = mentionHoverColorLight;
        const color = window.getComputedStyle(document.body).borderBlockEndColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (color[1] > 100 && color[2] > 100 && color[3] > 100) {
            mentionColor = mentionColorDark;
            mentionHoverColor = mentionHoverColorDark;
        }
        message.style.backgroundColor = mentionColor;
        message.addEventListener('mouseover', () => {
            message.style.backgroundColor = mentionHoverColor;
        });
        message.addEventListener('mouseout', () => {
            message.style.backgroundColor = mentionColor;
        });
    };
    Util.onElementInserted('.c-message, .c-message_kit__message, ts-message', (target) => {
        mention(target, 'a.c-member_slug--mention');
        mention(target, 'span[data-broadcast-id="BKhere"]');
        mention(target, 'span[data-broadcast-id="BKchannel"]');
    });
})();
