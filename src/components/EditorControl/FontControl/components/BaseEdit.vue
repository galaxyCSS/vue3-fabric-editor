<template>
  <div class="base-edit">
    <div class="item" v-for="item in baseEdit" :key="item.label" @click="baseEditAc(item)">
      <div v-if="item.label === '透明度'">
        <el-popover :width="200" trigger="click">
          <template #reference>
            <div>
              <el-tooltip effect="dark" :content="item.label">
                <svg-icon :icon="item.icon"></svg-icon>
              </el-tooltip>
            </div>
          </template>
          <div><el-slider v-model="fontOpacity" @change="opacityChange" /></div>
        </el-popover>
      </div>
      <div v-else>
        <el-tooltip effect="dark" :content="item.label">
          <svg-icon :icon="item.icon"></svg-icon>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SVgIcon from '@/components/common/SvgIcon.vue'
import { useCommonStore } from '@/store/common'
const commonStore = useCommonStore()
const fontOpacity = ref(100)
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
const opacityChange = (val) => {
  let terget = commonStore.editTarget
  const editor = commonStore.editor
  terget.set({
    opacity: val / 100
  })
  editor.renderAll()
}
const cloneAc = async () => {
  let target = commonStore.editTarget
  const editor = commonStore.editor
  let cloneTarget = await target.clone()
  cloneTarget.set({
    top: cloneTarget.top - 30,
    left: cloneTarget.left - 30
  })
  editor.add(cloneTarget)
}
const delAc = () => {
  let target = commonStore.editTarget
  const editor = commonStore.editor
  editor.remove(target)
}
const baseEditAc = (item) => {
  const label = item.label
  switch (label) {
    case '创建副本':
      cloneAc()
      break
    case '删除':
      delAc()
      break
  }
}
onMounted(() => {
  let target = commonStore.editTarget
  // 初始化元素状态
  const { opacity } = target
  fontOpacity.value = opacity * 100
})
</script>

<style scoped>
.base-edit {
  display: flex;
  border-bottom: 1px solid #eee;
  .item {
    padding: 5px;
    cursor: pointer;
  }
}
</style>
