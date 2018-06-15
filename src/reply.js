import MessageMenu from './class/message-menu.js';
import MessageInput from './class/message-input.js';
import MenuActionButton from './class/menu-action-button.js';
import Util from './class/util.js';

(function() {
    'use strict';

    const selectorMessage = '.c-virtual_list__item';
    const messageInput = new MessageInput('#msg_input');
    const quoteButton = new MenuActionButton('メッセージを引用する', 'ts_icon_quote', function() {
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        if (this.userId != null) {
            const user = Util.getUserByUserId(this.userId);
            if (user) {
                messageInput.appendQuotedText(`*${user.display_name}*`);
            }
        }
        if (this.selectedMessage != '') {
            messageInput.appendQuotedText(`${this.selectedMessage}`);
        } else {
            messageInput.appendQuotedText(`${this.wholeMessage}`);
        }
        messageInput.appendText('');
        messageInput.focus();
    });

    const replyButton = new MenuActionButton('メッセージに返信する', 'c-icon--share-action" style="transform: scale(-1, 1);"', function() {
        const user = Util.getUserByUserId(this.userId);
        if (!user) {
            return;
        }
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        messageInput.appendText(`&lt;${location.origin}${this.messageUri}|Re:&gt;<span data-id="${this.userId}" data-label="@${user.display_name}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty">@${user.display_name}</span>`);
        if (this.selectedMessage != '') {
            messageInput.appendQuotedText(`${this.selectedMessage}`);
        }
        messageInput.appendText('');
        messageInput.focus();
    });
    replyButton.isAvailable = function() {
        if (!replyButton.userId) {
            return false;
        }
        return true;
    };

    MessageMenu.append(replyButton);
    MessageMenu.append(quoteButton);

    const treatedClass = 'wamei-quote-icon-treated';
    const target = document.querySelector('div#messages_container');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            $(mutation.target)
                .find(`div.c-message blockquote b:not(.${treatedClass})`).each((i, elm) => {
                    const $this = $(elm);
                    const name = $this.text();
                    $this.addClass(treatedClass);
                    const user = Util.getUserByName(name);
                    if (!user) {
                        return;
                    }
                    $this.html(`<img class="c-message_attachment__author_icon" alt="${user.display_name}" src="${user.avatar_icon}" width="16" height="16">${user.display_name}`);
                });
        });
    });
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(target, config);

    Util.executeOnLoad('TS.client.ui.sendMessage', () => {
        const _old = TS.client.ui.sendMessage;
        TS.client.ui.sendMessage = function(params, text) {
            let matched = text.match(/<.*\/archives\/.+\|Re:>/);
            if (matched) {
                TS.chat_history.add(text);
                TS.interop.api.call('chat.postMessage', {
                    channel: params.id,
                    unfurl_links: false,
                    text: text.replace(/<(@.+)\|@.+>/gm, '<$1>'),
                }, (e, data) => {console.log(data);});
                return;
            }
            _old.apply(this, arguments);
        };
    });
})();
