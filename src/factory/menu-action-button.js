import MenuActionButton from '../class/menu-action-button.js';

export default class MenuActionButtonFactory {
    static create(label, icon, callback, style) {
        if (!style) {
            style = '';
        }
        return new MenuActionButton(`<button class="c-button-unstyled c-message_actions__button" type="button" aria-label="${label}"><i class="c-icon c-icon--${icon}" type="${icon}" aria-hidden="true" style="${style}"></i></button>`, callback);
    }
}
