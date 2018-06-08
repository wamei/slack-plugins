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
        const id = this.userId;
        if (id != null) {
            const user = TS.model.members.filter((user) => user.id == id)[0];
            const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
            messageInput.appendQuotedText(`*${name}*`);
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
        const userId = this.userId;
        const messageUri = this.messageUri;
        const user = TS.model.members.filter((user) => user.id == userId)[0];
        const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        messageInput.appendText(`&lt;${location.origin}${messageUri}|Re:&gt;<span data-id="${userId}" data-label="@${name}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty">@${name}</span>`);
        if (this.selectedMessage != '') {
            messageInput.appendQuotedText(`${this.selectedMessage}`);
        }
        messageInput.appendText('');
        messageInput.focus();
    });
    replyButton.isAvailable = function() {
        if (!replyButton.userId || replyButton.userId.indexOf('B') == 0) {
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
                    const user = TS.model.members.filter((user) => {
                        return user._display_name_normalized_lc == name || user._real_name_normalized_lc == name;
                    });
                    $this.addClass(treatedClass);
                    if (user.length == 0) {
                        return;
                    }
                    $this.html(`<img class="c-message_attachment__author_icon" alt="${user[0].real_name}" src="${user[0].profile.image_24}" width="16" height="16">${user[0].real_name}`);
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
            let matched = text.match(/(<.*\/archives\/.+\|Re:>)<@.+\|(@.+)>([\s\S]*)/);
            if (matched) {
                TS.chat_history.add(text);
                TS.api.call('chat.postMessage', {
                    channel: params.id,
                    link_names: true,
                    unfurl_links: false,
                    text: text.replace(/(<.*\/archives\/.+\|Re:>)<@.+\|(@.+)>/gm, '$1$2'),
                }, (e, data) => {console.log(data);});
                return;
            }
            _old.apply(this, arguments);
        };
    });
})();
