<template>
  <div>我是一级路由展示登录成功以后的数据 {{ userStore.username }}</div>
</template>

<script setup lang="ts">
// 引入组合式API函数的声明周期函数
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
// 首页挂载完毕发送请求用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
