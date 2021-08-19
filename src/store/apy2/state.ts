
// 币种数据
import { ref } from 'vue'
import { TokenItem } from '~/logic/apy2/interface'

export const tokenList = ref<TokenItem[]>([])
export const chain=ref('all')
export const rankingTag=ref([])
export const tableTag=ref([])
export const listTag=ref([])
