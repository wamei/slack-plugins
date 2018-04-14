// ==UserScript==
// @name         Wamei Slack Plugins
// @namespace    wamei
// @version      0.1
// @description  Slackを快適に過ごす
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').append(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/loader.js");
})();