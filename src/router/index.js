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
        meta: { title: '消息列表', icon: 'table' }
      },
      {
        path: 'publishMessage',
        name: 'publishMessage',
        component: () => import('@/views/message/publishMessage'),
        meta: { title: '发布信息', icon: 'tree' }
      },
      {
        path: 'messageDetail',
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
        meta: { title: '知识库列表', icon: 'table' }
      },
      {
        path: 'publishKnowledge',
        name: 'publishKnowledge',
        component: () => import('@/views/knowledge/publishKnowledge'),
        meta: { title: '知识库发布', icon: 'tree' }
      },
      {
        path: 'knowledgeDetail',
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
    meta: { title: '林技问答', icon: 'question' },
    children: [
      {
        path: 'questionList',
        name: 'questionList',
        component: () => import('@/views/question/questionList'),
        meta: { title: '林技问答列表', icon: 'question' }
      },
      {
        path: 'questionDetail',
        name: 'questionDetail',
        hidden: true,
        component: () => import('@/views/question/questionDetail'),
        meta: { title: '详情' }
      }
    ]
  },

  // app端
  {
    path: '/app/login',
    name: 'appLogin',
    component: () => import('@/views/app/login')
  },
  {
    path: '/app/register',
    name: 'appRegister',
    component: () => import('@/views/app/register')
  },
  {
    path: '/app/Home',
    name: 'appHome',
    component: () => import('@/views/app')
  },
  {
    path: '/app/messageList',
    name: 'appMessageList',
    component: () => import('@/views/message/messageList'),
    hidden: true
  },
  {
    path: '/app/messageDetail',
    name: 'appMessageDetail',
    component: () => import('@/views/app/message/messageDetail'),
    hidden: true
  },
  {
    path: '/app/knowledgeList',
    name: 'appKnowledgeList',
    component: () => import('@/views/knowledge/knowledgeList'),
    hidden: true
  },
  {
    path: '/app/knowledgeDetail',
    name: 'appKnowledgeDetail',
    component: () => import('@/views/knowledge/knowledgeDetail'),
    hidden: true
  },
  {
    path: '/app/questionList',
    name: 'appQuestionList',
    component: () => import('@/views/question/questionList'),
    hidden: true
  },
  {
    path: '/app/questionDetail',
    name: 'appQuestionDetail',
    component: () => import('@/views/question/questionDetail'),
    hidden: true
  },

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

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
