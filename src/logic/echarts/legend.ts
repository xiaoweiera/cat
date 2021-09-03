/**
 * @file 图例数据
 * @author svon.me@gmail.com
 */

import { forEach, toArray, compact } from '~/utils'
import { LegendItem, seriesType, iconFontName } from './interface'
import { flatten } from 'ramda'


export const source = {
  [seriesType.line]: `M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z`,
  [seriesType.bar]: `M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z`
}

export const makeSvg = function(type: seriesType, color?: string) {
  // @ts-ignore
  const name = iconFontName[type]
  const use = `<use xlink:href="#${name}"></use>`
  const svg = `<svg aria-hidden="true">${use}</svg>`
  let style = ''
  if (color) {
    style = `color: ${color}`
  }
  return `<i class="icon-font inline-block text-base" style="${style}">${svg}</i>`
}

export const clacLegendBoxWidth = function(legends: LegendItem[]): number {
  let width = 0
  forEach((item: LegendItem, index: number) => {
    console.log(item)
    let name = item.value || item.name
    name = `${name || ''}`
    const len = name.length
    width += len * 9 + 14
    if (index > 0) {
      width += 15
    }
  }, compact(flatten(toArray(legends))))
  return width
}

export const clacLegendRows = function(legends: LegendItem[], dom: HTMLElement) {
  const width = clacLegendBoxWidth(legends || [])
  if (dom && dom.clientWidth) {
    const boxWidth = dom.clientWidth - 20 * 2
    return Math.ceil(width / boxWidth)
  }
  return 0
}
