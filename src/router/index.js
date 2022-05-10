import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/User/Register.vue')
  },
  {
    path: '/table/:teamId(\\d+)?',
    name: 'table',
    component:() =>import('../views/Table.vue'),
    children:[
      {
        path: 'team/:teamId(\\d+)?',
        name: 'team',
        component:() =>import('../views/Team/Team.vue'),
      },
      {
        path: 'team/list/:search',
        name: 'teamList',
        component:() =>import('../views/Team/List.vue'),
      },
      {
        path: 'team/create',
        name: 'teamCreate',
        component:() =>import('../views/Team/Create.vue'),
      },
      {
        path: 'user/information/:userId?',
        name: 'userInformation',
        component:() =>import('../views/User/Information.vue'),
      },
      {
        path: 'template/:type',
        //type为recommend、my、collection三种
        name: 'template',
        component:() =>import('../views/Template/Template.vue'),
      },
    ],
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/Message.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
