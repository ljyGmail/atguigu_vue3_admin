// 小仓库: layout组件相关配置的仓库
import { defineStore } from 'pinia'

let useLayoutSettingsStore = defineStore('SettingsStore', {
  state: () => {
    return {
      fold: false, // 用于控制菜单折叠还是展开
    }
  },
})

export default useLayoutSettingsStore
