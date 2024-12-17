import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({ options: '1' })
})
