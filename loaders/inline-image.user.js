// ==UserScript==
// @name         Wamei Slack Inline Image Plugin
// @namespace    wamei
// @version      0.2
// @description  SlackのProxyを通して表示できない画像を直接インライン展開する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').not(`:has(script[src="${src}"])`).prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/inline-image.js");
})();
