// ==UserScript==
// @name         Wamei Slack Inline Image Plugins
// @namespace    wamei
// @version      0.1
// @description  SlackのProxyを通して表示できない画像を直接インライン展開する
// @author       wamei
// @match        https://*.slack.com/*
// ==/UserScript==

(function() {
    'use strict';

    const target = document.querySelector('div.client_main_container');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            $(mutation.target).find('div.c-message').find('a:contains(.png), a:contains(.jpg), a:contains(.jpeg), a:contains(.gif), a:contains(.bmp)').not('.c-message_attachment__image').each((i, elm) => {
                const $this = $(elm);
                if ($this.next('span.c-message_attachment_inline').length > 0) {
                    return;
                }
                const url = $this.text();
                $this.after(
                    $(`
<span class="c-message_attachment_inline">
  <div data-expanded="true" data-qa-expandable-container-is-expanded="true">
    <a role="link" tabindex="0" target="_blank" class="c-message_attachment__image" href="${url}" rel="noopener noreferrer" style="text-indent: 0;"><img src="${url}" style="max-width: 360px; max-height:210px;"></a>
  </div>
</span>`)
                );
            });
        });
    });
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(target, config);
})();