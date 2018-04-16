export default class MenuActionButton {
    constructor(label, iconClass, callback) {
        this.label = label;
        this.iconClass = iconClass;
        this.callback = callback;
        this.selectedText = '';
        this.userId = 0;

        this.initElement();
    }

    initElement() {
        this.button = $(`<button class="c-button-unstyled c-message_actions__button ${this.label}" type="button" aria-haspopup="true" aria-label="${this.label}"><i class="c-icon ${this.iconClass}" aria-hidden="true"></i></button>`)
            .on('mousedown', () => {
                this.selectedText = window.getSelection().toString();
            })
            .click(this.callback)
            .hover(() => {
                const offset = this.button.offset();
                const label = $(`<div class="ReactModal__Content ReactModal__Content--after-open popover" tabindex="-1" aria-label="popover" style="position: absolute; left: ${offset.left}px; top: ${offset.top}px; outline: none; z-index:100000;"><div><div class="c-tooltip__tip c-tooltip__tip--top" data-qa="tooltip-tip">${this.label}<div class="c-tooltip__tip__arrow"></div></div></div></div>`).hide();
                $(document.body).append(
                    $(`<div class="ReactModalPortal" id="${this.label}-tooltip"></div>`)
                        .append(`<div class="ReactModal__Overlay ReactModal__Overlay--after-open c-popover c-popover--no-pointer c-popover--z_below_menu c-popover--fade" aria-modal="true"></div>`)
                        .append(label)
                );
                label.css('left', offset.left - label.width() / 2 + 20)
                    .css('top', offset.top - label.height())
                    .fadeIn(200);
            }, () => {
                $(`#${this.label}-tooltip`).remove();
            });
    }

    mount() {
        const target = document.querySelector('div.client_main_container');
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const menu = $(mutation.target).find('div.c-message_actions__container').not(`.${this.label}`).addClass(`${this.label}`);
                if (!menu) {
                    return;
                }
                menu.prepend(this.button);
                let message = menu.closest('.c-virtual_list__item');
                while(true) {
                    let userId = message.find('.c-message__gutter a.c-avatar').attr('href');
                    if (userId) {
                        this.userId = userId.split('/')[2];
                        break;
                    }
                    message = message.prev();
                    if (message.length == 0) {
                        break;
                    }
                }
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
