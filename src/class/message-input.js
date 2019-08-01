export default class MessageInput {
    constructor(target) {
        this.target = target;
    }

    get inputElement() {
        return document.querySelector(this.target).querySelector('.ql-editor');
    }

    focus() {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStartAfter(this.inputElement.lastChild);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.inputElement.focus();
    }

    normalize(text) {
        return text.replace(/(<\/blockquote>)/g, '$1\n').replace(/<br>/g, '\n');
    }

    convertNewline(text) {
        return '<p>' + text.replace(/\n/g, '</p><p>') + '</p>';
    }

    quoteText(text) {
        return (">" + text.replace(/\n/g, "\n>").replace(/<.+?>/g, "")).replace(/>http/g, '> http');
    }

    isEmpty() {
        return this.inputElement.classList.contains('ql-blank');
    }

    clear() {
        this.inputElement.innerHTML = '';
    }

    appendText(text) {
        this.inputElement.innerHTML += this.convertNewline(this.normalize(text));
    }

    appendQuotedText(text) {
        this.inputElement.innerHTML += this.convertNewline(this.quoteText(this.normalize(text)));
    }
}
