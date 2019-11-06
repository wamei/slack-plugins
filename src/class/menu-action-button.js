import Message from './message.js';

export default class MenuActionButton {
    constructor(template, callback) {
        this.template = template;
        this.callback = callback;
    }

    isAvailable(message) {
        return true;
    }

    createElement(input, message) {
        const $wrap = document.createElement('p');
        $wrap.innerHTML = this.template;
        const $element = $wrap.firstElementChild;
        $element.addEventListener('click', () => {
            this.callback(input, message);
        });
        return $element;
    }
}
