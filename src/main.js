import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import less from 'less'
import './assets/css/default.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import * as echarts from 'echarts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
axios.interceptors.response.use(config =>{
  NProgress.done();
  return config
})


Vue.use(less)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

Vue.filter('dateFormat',v=>{
  const date=new Date(v);
  const y=date.getFullYear()
  const m=(date.getMonth()+1+'').padStart(2,'0')
  const d = (date.getDate() + '').padStart(2, '0')

  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')