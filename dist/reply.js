!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i=new class{constructor(){this.wholeText="",this.selectedText="",this.userId=0,this.buttons=[],this.mount()}append(e){return this.buttons.unshift(e),e.$element.on("mousedown",()=>{this.selectedText=window.getSelection().toString()}),this}mount(){const e=document.querySelector("div.client_main_container");return this.observer=new MutationObserver(e=>{e.forEach(e=>{const t=$(e.target).find("div.c-message_actions__container").not(".wamei-added").addClass("wamei-added");if(!t)return;this.buttons.forEach(e=>{t.prepend(e.$element)});let n=t.closest(".c-virtual_list__item");const i=n.find(".c-message__body").html();for(i&&(this.wholeText=i);;){let e=n.find(".c-message__gutter a.c-avatar").attr("href");if(e){this.userId=e.split("/")[2];break}if(0==(n=n.prev()).length)break}})}),this.observer.observe(e,{childList:!0,subtree:!0}),this}unmount(){return this.observer.disconnect(),this}};var o=new class{get $input(){return $("#msg_input > .ql-editor")}focus(){const e=this.$input.get(0),t=document.createRange(),n=window.getSelection();t.setStartAfter(e.lastChild),t.collapse(!0),n.removeAllRanges(),n.addRange(t),e.focus()}normalizeNewline(e){return"<p>"+e.replace(/\n/g,"</p><p>")+"</p>"}quoteText(e){return"> "+e.replace(/\n/g,"\n> ").replace(/<.+?>/g,"")}isEmpty(){return this.$input.is(".ql-blank")}clear(){this.$input.empty()}appendText(e){this.$input.append(this.normalizeNewline(e))}appendQuotedText(e){this.$input.append(this.normalizeNewline(this.quoteText(e)))}};class s{constructor(e,t,n){this.label=e,this.iconClass=t,this.callback=n,this.initElement()}initElement(){this.$element=$(`<button class="c-button-unstyled c-message_actions__button ${this.label}" type="button" aria-haspopup="true" aria-label="${this.label}"><i class="c-icon ${this.iconClass}" aria-hidden="true"></i></button>`).click(this.callback).hover(()=>{const e=this.$element.offset(),t=$(`<div class="ReactModal__Content ReactModal__Content--after-open popover" tabindex="-1" aria-label="popover" style="position: absolute; left: ${e.left}px; top: ${e.top}px; outline: none; z-index:100000;"><div><div class="c-tooltip__tip c-tooltip__tip--top" data-qa="tooltip-tip">${this.label}<div class="c-tooltip__tip__arrow"></div></div></div></div>`).hide();$(document.body).append($(`<div class="ReactModalPortal" id="${this.label}-tooltip"></div>`).append('<div class="ReactModal__Overlay ReactModal__Overlay--after-open c-popover c-popover--no-pointer c-popover--z_below_menu c-popover--fade" aria-modal="true"></div>').append(t)),t.css("left",e.left-t.width()/2+20).css("top",e.top-t.height()).fadeIn(200)},()=>{$(`#${this.label}-tooltip`).remove()})}}!function(){const e=new s("メッセージを引用する","ts_icon_quote",()=>{o.isEmpty()&&o.clear(),""!=i.selectedText?o.appendQuotedText(`${i.selectedText}`):o.appendQuotedText(`${i.wholeText}`),o.appendText(""),o.focus()}),t=new s("メッセージに返信する",'c-icon--share-action" style="transform: scale(-1, 1);"',()=>{const e=i.userId,t=TS.model.members.filter(t=>t.id==e)[0],n=t._display_name_normalized_lc||t._real_name_normalized_lc;o.isEmpty()&&o.clear(),o.appendText(`<ts-mention data-id="${e}" data-label="@${n}" spellcheck="false" class="ts_tip_texty">@${n}</ts-mention> `),""!=i.selectedText&&(o.appendQuotedText(`${i.selectedText}`),o.appendText("")),o.focus()});i.append(t),i.append(e)}()}]);