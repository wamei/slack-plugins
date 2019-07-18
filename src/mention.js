import Util from './class/util.js';

(function() {
    'use strict';

    const mentionColor = '#ddebd7';
    const mentionHoverColor = '#e7efe4';
    const mention = (message, target) => {
        if (!message.querySelector(target)) {
            return;
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
