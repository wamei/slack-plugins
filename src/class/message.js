export default class Message {
    constructor(user, uri, text) {
        this.user = user;
        this.uri = uri;
        this.text = text;
        this.selected = '';
    }
}
