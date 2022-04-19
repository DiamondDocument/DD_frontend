import {createApp} from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import axios from 'axios'
import func from './utils/UserFunc'//获取用户信息的全局方法


const app = createApp(App)
axios.defaults.baseURL = 'http://123.12.123.12:8000';

app.use(store)
    .use(router)
    .use(store)
    .use(router)
    .use(VueAxios, axios).mount('#app')

app.config.globalProperties.$userId = '' //全局属性用户ID
app.config.globalProperties.$getUser = func //全局方法获取用户信息(返回值为JSON格式）
app.config.globalProperties.$axios = axios