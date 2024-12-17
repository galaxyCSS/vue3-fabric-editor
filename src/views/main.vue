<template>
  <div class="layout">
    <div class="header">
      <div class="head-l">
        <div class="quash">
          <div class="item">
            <el-tooltip effect="dark" content="撤销修改">
              <svg-icon icon="shangyibu"></svg-icon>
            </el-tooltip>
          </div>
          <div class="item">
            <el-tooltip effect="dark" content="恢复修改">
              <svg-icon icon="xiayibu"></svg-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="head-r">
        <el-button type="primary">下载</el-button>
      </div>
    </div>
    <div class="container">
      <div class="slide slide-left">
        <div class="left-bar"></div>
        <div class="left-box" v-show="!leftToggle"></div>
        <div class="toggle" @click="changeToggle('left')">
          <svg-icon :icon="leftToggle ? 'youjiantou' : 'zuojiantou'"></svg-icon>
        </div>
      </div>
      <div class="slide slide-right">
        <div class="right-box" v-show="!rightToggle">
          <SizeControl></SizeControl>
        </div>
        <div class="toggle" @click="changeToggle('right')">
          <svg-icon :icon="rightToggle ? 'zuojiantou' : 'youjiantou'"></svg-icon>
        </div>
      </div>
      <div class="editor-wrap" ref="editorWrapRef">
        <canvas id="editor" ref="editorRef"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import SizeControl from '@/components/CanvasControl/SizeControl.vue'
import { useCommonStore } from '@/store/common'
import * as fabric from 'fabric'
const commonStore = useCommonStore()
const leftToggle = ref(false)
const rightToggle = ref(false)
const editorWrapRef = ref()
const editorRef = ref()

const changeToggle = (dir) => {
  if (dir === 'left') {
    leftToggle.value = !leftToggle.value
  } else {
    rightToggle.value = !rightToggle.value
  }
}
// 初始化画布
const initEditor = () => {
  const drawArea = commonStore.drawArea
  const { offsetWidth, offsetHeight } = editorWrapRef.value
  const editor = new fabric.Canvas(editorRef.value, {
    width: offsetWidth,
    height: offsetHeight
  })
  // 初始化绘制区域
  const rect = new fabric.Rect({
    width: drawArea.width,
    height: drawArea.height,
    left: (offsetWidth - drawArea.width) / 2,
    top: (offsetHeight - drawArea.height) / 2,
    fill: '#fff',
    selectable: false
  })
  editor.add(rect)
  // 初始化绘制区域按中心点缩放
  editor.zoomToPoint(
    {
      x: offsetWidth / 2,
      y: offsetHeight / 2
    },
    0.3
  )
  commonStore.editor = editor
  commonStore.drawArea.target = rect
}

onMounted(() => {
  initEditor()
})
</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .header {
    width: 100%;
    height: 50px;
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .quash {
      height: 100%;
      display: flex;
      align-items: center;
      border-right: 1px solid #eee;
      .item {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
  .container {
    width: 100%;
    height: calc(100% - 50px);
    background: #d1eaff;
    position: relative;
    .slide {
      position: absolute;
      top: 0;
      height: 100%;
      background: #fff;
      z-index: 1;
      &.slide-left {
        left: 0;
        display: flex;
        .left-bar {
          width: 50px;
          height: 100%;
          border-right: 1px solid #eee;
        }
        .left-box {
          width: 280px;
        }
        .toggle {
          width: 20px;
          height: 50px;
          line-height: 50px;
          position: absolute;
          background: #fff;
          text-align: center;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      &.slide-right {
        right: 0;
        .toggle {
          width: 20px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          position: absolute;
          background: #fff;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .right-box {
          width: 330px;
        }
      }
    }
    .editor-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
