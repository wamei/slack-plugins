import Util from './class/util.js';
import MessageInput from './class/message-input.js';

(function() {
    'use strict';

    const messageInput = new MessageInput('.c-search__input_box');
    const target = document.querySelector('div.channel_header');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            $(mutation.target).find('div.channel_title_info:not(:has(#search-in-channel))').append(
                $(`<button type="button" id="search-in-channel" class="btn_unstyle blue_on_hover channel_actions_toggle channel_header_icon ts_tip ts_tip_bottom"><span class="ts_tip_tip">チャンネル内検索</span><ts-icon class="ts_icon_search_in_channel" aria-hidden="true"></ts-icon></button>`)
                    .click(() => {
                        $('#search_container').click();
                        Util.executeOnLoad('$(\'.ReactModal__Content[aria-label="検索"]\').length', () => {
                            const cid = TS.model.active_cid;
                            let target = '';
                            switch(cid.charAt(0)) {
                            case 'C':
                                target = `#${TS.model.channels.filter((c) => c.id == cid)[0].name}`;
                                break;
                            case 'G':
                                target = `#${TS.model.groups.filter((c) => c.id == cid)[0].name}`;
                                break;
                            case 'D':
                                target = `@${TS.model.ims.filter((c) => c.id == cid)[0].name}`;
                                break;
                            default:
                                messageInput.focus();
                                return;
                            }
                            messageInput.clear();
                            messageInput.appendText(`in:${target} `);
                            messageInput.$input.scrollLeft(Number.MAX_SAFE_INTEGER);
                            messageInput.$input.parent().click();
                            messageInput.focus();
                        });
                    })
            );
        });
    });
    observer.observe(target, {
        childList: true,
        subtree: true,
    });

    $('head').append('<style>.ts_icon_search_in_channel::before { content: \'\\E086\' }</style>');
})();
