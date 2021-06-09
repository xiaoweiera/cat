/**
 * @file 处理链接
 * @author svon.me@gmail.com
 */

import { href, current, Language } from '~/utils/lang'

export const shareUrl = function(url: string): string {
  if (current.value === Language.en) {
    return url
  }
  return href(url)
}
