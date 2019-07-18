import Util from './class/util.js';

(function() {
    'use strict';

    Util.executeOnLoad(() => {
        return window.WebSocket && window.WebSocket.prototype.send;
    }, () => {
        const _send = window.WebSocket.prototype.send;
        window.WebSocket.prototype.send = function(data) {
            let params = JSON.parse(data);
            if (params && params.type && params.type == 'typing') {
                return;
            }
            _send.call(this, data);
        };
    });
})();

