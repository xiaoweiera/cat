<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue'
import { Web3Util } from '~/utils/ethereum/util'
import { useProvide } from '~/utils/use/state'
import { toArray, toNumber } from '~/utils'
import { EventType, stateName } from '~/utils/ethereum/interface'
import Message from '~/utils/message'

const props = defineProps({
  // 合约地址
  pair: {
    type: String,
    required: true
  },
  // 线路ID
  chainId: {
    type: Number,
    // 默认 ht 线路
    default: () => 128
  }
})

let web3: Web3Util

// @ts-ignore
const getWeb3LoginStatus = function(): boolean {
  if (web3 && web3.getIsLogin) {
    return web3.getIsLogin()
  }
  return false
}

// @ts-ignore
const loading = ref<boolean>(false)

// 兑换率
const amountValue = ref<number>(0)
const [symbolInput, , mergeSymbolInput] = useProvide(stateName.stateInput, {})

// @ts-ignore
const [ detail, setDetail, mergeDetail ] = useProvide(stateName.statePair, {})

const getDetail = function() {
  const [ data ] = detail.value
  return data
}

const getSymbols = function() {
  const data = getDetail()
  const symbols = data?.symbols
  if (symbols) {
    return toArray(symbols)
  }
  return []
}

// web3 util
useProvide(stateName.swap, function() {
  return web3
})

// 修改 symbol 数额
useProvide(stateName.watchInput, async function(index: number, value: number | string) {
  const symbols = getSymbols()
  const trigger = symbols[index]
  const [info0, info1] = symbols
  const data: any = { trigger: trigger.token }
  data[trigger.token] = value
  const origin = trigger.token === info0.token ? info1.token : info0.token
  const number = await web3.getAmountValue(info0.token, info1.token, trigger.token, value)
  data[origin] = toNumber(number, 6)
  mergeSymbolInput(data)
})

// @ts-ignore
const symbolRatio = computed<string>(function() {
  const value = amountValue.value
  if (value) {
    const symbols = getSymbols()
    return `1${symbols[0].symbol} = ${toNumber(value, 6)}${symbols[1].symbol}`
  }
  return ''
})


// 判断当前 symbol 是否已授权
// @ts-ignore
const isCurSymbolAuth = function() {
  const symbols = getSymbols()
  if (symbols) {
    return symbols[0]?.auth
  }
  return false
}

// 兑换率
const getExchangeValue = async function(): Promise<number> {
  try {
    const symbols = getSymbols()
    if (symbols && symbols.length > 0) {
      const [ info0, info1 ] = symbols
      return web3.getAmountValue(info0.token, info1.token, info0.token)
    }
  } catch (e) {
    // todo
  }
  return 0
}


// 切换交易对
// @ts-ignore
const onSwitch = async function() {
  const array = toArray(getSymbols())
  mergeDetail({
    symbols: array.reverse()
  })
  amountValue.value = await getExchangeValue()
}

// 授权
// @ts-ignore
const onAuthorizatio = async function() {
  const [info0] = getSymbols()
  if (info0) {
    try {
      await web3.postApprove(info0.token)
    } catch (e) {
      // todo
      console.log(e)
    }
  }
}

// 交易
// @ts-ignore
const onSwap = async function() {
  const [info0, info1] = getSymbols()
  const [ data ] = symbolInput.value
  const trigger = data.trigger
  const value = data[trigger]

  const onChangeCallBack = function(type: EventType) {
    if (type === EventType.transactionHash) {
      loading.value = true
    }
  }
  try {
    const status = await web3.swap(info0.token, info1.token, data.trigger, value, onChangeCallBack)
    if (status) {
      Message.alert('提示', '交易完成')
    }
  } catch (e) {
    // todo
    console.log(e)
  }
}

const ready = async function() {
  web3 = new Web3Util(props.pair, props.chainId)
  const data = await web3.getPairInfo()
  if (data) {
    setDetail(data)
    amountValue.value = await getExchangeValue()
  }
}

onMounted(ready)

</script>

<template>
  <div class="relative w-full h-full">
    <Spin :fit="false" :loading="loading">
      <div class="w-100 p-4 text-kdExp">
        <div class="flex justify-between text-global-default text-opacity-65 pb-4">
          <div>
            <span class="text-base">交易</span>
          </div>
          <div class="setting-box">
            <div class="mr-4.5 setting-icon">
              <IconFont type="icon-setting" class="text-xl cursor-pointer"/>
            </div>
            <div class="setting-main">
              <div class="pb-1.5">
                <label class="text-sm text-global-highTitle">滑点设置</label>
              </div>
              <div class="w-42">
                <el-input placeholder="自定义" size="small">
                  <template #suffix>
                    <span class="text-sm text-global-default text-opacity-85">%</span>
                  </template>
                </el-input>
              </div>
              <div>
                <span class="text-xs text-global-default text-opacity-65">滑点不能超过50%</span>
              </div>
              <div class="pb-1.5 pt-4">
                <label class="text-sm text-global-highTitle">交易截止时间</label>
              </div>
              <div class="w-42">
                <el-input placeholder="自定义" size="small">
                  <template #suffix>
                    <span class="text-sm text-global-default text-opacity-85">分钟</span>
                  </template>
                </el-input>
              </div>
              <div>
                <span class="text-xs text-global-default text-opacity-65">建议不超过1天</span>
              </div>
            </div>
          </div>
        </div>
        <template v-for="(info, index) in getSymbols()" :key="`${info.symbol}-${index}`">
          <div>
            <div v-show="index > 0" class="text-center py-4">
              <IconFont type="icon-switch" class="text-3xl cursor-pointer" @click="onSwitch"></IconFont>
            </div>
            <SwapTradeInput :info="info" :index="index"/>
          </div>
        </template>
        <div class="mt-4" v-show="symbolRatio">
          <p class="text-sm leading-5">
            <span class="text-global-default text-opacity-65">兑换比例:</span>
            <span class="ml-1 text-global-highTitle">{{ symbolRatio }}</span>
          </p>
        </div>
        <div class="mt-4">
          <!-- 判断是否已授权 -->
          <div v-if="isCurSymbolAuth()">
            <Before :app="getWeb3LoginStatus" content="请先连接钱包">
              <el-button :disabled="false" type="primary" class="rounded w-full bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onSwap">
                <span class="text-white select-none">交易</span>
              </el-button>
            </Before>
          </div>
          <!-- 进行授权 -->
          <div v-else>
            <Before :app="getWeb3LoginStatus" content="请先连接钱包">
              <div class="rounded bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onAuthorizatio">
                <span class="text-white select-none">授权</span>
              </div>
            </Before>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>

<style scoped lang="scss">
.setting-box {
  @apply relative pb-3;
  .setting-icon {
    @apply relative;
    &:after {
      content: none;
      position: absolute;
      width: 0;
      height: 0;
      left: 50%;
      top: 100%;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #fff;
      transform: translate(-50%, 4px);
      z-index: 1;
    }
  }

  .setting-main {
    border-radius: 8px;
    @apply absolute top-full right-0 p-4 bg-global-white hidden;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.12);
  }
  &:hover {
    .setting-icon {
      &:after {
        content: "";
      }
    }
    .setting-main {
      @apply block;
    }
  }
}
</style>
