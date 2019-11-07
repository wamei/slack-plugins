import MenuActionButton from '../class/menu-action-button.js';

export default class MenuActionButtonFactory {
    static create(label, icon, callback, style) {
        if (!style) {
            style = '';
        }
        return new MenuActionButton(
            callback,
            `<button class="c-button-unstyled c-message_actions__button"type="button" aria-label="${label}"><i class="c-icon c-icon--${icon}" type="${icon}" aria-hidden="true" style="${style}"></i></button>
`,
            `<div tabindex="-1" role="presentation" class="c-popover--fade" style="outline: none; transition-duration: 80ms; animation-duration: 80ms; width: 200px; z-index: 999999;"><div role="presentation"><div id="slack-kit-tooltip" role="tooltip" class="c-tooltip__tip c-tooltip__tip--top" data-qa="tooltip-tip">${label}<div class="c-tooltip__tip__arrow"></div></div></div></div>`
        );
    }
}
