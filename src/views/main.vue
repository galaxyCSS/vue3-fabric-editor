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
        <div class="left-bar">
          <EditorBar></EditorBar>
        </div>
        <div class="left-box" v-show="!leftToggle">
          <TextAdd></TextAdd>
        </div>
        <div class="toggle" @click="changeToggle('left')">
          <svg-icon :icon="leftToggle ? 'youjiantou' : 'zuojiantou'"></svg-icon>
        </div>
      </div>
      <div class="slide slide-right">
        <div class="right-box" v-show="!rightToggle">
          <SizeControl v-if="commonStore.editorControlType.includes('SIZE')"></SizeControl>
          <BackgroundControl v-if="commonStore.editorControlType.includes('BACKGROUND')"></BackgroundControl>
          <FontControl v-if="commonStore.editorControlType.includes('TEXT')"></FontControl>
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
import FontControl from '@/components/EditorControl/FontControl/FontControl.vue'
import EditorBar from '@/components/LayoutCo/EditorBar.vue'
import BackgroundControl from '@/components/CanvasControl/BackgroundControl.vue'
import TextAdd from '@/components/LayoutCo/TextAdd.vue'
import { useCommonStore } from '@/store/common'
import { downloadFileByBase64 } from '@/utils'
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
const downloadAc = () => {
  const { width, height } = commonStore.container
  const editor = commonStore.editor
  const drawArea = commonStore.drawArea
  // 获取偏移值，需要计算恢复缩放比例下的实际值
  // let offsetX = editor.endOffsetX ? (editor.endOffsetX - editor.startOffsetX) / (editor.moveScale / 100) : 0
  // let offsetY = editor.endOffsetY ? (editor.endOffsetY - editor.startOffsetY) / (editor.moveScale / 100) : 0
  // 下载完再次移动需要叠加下载前移动的偏移值
  // if (editor.lastOffsetX) offsetX += editor.lastOffsetX
  // if (editor.lastOffsetY) offsetX += editor.lastOffsetY
  // 恢复绘制区域位置(最佳方案，替代计算偏移后叠加)
  editor.setViewportTransform(editor.initVpt)
  // 恢复画布缩放
  editor.zoomToPoint(
    {
      x: width / 2,
      y: height / 2
    },
    1
  )
  // 记录下载前平移的偏移值
  // editor.lastOffsetX = offsetX
  // editor.lastOffsetY = offsetY
  let baseImg = editor.toDataURL({
    format: 'png',
    // 叠加偏移值 + offsetX(已取消的方案)
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
    drawArea.scale / 100
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
  // 定制字体导入
  const fontMap = {
    DaoLiTi: 'url(/font/AlimamaDaoLiTi.woff2)'
  }
  const fontDaoLiTi = new FontFace('DaoLiTi', fontMap.DaoLiTi, {
    style: 'normal',
    weight: 'normal'
  })
  // 绘制区域裁切
  editor.clipPath = rect

  Promise.all([fontDaoLiTi.load()]).then(() => {
    document.fonts.add(fontDaoLiTi)
  })
  // 初始化绘制区域按中心点缩放
  editor.zoomToPoint(
    {
      x: offsetWidth / 2,
      y: offsetHeight / 2
    },
    drawArea.scale / 100
  )
  // 存储画布原始vpt
  let initVpt = JSON.parse(JSON.stringify(editor.viewportTransform))
  editor.initVpt = markRaw(initVpt)
  // 初始化画布平移
  editor.on('mouse:down', (opt) => {
    let evt = opt.e
    if (evt.altKey === true) {
      // 是否按住alt
      editor.isDragging = true
      editor.lastPosX = evt.clientX
      editor.lastPosY = evt.clientY
      // 记录点击位置
      // editor.startOffsetX = evt.clientX
      // editor.startOffsetY = evt.clientY
      // 记录移动时的缩放比例
      // editor.moveScale = drawArea.scale
    }
  })
  editor.on('mouse:move', (opt) => {
    if (editor.isDragging) {
      let evt = opt.e
      let vpt = editor.viewportTransform
      vpt[4] += evt.clientX - editor.lastPosX
      vpt[5] += evt.clientY - editor.lastPosY
      editor.renderAll()
      editor.lastPosX = evt.clientX
      editor.lastPosY = evt.clientY
    }
  })

  editor.on('mouse:up', (opt) => {
    editor.isDragging = false
  })
  // 注册元素选中事件
  editor.on('selection:created', (opt) => {
    const { selected } = opt
    commonStore.editTarget = markRaw(selected[0])
    // 区分选中元素类型以显示不同编辑控件
    if (selected[0].text) {
      commonStore.editorControlType = ['TEXT']
    }
  })
  // 注册元素取消选中事件
  editor.on('selection:cleared', (opt) => {
    commonStore.editorControlType = ['SIZE', 'BACKGROUND']
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
          padding: 15px;
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
