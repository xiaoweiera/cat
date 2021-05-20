<script setup lang="ts">
import { reactive } from 'vue'
const data = {
  title:
    '根据粉丝数获得奖励：0-49999粉丝奖励 15MDX；49999-99999粉丝奖励100MDX；大于99999粉丝奖励200MDX.',
  description:
    '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
}

interface FormData {
  link?: string
  image?: File
}
const formdata = reactive<FormData>({})
</script>
<template>
  <div>
    <GrowthpadTaskTitle :data="data">
      <template #desc>
        <span class="block pt-3">{{ data.description }}</span>
      </template>
    </GrowthpadTaskTitle>
    <el-form class="mt-3" :model="formdata" label-width="82px">
      <el-form-item label="文章链接：">
        <el-input v-model="formdata.link" placeholder="输入文章链接"></el-input>
      </el-form-item>
      <el-form-item label="上传图片：">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.avatar-uploader {
  width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
