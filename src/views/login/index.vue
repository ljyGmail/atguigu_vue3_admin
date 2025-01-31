<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'

// 引用用户相关的小仓库
import useUserStore from '@/store/modules/user'

// 收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })

let userStore = useUserStore()
// 获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()

// 定义变量控制按钮加载效果
let loading = ref(false)

// 登录按钮的回调
const login = async () => {
  // 要保证全部表单项校验通过后再发请求
  await loginForms.value.validate()

  // 加载效果: 开始加载
  loading.value = true
  // 点击登录按钮以后干什么？
  // 通知仓库发登录请求
  // 登录成功 -> 首页展示数据的地方
  // 登录失败 -> 弹出登录失败的信息
  try {
    // 可以书写.then的写法
    // 保证登录成功
    await userStore.userLogin(loginForm)
    // 编程式导航跳转到展示数据的首页
    // 判断登录的时候，路由路径当中是否有query测试，如果有就往query参数跳转，否则就跳转到首页
    let redirect = $route.query.redirect

    $router.push({ path: redirect || '/' })
    // 登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi, ${getTime()}好`,
    })
    // 登录成功，加载效果也消失
    loading.value = false
  } catch (error) {
    // 登录失败，加载效果消失
    loading.value = false
    // 登录失败的提示信息
    ElNotification({
      type: 'error',
      message: error.message,
    })
  }
}

// 自定义校验规则函数
const validateUsername = (rule: any, value: any, callback: any) => {
  // rule: 校验规则对象
  // value: 表单元素文本内容
  // callback函数: 如果符合条件，调用callback放行通过即可
  //             如果不符合条件，调用callback，注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
// 定义表单校验需要配置对象
const rules = {
  username: [
    // 规则对象属性:
    // required: 代表这个字段务必要校验的
    // min: 文本长度至少多少位
    // max: 文本长度最多多少位
    // message: 错误的提示信息
    // trigger: 出发校验表单的时机 change -> 文本发生变化时出发校验，blue -> 失去焦点时触发校验
    /*
    {
      required: true,
      min: 6,
      max: 10,
      message: '账号长度在6位到10位之间',
      trigger: 'change',
    },
    */
    { trigger: 'change', validator: validateUsername },
  ],
  password: [
    /*
    {
      required: true,
      min: 6,
      max: 15,
      message: '密码长度在6位到15位之间',
      trigger: 'change',
    },
    */
    { trigger: 'change', validator: validatePassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    width: 80%;
    top: 30vh;
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    .login_btn {
      width: 100%;
    }

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
  }
}
</style>
