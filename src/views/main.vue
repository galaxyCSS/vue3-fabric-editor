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
        <el-button type="primary" @click="downloadAc">下载</el-button>
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
      <SizeScaleControl :class="rightToggle ? 'move' : ''"></SizeScaleControl>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import SizeControl from '@/components/CanvasControl/SizeControl.vue'
import SizeScaleControl from '@/components/CanvasControl/SizeScaleControl.vue'
import { useCommonStore } from '@/store/common'
import { downloadFileByBase64 } from '@/utils'
import * as fabric from 'fabric'
const commonStore = useCommonStore()
const leftToggle = ref(false)
const rightToggle = ref(false)
const editorWrapRef = ref()
const editorRef = ref()
let initVpt = []
const changeToggle = (dir) => {
  if (dir === 'left') {
    leftToggle.value = !leftToggle.value
  } else {
    rightToggle.value = !rightToggle.value
  }
}
const downloadAc = () => {
  const { width, height } = commonStore.container
  const editor = commonStore.editor
  const drawArea = commonStore.drawArea
  // 恢复画布缩放
  editor.zoomToPoint(
    {
      x: width / 2,
      y: height / 2
    },
    1
  )
  let baseImg = editor.toDataURL({
    format: 'png',
    left: (width - drawArea.width) / 2,
    top: (height - drawArea.height) / 2,
    width: drawArea.width,
    height: drawArea.height
  })
  // 重新缩放
  editor.zoomToPoint(
    {
      x: width / 2,
      y: height / 2
    },
    0.3
  )
  // 下载图片
  downloadFileByBase64(baseImg, 'demo')
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
    drawArea.scale / 100
  )
  // 初始化画布平移
  editor.on('mouse:down', (opt) => {
    let evt = opt.e
    if (evt.altKey === true) {
      initVpt = editor.viewportTransform
      // 是否按住alt
      editor.isDragging = true
      editor.lastPosX = evt.clientX
      editor.lastPosY = evt.clientY
    }
  })
  editor.on('mouse:move', (opt) => {
    if (editor.isDragging) {
      let evt = opt.e
      let vpt = editor.viewportTransform
      vpt[4] += evt.clientX - editor.lastPosX
      vpt[5] += evt.clientY - editor.lastPosY
      editor.requestRenderAll()
      editor.lastPosX = evt.clientX
      editor.lastPosY = evt.clientY
    }
  })
  editor.on('mouse:up', (opt) => {
    let evt = opt.e
    editor.setViewportTransform(editor.viewportTransform)
    editor.isDragging = false
  })

  commonStore.editor = markRaw(editor)
  commonStore.drawArea.target = markRaw(rect)
  commonStore.container.width = offsetWidth
  commonStore.container.height = offsetHeight
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
          padding: 15px;
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
