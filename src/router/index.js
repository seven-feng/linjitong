import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },

  // web端
  {
    path: '/',
    redirect: '/message',
    hidden: true
  },
  // 通知公告
  {
    path: '/message',
    component: Layout,
    redirect: '/message/messageList',
    name: 'message',
    meta: { title: '通知公告', icon: 'message' },
    children: [
      {
        path: 'messageList',
        name: 'messageList',
        component: () => import('@/views/message/messageList'),
        meta: { title: '消息列表', icon: 'list' }
      },
      {
        path: 'publishMessage',
        name: 'publishMessage',
        component: () => import('@/views/message/publishMessage'),
        meta: { title: '发布信息', icon: 'publish' }
      },
      {
        path: 'messageDetail/:id',
        name: 'messageDetail',
        hidden: true,
        component: () => import('@/views/message/messageDetail'),
        meta: { title: '详情' }
      }
    ]
  },
  // 空中课堂
  {
    path: '/knowledge',
    component: Layout,
    redirect: '/knowledge/knowledgeList',
    name: 'knowledge',
    meta: { title: '空中课堂', icon: 'knowledge' },
    children: [
      {
        path: 'knowledgeList',
        name: 'knowledgeList',
        component: () => import('@/views/knowledge/knowledgeList'),
        meta: { title: '知识库列表', icon: 'list' }
      },
      {
        path: 'publishKnowledge',
        name: 'publishKnowledge',
        component: () => import('@/views/knowledge/publishKnowledge'),
        meta: { title: '知识库发布', icon: 'publish ' }
      },
      {
        path: 'knowledgeDetail/:id',
        name: 'knowledgeDetail',
        hidden: true,
        component: () => import('@/views/knowledge/knowledgeDetail'),
        meta: { title: '详情' }
      }
    ]
  },
  // 林技问答
  {
    path: '/question',
    component: Layout,
    redirect: '/question/questionList',
    name: 'question',
    children: [
      {
        path: 'questionList',
        name: 'questionList',
        component: () => import('@/views/question/questionList'),
        meta: { title: '林技问答', icon: 'question' }
      },
      {
        path: 'questionDetail/:id',
        name: 'questionDetail',
        hidden: true,
        component: () => import('@/views/question/questionDetail'),
        meta: { title: '详情' }
      }
    ]
  },
  // 典型示范
  {
    path: '/model',
    component: Layout,
    redirect: '/model/modelList',
    name: 'model',
    meta: { title: '典型示范', icon: 'model' },
    children: [
      {
        path: 'modelList',
        name: 'modelList',
        component: () => import('@/views/model/modelList'),
        meta: { title: '典型示范列表', icon: 'list' }
      },
      {
        path: 'publishModel',
        name: 'publishModel',
        component: () => import('@/views/model/publishModel'),
        meta: { title: '典型示范发布', icon: 'publish' }
      },
      {
        path: 'modelDetail/:id',
        name: 'modelDetail',
        hidden: true,
        component: () => import('@/views/model/modelDetail'),
        meta: { title: '详情' }
      }
    ]
  },
  // 供求信息
  {
    path: '/supply',
    component: Layout,
    name: 'supply',
    children: [
      {
        path: 'questionList',
        name: 'questionList',
        component: () => import('@/views/question/questionList'),
        meta: { title: '供求信息', icon: 'supply' }
      }
    ]
  },
  // 乡土专家
  {
    path: '/expert',
    component: Layout,
    name: 'expert',
    children: [
      {
        path: 'questionList',
        name: 'questionList',
        component: () => import('@/views/question/questionList'),
        meta: { title: '乡土专家', icon: 'expert' }
      }
    ]
  },
  // 专家库
  {
    path: '/expertdb',
    component: Layout,
    name: 'expertdb',
    children: [
      {
        path: 'questionList',
        name: 'questionList',
        component: () => import('@/views/question/questionList'),
        meta: { title: '专家库', icon: 'expertdb' }
      }
    ]
  },
  // 系统消息
  {
    path: '/sysmessage',
    component: Layout,
    redirect: '/sysmessage/sysMessageList',
    name: 'message',
    meta: { title: '系统消息', icon: 'message' },
    children: [
      {
        path: 'sysMessageList',
        name: 'sysMessageList',
        component: () => import('@/views/sysmessage/sysMessageList'),
        meta: { title: '系统消息列表', icon: 'list' }
      },
      {
        path: 'publishSysMessage',
        name: 'publishSysMessage',
        component: () => import('@/views/sysmessage/publishSysMessage'),
        meta: { title: '发布系统消息', icon: 'publish' }
      },
      {
        path: 'sysMessageDetail/:id',
        name: 'sysMessageDetail',
        hidden: true,
        component: () => import('@/views/sysmessage/sysMessageDetail'),
        meta: { title: '详情' }
      }
    ]
  }

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 用户管理
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: { title: '用户管理', icon: 'expertdb', roles: ['admin'] },
    children: [
      {
        path: 'authority',
        name: 'authority',
        component: () => import('@/views/authority'),
        meta: { title: '权限管理', icon: 'expertdb', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
