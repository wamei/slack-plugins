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
        Util.executeOnLoad("document.querySelector('div#messages_container')", (target) => {
            this.mainObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    this.applyButtons($(mutation.target).find('div.c-message_actions__container'), '#msg_input');
                });
            });
            this.mainObserver.observe(target, {
                childList: true,
                subtree: true,
            });
        });
        Util.executeOnLoad("document.querySelector('div#convo_scroller')", (target) => {
            this.threadObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    this.applyButtons($(mutation.target).closest('div.action_hover_container'), 'div#convo_scroller .message_input');
                });
            });
            this.threadObserver.observe(target, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        });
        return this;
    }

    applyButtons($target, selectorInput) {
        $target.not(`.${this.classAdded}`).addClass(this.classAdded).each((i, elm) => {
            const menu = $(elm);
            const $message = menu.closest('.c-virtual_list__item, ts-message');
            const wholeText = $message.find('.c-message__body, .message_body').html() || '';
            let attachments = '';
            $message.find('.c-message__attachments').not(':has(.c-message_attachment__delete)').find('.c-message_attachment__body .c-message_attachment__row').each((i, elm) => {
                attachments += `\n> ${$(elm).html()}`;
                const $titleLink = $(elm).find('a.c-message_attachment__title_link');
                if ($titleLink.length > 0) {
                    attachments += `\n> ${$titleLink.attr('href')}`;
                }
            });
            const messageUri = Util.getMessageUriFromMessage($message);
            const userId = Util.getUserIdFromMessage($message);
            const message = new Message(userId, messageUri, wholeText + attachments, selectorInput);
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

    unmount() {
        if (this.mainObserver) {
            this.mainObserver.disconnect();
        }
        if (this.threadObserver) {
            this.threadObserver.disconnect();
        }
        return this;
    }
}
const messageMenu = new MessageMenu();
export default messageMenu;
