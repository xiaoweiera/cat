<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const selectValue=ref('')
const vLisit=[1,2,3,4]
const list=[
  {
    id:0,
    title:'我已选定平台',
    des0:'去投',
    des1:'收益最高',
    des2:'的币种',
    logo:'https://res.ikingdata.com/apyTwo/platType.png',
    video:'https://res.ikingdata.com/apyTwo/platVideo.png',
    selectText:'选择平台'
  },
  {
    id:1,
    title:'我有币',
    des0:'去选择',
    des1:'收益最高',
    des2:'的平台',
    logo:'https://res.ikingdata.com/apyTwo/coinType.png',
    video:'https://res.ikingdata.com/apyTwo/coinVideo.png',
    selectText:'选择币种'
  },
  {
    id:2,
    title:'我要借款',
    des0:'去选择',
    des1:'利息最低',
    des2:'的平台',
    logo:'https://res.ikingdata.com/apyTwo/loanType.png',
    video:'https://res.ikingdata.com/apyTwo/loanVideo.png',
    selectText:'选择平台'
  },
  {
    id:3,
    title:'我没有条件',
    des0:'什么',
    des1:'高收益平台',
    des2:'就',
    des3:'投什么',
    logo:'https://res.ikingdata.com/apyTwo/noType.png',
    video:'https://res.ikingdata.com/apyTwo/noVideo.png',
    selectText:'选择平台'
  },
]
const bgList={
  0:'bg-global-plat ',
  1:'bg-global-coin',
  2:'bg-global-loan ',
  3:'bg-global-noAsk '
}
const desList={
  0:'bg-global-primary ',
  1:'bg-global-coinTxt',
  2:'bg-global-loanTxt',
  3:'bg-global-noAskTxt'
}
const textList={
  0:'text-global-primary',
  1:'text-global-coinTxt',
  2:'text-global-loanTxt',
  3:'text-global-noAskTxt'
}
const cc='coinTxt'
</script>
<template>
  <div class="w-74  font-kdFang relative">
    <template v-for="(item,i) in list">
      <div   :class="i!==3?bgList[i]:'hand '+bgList[i]"  class="itemContainer mb-1.5 h-19   py-4.25 px-5 rounded-kd6px" >
        <div class="flex items-center justify-between">
          <div>
            <div :class="textList[i]" class="text-kd16px16px  font-medium ">{{item.title}}</div>
            <div :class="textList[i]" class="mt-1.5 font-medium">
              <span  class="text-kd12px16px ">{{item.des0}}</span>
              <span :class="desList[i]"  class="text-kd11px16px  text-global-white px-1.5 py-0.25 mx-1 bg-opacity-65 rounded-kd30px">{{item.des1}}</span>
              <span  class="text-kd12px16px ">{{item.des2}}</span>
              <span :class="desList[i]"  v-if="item.des3" class="text-kd11px16px text-global-white px-1.5 py-0.25 mx-1 bg-opacity-65 rounded-kd30px">{{item.des3}}</span>
            </div>
          </div>
          <div class="imgLogo  text-center absolute right-5 top-3.5   flex flex-col items-center">
            <img class=" w-13 h-13 " :src="item.logo" alt="">
            <div class="invisible text-kd10px10px  font-medium  mt-1">撑高度</div>
          </div>

          <a href="/"  class="vido hand absolute right-5 top-3.5 flex flex-col items-center">
            <img class="w-10 h-10 ml-0.8 " :src="item.video" alt="">
            <div :class="textList[i]" class="text-kd10px10px relative z-10 font-medium  mt-1.5">相关资料</div>
          </a>
        </div>
        <!-- 下拉 -->
        <div v-if="i<3"  :class="bgList[i]"  class="confirm  pb-4 pt-4  w-full ">
          <div class=" px-5">
            <div class="flex items-center selectClass px-1 rounded-kd6px   justify-between" >
              <div >
                <el-select filterable :popper-append-to-body="false"   size="small" v-model="selectValue" :placeholder="item.selectText">
                  <el-option v-for="item in vLisit" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
<!--                <IconFont  style="transform: scale(0.7)" class="relative right-21 top-0.5 text-global-highTitle text-opacity-35"  type="icon-xiajiantou"></IconFont>-->
              </div>
              <span :class="desList[i]" class="hand w-12.5 text-center h-6.5 flex items-center justify-center rounded-kd4px text-kd12px18px font-medium text-global-white ">确定</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

</template>
<style   lang="scss">
.itemContainer{
  @apply relative ;
  .vido{
    @apply hidden;
  }
  .confirm{
    @apply left-0 right-0  absolute  invisible ;
  }
}
.itemContainer:hover{
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06), 0px 6px 24px rgba(0, 0, 0, 0.1);

  @apply relative z-10 ;
  .vido{
    @apply block;
  }
  .imgLogo{
    @apply hidden;
  }
  .confirm{
    box-shadow: 1px 8px 19px -15px rgb(3 54 102 / 78%);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    @apply  visible ;
  }
}
.selectClass{
  @apply  bg-global-white;
  .el-input__inner{
    border: 0px solid rgb(0,0,0,0) !important;
    background: none;
    padding-left:4px !important;
    @apply text-global-highTitle text-opacity-45  text-kd14px18px ;
  }
}
</style>
