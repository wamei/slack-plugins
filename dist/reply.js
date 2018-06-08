!function(e){var t={};function s(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=4)}([function(module,__webpack_exports__,__webpack_require__){"use strict";const PREFIX="wamei:";class Util{getUserIdFromMessage(e){for(e=e.closest(".c-virtual_list__item");;){let t=e.find(".c-message__gutter a.c-avatar").attr("href");if(t)return t.split("/")[2];if(0==(e=e.prev()).length)return null}}getMessageUriFromMessage(e){return e.closest(".c-virtual_list__item").find("a.c-timestamp").attr("href")}executeOnLoad(target,callback){const checker=()=>{let loaded=eval(target);return loaded?callback(loaded):setTimeout(checker,1)};checker()}get settings(){return{set(e,t){try{localStorage.setItem(PREFIX+e,JSON.stringify(t))}catch(e){}},get(e){try{const t=localStorage.getItem(PREFIX+e);return null==t?null:JSON.parse(t)}catch(e){return null}}}}}const util=new Util;__webpack_exports__.a=util},function(e,t,s){"use strict";s.d(t,"a",function(){return a});class a{constructor(e){this.selector=e}get $input(){return $(this.selector).find(".ql-editor")}focus(){const e=this.$input.get(0),t=document.createRange(),s=window.getSelection();t.setStartAfter(e.lastChild),t.collapse(!0),s.removeAllRanges(),s.addRange(t),e.focus()}normalize(e){return e.replace(/(<\/blockquote>)/g,"$1\n").replace(/<br>/g,"\n")}convertNewline(e){return"<p>"+e.replace(/\n/g,"</p><p>")+"</p>"}quoteText(e){return(">"+e.replace(/\n/g,"\n>").replace(/<.+?>/g,"")).replace(/>http/g,"> http")}isEmpty(){return this.$input.is(".ql-blank")}clear(){this.$input.empty()}appendText(e){this.$input.append(this.convertNewline(this.normalize(e)))}appendQuotedText(e){this.$input.append(this.convertNewline(this.quoteText(this.normalize(e))))}}},,,function(e,t,s){"use strict";s.r(t);var a=s(0);var n=new class{constructor(){this.classAdded="wamei-added",this.buttons=[],this.mount()}append(e){return this.buttons.unshift(e),e.$element.on("mousedown",()=>{e.selectedMessage=window.getSelection().toString()||""}),this}mount(){const e=document.querySelector("div#messages_container");return this.observer=new MutationObserver(e=>{e.forEach(e=>{$(e.target).find("div.c-message_actions__container").not(`.${this.classAdded}`).addClass(this.classAdded).each((e,t)=>{const s=$(t),n=s.closest(".c-virtual_list__item"),i=n.find(".c-message__body").html()||"";let l="";n.find(".c-message__attachments").not(":has(.c-message_attachment__delete)").find(".c-message_attachment__body .c-message_attachment__row").each((e,t)=>{l+=`\n> ${$(t).html()}`;const s=$(t).find("a.c-message_attachment__title_link");s.length>0&&(l+=`\n> ${s.attr("href")}`)});const o=a.a.getMessageUriFromMessage(n),r=a.a.getUserIdFromMessage(n);this.buttons.forEach(e=>{e.wholeMessage=i+l,e.userId=r,e.messageUri=o,e.isAvailable()&&s.prepend(e.$element)})})})}),this.observer.observe(e,{childList:!0,subtree:!0}),this}unmount(){return this.observer.disconnect(),this}},i=s(1);class l{constructor(e,t,s){this.selectorMessage=".c-virtual_list__item",this.label=e,this.iconClass=t,this.callback=s,this.userId=null,this.messageUri=null,this.selectedMessage=null,this.wholeMessage=null,this.initElement()}initElement(){this.$element=$(`<button class="c-button-unstyled c-message_actions__button ${this.label}" type="button" aria-haspopup="true" aria-label="${this.label}"><i class="c-icon ${this.iconClass}" aria-hidden="true"></i></button>`).click(this.callback.bind(this)).hover(()=>{const e=this.$element.offset(),t=$(`<div class="ReactModal__Content ReactModal__Content--after-open popover" tabindex="-1" aria-label="popover" style="position: absolute; left: ${e.left}px; top: ${e.top}px; outline: none; z-index:100000;"><div><div class="c-tooltip__tip c-tooltip__tip--top" data-qa="tooltip-tip">${this.label}<div class="c-tooltip__tip__arrow"></div></div></div></div>`).hide();$(document.body).append($(`<div class="ReactModalPortal" id="${this.label}-tooltip"></div>`).append('<div class="ReactModal__Overlay ReactModal__Overlay--after-open c-popover c-popover--no-pointer c-popover--z_below_menu c-popover--fade" aria-modal="true"></div>').append(t)),t.css("left",e.left-t.width()/2+20).css("top",e.top-t.height()).fadeIn(200)},()=>{$(`#${this.label}-tooltip`).remove()})}isAvailable(){return!0}get $message(){return this.$element.closest(this.selectorMessage)}}!function(){const e=new i.a("#msg_input"),t=new l("メッセージを引用する","ts_icon_quote",function(){e.isEmpty()&&e.clear();const t=this.userId;if(null!=t){const s=TS.model.members.filter(e=>e.id==t)[0],a=s._display_name_normalized_lc||s._real_name_normalized_lc;e.appendQuotedText(`*${a}*`)}""!=this.selectedMessage?e.appendQuotedText(`${this.selectedMessage}`):e.appendQuotedText(`${this.wholeMessage}`),e.appendText(""),e.focus()}),s=new l("メッセージに返信する",'c-icon--share-action" style="transform: scale(-1, 1);"',function(){const t=this.userId,s=this.messageUri,a=TS.model.members.filter(e=>e.id==t)[0],n=a._display_name_normalized_lc||a._real_name_normalized_lc;e.isEmpty()&&e.clear(),e.appendText(`&lt;${location.origin}${s}|Re:&gt;<span data-id="${t}" data-label="@${n}" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty">@${n}</span>`),""!=this.selectedMessage&&e.appendQuotedText(`${this.selectedMessage}`),e.appendText(""),e.focus()});s.isAvailable=function(){return!(!s.userId||0==s.userId.indexOf("B"))},n.append(s),n.append(t);const o=document.querySelector("div#messages_container");new MutationObserver(e=>{e.forEach(e=>{$(e.target).find("div.c-message blockquote b:not(.wamei-quote-icon-treated)").each((e,t)=>{const s=$(t),a=s.text(),n=TS.model.members.filter(e=>e._display_name_normalized_lc==a||e._real_name_normalized_lc==a);s.addClass("wamei-quote-icon-treated"),0!=n.length&&s.html(`<img class="c-message_attachment__author_icon" alt="${n[0].real_name}" src="${n[0].profile.image_24}" width="16" height="16">${n[0].real_name}`)})})}).observe(o,{childList:!0,subtree:!0}),a.a.executeOnLoad("TS.client.ui.sendMessage",()=>{const e=TS.client.ui.sendMessage;TS.client.ui.sendMessage=function(t,s){if(s.match(/(<.*\/archives\/.+\|Re:>)<@.+\|(@.+)>([\s\S]*)/))return TS.chat_history.add(s),void TS.api.call("chat.postMessage",{channel:t.id,link_names:!0,unfurl_links:!1,text:s.replace(/(<.*\/archives\/.+\|Re:>)<@.+\|(@.+)>/gm,"$1$2")},(e,t)=>{console.log(t)});e.apply(this,arguments)}})}()}]);