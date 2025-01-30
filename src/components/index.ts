// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'

// 全局对象
const allGlobalComponents = { SvgIcon, Pagination }

// 对外暴露一个插件对象
export default {
  // 务必叫做install方法
  install(app) {
    Object.keys(allGlobalComponents).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponents[key])
    })
  },
}
