import {createApp} from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import axios from 'axios';
import func from './utils/UserFunc';//获取用户信息的全局方法

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';


const app = createApp(App)
// axios.defaults.baseURL = 'http://43.138.71.108/api';
// axios.defaults.baseURL = 'http://localhost/api/';
axios.defaults.baseURL = '/api/';

app.use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(ElementPlus)
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$userId = '' //全局属性用户ID
app.config.globalProperties.$getUser = func //全局方法获取用户信息(返回值为JSON格式）
app.config.globalProperties.$axios = axios