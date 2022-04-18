import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://123.12.123.12:8000';
createApp(App).use(store).use(router).use(store).use(router).mount('#app')
