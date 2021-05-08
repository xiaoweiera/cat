<script setup lang="ts">
import {ElForm,ElFormItem, ElInput} from 'element-plus'
import {ref, defineProps, watch, toRefs, onMounted} from 'vue'
const temp=ref({
  area_code: '+86',
  tel: '',
  msm: '',
  pwd: '',
  confirmPwd: '',
  code: '',
})
const formLogo=ref({
  area_code: '+86',
  tel: '',
  pwd: '',
  checked: ''
})
const isShow=ref(false)
const time=ref('获取验证码')
const timePwd=ref('获取验证码')
const type=ref('注册')
</script>
<template>
  <div class="outDiv" >
    <div class="logoDiv">
      <img
          class="img-responsive logoImg"
          src="https://res.ikingdata.com/nav/logoJpg.png"
          alt=""
      />
    </div>
    <el-form
        v-if="type == '注册' || type == '重置密码'"
        :model="temp"
        class="form"
    >
      <el-form-item v-if="type === '注册'">
        <div class="codeC">
          <span class="numC rightNo">+86</span>
          <el-input
              v-model="temp.tel"
              placeholder="请输入手机号"
              class="input-with-select leftNo"
          >
          </el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="postcss" scoped>
@media screen and (min-width: 768px) {
  .footItem {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  /deep/.el-dialog__header {
    padding: 0px 0px 0px 0px !important;
  }
  .logoDiv {
    display: flex;
    justify-content: center;
    margin-top: -30px;
    margin-bottom: 14px;
    .logoImg {
      width: 150px;
      height: 48px;
    }
  }

  .hrefC {
    color: #2b8dff;
  }
  .msmTxt {
    color: #2b8dff;
    font-size: 14px;
  }
  .input-width-select {
    border-start-start-radius: 0px !important;
    border-start-end-radius: 0px !important;
  }
  .numC {
    width: 60px;
    border: 1px solid #dcdfe6;
  }
  .rightNo {
    border-right: 0 !important;
    border-top-left-radius: 0px;
    border-start-end-radius: 0px !important;
  }
  .leftNo {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    /deep/.el-input__inner {
      height: 100% !important;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .codeC {
    display: flex;
  }
  /deep/.el-input-group__prepend {
    background: white;
  }
  /deep/.el-input-group__append {
    background: white;
  }
  .noPwd {
    float: right;
    color: #40a9ff;
  }
  .selectTag {
    color: #2b8cff;
    font-size: 14px;
  }
  .go {
    margin: 0 auto;
    color: #2b8cff;
  }
  .defaultText {
    color: #50555c;
  }
  .center {
    text-align: center;
    clear: left;
  }
  .form {
    text-align: center;
  }

  .itemWidth {
    max-width: 350px;
  }

  .changeBu {
    display: flex;
    margin-top: 10px;
    width: 100%;
    div:nth-child(2) {
      margin-left: 4%;
      margin-bottom: 20px;
    }
  }
  .outDiv {
    width: 350px;
    margin: 0 auto;
    margin-bottom: -15px;
  }
  .itemWidthMsm {
    width: 350px;
  }
  .buttonCl {
    width: 100%;
    font-size: 17px;
    font-weight: bold;
  }
}
@media screen and (max-width: 768px) {
  .footItem {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  /deep/.el-dialog__header {
    padding: 0px 0px 0px 0px !important;
  }
  .logoDiv {
    display: flex;
    justify-content: center;
    margin-top: -0.8rem;
    margin-bottom: 0.373333rem;
    .logoImg {
      width: 4rem;
      height: 1.28rem;
    }
  }

  .hrefC {
    color: #2b8dff;
  }
  .msmTxt {
    color: #2b8dff;
    font-size: 14px;
  }
  .input-width-select {
    border-start-start-radius: 0px !important;
    border-start-end-radius: 0px !important;
  }
  .numC {
    width: 1.6rem;
    border: 1px solid #dcdfe6;
  }
  .rightNo {
    border-right: 0 !important;
    border-top-left-radius: 0px;
    border-start-end-radius: 0px !important;
  }
  .leftNo {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    /deep/.el-input__inner {
      height: 100% !important;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .codeC {
    display: flex;
  }
  /deep/.el-input-group__prepend {
    background: white;
  }
  /deep/.el-input-group__append {
    background: white;
  }
  .noPwd {
    float: right;
    color: #40a9ff;
  }
  .selectTag {
    color: #2b8cff;
    font-size: 0.373333rem;
  }
  .go {
    margin: 0 auto;
    color: #2b8cff;
  }
  .defaultText {
    color: #50555c;
  }
  .center {
    text-align: center;
    clear: left;
  }
  .form {
    text-align: center;
  }

  .itemWidth {
    max-width: 9.333333rem;
  }

  .changeBu {
    display: flex;
    margin-top: 10px;
    width: 100%;
    div:nth-child(2) {
      margin-left: 4%;
      margin-bottom: 0.533333rem;
    }
  }
  .outDiv {
    margin: 0 auto;
    margin-bottom: -0.4rem;
  }

  .buttonCl {
    width: 100%;
    font-size: 0.453333rem;
    font-weight: bold;
  }
}
</style>