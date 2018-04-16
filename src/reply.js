import MenuActionButton from './ui/menu-action-button.js';
import MessageInput from './class/message-input.js';

(function() {
    'use strict';

    const messageInput = new MessageInput();
    const replyButton = new MenuActionButton('メッセージに返信する', 'c-icon--share-action" style="transform: scale(-1, 1);"', () => {
        const id = replyButton.userId;
        const user = TS.model.members.filter((user) => user.id == id)[0];
        const name = user._display_name_normalized_lc || user._real_name_normalized_lc;
        if (messageInput.isEmpty()) {
            messageInput.clear();
        }
        messageInput.appendText(`<ts-mention data-id="${id}" data-label="@${name}" spellcheck="false" class="ts_tip_texty">@${name}</ts-mention> `);
        if (replyButton.selectedText != '') {
            messageInput.appendQuotedText(`${replyButton.selectedText}`);
            messageInput.appendText('');
        }
        messageInput.focus();
    });
    replyButton.mount();
})();
