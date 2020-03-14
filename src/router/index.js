import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout, UserLayout } from '@/layouts'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('@/views/home/Home')
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: '关于' },
        component: () => import('@/views/about/About')
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('@/views/login/Login')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/exception/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 })
})
export default router
