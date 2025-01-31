<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
// 获取欢迎相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取骨架的小仓库
import useLayoutSettingsStore from '@/store/modules/settings'

let layoutSettingsStore = useLayoutSettingsStore()

let userStore = useUserStore()

// 获取路由器对象
let $router = useRouter()
// 获取路由对象
let $route = useRoute()

// 刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingsStore.refresh = !layoutSettingsStore.refresh
}

// 全屏按钮点击的回调
const fullScreen = () => {
  // DOM对象的一个属性，用来判断当前是否是全屏
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 调用文档根节点的requestFullscreen方法来实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 退出登录点击的回调
const logout = () => {
  // 第一件事情: 向服务器发请求[退出登录的接口] (目前没有该接口)
  // 第二件事情: 仓库中关于用户相关的数据需要清空[token|username|avatar]
  userStore.userLogout()

  // 第三件事情: 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped></style>
