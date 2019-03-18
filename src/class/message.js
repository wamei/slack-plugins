export default class Message {
    constructor(userId, messageUri, wholeMessage, relatedInput) {
        this.userId = userId;
        this.messageUri = messageUri;
        this.wholeMessage = wholeMessage;
        this.relatedInput = relatedInput;
        this.selectedMessage = '';
    }
}
