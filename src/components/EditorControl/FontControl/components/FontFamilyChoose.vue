<template>
  <div class="font-family">
    <div class="label" @click="backAc">
      <span><svg-icon icon="zuojiantou"></svg-icon></span>
      <span>字体</span>
    </div>
    <div class="list">
      <div
        :class="['item', useFontFamilyCode === key ? 'active' : '']"
        v-for="(val, key) in fontFamilyCodeMap"
        @click="chooseFontFamiyAc(key)"
      >
        <div class="bg" :style="{ backgroundImage: `url(/src/assets/img/font/${val}.png)` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import { fontFamilyCodeMap } from '@/assets/data/staticData'
import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()
const editTarget = commonStore.editTarget
const editor = commonStore.editor
const model = defineModel()
const useFontFamilyCode = ref()
const backAc = () => {
  model.value = false
}
const chooseFontFamiyAc = (key) => {
  if (key !== 'DEFAULT') {
    editTarget.set({
      fontFamily: key
    })
  } else {
    editTarget.set({
      fontFamily: ''
    })
  }
  // 更新当前编辑对象字体类型CODE
  editTarget.fontFamilyCode = key
  useFontFamilyCode.value = key
  editor.renderAll()
}
onMounted(() => {
  useFontFamilyCode.value = editTarget.fontFamilyCode
})
</script>

<style scoped>
.font-family {
  .label {
    margin-bottom: 15px;
  }
  .list {
    .item {
      margin-bottom: 10px;
      background: #eee;
      border-radius: 5px;
      cursor: pointer;
      border: 2px solid transparent;
      &.active {
        border-color: var(--el-color-primary);
      }
      .bg {
        width: 230px;
        height: 45px;
        background-size: contain;
        margin: 0 auto;
      }
    }
  }
}
</style>
