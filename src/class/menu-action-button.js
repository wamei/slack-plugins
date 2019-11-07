import Message from './message.js';

export default class MenuActionButton {
    constructor(callback, template, tooltip) {
        this.callback = callback;
        this.template = template;
        this.tooltip = tooltip;
    }

    isAvailable(message) {
        return true;
    }

    createElement(input, message) {
        const $wrap = document.createElement('div');
        $wrap.innerHTML = this.template;
        const $element = $wrap.firstElementChild;

        $wrap.innerHTML = this.tooltip;
        $wrap.style.position = 'relative';
        const $tooltip = $wrap.firstElementChild;
        $tooltip.style.position = 'absolute';
        $tooltip.style.display = 'none';
        $element.appendChild($wrap);
        $element.addEventListener('click', () => {
            this.callback(input, message);
        });
        $element.addEventListener('mouseover', () => {
            $tooltip.style.display = 'block';
            const elementRect = $element.getClientRects()[0];
            const tooltipRect = $tooltip.getClientRects()[0];
            $tooltip.style.top = `${-elementRect.height-tooltipRect.height}px`;
            $tooltip.style.left = `${elementRect.width-(tooltipRect.width/2)}px`;
        });
        $element.addEventListener('mouseleave', () => {
            $tooltip.style.display = 'none';
        });
        return $element;
    }
}
