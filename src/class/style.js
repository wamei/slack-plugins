export default class Style {
    constructor() {
        this.$element = $('<style>');
        this.$css = $('<p>');
        this.add();
    }

    css(name, value) {
        this.$css.css(name, value);
        this.$element.html(this.$css.attr('style'));
        return this;
    }

    style(string) {
        this.$css.attr('style', string);
        this.$element.html(this.$css.attr('style'));
        return this;
    }

    add() {
        this.$element.appendTo($('body'));
    }

    remove() {
        this.$element.remove();
    }
}
