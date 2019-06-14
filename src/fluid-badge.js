import Util from './class/util.js';
import axios from 'axios';

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

var connect = async function() {
    const response = await axios.get(`https://${window.location.host}/api/rtm.connect`, {
        headers: {
            'content_type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${TS.model.api_token}`,
        },
    });
    var con = new WebSocket(response.data.url);
    con.onopen = function(event) {
        console.log(event);
    };
    con.onerror = function(error) {
        console.error(error);
    };
    con.onclose = function(event) {
        console.error(event);
        connect();
    };
    con.onmessage = function(event) {
        var new_mention_cnt = TS.model.all_unread_highlights_cnt;
        if (new_mention_cnt > mention_cnt) {
            window.fluid.requestUserAttention(true);
        }
        mention_cnt = new_mention_cnt;
    };
};

Util.executeOnLoad('TS.model.api_token', () => {
    connect();
});
