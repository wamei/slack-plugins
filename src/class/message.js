export default class Message {
    constructor(userId, messageUri, wholeMessage, selectorInput) {
        this.userId = userId;
        this.messageUri = messageUri;
        this.wholeMessage = wholeMessage;
        this.selectorInput = selectorInput;
        this.selectedMessage = '';
    }
}
