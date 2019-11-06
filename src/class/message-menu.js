import Message from './message.js';
import Util from './util.js';

class MessageMenu {
    constructor() {
        this.buttons = [];
    }

    append(menuActionButton) {
        this.buttons.unshift(menuActionButton);
        return this;
    }

    applyButtons($menu, input) {
        const $message = $menu.closest('.c-virtual_list__item');
        const user = Util.getUserFromMessageElement($message);
        let body = $message.querySelector('.c-message__body, .c-message_kit__text');
        let wholeText = body ? body.innerHTML : null;
        if (!wholeText) {
            body = $message.querySelector('.message_body');
            wholeText = body ? body.innerHTML.replace('<span class="constrain_triple_clicks"></span>', '').trim() : '';
        }
        wholeText = wholeText.replace(/<a href="(https:\/\/.+?)" .+?>Re:<\/a><a .+?>@(.+?)<\/a>/gm, Util.createMessageLink('$1', user.id, '$2'));
        let attachments = '';
        $message.querySelectorAll('.c-message__attachments, .c-message_kit__attachments').forEach(($elm) => {
            if ($elm.classList.contains('c-message_attachment__delete')) {
                return;
            }
            $elm.querySelectorAll('.c-message_attachment__body .c-message_attachment__row').forEach((elm) => {
                attachments += `\n> ${elm.innerHTML}`;
                const $titleLink = elm.querySelector('a.c-message_attachment__title_link');
                if ($titleLink) {
                    attachments += `\n> ${$titleLink.getAttribute('href')}`;
                }
            });
        });
        const uri = $message.closest('.c-virtual_list__item').querySelector('a.c-timestamp, a.timestamp').getAttribute('href');
        const message = new Message(user, uri, wholeText + attachments);
        this.buttons.forEach((button) => {
            const $element = button.createElement(input, message);
            $element.addEventListener('mousedown', () => {
                message.selected = window.getSelection().toString() || '';
            });
            if (button.isAvailable(message)) {
                $menu.insertBefore($element, $menu.firstElementChild);
            }
        });
    }
}
const messageMenu = new MessageMenu();
export default messageMenu;
