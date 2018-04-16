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
    const target = document.querySelector('div.client_main_container');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const messages = $(mutation.target).find('div.c-message');
            mention(messages.has('a[data-member-id="'+TS.model.user.id+'"]'));
            mention(messages.has('span[data-broadcast-id="BKhere"]'));
            mention(messages.has('span[data-broadcast-id="BKchannel"]'));
        });
    });
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(target, config);
})();