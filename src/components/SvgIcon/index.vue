<template>
  <!-- svg: 图标外层容器节点，也都需要与use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href指定用哪个图标，属性值是#icon-图标名字 -->
    <!-- use标签的fill属性可以设置图标的颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数
defineProps({
  prefix: {
    // xlink:href属性值的前缀
    type: String,
    default: '#icon-',
  },
  // 提供图标的名字
  name: String,
  // 接收父组件传递的颜色
  color: {
    type: String,
    default: '',
  },
  // 接收父组件传递过来的图标的宽度
  width: {
    type: String,
    default: '16px',
  },
  // 接收父组件传递过来的图标的高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
