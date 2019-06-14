import Util from './class/util.js';
import axios from 'axios';

(function() {
    'use strict';

    let channelUnreadCounts = {};
    let channelMentionCounts = {};
    let threadMentionCounts = {};
    const updateMentionCount = function(cid) {
        console.log(channelUnreadCounts);
        console.log(channelMentionCounts);
        console.log(threadMentionCounts);
        const channel = Util.getChannel(cid);
        const count = (threadMentionCounts[cid] || 0);
        channel.unread_cnt = channelUnreadCounts[cid] + count;
        channel.unread_highlight_cnt = channelMentionCounts[cid] + count;
    };
    const updateMentionCounts = function(before, after) {
        for(let cid in threadMentionCounts) {
            updateMentionCount(cid);
        }
        threadMentionCounts = after;
    };
    const connect = async function() {
        const response = await axios.get(`https://${window.location.host}/api/rtm.connect`, {
            headers: {
                'content_type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${TS.model.api_token}`,
            },
        });
        var con = new WebSocket(response.data.url);
        con.onopen = function(event) {
            console.info(event);
        };
        con.onerror = function(error) {
            console.error(error);
        };
        con.onclose = function(event) {
            console.info(event);
            connect();
        };
        con.onmessage = function(event) {
            if (!event.data) {
                return;
            }
            const data = JSON.parse(event.data);
            switch(data.type) {
            case 'update_thread_state':
                updateMentionCounts(threadMentionCounts, data.mention_count_by_channel);
                break;
                break;
            }
        };
    };

    Util.executeOnLoad('TS.model.threads_mention_counts', () => {
        updateMentionCounts({}, TS.model.threads_mention_counts);
        connect();
    });
})();

