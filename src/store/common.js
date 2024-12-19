import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({
    // 画布对象
    editor: null,
    editorVpt: [],
    // 绘制区域
    drawArea: {
      width: 1240,
      height: 2200,
      target: null,
      scale: 30
    },
    // 布局容器
    container: {
      width: 0,
      height: 0
    }
  })
})
