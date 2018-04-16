import MessageMenu from './class/message-menu.js';
import MessageInput from './class/message-input.js';
import MenuActionButton from './class/menu-action-button.js';

(function() {
    'use strict';

    const quoteButton = new MenuActionButton('メッセージを引用する', 'ts_icon_quote', () => {
        if (MessageInput.isEmpty()) {
            MessageInput.clear();
        }
        if (MessageMenu.selectedText != '') {
            MessageInput.appendQuotedText(`${MessageMenu.selectedText}`);
        } else {
            MessageInput.appendQuotedText(`${MessageMenu.wholeText}`);
        }
        MessageInput.appendText('');
        MessageInput.focus();
    });

    const replyButton = new MenuActionButton('メッセージに返信する', 'c-icon--share-action" style="transform: scale(-1, 1);"', () => {
        const id = MessageMenu.userId;
        const user = TS.model.members.filter((user) => user.id == id)[0];
        const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
        if (MessageInput.isEmpty()) {
            MessageInput.clear();
        }
        MessageInput.appendText(`<ts-mention data-id="${id}" data-label="@${name}" spellcheck="false" class="ts_tip_texty">@${name}</ts-mention> `);
        if (MessageMenu.selectedText != '') {
            MessageInput.appendQuotedText(`${MessageMenu.selectedText}`);
            MessageInput.appendText('');
        }
        MessageInput.focus();
    });

    MessageMenu.append(replyButton);
    MessageMenu.append(quoteButton);
})();
