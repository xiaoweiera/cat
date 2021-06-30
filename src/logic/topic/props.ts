/**
 * @file 数据报表数据格式定义
 * @author svon.me@gmail.com
 */

export const MenuType = {
  star: 'star', // 我的收藏
  recommend: 'recommend', // 精选推荐
}

export class MenuItem {
  name: string = ''
  title?: string = ''
  icon_image: string = ''
  web_logo_image?: string = ''
  pid?: number | string = ''
  id: number | string = ''
  mid?: string = '' // DB 对象中生成的唯一 ID
  count?: number = 0
  order?: number = 0
  children?: MenuItem[] = []
  tagId?: string | number = ''
  topicID?: string | number = ''
  type?: string = ''
}

