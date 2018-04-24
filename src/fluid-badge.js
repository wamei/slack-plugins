var updateBadge = function() {
    var unread = TS.model.all_unread_cnt;
    if (unread > 0) {
        window.fluid.dockBadge = unread;
    } else {
        window.fluid.dockBadge = '';
    }
};
setInterval(updateBadge, 1000);

var mention_cnt = TS.model.all_unread_highlights_cnt;

var connect = function() {
    TS.api.call('rtm.connect', {})
        .then(function(ret) {
            var con = new WebSocket(ret.data.url);
            con.onopen = function() {
                con.send('Ping');
            };
            con.onerror = function(error) {
                console.error(error);
                connect();
            };
            con.onmessage = function(ret) {
                var new_mention_cnt = TS.model.all_unread_highlights_cnt;
                if (new_mention_cnt > mention_cnt) {
                    window.fluid.requestUserAttention(true);
                }
                mention_cnt = new_mention_cnt;
            };
        }).catch(function (error) {
            console.error(error);
        });
};

(function(target, func) {
     if (!eval(target)) {
         this.call(this, target, func);
         return;
     }
     func();
 })('TS.api.call', connect);
