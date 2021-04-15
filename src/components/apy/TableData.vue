<script setup lang="ts">
import {ref, onMounted} from 'vue'

let txt = ref('0')
const list = ref([{}, {}, {}, {}, {}])
const rowList = ref([{}, {}, {}, {}, {}])
const column = ref([{}, {}, {}, {}, {}])

</script>
<template>
  <div class="flex flex-col  mt-15">
    <div class="flex items-center   mb-5">
      <div class="text-kd18px28px font-medium mr-1.5">DeFi 借贷平台存款 APY 对比</div>
      <div class="text-kd14px20px font-normal text-global-default opacity-65">(4秒前更新)</div>
    </div>
    <div v-for="(one,i) in list" class=" flex flex-col">
      <!--第一行-->
      <div class="flex topBg" v-if="i===0">
        <!--左侧-->
        <div class="flex min-w-35  w-35 flex-col py-3.75 px-3">
          <div class="text-kd12px16px text-global-default opacity-65 mb-2.5">项目/币种</div>
          <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
        </div>
        <!--右侧-->
        <div class="flex">
          <div v-for="item in rowList" class="flex font-kdExp min-w-53  w-35 flex-col py-3.75 px-3">
            <div class="flex items-center mb-1.5"><img class="w-6 h-6 mr-1.5"
                                                       src="https://res.ikingdata.com/nav/apyHeco.png" alt="">
              <div class="font-normal text-kd14px18px text-global-highTitle">MDX</div>
            </div>
            <div class="flex">
              <div class="text-kd14px18px text-global-highTitle font-normal mr-1 5">$2.25</div>
              <div
                  class="px-1.5 py-0.25 text-kd12px16px bg-global-numGreen text-global-numGreen rounded bg-opacity-10 font-bold flex items-center">
                +89.91%
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      第二行++-->
      <div class="flex py-3">
        <div class="min-w-35  w-35   justify-center   flex flex-col">
          <div class="flex px-3  items-center  ">
            <img class="w-8 h-8 mr-1.5" src="https://res.ikingdata.com/nav/platForm.png" alt="">
            <div class="flex flex-col ">
              <div class="font-kdExp mb-1  text-kd14px18px text-global-highTitle font-normal">Compound</div>
              <div
                  class="font-normal rounded h-4.5 w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px text-global-primary">
                借贷平台
              </div>
            </div>
          </div>
        </div>
        <div v-for="col in rowList">
          <div class="w-53 h-full flex flex-col justify-center   px-3">
            <div class="flex mb-0.5 items-center">
              <div class="desName mr-1">收到利息</div>
              <div class="desNum">34.33%</div>
            </div>
            <div class="flex mb-0.5  items-center">
              <div class="desName mr-1">产出</div>
              <div class="desName">USDT(33%)+CAN(44%)</div>
            </div>
            <div class="flex mb-0.4  items-center">
              <div class="desName mr-1">存款总额</div>
              <div class="desName">$300万 USDT</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<style scoped>
.topBg {
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}

.desName {
  @apply text-kd12px16px text-global-default font-normal opacity-65;
}

.desNum {
  @apply font-kdExp font-normal text-kd14px16px;
}

.desInfo {
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>
