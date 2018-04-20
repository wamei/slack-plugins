export default class MenuActionButton {
    constructor(label, iconClass, callback) {
        this.selectorMessage = '.c-virtual_list__item';
        this.label = label;
        this.iconClass = iconClass;
        this.callback = callback;

        this.userId = null;
        this.selectedMessage = null;
        this.wholeMessage = null;

        this.initElement();
    }

    initElement() {
        this.$element = $(`<button class="c-button-unstyled c-message_actions__button ${this.label}" type="button" aria-haspopup="true" aria-label="${this.label}"><i class="c-icon ${this.iconClass}" aria-hidden="true"></i></button>`)
            .click(this.callback.bind(this))
            .hover(() => {
                const offset = this.$element.offset();
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

    isAvailable() {
        return true;
    }

    get $message() {
        return this.$element.closest(this.selectorMessage);
    }
}
