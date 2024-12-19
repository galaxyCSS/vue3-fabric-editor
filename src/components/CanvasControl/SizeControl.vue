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
      <div class="customize">
        <div class="item">
          <span class="label">宽:</span>
          <el-input-number v-model="drawArea.width" :controls="false" />
        </div>
        <div class="item">
          <span class="label">高:</span>
          <el-input-number v-model="drawArea.height" :controls="false" />
        </div>
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
import { ref, watch } from 'vue'
import { useCommonStore } from '@/store/common'
import { debounce } from '@/utils'
const isChangeSize = ref(false)

const commonStore = useCommonStore()
const drawArea = commonStore.drawArea

const sizeList = ref([
  { label: '原尺寸', width: drawArea.width, height: drawArea.height, scale: drawArea.scale },
  { label: '公众号封面首图', width: 900, height: 383, scale: 80 },
  { label: '朋友圈封面', width: 1280, height: 1184, scale: 50 },
  { label: '营销长图', width: 800, height: 2000, scale: 40 }
])
const changeSizeAc = () => {
  isChangeSize.value = true
}
const backAc = () => {
  isChangeSize.value = false
}
const chooseSizeAc = (item, isZoom = true) => {
  const { width, height } = commonStore.container
  const editor = commonStore.editor
  drawArea.target.set({
    width: item.width,
    height: item.height,
    left: (width - item.width) / 2,
    top: (height - item.height) / 2
  })
  // 画布已经缩放，不必再进一步缩放
  if (isZoom) {
    editor.zoomToPoint(
      {
        x: width / 2,
        y: height / 2
      },
      item.scale / 100
    )
    commonStore.drawArea.scale = item.scale
  }
  editor.renderAll()
  commonStore.drawArea.width = item.width
  commonStore.drawArea.height = item.height
}
const debounceFn = debounce((newState) => {
  chooseSizeAc(
    {
      width: newState.width,
      height: newState.height
    },
    false
  )
}, 1000)

watch(() => drawArea, debounceFn, {
  deep: true
})
</script>

<style scoped>
.size-control {
  margin-bottom: 15px;
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
    & > .label {
      font-weight: 600;
      margin-bottom: 15px;
    }
    .customize {
      display: flex;
      margin-bottom: 15px;
      .item {
        white-space: nowrap;
        padding: 0 5px;
        display: flex;
        align-items: center;
        .label {
          margin-right: 5px;
        }
        .el-input-number {
          flex: 1;
          width: unset;
        }
      }
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
