(function() {
    'use strict';

    const inject = (src) => {
        $('body').append(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/inline-image.user.js");
    inject("https://wamei.github.io/slack-plugins/mention.user.js");
    inject("https://wamei.github.io/slack-plugins/reply.user.js");
})();