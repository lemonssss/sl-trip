<template>
  <div class="app">
    <RouterView />
    <!-- 方案一：通过路径配置文件添加属性实现控制显示隐藏 -->
    <TabBar v-if="!route.meta.hideTabBar" />
    <!-- 方案二：通过设置CSS样式来控制显示隐藏 -->
    <!-- <TabBar /> -->

  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less" scoped></style>
