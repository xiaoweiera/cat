// @ts-ignore
import WxSdk from 'wechat-jssdk'
import request from 'axios'

const getShareConfig = (url: String) => {
  // return request.post('/v6/wechat/share-config', { url }, { baseURL: 'https://api.jinse.com' })
    return request.post('/api/wechat_config/', { url }, { baseURL: 'https://ikingdata.com' })
}
const imgDefault = 'https://res.ikingdata.com/nav/kingdata.png'
const wxShare = (title: String, desc: String): void => {
  const shareBody = {
    type: 'link',
    title,
    desc,
    link: location.href,
    imgUrl: imgDefault,
  }
  getShareConfig(encodeURIComponent(location.href.split('#')[0])).then(
    (res) => {
      const config = {
        appId: res.data.app_id,
        nonceStr: res.data.nonce_str,
        signature: res.data.signature,
        timestamp: parseInt(res.data.timestamp),
        // debug: true,
        // jsApiList: [],
        // customUrl:''
      }
      const wechatObj = new WxSdk(config)
      wechatObj.initialize()
        .then((w: any) => {
          w.shareOnChat(shareBody)
          w.shareOnMoment(shareBody)
        })
        .catch((err: any) => {
          console.error(err)
        })
    },
  )
}

export {
  wxShare,
}
