// ==UserScript==
// @name         Wamei Slack Resize Sidebar Plugin
// @namespace    wamei
// @version      0.1
// @description  サイドバーをResize出来るようにする
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/resize-sidebar.js");
})();
