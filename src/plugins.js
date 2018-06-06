(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/inline-image.js");
    inject("https://wamei.github.io/slack-plugins/dist/mention.js");
    inject("https://wamei.github.io/slack-plugins/dist/reply.js");
    inject("https://wamei.github.io/slack-plugins/dist/search-in-channel.js");
    inject("https://wamei.github.io/slack-plugins/dist/suspend-typing-status.js");
    inject("https://wamei.github.io/slack-plugins/dist/resize-sidebar.js");
})();
