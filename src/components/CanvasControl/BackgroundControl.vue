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
          <span v-if="uploadData" @click="deleteBgAc">删除</span>
          <span v-if="uploadData" @click="addBgAc">添加</span>
        </div>
        <div class="photo-view" v-if="uploadData">
          <img :src="uploadData" alt="" ref="photoViewRef" class="size-add" />
          <img :src="uploadData" alt="" class="size-view" />
        </div>
      </div>
    </div>
    <div class="item-control"></div>
  </div>
</template>

<script setup>
import { markRaw, ref, watch } from 'vue'
import * as fabric from 'fabric'
import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()
const drawArea = commonStore.drawArea
const uploadData = ref('')
const photoViewRef = ref('')
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
      margin-bottom: 10px;
    }
    .upload {
      .upload-t {
        display: flex;
        align-items: center;
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
  }
}
</style>
