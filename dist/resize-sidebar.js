!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}({0:function(module,__webpack_exports__,__webpack_require__){"use strict";const PREFIX="wamei:";class Util{getUserIdFromMessage(e){for(e=e.closest(".c-virtual_list__item");;){let t=e.find(".c-message__gutter a.c-avatar").attr("href");if(t)return t.split("/")[2];if(0==(e=e.prev()).length)return null}}getMessageUriFromMessage(e){return e.closest(".c-virtual_list__item").find("a.c-timestamp").attr("href")}executeOnLoad(target,callback){const checker=()=>{let loaded=eval(target);return loaded?callback(loaded):setTimeout(checker,1)};checker()}get settings(){return{set(e,t){try{localStorage.setItem(PREFIX+e,JSON.stringify(t))}catch(e){}},get(e){try{const t=localStorage.getItem(PREFIX+e);return null==t?null:JSON.parse(t)}catch(e){return null}}}}}const util=new Util;__webpack_exports__.a=util},7:function(e,t,r){"use strict";r.r(t);var n=r(0);!function(){const e=e=>e?(e>500&&(e=500),$(".client_channels_list_container").css("flex-basis",`${e}px`),$(".p-channel_sidebar").css("width",`${e}px`),$("#col_channels").css("width",`${e}px`),$("#loading-zone").css("left",`${e}px`),e):e,t="sidebar-width",r=n.a.settings.get(t);e(r),n.a.executeOnLoad("$('.p-channel_sidebar__section_heading').length > 0",()=>{e(r);const s=$('<div class="wamei-sidebar-resizer" style="position:absolute;right:-3px;top:0;height:100%;width:3px;cursor:col-resize;z-index:1000;" draggable="true"></div>').on("drag",t=>{e(t.clientX)}).on("dragend",r=>{let s=r.clientX;s=e(s),n.a.settings.set(t,s)});$(".client_channels_list_container").css("max-width","500px").append(s)})}()}});