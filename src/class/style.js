export default class Style {
    constructor() {
        this.element = document.createElement('style');
        this.css = document.createElement('p');
        this.add();
    }

    css(name, value) {
        this.css.style.setProperty(name, value);
        this.element.innerHTML = this.css.getAttribute('style');
        return this;
    }

    style(string) {
        this.css.setAttribute('style', string);
        this.element.innerHTML = this.css.getAttribute('style');
        return this;
    }

    add() {
        document.body.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}
