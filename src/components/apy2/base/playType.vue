<script setup lang="ts">
import {ref, defineProps,watch} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import {chain,tokenList,projectList} from '~/store/apy2/state'
import {getTokenAndProject,getTokenList} from '~/logic/apy2/index'
const plat=ref('')
const coin=ref('')
const loan=ref('')
const list=[
  {
    id:0,
    title:I18n.apyIndex.playType.plat.title,
    des0:I18n.apyIndex.playType.plat.des1,
    des1:I18n.apyIndex.playType.plat.high,
    des2:I18n.apyIndex.playType.plat.des2,
    logo:'https://res.ikingdata.com/apyTwo/platType.png',
    video:'https://res.ikingdata.com/apyTwo/platVideo.png',
    selectText:I18n.apyIndex.selectPlat
  },
  {
    id:1,
    title:I18n.apyIndex.playType.coin.title,
    des0:I18n.apyIndex.playType.coin.des1,
    des1:I18n.apyIndex.playType.coin.high,
    des2:I18n.apyIndex.playType.coin.des2,
    logo:'https://res.ikingdata.com/apyTwo/coinType.png',
    video:'https://res.ikingdata.com/apyTwo/coinVideo.png',
    selectText:I18n.apyIndex.selectCoin
  },
  {
    id:2,
    title:I18n.apyIndex.playType.loan.title,
    des0:I18n.apyIndex.playType.loan.des1,
    des1:I18n.apyIndex.playType.loan.high,
    des2:I18n.apyIndex.playType.loan.des2,
    logo:'https://res.ikingdata.com/apyTwo/loanType.png',
    video:'https://res.ikingdata.com/apyTwo/loanVideo.png',
    selectText:I18n.apyIndex.selectCoin
  },
  // {
  //   id:3,
  //   title:'我没有条件',
  //   des0:'什么',
  //   des1:'高收益平台',
  //   des2:'就',
  //   des3:'投什么',
  //   logo:'https://res.ikingdata.com/apyTwo/noType.png',
  //   video:'https://res.ikingdata.com/apyTwo/noVideo.png',
  //   selectText:'选择平台'
  // },
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
const tokens=ref([])
const projects=ref([])
const tokenUrl=(tokenName:string)=>`/apy/token?symbol=${tokenName}&category=lend`
const platUrl=(projectId:number)=>`/apy/project?id=${projectId}`
</script>
<template>
  <div class="  font-kdFang relative flex">
    <template v-for="(item,i) in list">
      <div   :class="i!==3?bgList[i]:'hand '+bgList[i]"  class="itemContainer ml-3 px-5 py-4  min-w-61.5  w-fit   rounded-kd6px" >
        <div class="flex items-center justify-between" style="white-space: pre;">
          <div >
            <div :class="textList[i]" class="text-kd16px16px  font-medium ">{{item.title}}</div>
            <div :class="textList[i]" class="mt-1.5 font-medium">
              <span  class="text-kd12px16px ">{{item.des0}}</span>
              <span :class="desList[i]"  class="text-kd11px16px  text-global-white px-1.5 py-0.25 mx-1 bg-opacity-65 rounded-kd30px">{{item.des1}}</span>
              <span  class="text-kd12px16px ">{{item.des2}}</span>
              <span :class="desList[i]"  v-if="item.des3" class="text-kd11px16px text-global-white px-1.5 py-0.25 mx-1 bg-opacity-65 rounded-kd30px">{{item.des3}}</span>
            </div>
          </div>
          <div class="imgLogo  text-center   ml-5  flex flex-col items-center" >
            <img class=" min-w-12 min-h-12 w-12 h-12 " :src="item.logo" alt="">
            <div class="invisible text-kd10px10px  font-medium  mt-1">撑高度</div>
          </div>
          <a  href="/" class=" vido hand  text-center  ml-5  flex flex-col items-center" >
            <img class="min-w-10 w-10 h-10 mx-1 my-1 " :src="item.video" alt="">
            <div :class="textList[i]" class="text-kd10px10px relative z-10 font-medium  mt-1.5">相关资料</div>
          </a>
        </div>
        <!-- 下拉 -->
        <div  :class="bgList[i]"  class="confirm   pb-4 pt-4   ">
          <div class="px-5" >
            <div class="flex items-center selectClass  rounded-kd6px   justify-between" >
              <div class="pl-2  ">
                <div v-if="i===0"   class="flex items-center items-center">
                  <el-select  filterable :popper-append-to-body="false"   size="small" v-model="plat" :placeholder="item.selectText">
                    <template  v-for="item in projectList">
                      <a v-router.blank="platUrl(plat)"  >
                    <el-option   :label="item.name" :value="item.id"> </el-option>
                      </a>
                    </template>
                  </el-select>
<!--                  <a v-router.blank="platUrl(plat)" :class="desList[i]" class="hand w-12.5 ml-4.5 text-center h-6.5 flex items-center justify-center rounded-kd4px text-kd12px18px font-medium text-global-white ">{{I18n.apyIndex.ok}}</a>-->
                </div>
                <div v-if="i===1"   class="flex items-center items-center">
                  <el-select  filterable :popper-append-to-body="false"   size="small" v-model="coin" :placeholder="item.selectText">
                    <template v-for="item in tokenList" >
                      <a v-router.blank="tokenUrl(coin)" >
                        <el-option   :label="item.name" :value="item.name"></el-option>
                      </a>
                    </template>
                  </el-select>
<!--                  <a v-router.blank="tokenUrl(coin)" :class="desList[i]" class="hand w-12.5 ml-1 text-center h-6.5 flex items-center justify-center rounded-kd4px text-kd12px18px font-medium text-global-white ">{{I18n.apyIndex.ok}}</a>-->
                </div>
                <div v-if="i===2"   class="flex items-center">
                  <el-select filterable :popper-append-to-body="false"   size="small" v-model="loan" :placeholder="item.selectText">
                    <template v-for="item in tokenList">
                      <a v-router.blank="tokenUrl(loan)" >
                      <el-option  v-if="item.category.indexOf('lend')>=0"   :label="item.name" :value="item.name"></el-option>
                      </a>
                    </template>
                  </el-select>
<!--                  <a v-router.blank="tokenUrl(loan)" :class="desList[i]" class="hand w-12.5 mr-1 text-center h-6.5 flex items-center justify-center rounded-kd4px text-kd12px18px font-medium text-global-white ">{{I18n.apyIndex.ok}}</a>-->
                </div>
              </div>

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
    @apply left-0 right-0  absolute  hidden ;
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
    @apply  block ;
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
