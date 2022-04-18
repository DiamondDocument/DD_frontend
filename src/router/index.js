import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/api/login',
    name: 'login',
    component: () => import('../views/api/Login.vue')
  },
  {
    path: '/api/register',
    name: 'register',
    component: () => import('../views/api/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
