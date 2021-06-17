/**
 * @file 任务类型
 */

enum TaskType {
  share = 'share',
  vip = 'vip',
  pancake = 'pancake',
  uniswap = 'uniswap',
  sushiswap = 'sushiswap',
  follow_twitter = 'follow_twitter',
  telegram_group = 'telegram_group',
  weibo = 'weibo', // 发送微博长文
  allin = 'allin',
  telegram = 'telegram',
  twitter = 'twitter',
  retwitter = 'retwitter',

  // channels
  venus = 'venus',
  cream = 'cream',
  compound = 'compound',
  sina = 'sina', // 关注项目方微博账号

  // coinwind
  autofarm = 'autofarm',
  beltfit = 'belt.fit',

  bunny = 'bunny',

  // 朋友圈
  friends = 'friends',
  // 聊天群
  groups = 'group',
}

export default TaskType
