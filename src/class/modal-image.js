export default class MenuActionButton {
    constructor(url, user) {
        this.url = url;
        this.user = user;

        this.initElement();
    }

    initElement() {
        this.$element = $(`
<div id="fs_modal" role="dialog" tabindex="-1" class="fs_modal_file_viewer active" aria-labelledby="fs_modal_header" style="transition: 200ms;">
  <div class="contents_container fs_modal_file_viewer_content">
    <div class="contents">
      <header class="fs_modal_file_viewer_header external">

        <div class="file_header_detailed" style="margin-left: 5px;">
          <span class=" member_preview_link member_image thumb_48" data-member-id="${this.user.id}" data-thumb-size="48" style="background-image: url('${this.user.profile.image_48}')" aria-hidden="true">  </span>
          <h2 class="title no_jumbomoji"></h2>
          <p class="file_meta">
            <a href="/team/${this.user.id}" target="/team/${this.user.id}" class="message_sender color_U9S39304X color_684b6c member member_preview_link " data-member-id="${this.user.id}">${this.user._real_name_normalized_lc}</a>
            <span class="bullet" aria-hidden="true"></span>
          </p>
        </div>

        <div class="controls">
          <a href="${this.url}" rel="noreferrer" target="_blank" class="open_btn control_btn btn_icon btn ts_icon ts_icon_external_link ts_tip ts_tip_bottom">
            <span class="ts_tip_tip">オリジナルを開く</span>
          </a>
          <button id="fs_modal_close_btn" class="close_btn control_btn btn_icon btn ts_icon ts_icon_times ts_tip ts_tip_bottom ts_tip_right">
            <div class="ts_tip_tip">閉じる
              <div class="muted_tooltip_info">(esc)</div>
            </div>
          </button>
        </div>
      </header>

      <div class="viewer" id="fs_modal_image_viewer">
        <div class="images">
          <figure class="scaled">
            <img src="${this.url}" alt="" class="scaled_image no_zoom">
          </figure>
          <figure class="actual_pixel">
            <div class="actual_pixel_center">
              <img src="${this.url}" alt="" class="actual_pixel_image">
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</div>`)
            .keydown((e) => {
                event.preventDefault();
                event.stopPropagation();
                if (e.keyCode === 27) this.$element.remove();
                return false;
            });
        this.$element.find('#fs_modal_close_btn, #fs_modal_image_viewer').click(() => {
            this.$element.remove();
        });
    }
}
