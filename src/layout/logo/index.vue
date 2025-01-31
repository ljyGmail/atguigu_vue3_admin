<template>
  <div class="logo" v-if="!settings.logoHidden">
    <img :src="settings.logo" />
    <p>{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo的配置文件
import settings from '@/settings'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
