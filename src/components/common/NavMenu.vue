<template>
  <el-container>
    <el-aside width="200px">
  <el-menu default-active="/index" :collapse="collapsed"
           collapse-transition router :default-active="$route.path"
           unique-opened class="el-menu-vertical-demo">

    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

    </el-aside>

  </el-container>
</template>
<script>
  export default {
    name: 'leftnav',
    data() {
      return {
        collapsed: false,
        allmenu: []
      }
    },
    // 创建完毕状态(里面是操作)
    created() {
      // 获取图形验证码
      let res = {
        success: true,
        data: [
          {
            menuid: 100,
            icon: 'el-icon-menu',
            menuname: '基础管理',
            hasThird: null,
            url: null,
            menus: [
              {
                menuid: 101,
                icon: 'el-icon-s-goods',
                menuname: '商品管理',
                hasThird: 'N',
                url: 'goodsIndex',
                menus: null
              },
              {
                menuid: 102,
                icon: 'el-icon-position',
                menuname: '评论管理',
                hasThird: 'N',
                url: 'discuss',
                menus: null
              }
            ]
          },
          {
            menuid: 200,
            icon: 'el-icon-s-order',
            menuname: '订单管理',
            hasThird: null,
            url: null,
            menus: [
              {
                menuid: 201,
                icon: 'el-icon-document',
                menuname: '全部',
                hasThird: 'N',
                url: 'orderIndex',
                menus: null
              },
              {
                menuid: 202,
                icon: 'el-icon-document',
                menuname: '未支付',
                hasThird: 'N',
                url: 'order/state/0',
                menus: null
              },
              {
                menuid: 203,
                icon: 'el-icon-s-release',
                menuname: '未发货',
                hasThird: 'N',
                url: 'order/state/2',
                menus: null
              },
              {
                menuid: 204,
                icon: 'el-icon-s-claim',
                menuname: '已发货',
                hasThird: 'N',
                url: 'order/state/3',
                menus: null
              }
            ]

          },
        ],
        msg: 'success'
      }
      this.allmenu = res.data

      this.$root.Bus.$on('toggle', value => {
        this.collapsed = !value
      })
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*width: 240px;*/
    min-height: 520px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*border: none;*/
    text-align: left;
  }

</style>
