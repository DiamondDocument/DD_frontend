import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/Welcome.vue')
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
    path: '/template',
    name: 'template',
    component: () => import('../views/User/Template.vue')
  },
  {
    path: '/TeamTable',
    name: 'TeamTable',
    component: () => import('../views/TeamTable.vue')
  },
  {
    //path: '/table/:teamId(\\d+)?',
    path: '/table',
    name: 'table',
    component:() =>import('../views/Table.vue'),
    children:[
      // {
      //   path: 'team/:teamId(\\d+)?',
      //   name: 'team',
      //   component:() =>import('../views/Team/Team.vue'),
      // },
      // {
      //   path: 'team/list/:search',
      //   name: 'teamList',
      //   component:() =>import('../views/Team/List.vue'),
      // },
      // {
      //   path: 'team/create',
      //   name: 'teamCreate',
      //   component:() =>import('../views/Team/Create.vue'),
      // },
      // {
      //   path: 'user/information/:userId?',
      //   name: 'userInformation',
      //   component:() =>import('../views/User/Information.vue'),
      // },
      // {
      //   path: 'template/:type',
      //   //type为recommend、my、collection和message
      //   name: 'template',
      //   component:() =>import('../views/Template/Template.vue'),
      // },
    ],
  },

//---------------------- for THR test ------------------
  {
    path: '/team/create',
    name: 'teamCreate',
    component:() =>import('../views/Team/Create.vue'),
  },
  {
    path: '/team/:teamId(\\d+)?',
    name: 'team',
    component:() =>import('../views/Team/Team.vue'),
  },
  {
    path: '/user/information',
    name: 'userInformation',
    component:() =>import('../views/User/Information'),
  },
  {
    path: '/team/list/:search',
    name: 'teamList',
    component:() =>import('../views/Team/List.vue'),
  },
//------------------------------------------------------
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
