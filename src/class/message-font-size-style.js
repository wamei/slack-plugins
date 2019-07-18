import Util from './util.js';
import Style from './style.js';

const KEY = 'font-size';

export default class MessageFontSizeStyle extends Style {
    constructor() {
        super();
        this.defaultSize = 14;
        this.minSize = 8;
        this.fontSize = Util.settings.set(KEY) - 0 || this.defaultSize;
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
        Util.settings.set(KEY, this.fontSize);
    }
}
