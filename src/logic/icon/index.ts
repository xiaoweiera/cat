/**
 * @file iconfont
 * @author svon.me@gmail.com
 */
import { getLink } from './oss'
import { getAlias } from './alias'
import { toBoolean } from '~/utils'

interface Props {
  type: string
  size?: string | number
  suffix?: string
  rounded?: boolean
  border?: boolean
  className?: string
  bright?: boolean
}

const sizes = {
  '4xl': 42,
  '3xl': 32,
  '2xl': 24,
  'xl': 20,
  'base': 16,
  'xs': 12,
  'mini': 10
}

const fontSize = function(number: string = 'xl', rounded: boolean = false): string[] {
  // @ts-ignore
  const value = sizes[number] || number
  const className = [`size-${value}`]
  if (rounded) {
    className.push('rounded')
  }
  return className
}

const iconFont = function(props: Props): string {
  // 判断使用的是否是图片
  const image = getLink(props.type, props.suffix)
  const className = ['kd-ui-icon']
  if (props.border) {
    className.push('icon-border')
  }
  if (props.rounded) {
    className.push('icon-circle')
  }
  if (props.className) {
    className.push(props.className)
  }
  const imgClassName = fontSize(props.size as string, toBoolean(props.rounded))
  imgClassName.push(`icon-${props.type}`)
  if (image) {
    className.push('none-select', 'icon-font')
    imgClassName.push('none-select')
    const img = `<img class="${imgClassName.join(" ")}" alt="" src="${image}"/>`
    return `<span class="${className.join(" ")}">${img}</span>`
  } else {
    className.push('inline-flex')
    imgClassName.push('icon-font', 'flex')
    const svg = `<svg aria-hidden="true"><use xlink:href="#${getAlias(props.type, props.bright)}"></use></svg>`
    const img = `<i class="${imgClassName.join(" ")}">${svg}</i>`
    return `<span class="${className.join(" ")}">${img}</span>`
  }
}


export default iconFont
