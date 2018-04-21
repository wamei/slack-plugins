import Style from './style.js';

export default class MessageFontSizeStyle extends Style {
    constructor() {
        super();
        this.storageKey = 'wsp-font-size';
        this.defaultSize = 14;
        this.minSize = 8;
        this.fontSize = localStorage.getItem(this.storageKey) - 0 || this.defaultSize;
        this.set();
    }

    increase() {
        this.fontSize++;
        this.set();
        this.save();
    }

    decrease() {
        this.fontSize--;
        if (this.fontSize < this.minSize) {
            this.fontSize = this.minSize;
        }
        this.set();
        this.save();
    }

    reset() {
        this.fontSize = this.defaultSize;
        this.set();
        this.save();
    }

    set() {
        this.style(`[lang="ja-JP"] .c-message { font-size: ${this.fontSize}px; } pre.c-mrkdwn__pre { font-size: ${this.fontSize}px; line-height: 1; }`);
    }

    save() {
        localStorage.setItem(this.storageKey, this.fontSize);
    }
}
