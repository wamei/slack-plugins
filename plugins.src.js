(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/inline-image.src.js");
    inject("https://wamei.github.io/slack-plugins/mention.src.js");
    inject("https://wamei.github.io/slack-plugins/reply.src.js");
})();