import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import GoodsIndex from '@/components/basic/GoodsIndex'
import OrderIndex from '@/components/basic/OrderIndex'


Vue.use(Router)

export default new Router({
  // mode: 'history',//运行项目，访问不加 # 号的 http://localhost:8080/login ，成功加载页面。
  routes: [
    // 下面都是固定的写法
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/goodsIndex',
          name: 'GoodsIndex',
          component: GoodsIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/orderIndex',
          name: 'OrderIndex',
          component: OrderIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]

})
