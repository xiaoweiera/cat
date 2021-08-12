<script setup lang="ts">
import { defineProps } from 'vue'
import { $ } from '~/utils/event'
import { trim } from 'ramda'
// import html2canvas from 'html2canvas'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const head = function() {
  const title = $('head')
  if (title) {
    return trim(title.innerText)
  }
  return ''
}

// 保存 canvas
const saveChart = function(canvas: HTMLCanvasElement) {
  if (canvas) {
    const type = 'image/png'
    const strDataURI = canvas.toDataURL(type)
    const image = strDataURI.replace(type, 'image/octet-stream')
    const name = props.title ? `${props.title}.png` : (head() || '下载')
    const downlink = document.createElement('a')
    downlink.setAttribute('download', name)
    downlink.download = name
    downlink.href = image;
    downlink.click();
  }
}
// 查找最近的的一个目标元素
const searchDom = function(dom: HTMLElement, tagName: string) {
  if (dom && tagName) {
    const list = dom.getElementsByTagName(tagName)
    if (list.length > 0) {
      return [list[0], dom]
    }
    const parent = dom.parentElement || dom.parentNode
    return searchDom(parent, tagName)
  }
  return void 0;
}

// @ts-ignore
const onDownload = async function(e: Event) {
  const result = searchDom(e.target, 'canvas')
  if (result && result[0]) {
    saveChart(result[0])
    // const [, root] = result
    // if (root) {
    //   const canvas = await html2canvas(root)
    //   saveChart(canvas)
    // }
  }
}
</script>

<template>
  <IconFont class="flex" type="icon-xiazai" size="24" @click="onDownload($event)"/>
</template>
