import MessageMenu from './class/message-menu.js';
import MessageInput from './class/message-input.js';
import MenuActionButton from './class/menu-action-button.js';
import Util from './class/util.js';

(function() {
    'use strict';

    const quoteButton = new MenuActionButton('メッセージを引用する', 'ts_icon_quote', function(message) {
        const messageInput = new MessageInput(message.relatedInput);
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        if (message.userId != null) {
            const user = Util.getUserByUserId(message.userId);
            if (user) {
                messageInput.appendQuotedText(`*${user.display_name}*`);
            }
        }
        if (message.selectedMessage != '') {
            messageInput.appendQuotedText(`${message.selectedMessage}`);
        } else {
            messageInput.appendQuotedText(`${message.wholeMessage}`);
        }
        messageInput.appendText('');
        messageInput.focus();
    });

    const replyButton = new MenuActionButton('メッセージに返信する', 'c-icon--share-action" style="transform: scale(-1, 1);"', function(message) {
        const messageInput = new MessageInput(message.relatedInput);
        const user = Util.getUserByUserId(message.userId);
        if (!user) {
            return;
        }
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        const uri = message.messageUri.indexOf('/') == 0 ? location.origin + message.messageUri: message.messageUri;
        messageInput.appendText(Util.createMessageLink(uri, message.userId, user.display_name));
        if (message.selectedMessage != '') {
            messageInput.appendQuotedText(`${message.selectedMessage}`);
        }
        messageInput.appendText('');
        messageInput.focus();
    });
    replyButton.isAvailable = function(message) {
        if (!message.userId) {
            return false;
        }
        return true;
    };

    MessageMenu.append(replyButton);
    MessageMenu.append(quoteButton);

    const treatedClass = 'wamei-quote-icon-treated';
    Util.onElementInserted('.c-message, .c-message_kit__message, ts-message', (event) => {
        const message = $(event.target);
        message.find('.c-message__broadcast_preamble').css('font-size', '10px');
        message.find('.c-message__broadcast_preamble_link').css('color', '#717274');
        message.find(`blockquote b:not(.${treatedClass}), .special_formatting_quote b:not(.${treatedClass})`).each((i, elm) => {
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

    Util.executeOnLoad('XMLHttpRequest.prototype.open', () => {
        const oldOpen = XMLHttpRequest.prototype.open;
        const oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (url.startsWith('/api/chat.postMessage')) {
                this.send = function(formData) {
                    if (formData.get('type') != 'message') {
                        return oldSend.call(this, formData);
                    }
                    const text = formData.get('text');
                    const regExpString = '&lt;(.*(\/archives\/.+)\|Re:)&gt;';
                    let matched = text.match(new RegExp(regExpString));
                    if (matched) {
                        const threadTs = formData.get('thread_ts');
                        if (!threadTs) {
                            formData.append('thread_ts', Util.getTSfromUri(matched[2]));
                            formData.append('reply_broadcast', 'true');
                        }
                        formData.delete('text');
                        formData.append('text', text.replace(new RegExp(regExpString, 'gm'), '<$1>'));
                        formData.append('unfurl_links', 'false');
                    }
                    return oldSend.call(this, formData);
                };
            }
            return oldOpen.apply(this, arguments);
        };
    });
})();
