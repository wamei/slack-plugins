import Util from './class/util.js';

(function() {
    'use strict';

    const mentionColor = '#ddebd7';
    const mentionHoverColor = '#e7efe4';
    const mention = ($target) => {
        $target.css('background-color', mentionColor)
              .hover(function() {
                  $(this).css('background-color', mentionHoverColor);
              }, function() {
                  $(this).css('background-color', mentionColor);
              });
    };
    Util.onElementInserted('.c-message, .c-message_kit__message, ts-message', (event) => {
        const message = $(event.target);
        mention(message.has('a[data-member-id="'+TS.model.user.id+'"]'));
        mention(message.has('span[data-broadcast-id="BKhere"]'));
        mention(message.has('span[data-broadcast-id="BKchannel"]'));
    });
})();
