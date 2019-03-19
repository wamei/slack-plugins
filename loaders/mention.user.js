// ==UserScript==
// @name         Wamei Slack Mention Plugin
// @namespace    wamei
// @version      0.2
// @description  mentionをChatWork風にハイライト表示する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/mention.js");
})();
