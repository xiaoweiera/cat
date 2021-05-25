<script lang="ts" setup>
import { ElSelect, ElInput, ElIcon } from 'element-plus'
import { ref, reactive, onBeforeMount } from 'vue'
import { coinList, tradingList } from '/mock/liquidity'
import { selectCoin } from '~/store/liquidity/state'
const selectTxt = ref('')
const coinShow = ref(false)
const changeSelect = (state) => {
  coinShow.value = state
}
const changeToken = (name: string, origin: string) => {
  selectCoin.name = name
  selectCoin.origin = origin
  changeSelect(false)
}
// 加延迟不然会先执行blur，不执行click
const inputBlur = () => {
  setTimeout(() => {
    changeSelect(false)
  }, 100)
}
onBeforeMount(() => {})
</script>
<template>
  <div
    class="
      flex flex-1
      relative
      items-center
      ml-1
      pl-1.5
      pr-3
      font-kdFang
      h-14.5
    "
  >
    <el-input
      v-model="selectTxt"
      class="selectClass"
      placeholder="搜索"
      @focus="changeSelect(true)"
      @blur="inputBlur()"
    ></el-input>
    <img
      class="w-3.5 h-3.5"
      src="https://res.ikingdata.com/nav/topicSearch.png"
      alt=""
    />
    <!--    弹窗-->
    <div
      v-show="coinShow"
      class="
        absolute
        top-14.5
        right-0
        w-51.25
        py-1.5
        z-2
        tipContainer
        h-82.5
        overflow-hidden overflow-y-auto
      "
    >
      <!--      币-->
      <ul>
        <li class="text-global-default opacity-65 text-kd14px18px py-1.5 px-3">
          币种
        </li>
        <template v-for="(item, i) in coinList">
          <li
            class="itemLi hand"
            :class="{
              selectBg:
                selectCoin.name === item.name &&
                selectCoin.origin === item.origin,
            }"
            @click="changeToken(item.name, item.origin)"
          >
            <div class="coinName">{{ item.name }}</div>
            <div class="coinTip">
              <span class="coinTipTxt">{{ item.origin }}</span>
            </div>
          </li>
        </template>
        <li class="more hand">查看更多</li>
      </ul>
      <!--      交易对-->
      <ul>
        <li
          class="
            text-global-default
            opacity-65
            text-kd14px18px
            py-1.5
            px-3
            mt-1.5
          "
        >
          交易对
        </li>
        <template v-for="(item, i) in tradingList">
          <li
            class="itemLi hand"
            :class="{
              selectBg:
                selectCoin.name === item.name &&
                selectCoin.origin === item.origin,
            }"
            @click="changeToken(item.name, item.origin)"
          >
            <div class="coinName">{{ item.name }}</div>
            <div class="coinTip">
              <span class="coinTipTxt">{{ item.origin }}</span>
            </div>
          </li>
        </template>
        <li class="more hand">查看更多</li>
      </ul>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.more {
  @apply text-kd14px18px px-3 py-1.5 text-global-primary font-normal;
}

.itemLi {
  @apply flex items-center justify-between px-3;

  .coinName {
    @apply text-kd14px20px py-1.5 text-global-default opacity-85 font-normal;
  }

  .coinTip {
    border: 1px solid rgba(43, 141, 254, 0.4);
    border-radius: 2px;
    @apply px-1 py-0.5 text-kd12px16px flex items-center justify-center text-global-primary font-bold;
  }
  &:hover {
    background: rgba(43, 141, 254, 0.08);
  }
}

.selectBg {
  background: rgba(43, 141, 254, 0.08);
}

.tipContainer {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(43, 140, 255, 0.16);
  border-radius: 4px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    background: rgba(0, 0, 0, 0.1);
  }
}
::v-deep(.el-input__inner) {
  height: 20px;
  background: none;
  border: 0;
}

::v-deep(.el-input__inner) {
  font-size: 14px !important;
  padding-left: 0px;
}
</style>
