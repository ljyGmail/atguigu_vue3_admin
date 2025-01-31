// 路由鉴权,鉴权：项目当中路由能不能被访问的权限的设置
// (某一个路由什么条件下可以访问，什么条件下不可以被访问)
import router from '@/router'
import settings from './settings'
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

// 获取用户相关的小仓库内部的token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'

let userStore = useUserStore(pinia)

// 全局守卫：项目当中任意路由切换都会触发的钩子

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${settings.title} - ${to.meta.title}`
  // to: 将要访问哪个路由
  // from: 从哪个路由而来
  // next: 路由的放行函数
  nprogress.start()
  // 获取token，去判断用户是否登录
  const token = userStore.token
  // 获取用户的名字
  const username = userStore.username

  // 用户登录判断
  if (token) {
    // 登录成功后访问login页面，不能访问，指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 登录成功后访问其余六个路由(登录排除)
      // 有用户信息
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到用户信息后再放行
        try {
          // 获取应用信息后放行
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期: 获取不到用户信息
          // 或者用户手动修改了本地存储的token
          // 退出登录->用户相关的数据清空
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录判断
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

// 第一个问题: 任意路由的切换实现进度条功能 - nprogress
// 第二个问题: 路由鉴权(路由组件访问权限的设置)
// 全部的路由组件: 登录|404|任意路由|首页|数据大屏|权限管理(3个子路由)|商品管理(4个子路由)

// 用户未登录: 可以访问login，其余六个路由不能访问(指向login)
// 用户登录成功: 不可以访问login(指向首页)，其余的路由可以访问
