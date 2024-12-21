<template>
  <div class="font-control">
    <div class="label">
      <span>字体编辑</span>
    </div>
    <BaseEdit></BaseEdit>
    <div class="font-type">
      <div
        class="bg"
        :style="{ backgroundImage: `url(/src/assets/img/font/${fontFamilyCodeMap[editTarget.fontFamilyCode]}.png)` }"
      ></div>
      <div class="label">
        <span>字体</span>
        <svg-icon icon="xiajiantoucu"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import BaseEdit from './components/BaseEdit.vue'
import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()
const editTarget = commonStore.editTarget
const fontFamilyCodeMap = {
  DEFAULT: 'default'
}
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
onMounted(() => {
  console.log(editTarget.fontFamilyCode)
})
</script>

<style scoped>
.font-control {
  .label {
    margin-bottom: 10px;
  }
  .font-type {
    display: flex;
    align-items: center;
    background: #eee;
    border-radius: 5px;
    .bg {
      width: 230px;
      height: 45px;
      background-size: contain;
    }
    .label {
      margin-bottom: 0;
      cursor: pointer;
    }
  }
}
</style>
