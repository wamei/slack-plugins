// ==UserScript==
// @name         Wamei Slack Plugins
// @namespace    wamei
// @version      0.2
// @description  Slackを快適に過ごす
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/plugins.js");
})();
