/**
 * @file 图例数据
 * @author svon.me@gmail.com
 */

import { LegendItem, seriesType } from './interface'
import { map } from '~/utils/index'

export const source = {
  [seriesType.line]: `M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z`,
  [seriesType.bar]: `M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z`
}

const iconFontName = {
  [seriesType.bar]: 'icon-Column',
  [seriesType.line]: 'icon-Broken_line'
}

export const makeSvg = function(type: seriesType, color?: string) {
  const name = iconFontName[type]
  const use = `<use xlink:href="#${name}"></use>`
  const svg = `<svg aria-hidden="true">${use}</svg>`
  let style = ''
  if (color) {
    style = `color: ${color}`
  }
  return `<span class="icon-font inline-block text-base" style="${style}">${svg}</span>`
}

export const clacLegendBoxWidth = function(legends: LegendItem[]) {
  const widths = map((item: LegendItem) => {
    const name = `${item.value || ''}`
    const len = name.length
    return len * 9 + 14
  }, legends)
  console.log(widths)
}
