import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({
    editor: null,
    drawArea: {
      width: 1240,
      height: 2200,
      target: null
    }
  })
})
