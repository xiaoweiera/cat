// @ts-ignore
import wxSdk from 'wechat-jssdk'
import request from 'axios'

const getShareConfig = (url: String) => {
    return request.post('/v6/wechat/share-config', {url}, {baseURL: 'https://api.jinse.com'})
}
const imgDefault = "https://res.ikingdata.com/nav/kingdata.png";
const wxShare = (title: String, des: String): void => {
    const shareBody = {type: 'link', title: title, link: location.href, imgUrl: imgDefault, desc: des}
    getShareConfig(encodeURIComponent(location.href.split("#")[0])).then(
        (res) => {
            const config = {
                appId: res.data.app_id,
                nonceStr: res.data.nonce_str,
                signature: res.data.signature,
                timestamp: parseInt(res.data.timestamp),
                // debug: true,
                // jsApiList: [],
                // customUrl:''
            };
            const wechatObj = new wxSdk(config)
            wechatObj.initialize()
                .then((w: any) => {
                    w.shareOnChat(shareBody)
                    w.shareOnMoment(shareBody)
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }
    );
}

export {
    wxShare,
}
