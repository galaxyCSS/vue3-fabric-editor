<template>
  <div class="size-control">
    <div class="wrap" v-if="!isChangeSize">
      <div class="label">
        <span>尺寸大小</span>
        <div class="label-r">
          <span>{{ drawArea.width }}px</span>
          <span>*</span>
          <span>{{ drawArea.height }}px</span>
        </div>
      </div>
      <div class="adjust"><el-button @click="changeSizeAc">调整尺寸</el-button></div>
    </div>
    <div class="size-list" v-if="isChangeSize">
      <div class="label" @click="backAc">
        <span><svg-icon icon="zuojiantou"></svg-icon></span>
        <span>调整尺寸</span>
      </div>
      <div class="list">
        <div
          :class="['item', drawArea.width == item.width && drawArea.height == item.height ? 'active' : '']"
          v-for="item in sizeList"
          @click="chooseSizeAc(item)"
        >
          <span>{{ item.label }}</span>
          <div class="item-r">
            <span>{{ item.width }}</span>
            <span>*</span>
            <span>{{ item.height }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCommonStore } from '@/store/common'
const isChangeSize = ref(false)
const commonStore = useCommonStore()
const drawArea = commonStore.drawArea
const sizeList = ref([
  { label: '原尺寸', width: drawArea.width, height: drawArea.height },
  { label: '公众号封面首图', width: 900, height: 383 },
  { label: '朋友圈封面', width: 1280, height: 1184 },
  { label: '手机海报', width: 1242, height: 2208 }
])
const changeSizeAc = () => {
  isChangeSize.value = true
}
const backAc = () => {
  isChangeSize.value = false
}
const chooseSizeAc = (item) => {
  drawArea.target.set({
    width: item.width,
    height: item.height
  })
  commonStore.editor.renderAll()
}
</script>

<style scoped>
.size-control {
  .wrap {
    .label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .label-r {
        font-size: 12px;
        color: #999;
      }
    }
    .adjust {
      .el-button {
        width: 100%;
      }
    }
  }
  .size-list {
    .label {
      font-weight: 600;
    }
    .list {
      .item {
        font-size: 12px;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
        &.active {
          color: var(--el-color-primary);
          .item-r {
            color: var(--el-color-primary);
          }
        }
        .item-r {
          color: #999;
        }
      }
    }
  }
}
</style>
