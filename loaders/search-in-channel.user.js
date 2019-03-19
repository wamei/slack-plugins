// ==UserScript==
// @name         Wamei Slack Search In Channel Plugin
// @namespace    wamei
// @version      0.1
// @description  お手軽にチャンネル内検索出来るようにする
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/search-in-channel.js");
})();
