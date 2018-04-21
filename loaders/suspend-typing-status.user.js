// ==UserScript==
// @name         Wamei Slack Suspend Typing Status Plugin
// @namespace    wamei
// @version      0.1
// @description  打鍵中のステータスを表示させない
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/suspend-typing-status.js");
})();
