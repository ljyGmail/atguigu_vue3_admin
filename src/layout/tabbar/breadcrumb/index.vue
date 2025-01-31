<template>
  <!-- 顶部左侧的静态 -->
  <el-icon style="margin-right: 10px" @click="collapseMenu">
    <component :is="!fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题-->
      <span style="margin: 0 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingsStore from '@/store/modules/settings'
// 获取layout配置相关的仓库
let layoutSettingsStore = useLayoutSettingsStore()
// 获取路由对象
let $route = useRoute()

const collapseMenu = () => {
  layoutSettingsStore.fold = !layoutSettingsStore.fold
}
</script>

<style scoped></style>
