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

    // 全体的に汚すぎる
    const buttonClass = 'wamei-reply-button';
    const buttonLabel = 'メッセージに返信する';
    const buttonIconClass = 'c-icon--share-action" style="transform: scale(-1, 1);"';
    const onClick = function() {
        const id = $(this).attr('data-user-id');
        const user = TS.model.members.filter((user) => user.id == id)[0];
        const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
        const input = $("#msg_input > .ql-editor");
        if (input.is('.ql-blank')) {
            input.empty();
        }
        input.append(normalizeNewline(`<ts-mention data-id="${id}" data-label="@${name}" spellcheck="false" class="ts_tip_texty">@${name}</ts-mention> `));
        if (selectedText != '') {
            input.append(normalizeNewline(quoteText(`${selectedText}`) + '\n'));
        }
        selectedText = '';
        focusInputBox();
    };
    // https://github.com/gam0022/slack-reply-and-quote-button 参考にしました
    const normalizeNewline = function(text) {
        return '<p>' + text.replace(/\n/g, '</p><p>') + '</p>';
    };
    const quoteText = function(text) {
        return "> " + text.replace(/\n/g, "\n> ").replace(/<.+?>/g, "");
    };
    const focusInputBox = function() {
        const input = document.querySelector('#msg_input > .ql-editor');
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStartAfter(input.lastChild);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        input.focus();
    };
    let selectedText = '';

    const target = document.querySelector('div.client_main_container');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const menu = $(mutation.target).find('div.c-message_actions__container').not(`.${buttonClass}`).addClass(`${buttonClass}`);
            if (!menu) {
                return;
            }
            const button = $(`<button class="c-button-unstyled c-message_actions__button" type="button" aria-haspopup="true" aria-label="${buttonLabel}"><i class="c-icon ${buttonIconClass}" aria-hidden="true"></i></button>`)
                    .on('mousedown', function() {
                        selectedText = window.getSelection().toString();
                    })
                    .click(onClick)
                    .hover(function() {
                        const offset = $(this).offset();
                        const label = $(`<div class="ReactModal__Content ReactModal__Content--after-open popover" tabindex="-1" aria-label="popover" style="position: absolute; left: ${offset.left}px; top: ${offset.top}px; outline: none; z-index:100000;"><div><div class="c-tooltip__tip c-tooltip__tip--top" data-qa="tooltip-tip">${buttonLabel}<div class="c-tooltip__tip__arrow"></div></div></div></div>`).hide();
                        $(document.body).append(
                            $(`<div class="ReactModalPortal" id="${buttonClass}-tooltip"></div>`)
                                .append(`<div class="ReactModal__Overlay ReactModal__Overlay--after-open c-popover c-popover--no-pointer c-popover--z_below_menu c-popover--fade" aria-modal="true"></div>`)
                                .append(label)
                        );
                        label.css('left', offset.left - label.width() / 2 + 20)
                             .css('top', offset.top - label.height())
                             .fadeIn(200);
                }, function() {
                    $(`#${buttonClass}-tooltip`).remove();
                });
            menu.prepend(button);
            let message = menu.closest('.c-virtual_list__item');
            while(true) {
                let userId = message.find('.c-message__gutter a.c-avatar').attr('href');
                if (userId) {
                    button.attr('data-user-id', userId.split('/')[2]);
                    break;
                }
                message = message.prev();
                if (message.length == 0) {
                    break;
                }
            }
        });
    });
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(target, config);
})();