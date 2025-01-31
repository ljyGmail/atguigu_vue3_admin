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
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 获取欢迎相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取骨架的小仓库
import useLayoutSettingsStore from '@/store/modules/settings'

let layoutSettingsStore = useLayoutSettingsStore()

let userStore = useUserStore()

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
</script>

<style scoped></style>
