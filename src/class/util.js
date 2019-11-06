import User from './user.js';

const PREFIX = 'wamei:';

const user_cache_id = {};
const user_cache_name = {};

class Util {
    getUserId() {
        var data =JSON.parse(localStorage.getItem('localConfig_v2'));
        return data.teams[data.lastActiveTeamId].user_id;
    }

    onElementInserted(selector, callback) {
        if (!this.elementInsertedSelector) {
            this.elementInsertedSelector = {};
        }
        if (!this.elementInsertedSelector[selector]) {
            this.elementInsertedSelector[selector] = [];
            if (!window.elementInsertedSelectorCount) {
                window.elementInsertedSelectorCount = 0;
            }
            const count = ++window.elementInsertedSelectorCount;

            const style1 = document.createElement('style');
            style1.innerHTML = `@-webkit-keyframes elementInserted${count} { 0% {opacity: 0;} 100% {opacity: 1;} }`;
            document.querySelector('head').appendChild(style1);

            const style2 = document.createElement('style');
            style2.innerHTML = `${selector} { -webkit-animation: elementInserted${count} 0.001s 1; }`;
            document.querySelector('head').appendChild(style2);

            document.addEventListener('webkitAnimationStart', (event) => {
                if (event.animationName == `elementInserted${count}`) {
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

    getUserFromUserId(userId) {
        return user_cache_id[userId];
    }

    getUserFromName(name) {
        return this.getUserFromUserId(user_cache_name[name]);
    }

    getUserFromMessageElement($message) {
        $message = $message.closest('.c-virtual_list__item');
        while(true) {
            let userLink = $message.querySelector('a[data-message-sender^="U"]');
            if (userLink) {
                const id = userLink.dataset.messageSender;
                const name = userLink.innerText;
                const image = $message.querySelector('img.c-avatar__image').src;
                const user = new User(id, name, image);
                user_cache_id[id] = user;
                user_cache_name[name] = id;
                return user;
            }
            $message = $message.previousElementSibling;
            if (!$message) {
                return new User(null, null, null);
            }
        }
    }

    delegate($element, event, selector, callback) {
        $element.addEventListener(event, (e) => {
            const target = e.target.closest(selector);
            if (target) {
                callback(e, target);
            }
        });
    }

    createMessageLink(url, userId, userName) {
        return `&lt;${url}|Re:&gt; <span data-id="${userId}" data-label="@${userName}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty">@${userName}</span>`;
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
}
export default new Util();
