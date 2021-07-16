/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */

export const common = {
    ipValidate: '/api/v1/ip/validate',
    ipDetail: '/api/v1/ip/me=_='
}

export const ads = {
    commercial: '/api/v2/commercial',
}

export const user = {
    info: '/api/v1/users/my', // 获取个人信息
    logout: '/api/v1/users/logout', // 退出
    login: '/api/v1/users/login', // 登录
    signup: '/api/v1/users/signup', // 注册
    verify: '/api/v1/users/captcha', // 验证码
    logoMail: '/api/v1/users/email_login', // 邮箱登录
}

export const growthpad = {
    getProject: '/api/growthpad/project_info/', // 项目信息
    getUserInfo: '/api/growthpad/user_info/', // 用户表单信息
    postArticle: '/api/growthpad/article_image/', // 设置微博文章
    setUserInfo: '/api/growthpad/validate_user_info/', // 设置表单信息

    postFriendPicture: '/api/growthpad/growth_friend_circle/', // 朋友圈图片上传
    postChatPicture: '/api/growthpad/growth_group/', // 微信圈图片上传
    getGrowthPicture: '/api/growthpad/growth/', // 朋友圈与微信群图片获取
}
export const liquidity = {
    exchange_list: '/api/liquidity/exchange_list/',
    analysis_tool: '/api/liquidity/1/analysis_tool/',
    token_sidebar: `/api/liquidity/{platId}/token_sidebar/`,
    pair_sidebar: `/api/liquidity/{platId}/pair_sidebar/`,
    liquidity_token_usd_chart: `/api/liquidity/{platId}/liquidity_token_usd_chart/`,
    liquidity_token_usd_chart_single: `/api/liquidity/{platId}/liquidity_token_usd_chart_single/`,
    liquidity_token_currency_chart_single: `/api/liquidity/{platId}/liquidity_token_currency_chart_single/`,
    liquidity_pair_usd_chart_single: `/api/liquidity/{platId}/liquidity_pair_usd_chart_single/`,
    liquidity_pair_symbol10_usd_chart_single: `/api/liquidity/{platId}/liquidity_pair_symbol10_usd_chart_single/`,
    liquidity_pair_currency_chart_single: `/api/liquidity/{platId}/liquidity_pair_currency_chart_single/`,
    liquidity_pair_symbol0_currency_chart_single: `/api/liquidity/{platId}/liquidity_pair_symbol0_currency_chart_single/`,
    liquidity_pair_symbol1_currency_chart_single: `/api/liquidity/{platId}/liquidity_pair_symbol1_currency_chart_single/`,
    token_search: `/api/liquidity/{platId}/token_search/`,
    pair_search: `/api/liquidity/{platId}/pair_search/`,
    translate_token_usd_chart_single: `/api/liquidity/{platId}/translate_token_usd_chart_single/`,
    translate_token_currency_chart_single: `/api/liquidity/{platId}/translate_token_currency_chart_single/`,
    translate_pair_symbol0_usd_chart_single: `/api/liquidity/{platId}/translate_pair_symbol0_usd_chart_single/`,
    translate_pair_symbol1_usd_chart_single: `/api/liquidity/{platId}/translate_pair_symbol1_usd_chart_single/`,
    translate_pair_symbol0_currency_chart_single: `/api/liquidity/{platId}/translate_pair_symbol0_currency_chart_single/`,
    translate_pair_symbol1_currency_chart_single: `/api/liquidity/{platId}/translate_pair_symbol1_currency_chart_single/`,
    liquidity_token_price_chart: `/api/liquidity/{platId}/liquidity_token_price_chart/`,
    liquidity_pair_price_chart: `/api/liquidity/{platId}/liquidity_pair_price_chart/`,
}
export const res = {
    image: '/api/image-storage/',
    policy: '/api/storage/oss_token', // 获取签名
}

// 数据报表
// @ts-ignore
export const topic = {
    getMenuList: '/api/v2/topics/web_topic',
    // 根据搜索框内容获取图表数据
    search: '/api/v2/charts/search_chart',
    // 系统推荐图表数据
    recommend: '/api/v2/charts/web_recommend',
    // 获取图表中所有的 id
    charts: '/api/v2/topics/{id}/web_charts',
    // 根据 id 获取图表详情
    detail: 'api/v2/charts/{id}/details', // 单图详情
    multipleDetail: 'api/v2/charts/{id}/multy_details', // 多图详情
    // 根据 id 获取图表数据
    trend: 'api/v2/charts/{id}/trends', // 单图数据
    multipleTrends: '/api/v2/charts/multy_trends', // 多图数据
    // 用户关注的图表数据
    followList: '/api/v2/charts/my/multy_follows',
    addfollow: '/api/v2/charts/{id}/multy_follow', // 关注
    unfollow: '/api/v2/charts/{id}/multy_unfollow', // 取消关注
}

// 忽略的接口地址，不传用户登录信息
export const ignore: string[] = [
    common.ipDetail,
    common.ipValidate,
    user.login,
    user.signup,
    user.verify,
    user.logoMail,
    '/apy/',
    '/api/v2/commercial',
    ads.commercial, // 广告位
    topic.getMenuList, // 菜单
    // topic.recommend, // 推荐数据
    topic.charts, // 根据 id 查询
    topic.detail,
    topic.trend,
    topic.multipleDetail,
    topic.multipleTrends,
    liquidity.token_sidebar,
    liquidity.analysis_tool,
    liquidity.exchange_list,
    liquidity.pair_sidebar,
    liquidity.liquidity_token_usd_chart,
    liquidity.liquidity_token_usd_chart_single,
    liquidity.liquidity_token_currency_chart_single,
    liquidity.liquidity_pair_usd_chart_single,
    liquidity.liquidity_pair_symbol10_usd_chart_single,
    liquidity.liquidity_pair_currency_chart_single,
    liquidity.liquidity_pair_symbol0_currency_chart_single,
    liquidity.liquidity_pair_symbol1_currency_chart_single,
    liquidity.token_search,
    liquidity.pair_search,
    liquidity.translate_token_usd_chart_single,
    liquidity.translate_token_currency_chart_single,
    liquidity.translate_pair_symbol0_usd_chart_single,
    liquidity.translate_pair_symbol1_usd_chart_single,
    liquidity.translate_pair_symbol0_currency_chart_single,
    liquidity.translate_pair_symbol1_currency_chart_single,
    liquidity.liquidity_token_price_chart,
    liquidity.liquidity_pair_price_chart
]

// 判断登陆状态，已登陆状态下才发起请求
export const LoginStatus: string[] = [
    res.policy,
    res.image,
    user.info,

    growthpad.getUserInfo,
    growthpad.postArticle,
    growthpad.setUserInfo,
    growthpad.postChatPicture,
    growthpad.postFriendPicture,
    growthpad.getGrowthPicture,

    topic.followList,
    topic.addfollow,
    topic.unfollow,
]

// 将一下接口加入到缓存中
export const cache: string[] = [
    /*
    topic.getMenuList, // 菜单
    topic.recommend, // 推荐数据
    topic.charts, // 根据 id 查询
    topic.detail,
    topic.trend,
    topic.multipleDetail,
    topic.multipleTrends,
    */
]
