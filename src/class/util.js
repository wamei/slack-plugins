class Util {
    getUserIdFromMessage(message) {
        message = message.closest('.c-virtual_list__item');
        while(true) {
            let userId = message.find('.c-message__gutter a.c-avatar').attr('href');
            if (userId) {
                return userId.split('/')[2];
            }
            message = message.prev();
            if (message.length == 0) {
                return null;
            }
        }
    }

    executeOnLoad(target, callback) {
        const checker = () => {
            if (!eval(target)) {
                setTimeout(checker, 1);
            }
            callback();
        };
        checker();
    };
}
const util = new Util();
export default util;
