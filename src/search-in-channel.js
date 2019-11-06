import Util from './class/util.js';
import Style from './class/style.js';
import MessageInput from './class/message-input.js';

(function() {
    'use strict';

    Util.onElementInserted('div[data-qa="channel_header__buttons"]', (elm) => {
        const button = document.createElement('button');
        button.id = 'search-in-channel';
        button.setAttribute('aria-label', 'チャンネル内検索');
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('class', 'c-button-unstyled p-classic_nav__model__button');
        button.innerHTML = `<i class="ts_icon_search_in_channel c-icon p-classic_nav__model__button__icon" aria-hidden="true"></i>`;
        button.addEventListener('click', () => {
            document.querySelector('button[data-qa="legacy_search_header"]').click();
            Util.executeOnLoad(() => {
                return document.querySelector('.ReactModal__Content[aria-label="検索"]');
            }, () => {
                const messageInput = new MessageInput(document.querySelector('.c-search__input_box .ql-editor'));
                const cid = location.href.split('/')[5];
                let target = '';
                switch(cid.charAt(0)) {
                case 'C':
                case 'G':
                    target = `#${document.querySelector('button[data-qa="channel_name"]').innerText}`;
                    break;
                case 'D':
                    let name = document.querySelector('button[data-qa="channel_name"] span').innerText;
                    let id = Array.prototype.find.call(document.querySelectorAll('.c-link.c-message__sender_link'), (e) => { return e.dataset.messageSender != Util.getUserId(); }).dataset.messageSender;
                    target = `<ts-mention data-id="${id}" data-label="@${name}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty" dir="ltr">@${name}</ts-mention>`;
                    break;
                default:
                    messageInput.focus();
                    return;
                }
                messageInput.clear();
                messageInput.appendText(`in:${target} `);
                messageInput.inputElement.scrollLeft = 0;
                messageInput.focus();
            });
        });
        elm.appendChild(button);
    });

    const style = new Style();
    style.style('.ts_icon_search_in_channel::before { content: \'\\E086\' }');
    style.add();
})();
