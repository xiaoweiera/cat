export default {
  title: 'GrowthPad',
  case: '案例',
  growth: '{project} 增长',
  status: {
    wait: '即将开始',
    ing: '进行中',
    closure: '已结束'
  },
  reward: {
    about: '约',
    count: '奖励数量',
    value: '奖励价值',
    perPerson: '每人可领取',
    total: '奖励 {count} {token}',
    maxTotal: '最多可得 {count} {token}',
    finished: '完成全部任务：{reward}（前{count}名用户）',
    anytask: '完成任意任务：{reward}（前{count}名用户）',
  },
  register: '信息登记',
  submit: '登记',
  address: {
    warning: '请先完成信息登记',
    iCard: '您登记的奖励领取地址为：',
    reward: '预计获得奖励：',
    confirm: '地址确认',
    invalid: '地址无效',
    tips: '地址一旦确认不可修改',
    placeholder: '输入参与领取奖励的 BSC 地址',
    notify1: '* 请登记您的领取奖励地址（持仓量相关任务奖励直接发放至验证地址），如未及时登记，则奖励不进行发放。',
    notify2: '* 奖励将于活动结束后统一发放到您的奖励接收地址，持仓量相关任务奖励直接发放至验证地址。'
  },
  about: {
    title: '{project} 去中心化交易所',
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
    title: '撰写 {count} 字以上原创 {project} 体验文章，并发布在主流媒体。'
  },
  invited: {
    count: '我邀请参与活动的人数：',
    code: '我的邀请码：',
    partake: '阳光普照奖',
  },
  chat: {
    speak: '并完成任意发言。'
  },
  form: {
    address: '确认地址',
    warning: '地址一旦确认不可修改，任务奖励将发放到该地址中',
    placeholderBsc: '请输入验证的 BSC 地址',
    placeholderETH: '请输入验证的 ETH 地址',
    placeholderTelegram: '输入您加入电报群的ID',
    twitter: '输入您的TwitterID',
    retwitter: '输入您的TwitterID',
    sina: '输入您的微博昵称'
  },
  copy: '邀请你注册Kingdata，{url}',
  warning: {
    telegram: '活动结束前退出电报群视为未完成任务',
    follow: '活动结束前取消关注视为未完成任务',
    article: '活动结束前删除推文视为未完成任务',
    twitter: '活动结束前取消关注/删除推文视为未完成任务',
    sina: '活动结束前取消关注/删除微博视为未完成任务'
  },
  vip: {
    invite: '成为 {group} VIP 用户',
    description: '邀请三个用户注册即可成为 VIP 用户',
    activity: 'Kingdata VIP 用户；加入 {project} 电报群；关注 {project} Twitter 并转发本条活动 Twitter。',
  },
  activity: {
    twitter: '本条活动 Twitter',
  },
  front: {
    '500': '{value}（前500名用户）',
    '2000': '{value}（前2000名用户）'
  },

  mdx: {
    about: {
      name: 'MDX',
      exchanges: '火币、币安等23家',
      online: '2021年1月19日',
      count: '10亿',
      marketValue: '3亿',
      circulation: '3亿',
      luanched: 'HECO/BSC',
      detail: `Mdex 是基于资金池理念的 AMM 去中心化交易所，提出并实现了基于火币生态 Heco 链和以太坊的双链 DEX模型，同时MDEX还将支持流动性和交易双重挖矿机制。Mdex 上线12天以来，总质押量超过 2000 万美元，日交易额破 4500 万美元，24 小时手续费超 12 万美元，单日交易笔数突破 15 万笔，超 SushiSwap 6倍。

Mdex 创新性地采用了双挖机制，这里的“双挖”，第一指：LP迁移前支持以太坊上 Uniswap LP、Sushiswap LP及单币种抵押挖矿，其中，抵押 Sushiswap LP 可同时获得 sushi 和 mdex 代币，实现一键双挖，同时还指：迁移后将在 Heco 上开放交易和流动性双挖矿。`,
    },
    copy: '邀请您参与${title}，赢取百万美元奖励，{url}',
    share: {
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%'
    },
    dashboard: {
      desc: 'KingData 将联合 MDEX 开启价值超 200,000 美金的空投活动，并设立了超 10 种活动任务，让所有用户都有资格进行参与。完成任务的用户在活动结束后，将空投相应的MDX奖励。',
    },
    weibo: {
      label: '根据粉丝数获得奖励：<br/>0-49999粉丝奖励 15MDX；49999-99999粉丝奖励100MDX；大于99999粉丝奖励200MDX.',
      description: '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
    },
    activity: {
      warning: '该任务奖励会发放到验证的地址中，地址验证后不可修改',

      pancake: 'PanCake Swap 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      pancakeCondition: '任务资格：Pancake swap 持仓价值超过1万U',


      uniswap: 'Uniswap 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      uniswapCondition: '任务资格 Uniswap 持仓价值超过1万U',

      sushiswap: 'Sushiswap 持仓价值超过 1万 U，加入 MDEX 电报群；关注 MDEX Twitter；转发活动 Twitter。',
      sushiswapCondition: '任务资格：Sushiswap 持仓价值超过1万U',
    },
  },
  channels: {
    dashboard: {
      desc: 'KingData 将联合 Channels 开启丰厚空投活动，并设立了超多种活动任务，让所有用户都有资格进行参与。完成任务的用户在活动结束后，将空投相应的USDT奖励。'
    },
    weibo: {
      label: '根据粉丝数获得奖励：小于 5 万粉丝奖励 20U，大于 5 万粉丝奖励 300U（前30名用户）',
      description: '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
    },
    share: {
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%'
    },
    about: {
      name: 'USDT',
      exchanges: '火币、币安等23家',
      online: '2014年11月26日',
      count: '602.71亿',
      marketValue: '602.71亿',
      circulation: '3亿',
      luanched: 'HTH/Omni',
      detail: 'Channels是Heco上首个完全去中心化的借贷平台。Channels在资产安全、用户体验和挖矿收益上，均在Heco上的加代产品里首屈一指。Channels专注于主流借贷币种HUSD、USDT、ETH、HBTC和HT等，始终坚持以产品体验为基础，以用户利益为核心。'
    },
    task1: {
      title: 'Venus 持仓价值超过1万U，Channels 的存借总额超过 1000U；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。'
    },
    task2: {
      title: 'Cream 持仓价值超过1万U，Channels 的存借总额超过 1000U；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。'
    },
    task3: {
      title: 'Compound 持仓价值超过1万U，Channels 的存借总额超过 1000U；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。'
    },
    activity: {
      warning: '该任务奖励会发放到验证的地址中，地址验证后不可修改',

      label: '任务资格：{group} 持仓价值超过1万U',

      telegramDesc: '并在群里晒出Channels存借款总额超过1000U的截图',
      twitterDesc: '并转发置顶推特并 @3个好友',
      sinaDesc: '并转发置顶微博并 @3个好友'
    },
  },
  coinwind: {
    about: {
      detail: `CoinWind是一个DeFi智能挖矿金融平台，通过合约自动将质押的币种进行撮合配对，配合对冲无常损失策略，将用户收益最大化，有效解决了用户单币种挖矿收益低、LP挖矿无常损失大等风险问题。

CoinWind旨在打造一个DeFi数字资产银行，推出高收益与安全可靠并存的产品，将用户存入的不同代币汇集到不同的池中，然后根据策略调动某代币池的资金参与不同的流动性挖矿，从而为用户实现更高的收益。CoinWind产品会通过组合策略有效降低流动性挖矿中的无常损失。

CoinWind首发Heco生态链，之后将跨多条主链如ETH、BSC等运行。`,
    },
    copy: '邀请您参与${title}，赢取百万美元奖励，{url}',
    share: {
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%'
    },
    dashboard: {
      desc: 'KingData 将联合 CoinWind 开启价值超 100,000 美金的空投活动以及CoinWind专属活动增长奖。设立了超多种活动任务，让所有用户都有资格进行参与。完成任务的用户在活动结束后，将空投相应的MDX奖励。',
    },
    task2: {
      title: 'Pancake Bunny持仓价值超过1万U; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的Twitter。',
      description: '完成任意任务：<i>奖励1MDX</i>（前500名用户）',
      condition1: '任务资格：Pancake Bunny 持仓价值超过1万U',
    },
    task3: {
      title: 'autofarm持仓价值超过 1万 U; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的Twitter。',
      condition1: '任务资格：autofarm 持仓价值超过1万U',
    },
    task4: {
      title: 'Belt.fit持仓价值超过 1万 U; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的Twitter。',
      condition1: '任务资格：Belt.fit 持仓价值超过1万U',
    },
    weibo: {
      label: '根据粉丝数获得奖励：<br/>0-49999粉丝奖励 3MDX(前500名用户)；49999-99999粉丝奖励30MDX；大于99999粉丝奖励100MDX.',
      description: '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
    },
  }
};
