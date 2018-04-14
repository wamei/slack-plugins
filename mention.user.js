// ==UserScript==
// @name         Wamei Slack Mention Plugin
// @namespace    wamei
// @version      0.1
// @description  mentionをChatWork風にハイライト表示する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/mention.src.js");
})();