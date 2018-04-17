import Util from './util.js';

class MessageMenu {
    constructor() {
        this.wholeText = '';
        this.selectedText = '';
        this.userId = 0;
        this.buttons = [];

        this.mount();
    }

    append(menuActionButton) {
        this.buttons.unshift(menuActionButton);
        menuActionButton.$element.on('mousedown', () => {
            this.selectedText = window.getSelection().toString();
        });
        return this;
    }

    mount() {
        const target = document.querySelector('div.client_main_container');
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const menu = $(mutation.target).find('div.c-message_actions__container').not('.wamei-added').addClass('wamei-added');
                if (!menu) {
                    return;
                }
                this.buttons.forEach((button) => {
                    menu.prepend(button.$element);
                });
                let message = menu.closest('.c-virtual_list__item');
                const wholeText = message.find('.c-message__body').html();
                if (wholeText) {
                    this.wholeText = wholeText;
                }
                this.userId = Util.getUserIdFromMessage(message);
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
