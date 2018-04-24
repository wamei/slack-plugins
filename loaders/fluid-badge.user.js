// ==UserScript==
// @name         Wamei Slack Fluid Badge Plugin
// @namespace    wamei
// @version      0.1
// @description  Fluidで未読数をバッジ表示する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/dist/fluid-badge.js");
})();
