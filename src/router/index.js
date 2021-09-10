import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import AppIndex from '@/components/home/AppIndex'
import HelloWorld from "../components/HelloWorld";
import Login from '@/components/Login'
import Home from '@/components/Home'
import GoodsIndex from '@/components/basic/GoodsIndex'
import OrderIndex from '@/components/basic/OrderIndex'
import OrderState0 from '@/components/order_type/OrderState0'
import OrderState2 from '@/components/order_type/OrderState2'
import OrderState3 from '@/components/order_type/OrderState3'



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
          name: 'HelloWorld',
          component: HelloWorld,
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
          path: '/discuss',
          // name: 'GoodsIndex',
          // component: GoodsIndex,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/orderIndex',
          name: 'OrderIndex',
          component: OrderIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/order/state/0',
          name: 'OrderState0',
          component: OrderState0,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/order/state/2',
          name: 'OrderState2',
          component: OrderState2,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/order/state/3',
          name: 'OrderState3',
          component: OrderState3,
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
