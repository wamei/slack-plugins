// ==UserScript==
// @name         Wamei Slack Message Font Size Plugin
// @namespace    wamei
// @version      0.1
// @description  メッセージのフォントサイズを調節する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/message-font-size.js");
})();
