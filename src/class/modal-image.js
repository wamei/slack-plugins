export default class ModalImage {
    constructor(url, user) {
        this.url = url;
        this.user = user;
    }

    mount(target) {
        const element = document.createElement('div');
        element.innerHTML = `
<div class="ReactModalPortal">
   <div class="ReactModal__Overlay ReactModal__Overlay--after-open c-fullscreen_modal p-file_viewer__modal_overlay">
      <div class="c-fullscreen_modal__content c-fullscreen_modal__content--before-open c-fullscreen_modal__content--after-open" tabindex="-1" role="dialog" aria-label="${this.url}">
         <div class="c-fullscreen_modal__body p-file_viewer__body c-fullscreen_modal__body--full_bleed">
            <div class="c-fullscreen_modal__body__content c-fullscreen_modal__body__content--full_bleed">
               <div class="p-file_viewer">
                  <div class="p-file_viewer__header">
                     <div class="p-file_viewer__header__meta">
                        <span class="p-file_viewer__header__meta__avatar c-avatar" style="height: 36px; line-height: 36px; width: 36px;"><img class="c-avatar__image" src="${this.user.image}" alt=""></span>
                        <div class="p-file_viewer__header__meta__stack">
                           <div class="p-file_viewer__header__meta__title" data-qa="file_viewer_header_title">${this.url}</div>
                           <div class="p-file_viewer__header__meta__minor"><span class="p-file_viewer__header__meta__name">${this.user.name}</span></div>
                        </div>
                     </div>
                     <div class="p-file_viewer__header__actions">
                        <div class="p-file_viewer__header__separator"></div>
                        <button class="close c-button-unstyled c-icon_button c-icon_button--null p-file_viewer__header__button" type="button"><i class="c-icon c-icon--times" type="times" aria-hidden="true"></i></button>
                     </div>
                  </div>
                  <div class="p-file_viewer__content">
                     <div class="p-image_viewer">
                        <img class="p-image_viewer__image" src="${this.url}">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>`;
        target.appendChild(element);
        element.addEventListener('keydown', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.keyCode === 27) element.remove();
            return false;
        });
        element.querySelectorAll('.close, .p-image_viewer').forEach((el) => {
            el.addEventListener('click', () => {
                element.remove();
            });
        });
        element.focus();
    }
}
