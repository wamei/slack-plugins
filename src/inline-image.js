import ModalImage from './class/modal-image.js';
import Util from './class/util.js';

(function() {
    'use strict';

    const expandImage = ($target) => {
        $target.find('a:contains(.png), a:contains(.jpg), a:contains(.jpeg), a:contains(.gif), a:contains(.bmp)')
            .not('.c-message_attachment__image')
            .not('.c-message__file_link').each((i, elm) => {
                const $this = $(elm);
                if ($this.next('span.c-message_attachment_inline').length > 0) {
                    return;
                }
                const href = $this.attr('href');
                const url = decodeURIComponent(href.replace(/^https:\/\/slack-redir.net\/link\?url=/, ''));
                if ($this.parents('.c-message_attachment').find(`.c-message_attachment__image[href="${href}"], .c-message_attachment__image[href="${url}"]`).length > 0) {
                    return;
                }
                const userId = Util.getUserIdFromMessage($this);
                $this.after(
                    $(`
<span class="c-message_attachment_inline">
  <div data-expanded="true" data-qa-expandable-container-is-expanded="true">
    <a role="link" tabindex="0" target="_blank" class="c-message_attachment__image" href="${url}" rel="noopener noreferrer" style="text-indent: 0;"><img src="${url}" style="max-width: 360px; max-height:210px;"></a>
  </div>
</span>`)
                        .click((e) => {
                            event.preventDefault();
                            event.stopPropagation();
                            const modal = new ModalImage(url, TS.model.members.find((user) => { return user.id == userId; }));
                            $('body').append(modal.$element);
                            modal.$element.get(0).focus();
                            return false;
                        })
                );
            });
    };

    const mainTarget = document.querySelector('div#messages_container');
    const mainObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            expandImage($(mutation.target).find('div.c-message'));
        });
    });
    const threadTarget = document.querySelector('div#convo_scroller');
    const threadObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            expandImage($(mutation.target).find('ts-message'));
        });
    });
    const config = {
        childList: true,
        subtree: true,
    };
    mainObserver.observe(mainTarget, config);
    threadObserver.observe(threadTarget, config);
})();
