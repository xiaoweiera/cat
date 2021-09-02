<script setup lang="ts">
import { getInject } from '~/utils/use/state'
import { isFunction, equalsIgnoreCase } from '~/utils'
import { defineProps } from 'vue'
import html2canvas from 'html2canvas'
import { $ } from '~/utils/event'
import { trim } from 'ramda'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: () => 24
  }
})

const getDownloadContent = getInject('downloadContent')

// 查找最近的的一个目标元素
const searchDom = function(dom?: HTMLElement, tagName?: string): any {
  if (dom && tagName) {
    const list = dom.getElementsByTagName(tagName)
    if (list.length > 0) {
      return [list[0], dom]
    }
    const parent: any = dom.parentElement || dom.parentNode
    return searchDom(parent, tagName)
  }
  return void 0;
}

const getDom = function(event: Event) {
  if (getDownloadContent) {
    const [ app ] = getDownloadContent.value
    if (app && isFunction(app)) {
      return app()
    }
  }
  const target: any = event.target
  const result = searchDom(target, 'canvas')
  if (result) {
    const [, root] = result
    return root
  }
}

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
    const name = props.title ? `${props.title}.png` : (head() || 'download')
    const downlink = document.createElement('a')
    downlink.setAttribute('download', name)
    downlink.download = name
    downlink.href = image;
    downlink.click();
  }
}


const onDownload = async (event: Event) => {
  const dom = getDom(event)
  if (equalsIgnoreCase(dom.tagName, 'canvas')) {
    saveChart(dom)
  } else {
    const content = await html2canvas(dom)
    saveChart(content)
  }
}
</script>

<template>
  <div class="inline-block" @click="onDownload($event)">
    <slot>
      <IconFont class="flex cursor-pointer" type="icon-xiazai" :size="size"/>
    </slot>
  </div>
</template>
