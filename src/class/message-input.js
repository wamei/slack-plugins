export default class MessageInput {
    constructor() {
        this.$input = $("#msg_input > .ql-editor");
    }

    focus() {
        const input = this.$input.get(0);
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStartAfter(input.lastChild);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        input.focus();
    }

    normalizeNewline(text) {
        return '<p>' + text.replace(/\n/g, '</p><p>') + '</p>';
    }

    quoteText(text) {
        return "> " + text.replace(/\n/g, "\n> ").replace(/<.+?>/g, "");
    }

    isEmpty() {
        return this.$input.is('.ql-blank');
    }

    clear() {
        this.$input.empty();
    }

    appendText(text) {
        this.$input.append(this.normalizeNewline(text));
    }

    appendQuotedText(text) {
        this.$input.append(this.normalizeNewline(this.quoteText(text)));
    }
}
