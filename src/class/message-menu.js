import Message from './message.js';
import Util from './util.js';

class MessageMenu {
    constructor() {
        this.classAdded = 'wamei-added';
        this.buttons = [];

        this.mount();
    }

    append(menuActionButton) {
        this.buttons.unshift(menuActionButton);
        return this;
    }

    mount() {
        Util.delegate(document, 'mouseover', 'div.c-message', (e, target) => {
            this.applyButtons($(target).find('div.c-message_actions__container'), '#msg_input');
        });
        Util.delegate(document, 'mouseover', 'div.c-message_kit__message', (e, target) => {
            const relatedInput = $(target.closest('div.c-virtual_list__scroll_container')).find('div.p-message_input');
            this.applyButtons($(target).find('div.c-message_actions__container'), relatedInput);
        });
        Util.delegate(document, 'mouseover', 'ts-message', (e, target) => {
            const relatedInput = $(target.closest('div.thread_body_container')).find('div.message_input');
            this.applyButtons($(target).find('div.action_hover_container'), relatedInput);
        });
        return this;
    }

    applyButtons($target, relatedInput) {
        $target.not(`:has(.${this.classAdded})`).addClass(this.classAdded).each((i, elm) => {
            const menu = $(elm);
            const $message = menu.closest('.c-virtual_list__item, ts-message');
            const userId = Util.getUserIdFromMessage($message);
            let wholeText = $message.find('.c-message__body, .c-message_kit__text').html();
            if (!wholeText) {
                wholeText = $message.find('.message_body').html().replace('<span class="constrain_triple_clicks"></span>', '').trim() || '';
            }
            wholeText = wholeText.replace(/<a href="(https:\/\/.+?)" .+?>Re:<\/a><a .+?>@(.+?)<\/a>/gm, Util.createMessageLink('$1', userId, '$2'));
            let attachments = '';
            $message.find('.c-message__attachments, .c-message_kit__attachments').not(':has(.c-message_attachment__delete)').find('.c-message_attachment__body .c-message_attachment__row').each((i, elm) => {
                attachments += `\n> ${$(elm).html()}`;
                const $titleLink = $(elm).find('a.c-message_attachment__title_link');
                if ($titleLink.length > 0) {
                    attachments += `\n> ${$titleLink.attr('href')}`;
                }
            });
            const messageUri = Util.getMessageUriFromMessage($message);
            const message = new Message(userId, messageUri, wholeText + attachments, relatedInput);
            this.buttons.forEach((button) => {
                const $element = button.createElement(message);
                $element.on('mousedown', () => {
                    message.selectedMessage = window.getSelection().toString() || '';
                });
                if (button.isAvailable(message)) {
                    menu.prepend($element);
                }
            });
        });
    }
}
const messageMenu = new MessageMenu();
export default messageMenu;
