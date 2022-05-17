import { createRouter, createWebHistory } from 'vue-router'


//团队相关路由
const teamCreate =  {
  path: '/team/create',
  name: 'teamCreate',
  component:() =>import('../views/Team/Create.vue'),
};
const teamInformation = {
  path: '/team/information/:teamId',
  name: 'team',
  component:() =>import('../views/Team/Team.vue'),
};
const teamList = {
  path: '/team/list/key?',
  name: 'teamList',
  component:() =>import('../views/Team/List.vue'),
};
const otherTeamList = {
  path: '/team/list',
  name: 'otherTeamList',
  component:() =>import('../views/Team/OtherList.vue'),
};

//用户相关路由
const userInformation = {
  path: '/user/information/:userId?',
  name: 'userInformation',
  component:() =>import('../views/User/Information.vue'),
};
const userInvite = {
  path: '/user/invite/:userId',
  name: 'userInvite',
  component:() =>import('../views/User/Invite.vue'),
};
const userApply = {
  path: '/user/apply/:userId',
  name: 'userApply',
  component:() =>import('../views/User/Apply.vue'),
};

//空间相关路由
const space = {
  path: 'space',
  name: 'space',
  component:() =>import('../views/Space/Space.vue'),
};
const otherSpace = {
  path: 'space',
  name: 'otherSpace',
  component:() =>import('../views/Space/OtherSpace.vue'),
};
const teamSpace = {
  path: 'space',
  name: 'teamSpace',
  component:() =>import('../views/Space/TeamSpace.vue'),
};
const recent = {
  path: 'space/recent',
  name: 'recent',
  component:() =>import('../views/Space/Recent.vue'),
};
const collection = {
  path: 'space/collection',
  name: 'collection',
  component:() =>import('../views/Space/Collection.vue'),
};
const otherCollection = {
  path: 'space/collection',
  name: 'otherCollection',
  component:() =>import('../views/Space/OtherCollection.vue'),
};
const recycle = {
  path: 'space/recycle',
  name: 'recycle',
  component:() =>import('../views/Space/Recycle.vue'),
};
const teamRecycle = {
  path: 'space/recycle',
  name: 'teamRecycle',
  component:() =>import('../views/Space/TeamRecycle.vue'),
};


//消息通知路由
const message = {
  path: 'message',
  name: 'message',
  component:() =>import('../views/Message/Message.vue'),
};

//模板相关路由
const recommendTemplate = {
  path: 'template/recommend',
  name: 'recommendTemplate',
  component:() =>import('../views/Template/Recommend.vue'),
};
const myTemplate = {
  path: 'template/my',
  name: 'myTemplate',
  component:() =>import('../views/Template/My.vue'),
};
const collectionTemplate = {
  path: 'template/collection',
  name: 'collectionTemplate',
  component:() =>import('../views/Template/Collection.vue'),
};
const templateDetail = {
  path: 'template/detail/:templateId',
  name: 'templateDetail',
  component:() =>import('../views/Template/Detail.vue'),
};
//文档路由
const documentEdit = {
  path: 'document/edit/:documentId',
  name: 'documentEdit',
  component:() =>import('../views/Document/Edit.vue'),
}

//工作台路由
const table = {
  path: '/table/:info',
  name: 'table',
  component:() =>import('../views/Table/Table.vue'),
  children: [
    //消息
    message,
    //用户
    userInvite,
    userInformation,
    userApply,
    //团队
    teamList,
    teamCreate,
    teamInformation,
    otherTeamList,
    //空间
    recent,
    space,
    collection,
    recycle,
    teamSpace,
    teamRecycle,
    otherCollection,
    otherSpace,
    //模板
    recommendTemplate,
    myTemplate,
    collectionTemplate,
    templateDetail,
    //文档
    documentEdit,
  ],
};
// const teamTable = {
//   path: '/team-table/:tableId',
//   name: 'teamTable',
//   component:() =>import('../views/Table/TeamTable.vue'),
//   children: [
//     //消息
//     teamMessage,
//     //用户
//     userInvite,
//     userInformation,
//     userApply,
//     //团队
//     teamInformation,
//     //空间
//     teamSpace,
//     teamRecycle,
//   ],
// }
// const otherTable = {
//   path: '/other-table/:tableId',
//   name: 'otherTable',
//   component:() =>import('../views/Table/OtherTable.vue'),
//   children: [
//     //消息
//     otherMessage,
//     //用户
//     userInformation,
//     //团队
//     otherTeamList,
//     teamInformation,
//     //空间
//     otherCollection,
//     otherSpace,
//   ],
// }

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
  table,

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
