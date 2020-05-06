import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(VueAxios, axios)
// Vue.use(Router)
Vue.config.productionTip = false

import global_ from '@/utils/Global'
Vue.prototype.GLOBAL = global_

// 导航钩子，全局钩子
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let isLogin
  if (!token) {
    isLogin = false
  } else {
    isLogin = true
  }
  // isLogin = true
  if (!isLogin) {
    if (to.path !== '/login') {
      return next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      return next({ path: '/' })
    }
    next()
  }
})

//全局请求拦截
axios.interceptors.request.use((config) => {
  //请求的接口不是登录和验证码接口
  if (['/sysAdmin/login', '/captcha'].indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
  }
  return config
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err)
// }
