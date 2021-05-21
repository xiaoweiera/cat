/* eslint-disable import/no-duplicates */
import { ComponentOptions } from 'vue'

// declare interface Window {
//   // extend the window
// }

// declare vue files as components
declare module '*.vue' {
  const component: ComponentOptions
  export default component
}
