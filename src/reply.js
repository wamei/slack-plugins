import MessageMenu from './class/message-menu.js';
import MessageInput from './class/message-input.js';
import MenuActionButton from './class/menu-action-button.js';

(function() {
    'use strict';

    const selectorMessage = '.c-virtual_list__item';
    const quoteButton = new MenuActionButton('メッセージを引用する', 'ts_icon_quote', function() {
        if (MessageInput.isEmpty()) {
            MessageInput.clear();
        }
        if (this.selectedMessage != '') {
            MessageInput.appendQuotedText(`${this.selectedMessage}`);
        } else {
            MessageInput.appendQuotedText(`${this.wholeMessage}`);
        }
        MessageInput.appendText('');
        MessageInput.focus();
    });

    const replyButton = new MenuActionButton('メッセージに返信する', 'c-icon--share-action" style="transform: scale(-1, 1);"', function() {
        const id = this.userId;
        const user = TS.model.members.filter((user) => user.id == id)[0];
        const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
        if (MessageInput.isEmpty()) {
            MessageInput.clear();
        }
        MessageInput.appendText(`<ts-mention data-id="${id}" data-label="@${name}" spellcheck="false" class="ts_tip_texty">@${name}</ts-mention> `);
        if (this.selectedMessage != '') {
            MessageInput.appendQuotedText(`${this.selectedMessage}`);
            MessageInput.appendText('');
        }
        MessageInput.focus();
    });
    replyButton.isAvailable = function() {
        if (replyButton.userId.indexOf('B') == 0) {
            return false;
        }
        return true;
    };

    MessageMenu.append(replyButton);
    MessageMenu.append(quoteButton);
})();
