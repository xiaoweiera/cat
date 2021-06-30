/**
 * @file 数据报表数据格式定义
 * @author svon.me@gmail.com
 */

export class MenuItem {
  name: string = ''
  icon_image: string = ''
  web_logo_image?: string = ''
  pid?: number | string = ''
  id: number | string = ''
  count?: number = 0
  order?: number = 0
  children?: MenuItem[] = []
  tagId?: string | number
  topicID?: string | number
}

