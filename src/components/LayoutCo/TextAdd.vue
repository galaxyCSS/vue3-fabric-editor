<template>
  <div class="text-control">
    <div class="tab">
      <div class="item" @click="createTextAc">
        <svg-icon icon="wenzi1" class="item-icon"></svg-icon>
        <span class="label">添加文字</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/common/SvgIcon.vue'
import { Textbox } from 'fabric'
import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()
const createTextAc = () => {
  const { width, height } = commonStore.container
  const editor = commonStore.editor
  const createText = new Textbox('双击编辑文字', {
    originX: 'center',
    originY: 'center',
    left: width / 2,
    top: height / 2,
    fontSize: 76,
    fontWeight: 600
    // fontFamily: 'DaoLiTi',
    // fill: 'rgba(0,0,0,0.5)'
  })
  editor.add(createText)
}
</script>

<style scoped>
.text-control {
  .tab {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #eee;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      .item-icon {
        margin-bottom: 3px;
      }
      .label {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
