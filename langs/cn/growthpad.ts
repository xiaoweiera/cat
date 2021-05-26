export default {
  title: 'GrowthPad',
  case: '案例',
  growth: '增长',
  status: {
    wait: '即将开始',
    ing: '进行中',
    closure: '已结束'
  },
  reward: {
    count: '奖励数量',
    value: '奖励价值',
    perPerson: '每人可领取',
    total: '奖励 {count} MDX',
    maxTotal: '最多可得 {count} MDX'
  },
  register: '信息登记',
  submit: '登记',
  address: {
    warning: '请先完成信息登记',
    iCard: '您登记的奖励领取地址为：',
    reward: '预计活动奖励：',
    confirm: '地址确认',
    invalid: '地址无效',
    tips: '地址一旦确认不可修改',
    placeholder: '输入参与领取奖励的 BSC 地址',
    notify1: '* 请登记您的领取奖励地址（持仓量相关任务奖励直接发放至验证地址），如未及时登记，则奖励不进行发放。',
    notify2: '* 奖励将于活动结束后统一发放到您的奖励接收地址，持仓量相关任务奖励直接发放至验证地址。'
  },
  about: {
    reward: '奖励代币信息',
    website: '项目官网',
    community: '项目社群',
    projectDetail: '项目介绍',
    name: '代币名称',
    symbol: '代币名称',
    online: '上线时间',
    count: '发行总量',
    marketValue: '市值',
    circulation: '当前流通量',
    price: '当前价格',
    luanched: '所在公链',
    exchanges: '上线交易所',
  },
  countdown: {
    title: '开始倒计时',
    endTitle:'结束倒计时'
  },
  growthTasks: '奖励任务',
  button: {
    invite: '去邀请',
    checking: '资质验证',
    testing: '去检测'
  },
  weibo: {
    success: '图片上传成功',
    placeholder: '请上传图片！',
    article: '文章链接：',
    articleImg: '上传图片：',
    articlePlaceholder: '输入文章链接',
    notify1: '* 截图内容请包含主流媒体主页',
    notify2: '* 截图内容请包含主流媒体主页',
    label: '根据粉丝数获得奖励：<br/>0-49999粉丝奖励 15MDX；49999-99999粉丝奖励100MDX；大于99999粉丝奖励200MDX.',
    description: '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
  },
  invited: {
    count: '我邀请参与活动的人数：',
    code: '我的邀请码：'
  },
  form: {
    address: '确认地址',
    warning: '地址一旦确认不可修改，任务奖励将发放到该地址中',
    placeholderBsc: '请输入验证的 BSC 地址',
    placeholderETH: '请输入验证的 ETH 地址',
    placeholderTelegram: '输入您加入电报群的ID',
    twitter: '输入您的TwitterID',
    retwitter: '输入您的TwitterID'
  },
  copy: '邀请你注册Kingdata，{url}',

  mdx: {
    about: {
      detail: `Mdex 是基于资金池理念的 AMM 去中心化交易所，提出并实现了基于火币生态 Heco 链和以太坊的双链 DEX模型，同时MDEX还将支持流动性和交易双重挖矿机制。Mdex 上线12天以来，总质押量超过 2000 万美元，日交易额破 4500 万美元，24 小时手续费超 12 万美元，单日交易笔数突破 15 万笔，超 SushiSwap 6倍。

Mdex 创新性地采用了双挖机制，这里的“双挖”，第一指：LP迁移前支持以太坊上 Uniswap LP、Sushiswap LP及单币种抵押挖矿，其中，抵押 Sushiswap LP 可同时获得 sushi 和 mdex 代币，实现一键双挖，同时还指：迁移后将在 Heco 上开放交易和流动性双挖矿。`,
    },
    copy: '邀请您参与${title}，赢取百万美元奖励，{url}',
    share: {
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%'
    },
    dashoard: {
      desc: 'KingData 将联合 MDEX 开启价值超 200,000 美金的空投活动，并设立了超 10 种活动任务，让所有用户都有资格进行参与。完成任务的用户在活动结束后，将空投相应的MDX奖励。',
    },
  }
};
