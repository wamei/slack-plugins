import Util from './util.js';

class MessageMenu {
    constructor() {
        this.classAdded = 'wamei-added';
        this.buttons = [];

        this.mount();
    }

    append(menuActionButton) {
        this.buttons.unshift(menuActionButton);
        menuActionButton.$element.on('mousedown', () => {
            menuActionButton.selectedMessage = window.getSelection().toString() || '';
        });
        return this;
    }

    mount() {
        const target = document.querySelector('div#messages_container');
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                $(mutation.target).find('div.c-message_actions__container').not(`.${this.classAdded}`).addClass(this.classAdded).each((i, elm) => {
                    const menu = $(elm);
                    const message = menu.closest('.c-virtual_list__item');
                    const wholeText = message.find('.c-message__body').html() || '';
                    let attachments = '';
                    message.find('.c-message__attachments').not(':has(.c-message_attachment__delete)').find('.c-message_attachment__body .c-message_attachment__row').each((i, elm) => {
                        attachments += `\n> ${$(elm).html()}`;
                        const $titleLink = $(elm).find('a.c-message_attachment__title_link');
                        if ($titleLink.length > 0) {
                            attachments += `\n> ${$titleLink.attr('href')}`;
                        }
                    });
                    const userId = Util.getUserIdFromMessage(message);
                    this.buttons.forEach((button) => {
                        button.wholeMessage = wholeText + attachments;
                        button.userId = userId;
                        if (button.isAvailable()) {
                            menu.prepend(button.$element);
                        }
                    });
                });
            });
        });
        this.observer.observe(target, {
            childList: true,
            subtree: true,
        });
        return this;
    }

    unmount() {
        this.observer.disconnect();
        return this;
    }
}
const messageMenu = new MessageMenu();
export default messageMenu;
