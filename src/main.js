import {createApp} from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import axios from 'axios'
import * as getUser from '@/utils/getUser'//获取用户信息的全局方法
const app = createApp(App)
axios.defaults.baseURL = 'http://123.12.123.12:8000';
app.use(store)
    .use(router)
    .use(store)
    .use(router)
    .use(VueAxios, axios).mount('#app')
app.config.globalProperties.$getUser = getUser
app.config.globalProperties.$axios = axios