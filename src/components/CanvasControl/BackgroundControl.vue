<template>
  <div class="background-control">
    <div class="label">
      <span>背景</span>
    </div>
    <div class="item-control">
      <div class="label">背景图片</div>
      <div class="upload">
        <div class="upload-t">
          <div class="upload-cover">
            <label for="uploadFile">上传图片</label>
            <input type="file" @change="uploadChange" name="uploadFile" id="uploadFile" />
          </div>
          <span v-if="uploadData" @click="deleteBgAc" class="option">删除</span>
          <span v-if="uploadData" @click="addBgAc" class="option">添加</span>
        </div>
        <div class="photo-view" v-if="uploadData">
          <img :src="uploadData" alt="" ref="photoViewRef" class="size-add" />
          <img :src="uploadData" alt="" class="size-view" />
        </div>
      </div>
    </div>
    <div class="item-control">
      <div class="label">背景颜色</div>
      <div class="color-group">
        <div class="item custom-item">
          <el-color-picker v-model="cusColor" show-alpha @change="colorChange" />
        </div>
        <div
          class="item"
          v-for="item in colorGroup"
          :key="item"
          :style="{ background: item }"
          @click="colorChange(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw, ref, watch } from 'vue'
import * as fabric from 'fabric'
import { useCommonStore } from '@/store/common'
const colorGroup = [
  '#f5222d',
  '#ff7a45',
  '#ffa940',
  '#ffc53d',
  '#ffec3d',
  '#bae637',
  '#73d13d',
  '#36cfc9',
  '#4096ff',
  '#597ef7',
  '#9254de',
  '#f759ab',
  '#fff'
]
const commonStore = useCommonStore()
const drawArea = commonStore.drawArea
const uploadData = ref('')
const photoViewRef = ref('')
const cusColor = ref('')
const uploadChange = (ele) => {
  const file = ele.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    uploadData.value = reader.result
  }
}
const deleteBgAc = () => {
  const editor = commonStore.editor
  uploadData.value = ''
  editor.remove(commonStore.backImg)
}
const addBgAc = () => {
  const editor = commonStore.editor
  const backImgcontainer = commonStore.backImgcontainer
  const { width, height } = commonStore.container
  const { offsetWidth, offsetHeight } = photoViewRef.value
  let backImg = new fabric.FabricImage(photoViewRef.value, {
    // 注添加图片缩放至绘制区域大小，注意是原始图片大小，而不是页面css限制的图片大小
    scaleX: drawArea.width / offsetWidth,
    scaleY: drawArea.height / offsetHeight,
    left: (width - drawArea.width) / 2,
    top: (height - drawArea.height) / 2,
    selectable: false
  })
  editor.add(backImg)
  commonStore.backImg = markRaw(backImg)
  backImgcontainer.width = offsetWidth
  backImgcontainer.height = offsetHeight
}
const colorChange = (value) => {
  const editor = commonStore.editor
  cusColor.value = value
  drawArea.target.set({
    fill: value
  })
  editor.renderAll()
}
</script>

<style scoped>
.background-control {
  .label {
    margin-bottom: 10px;
  }
  .item-control {
    .label {
      font-size: 12px;
      color: #999;
      margin: 10px 0;
    }
    .upload {
      .upload-t {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .upload-cover {
          padding: 5px 10px;
          border: 1px solid #eee;
          margin-right: 10px;
          font-size: 14px;
          border-radius: 5px;
          color: #666;
          label {
            cursor: pointer;
          }
        }
        .option {
          font-size: 12px;
          padding: 0 5px;
          color: var(--el-color-primary);
          cursor: pointer;
        }
      }
      #uploadFile {
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
    .photo-view {
      position: relative;
      width: 200px;
      .size-add {
        position: absolute;
        visibility: hidden;
      }
      .size-view {
        width: 100%;
      }
    }
    .color-group {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #eee;
        cursor: pointer;
        &.custom-item {
          border: none;
          :deep(.el-color-picker__trigger) {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
