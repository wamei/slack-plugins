import User from './user.js';

const PREFIX = 'wamei:';
class Util {
    getUserId() {
        var data =JSON.parse(localStorage.getItem('localConfig_v2'));
        return data.teams[data.lastActiveTeamId].user_id;
    }

    onElementInserted(selector, callback) {
        if (!this.elementInsertedSelector) {
            this.elementInsertedSelector = {};
            let style = document.createElement('style');
            style.innerHTML = `@-webkit-keyframes elementInserted { 0% {opacity: 0;} 100% {opacity: 1;} }`;
            document.querySelector('head').appendChild(style);
        }
        if (!this.elementInsertedSelector[selector]) {
            this.elementInsertedSelector[selector] = [];
            let style = document.createElement('style');
            style.innerHTML = `${selector} { -webkit-animation: elementInserted 0.001s 1; }`;
            document.querySelector('head').appendChild(style);
            document.addEventListener('webkitAnimationStart', (event) => {
                if (event.animationName == 'elementInserted') {
                    this.elementInsertedSelector[selector].forEach((callback) => {
                        callback(event.target);
                    });
                }
            });
        }
        this.elementInsertedSelector[selector].push(callback);
    }

    executeOnLoad(target, callback) {
        const checker = () => {
            let loaded = target();
            if (!loaded) {
                return setTimeout(checker, 1);
            }
            return callback(loaded);
        };
        checker();
    };

    getUserFromMessageElement(message) {
        message = message.closest('.c-virtual_list__item, ts-message');
        while(true) {
            let userLink = message.querySelector('a[data-message-sender^="U"]');
            if (userLink) {
                const id = userLink.dataset.messageSender;
                const name = userLink.innerText;
                const image = message.querySelector('img.c-avatar__image').src;
                return new User(id, name, image);
            }
            message = message.previousElementSibling;
            if (message) {
                return new User(null, null, null);
            }
        }
    }

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

    //------------------------------------------------------------------

    getUserIdFromMessage(message) {
        message = message.closest('.c-virtual_list__item, ts-message');
        while(true) {
            let userId = message.find('.c-message__gutter a.c-avatar, a.c-message_kit__avatar, a.member_image').attr('href');
            if (userId) {
                return userId.split('/')[2];
            }
            message = message.prev();
            if (message.length == 0) {
                return null;
            }
        }
    }
    getMessageUriFromMessage(message) {
        return message.closest('.c-virtual_list__item, ts-message').find('a.c-timestamp, a.timestamp').attr('href');
    }

    createMessageLink(url, userId, userName) {
        return `&lt;${url}|Re:&gt; <span data-id="${userId}" data-label="@${userName}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty">@${userName}</span>`;
    }

    getTSfromUri(uri) {
        let ts_candidate = uri.match(/\/archives\/.+\/p(\d+)(\?thread_ts=(\d+\.\d+))?.*/);
        if (ts_candidate[3]) {
            return ts_candidate[3];
        } else if (ts_candidate[1]) {
            let ts = ts_candidate[1];
            return `${ts.slice(0, ts.length - 6)}.${ts.slice(-6)}`;
        }
        return null;
    }

    getUserByUserId(userId) {
        let users;
        if (userId.indexOf('B') == 0) {
            users = TS.model.bots;
        } else {
            users = TS.model.members;
        }
        let user = users.filter((user) => user.id == userId);
        if (user.length == 0) {
            return null;
        }
        user = user[0];
        user.is_bot = !(user.is_bot === false);
        user.display_name = user._display_name_normalized_lc || user._real_name_normalized_lc || user.name;
        user.avatar_icon = user.is_bot ? user.icons.image_36 : user.profile.image_24;
        return user;
    }

    getUserByName(name) {
        let user;
        user = TS.model.members.filter((user) => {
            return user._display_name_normalized_lc == name || user._real_name_normalized_lc == name;
        });
        if (user.length == 0) {
            user = TS.model.bots.filter((user) => {
                return user.name == name;
            });
        }
        if (user.length == 0) {
            return null;
        }
        user = user[0];
        user.is_bot = !(user.is_bot === false);
        user.display_name = user._display_name_normalized_lc || user._real_name_normalized_lc || user.name;
        user.avatar_icon = user.is_bot ? user.icons.image_36 : user.profile.image_24;
        return user;
    }

    delegate(element, event, selector, callback) {
        element.addEventListener(event, (e) => {
            const target = e.target.closest(selector);
            if (target) {
                callback(e, target);
            }
        });
    }
}
const util = new Util();
export default util;
