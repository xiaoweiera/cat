<script lang='ts' setup>
import { imgSrc } from '~/logic/cat/config'
import { onMounted, ref,reactive } from 'vue'
// 设置是否打开
const setState=ref(true)
const money = ref(2293384.56)
//滑点
const sold=reactive({value:0.1})
//滑点时间 默认1分钟
const time=reactive({value:1})
const type = ref('swap')
const changeType = (name: string) => type.value = name
const changeSet=()=>setState.value=!setState.value
//balance
const balance = ref(0)
</script>
<template>
  <div class=' w-150  mx-auto flex-col'>
    <div class='text-global-hei'>
      <div class='rounded-kd24px shadow  flex justify-between px-6 py-6 '>
        <div class=' flex items-center '>
          <img class='w-6.5 h-6.5' :src='`${imgSrc}/start.png`' alt=''>
          <span class='ml-1.5 zi font-semibold'>Total Trading Volume</span>
          <img class='w-4 h-4 ml-1.5' :src='`${imgSrc}/tip.png`' alt=''>
        </div>
        <div class='money flex items-center'>${{ money }}</div>
      </div>
      <div class='rounded-kd24px shadow mt-6 p-4'>
        <!--    swap liquidity-->
        <div class='  flex w-full '>
          <div class='h-14 flex justify-between items-center w-full'>
            <div class='flex items-center p-2   rounded-kd16px' style='background: #F4F5F6'>
              <div @click='changeType("swap")' :class='type==="swap"?"taged":"tag"'>Swap</div>
              <div @click='changeType("liquidity")' :class='type==="liquidity"?"taged":"tag"'>Liquidity</div>
            </div>
            <div class='relative'>
              <div @click='changeSet()' class='flex items-center  h-14 w-14 justify-center hand   rounded-kd16px' style='background: #F4F5F6'>
                <img :src='`${imgSrc}/set.png`' class='w-6 h-6' alt=''>
              </div>
              <CatSwapSet v-if='setState' :sold='sold' :time='time' class='absolute top-18 z-10 right-0 '/>
            </div>

          </div>
        </div>
        <!--coin-->
        <div class='mt-4 flex h-20  rounded-kd16px  items-center relative  px-4 tokens '>
          <div class=' h-11.5 flex-1  flex items-center'>
            <img :src='`${imgSrc}/tokenDemo.png`' class='w-11.5 h-11.5' alt=''>
            <div class='ml-3'>
              <div class='text-global-hui text-kd14px20px'>From</div>
              <div class='text-global-hei text-kd16px24px font-semibold'>USDT</div>
            </div>
          </div>
          <div class='w-0.25 h-11.5 absolute left-0 right-0 mx-auto borderRight'></div>
          <div class=' h-11.5 flex-1 '>
            <div class='ml-8 flex flex-col h-full justify-center'>
              <div class='text-global-hui text-kd14px20px'>
                <span>balance:</span>
                <span>{{ balance }}</span>≈<span>${{ balance * 7 }}</span>
              </div>
              <div class='text-global-hei flex text-kd16px24px font-semibold'>
                <div class='max'>MAX</div>
                <div class='text-kd18px20px text-global-hui ml-3'>0.00</div>
              </div>
            </div>
          </div>
        </div>
        <img :src='`${imgSrc}/sawp.png`' class='w-12 h-12 hand sawp mx-auto my-4 bg-global-white rounded-16px' alt=''>
        <!--  token-->
        <div class=' flex h-20  rounded-kd16px  items-center relative  px-4 tokens '>
          <div class=' h-11.5 flex-1  flex items-center'>
            <div class='w-11.5 h-11.5  flex justify-center'>
              <img :src='`${imgSrc}/logoHand.png`' class='w-8' alt=''>
            </div>
            <div class='ml-3'>
              <div class='text-global-hui text-kd14px20px'>To</div>
              <div class='text-global-fen text-kd16px24px font-semibold'>Select Token</div>
            </div>
          </div>
          <div class='w-0.25 h-11.5 absolute left-0 right-0 mx-auto borderRight'></div>
          <div class=' h-11.5 flex-1 '>
            <div class='ml-8 flex flex-col h-full justify-center'>
              <div class='text-global-hui text-kd14px20px'>
                <span>balance:</span>
                <span>{{ balance }}</span>≈<span>${{ balance * 7 }}</span>
              </div>
              <div class='text-global-hei flex text-kd16px24px font-semibold'>
                <div class='max'>MAX</div>
                <div class='text-kd18px20px text-global-hui ml-3'>0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div class='h-11 rounded-kd12px mt-4  hand bg-global-primary flex justify-center items-center'>
          <img :src='`${imgSrc}/wallet.png`' class='w-6 h-6' alt=''>
          <div class='text-global-white ml-1.5 text-kd16px24px font-semibold'>Connect Wallet</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sawp {
  border: 1px solid #E6E8EC;
  box-sizing: border-box;
}

.tokens {
  background: #FCFCFD;
  /* Neutrals / 06 */
  border: 1px solid #E6E8EC;
  box-sizing: border-box;
}

.borderRight {
  border-right: 1px solid #E6E8EC;
}

.borderLeft {
  border-left: 0.5px solid red;
}

.max {
  background: #F4F5F6;
  @apply text-kd12px16px font-medium px-2.5 py-1.25 rounded-kd6px;
}

.shadow {
  border: 1px solid #E6E8EC;
  box-sizing: border-box;
  background: #FFFFFF;
  /* 小阴影 */
  box-shadow: 0px 4px 12px rgba(20, 20, 22, 0.06);
}

.tag {
  @apply w-35 h-10 text-global-hui font-semibold flex justify-center items-center rounded-kd12px cursor-pointer;
}

.taged {
  @apply w-35 h-10 bg-global-white font-semibold  text-global-fen flex justify-center items-center rounded-kd12px cursor-pointer;
}

.zi {
  font-size: 24px;
  line-height: 32px;
}

.money {
  @apply text-kd24px24px;
}
</style>

