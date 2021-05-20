/* eslint-disable import/no-duplicates */
import { ComponentOptions } from 'vue'

declare interface Window {
  // extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
  const component: ComponentOptions
  export default component
}

// declare vue files as components
declare module '*.vue' {
  const component: ComponentOptions
  export default component
}
