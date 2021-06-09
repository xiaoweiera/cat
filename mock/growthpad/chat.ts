// 加入 telegram
import I18n from '../../src/utils/i18n'
import TaskType from '../../src/logic/growthpad/tasktype'

let id: number = 100

export const uuid = function(): string {
  id += 1
  const value = String(Math.random()).slice(2)
  return `task-${value}-${id}`
}

export const telegram = function(project: string, description?: string, href?: string, reward: Array<number> = [], titleAfter: string = '') {
  return {
    id: uuid(),
    title: I18n.common.join,
    titleAfter,
    type: TaskType.telegram,
    tooltip: {
      icon: 'telegram',
      value: `${project} ${I18n.common.chat.telegramGroup}`,
      href,
    },
    reward,
    description,
  }
}
// 关注 twitter
export const twitter = function(project: string, description?: string, href?: string, reward: Array<number> = [], titleAfter?: string) {
  return {
    id: uuid(),
    title: I18n.common.follow,
    type: TaskType.twitter,
    titleAfter,
    tooltip: {
      icon: 'twitter',
      value: `${project} ${I18n.common.chat.twitter}`,
      href,
    },
    reward,
    description,
  }
}
// 转发 twitter
export const retwitter = function(project: string, description?: string, href?: string, reward: Array<number> = [], titleAfter?: string) {
  return {
    id: uuid(),
    title: I18n.common.repost,
    type: TaskType.retwitter,
    titleAfter,
    tooltip: {
      icon: 'twitter',
      value: I18n.growthpad.activity.twitter,
      href,
    },
    reward,
    description,
  }
}

// 新浪微博
export const sina = function(project: string, description?: string, href?: string, reward: Array<number> = [], afterHref?: string) {
  //
  return {
    id: uuid(),
    title: I18n.common.follow,
    type: TaskType.sina,
    tooltip: {
      icon: 'sina',
      value:  `${project} ${I18n.common.chat.sina}`,
      href,
    },
    tooltipAfter: {
      icon: 'sina',
      value: I18n.growthpad.channels.activity.sinaDesc,
      href: afterHref || href,
    },
    titleAfter: I18n.common.andRepost,
    reward,
    description,
  }
}
