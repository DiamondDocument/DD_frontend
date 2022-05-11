import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
  {
    path: '/space/:type',
    //type = collection, my, team, recycle
    name: 'space',
    component: ()=> import('../views/Space')
  },

//--------------------------THR 调试用---------------------------

  {
    path: '/teamCreate',
    //type = collection, my, team, recycle
    name: 'teamCreate',
    component: ()=> import('../views/Team/Create')
  },
  {
    path: '/team',
    //type = collection, my, team, recycle
    name: 'team',
    component: ()=> import('../views/Team/Team')
  }

//---------------------------------------------------------
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
