// ==UserScript==
// @name         Wamei Slack Reply Plugin
// @namespace    wamei
// @version      0.1
// @description  ChatWork風に返信できるようにする
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const inject = (src) => {
        $('body').prepend(`<script src="${src}">`);
    };

    inject("https://wamei.github.io/slack-plugins/reply.src.js");
})();