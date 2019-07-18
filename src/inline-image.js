import ModalImage from './class/modal-image.js';
import Util from './class/util.js';

(function() {
    'use strict';

    const expandImage = (target) => {
        target.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".bmp"]')
            .forEach((el) => {
                const url = decodeURIComponent(el.href.replace(/^https:\/\/slack-redir.net\/link\?url=/, ''));
                if (el.innerText != url) {
                    return;
                }
                if (el.classList.contains('c-message_attachment__image')) {
                    return;
                }
                if (el.classList.contains('c-message__file_link')) {
                    return;
                }
                if (el.nextElementSibling && el.nextElementSibling.classList.contains('c-message_attachment_inline')) {
                    return;
                }
                const user = Util.getUserFromMessageElement(el);
                const inlineImage = document.createElement('span');
                inlineImage.classList.add('c-message_attachment_inline');
                inlineImage.innerHTML = `
<div data-expanded="true" data-qa-expandable-container-is-expanded="true">
  <a role="link" tabindex="0" target="_blank" class="c-message_attachment__image" href="${url}" rel="noopener noreferrer" style="text-indent: 0;"><img src="${url}" style="max-width: 360px; max-height:210px;"></a>
</div>`;
                inlineImage.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    new ModalImage(url, user).mount(document.body);
                    return false;
                });
                el.parentElement.insertBefore(inlineImage, el.nextSibling);
            });
    };

    Util.onElementInserted('.c-message, .c-message_kit__message, ts-message', (target) => {
        expandImage(target);
    });
})();
