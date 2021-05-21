import { reactive } from 'vue'
interface platModel {
  id: number
  logo: string
  name: string
}
// 选择的平台
export const platStore: platModel = reactive({ id: 0, logo: '', name: '' }) // 弹窗状态
