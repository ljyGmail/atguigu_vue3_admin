<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">添加按钮</el-button>
    <el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="sizes, prev, pager, next"
      :total="1000"
    />
    <Test />
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import Test from '@/components/Test.vue'
</script>
<style scoped></style>
