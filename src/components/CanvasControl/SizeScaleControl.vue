<template>
  <div class="scale-control">
    <el-input-number v-model="drawArea.scale" @change="scaleChange" :step="5">
      <template #suffix>
        <span>%</span>
      </template>
    </el-input-number>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()
const drawArea = commonStore.drawArea
const scaleNum = ref(30)
// 画布缩放控制
const scaleChange = (num) => {
  const { width, height } = commonStore.container
  const editor = commonStore.editor
  editor.zoomToPoint(
    {
      x: width / 2,
      y: height / 2
    },
    num / 100
  )
  editor.renderAll()
  drawArea.scale = num
}
</script>

<style scoped>
.scale-control {
  position: absolute;
  bottom: 10px;
  right: 350px;
  &.move {
    right: 30px;
  }
}
</style>
