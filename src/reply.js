import MessageMenu from './class/message-menu.js';
import MessageInput from './class/message-input.js';
import MenuActionButtonFactory from './factory/menu-action-button.js';
import Util from './class/util.js';

(function() {
    'use strict';

    const quoteButton = MenuActionButtonFactory.create('メッセージを引用する', 'small-quote', function(input, message) {
        if (input.isEmpty()) {
            input.clear();
        }
        if (message.user.id != null) {
            input.appendQuotedText(`*${message.user.name}*`);
        }
        if (message.selected != '') {
            input.appendQuotedText(`${message.selected}`);
        } else {
            input.appendQuotedText(`${message.text}`);
        }
        input.appendText('');
        input.focus();
    });

    const replyButton = MenuActionButtonFactory.create('メッセージに返信する', 'share-action', function(input, message) {
        if (!message.user.id) {
            return;
        }
        if (input.isEmpty()) {
            input.clear();
        }
        const uri = message.uri.indexOf('/') == 0 ? location.origin + message.uri: message.uri;
        input.appendText(Util.createMessageLink(uri, message.user.id, message.user.name));
        if (message.selected != '') {
            input.appendQuotedText(`${message.selected}`);
        }
        input.appendText('');
        input.focus();
    }, 'transform: scale(-1, 1);');
    replyButton.isAvailable = function(message) {
        if (!message.user.id) {
            return false;
        }
        return true;
    };

    MessageMenu.append(replyButton);
    MessageMenu.append(quoteButton);

    Util.onElementInserted('.c-message_actions__container', ($target) => {
        const $item = $target.closest('.c-virtual_list__item');
        let $input;
        try {
            const id = $item.getAttribute('id').replace(/threads_view_(root-)?(.+?-\d+\.\d+)(-\d+\.\d+)?/, '$2').replace('.', '\\.');
            $input = document.querySelector(`#threads_view_footer-${id} .ql-editor`);
        } catch(error) {
        }
        if (!$input) {
            $input = $item.parentElement.querySelector('.ql-editor');
        }
        if (!$input) {
            $input = document.querySelector('.p-message_input .ql-editor');
        }
        MessageMenu.applyButtons($target, new MessageInput($input));
    });

    const treatedClass = 'wamei-treated';
    Util.onElementInserted('.c-message, .c-message_kit__message, ts-message', ($target) => {
        const preamble = $target.querySelector('.c-message__broadcast_preamble');
        if (preamble) {
            preamble.style.fontSize = '10px';
        }
        const preambleLink = $target.querySelector('.c-message__broadcast_preamble_link');
        if (preambleLink) {
            preambleLink.style.color =  '#717274';
        }
        $target.querySelectorAll(`blockquote b:not(.${treatedClass}), .special_formatting_quote b:not(.${treatedClass})`).forEach((elm) => {
            const name = elm.innerText;
            elm.classList.add(treatedClass);
            const user = Util.getUserFromName(name);
            if (!user) {
                return;
            }
            elm.innerHTML = `<img class="c-message_attachment__author_icon" alt="${user.name}" src="${user.image}" width="16" height="16">${user.name}`;
        });
    });

    Util.executeOnLoad(() => {
        return XMLHttpRequest.prototype.open;
    }, () => {
        const oldOpen = XMLHttpRequest.prototype.open;
        const oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (url.indexOf('/api/chat.postMessage') != -1) {
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
                            function getTSfromUri(uri) {
                                let ts_candidate = uri.match(/\/archives\/.+\/p(\d+)(\?thread_ts=(\d+\.\d+))?.*/);
                                if (ts_candidate[3]) {
                                    return ts_candidate[3];
                                } else if (ts_candidate[1]) {
                                    let ts = ts_candidate[1];
                                    return `${ts.slice(0, ts.length - 6)}.${ts.slice(-6)}`;
                                }
                                return null;
                            }
                            formData.append('thread_ts', getTSfromUri(matched[2]));
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
