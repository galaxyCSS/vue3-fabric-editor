<template>
  <div class="font-control">
    <div class="label">
      <span>字体编辑</span>
    </div>
    <BaseEdit></BaseEdit>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import BaseEdit from './components/BaseEdit.vue'
const baseEdit = [
  {
    label: '透明度',
    icon: 'toumingdu'
  },
  {
    label: '创建副本',
    icon: 'chuangjianfuben'
  },
  {
    label: '删除',
    icon: 'icdelete'
  }
]
</script>

<style scoped>
.font-control {
  .label {
    margin-bottom: 10px;
  }
}
</style>
