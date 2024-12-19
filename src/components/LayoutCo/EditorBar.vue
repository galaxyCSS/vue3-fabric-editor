<template>
  <div class="editor-bar">
    <div class="item" v-for="item in tabs" :key="item.label">
      <svg-icon :icon="item.icon" class="item-icon"></svg-icon>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  {
    label: '文字',
    icon: 'wenzi'
  },
  {
    label: '素材',
    icon: 'sucai'
  }
]

import SvgIcon from '@/components/common/SvgIcon.vue'
</script>

<style scoped>
.editor-bar {
  padding: 5px 0;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    padding: 5px 0;
    .item-icon {
      font-size: 20px;
      color: #000;
    }
  }
}
</style>
