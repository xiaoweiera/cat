import request from 'axios'
import wxSdk  from 'weixin-js-sdk'
const getShareConfig = (url) => {
    return request.post('/v6/wechat/share-config', { url }, { baseURL: 'https://api.jinse.com' })
}
const wxShare = (title, des) => {
    getShareConfig(encodeURIComponent(location.href.split("#")[0])).then(
        (res) => {
            wxSdk.config({
                debug: false, // process.env.NODE_ENV === 'development',
                appId: res.data.app_id,
                timestamp: parseInt(res.data.timestamp),
                nonceStr: res.data.nonce_str,
                signature: res.data.signature,
                jsApiList: [
                    'showMenuItems',
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'

                ],
            });

            wxSdk.ready(() => {
                const imgDefault = "https://res.ikingdata.com/nav/kingdata.png";
                // 通用分享给好友、qq
                wxSdk.onMenuShareAppMessage({
                    title:title,
                    desc: des,
                    link: window.location.href,
                    imgUrl: imgDefault,
                    success: function () {
                        // 设置成功
                    },
                });
                // 分享到朋友圈、qq 空间
                wxSdk.onMenuShareTimeline({
                    title:title,
                    desc: des,
                    link: window.location.href,
                    imgUrl: imgDefault,
                    success: function () {
                        // 设置成功
                    },
                });
                // 分享到朋友圈、qq 空间
                wxSdk.onMenuShareQQ({
                    title:title,
                    desc: des,
                    link: window.location.href,
                    imgUrl: imgDefault,
                    success: function () {
                        // 设置成功
                    },
                });
            });
        }
    );
}

export {
    wxShare,
}
