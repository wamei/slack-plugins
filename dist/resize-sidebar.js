!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}({0:function(module,__webpack_exports__,__webpack_require__){"use strict";const PREFIX="wamei:";class Util{getUserIdFromMessage(e){for(e=e.closest(".c-virtual_list__item, ts-message");;){let t=e.find(".c-message__gutter a.c-avatar, a.message_sender").attr("href");if(t)return t.split("/")[2];if(0==(e=e.prev()).length)return null}}getMessageUriFromMessage(e){return e.closest(".c-virtual_list__item, ts-message").find("a.c-timestamp, a.timestamp").attr("href")}getTSfromUri(e){let t=e.match(/\/archives\/.+\/p(\d+)(\?thread_ts=(\d+\.\d+))?.*/);if(t[3])return t[3];if(t[1]){let e=t[1];return`${e.slice(0,e.length-6)}.${e.slice(-6)}`}return null}getUserByUserId(e){let t,r=(t=0==e.indexOf("B")?TS.model.bots:TS.model.members).filter(t=>t.id==e);return 0==r.length?null:((r=r[0]).is_bot=!(!1===r.is_bot),r.display_name=r._display_name_normalized_lc||r._real_name_normalized_lc||r.name,r.avatar_icon=r.is_bot?r.icons.image_36:r.profile.image_24,r)}getUserByName(e){let t;return 0==(t=TS.model.members.filter(t=>t._display_name_normalized_lc==e||t._real_name_normalized_lc==e)).length&&(t=TS.model.bots.filter(t=>t.name==e)),0==t.length?null:((t=t[0]).is_bot=!(!1===t.is_bot),t.display_name=t._display_name_normalized_lc||t._real_name_normalized_lc||t.name,t.avatar_icon=t.is_bot?t.icons.image_36:t.profile.image_24,t)}executeOnLoad(target,callback){const checker=()=>{let loaded=eval(target);return loaded?callback(loaded):setTimeout(checker,1)};checker()}get settings(){return{set(e,t){try{localStorage.setItem(PREFIX+e,JSON.stringify(t))}catch(e){}},get(e){try{const t=localStorage.getItem(PREFIX+e);return null==t?null:JSON.parse(t)}catch(e){return null}}}}}const util=new Util;__webpack_exports__.a=util},7:function(e,t,r){"use strict";r.r(t);var n=r(0);!function(){const e=e=>e?(e>500&&(e=500),$(".client_channels_list_container").css("flex-basis",`${e}px`),$(".p-channel_sidebar").css("width",`${e}px`),$("#col_channels").css("width",`${e}px`),$("#loading-zone").css("left",`${e}px`),e):e,t="sidebar-width",r=n.a.settings.get(t);e(r),n.a.executeOnLoad("$('.p-channel_sidebar__section_heading').length > 0",()=>{e(r);const a=$('<div class="wamei-sidebar-resizer" style="position:absolute;right:-3px;top:0;height:100%;width:3px;cursor:col-resize;z-index:1000;" draggable="true"></div>').on("drag",t=>{e(t.clientX)}).on("dragend",r=>{let a=r.clientX;a=e(a),n.a.settings.set(t,a)});$(".client_channels_list_container").css("max-width","500px").append(a)})}()}});