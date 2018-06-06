const PREFIX = 'wamei:';
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
            let loaded = eval(target);
            if (!loaded) {
                return setTimeout(checker, 1);
            }
            return callback(loaded);
        };
        checker();
    };

    get settings() {
        return {
            set(key, value) {
                try {
                    localStorage.setItem(PREFIX + key, JSON.stringify(value));
                } catch(e) {
                }
            },
            get(key) {
                try {
                    const item = localStorage.getItem(PREFIX + key);
                    if (item == null) {
                        return null;
                    }
                    return JSON.parse(item);
                } catch(e) {
                    return null;
                }
            }
        };
    }
}
const util = new Util();
export default util;
