<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <!--<SideMenu></SideMenu>-->
    </el-aside>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!--列表-->
      <el-table size="small" :data="orderList"
                stripe="true"
                highlight-current-row v-loading="loading"
                border element-loading-text="拼命加载中"
                style="width: 100%;">
        <!--        <el-table-column align="center" type="selection" width="60">-->
        <!--        </el-table-column>-->
        <el-table-column
          type="index"
          width="45">
        </el-table-column>

        <el-table-column sortable prop="order_id" label="订单号" width="156">
        </el-table-column>
        <el-table-column sortable prop="store_id" label="商店码" width="100">
        </el-table-column>
        <el-table-column sortable prop="user_name" label="购买用户" width="111">
        </el-table-column>
        <el-table-column sortable prop="user_tel" label="客户电话" width="111">
        </el-table-column>
        <el-table-column sortable prop="user_address" label="地址" width="126">
        </el-table-column>
        <el-table-column sortable prop="order_price" label="订单总额" width="118">
        </el-table-column>
        <el-table-column sortable prop="order_data" label="下单时间" width="160">
        </el-table-column>
        <el-table-column sortable prop="state" label="订单状态" width="100">
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="170">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>



      <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @close="closeDialog">
        <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
<!--          <el-form-item label="图片">-->
<!--            <el-upload-->
<!--              class="upload-demo"-->
<!--              ref="upload"-->
<!--              :action="action"-->
<!--              :on-preview="handlePreview"-->
<!--              :on-remove="handleRemove"-->
<!--              :file-list="fileList"-->
<!--              :data="title==='添加'?{item:JSON.stringify(data)}:{item:JSON.stringify(editForm)}"-->
<!--              list-type="picture-card"-->
<!--              :auto-upload="false"-->
<!--              :limit="9">-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过9张</div>-->
<!--            </el-upload>-->
<!--            <el-dialog :visible.sync="dialogVisible">-->
<!--              <img width="100%" :src="dialogImageUrl" alt="">-->
<!--            </el-dialog>-->
<!--          </el-form-item>-->

          <el-form-item label="订单号" prop="order_id">
            <el-input size="small" v-model="editForm.order_id" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="订单人姓名" prop="user_name">
            <el-input size="small" v-model="editForm.user_name" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="订单人电话" prop="user_tel">
            <el-input size="small" v-model="editForm.user_tel" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="订单人地址" prop="user_address">
            <el-input size="small" v-model="editForm.user_address" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="订单状态" prop="state">
            <!--            <el-input size="small" v-model="editForm.state" auto-complete="off" placeholder="请输入状态">-->
            <!--            </el-input>-->
            <el-select v-model="editForm.state" placeholder="请输入状态">
              <el-option label="未支付" value="0"></el-option>
              <el-option label="待发货" value="2"></el-option>
              <el-option label="已发货" value="3"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="高级状态" prop="state_s">

            <el-select v-model="editForm.state_s" placeholder="请输入状态">
              <el-option label="退款中" value="0"></el-option>
              <el-option label="已退款" value="1"></el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="退款原因" prop="order_reason">
            <el-input size="small" v-model="editForm.order_reason" auto-complete="off" disabled placeholder="无">

            </el-input>

          </el-form-item>
<!--          <el-form-item label="原因" prop="reason">-->
<!--            <el-input size="small" v-model="editForm.reason" auto-complete="off" placeholder="请输入原因"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button size="small" @click="confirmForm()">保存</el-button>

        </div>
      </el-dialog>


    </div>

    <el-main>
      <!--<books></books>-->
    </el-main>
  </el-container>

</template>

<script>
  // import Goods from './Goods'
  export default {
    name: 'AppOrder',
    // components: {Goods},

    data () {
      return {
        orderList: [],
        responseResult: [],
        editFormVisible: false,
        editForm: {
          trow : '',
          order_id : '',
          store_id : '',
          user_id : '',
          user_name : '',
          user_tel : '',
          user_address : '',
          order_price : '',
          order_data : '',
          state : '',
          state_s : '',
          order_reason : ''
        },
        fileList: []
      }
    },
    mounted: function () {
      this.loadOrder()
      // this.deleteOrder()
    },
    methods: {
      loadOrder () {
        var _this = this
        var url = 'order/state/0'
        this.$axios.get(url).then(resp => {
          if (resp && resp.data.code === 200) {
            this.orderList = JSON.parse(resp.data.result)
          }
        })

      },
      deleteItem (index,row){
        var _this = this
        var url = 'order/delete/' + row.order_id
        this.$axios.delete(url).then(function(response) {
        })

        this.orderList.splice(index, 1)
      },
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      handleEdit (index,row) {
        this.editFormVisible = true

        this.editForm.user_id = row.user_id
        this.editForm.order_id = row.order_id
        this.editForm.store_id = row.store_id
        this.editForm.user_name = row.user_name
        this.editForm.user_tel = row.user_tel
        this.editForm.user_address = row.user_address
        this.editForm.order_price = row.order_price
        this.editForm.order_data = row.order_data
        this.editForm.state = row.state
        this.editForm.state_s = row.state_s
        this.editForm.order_reason = row.order_reason

        },
      closeDialog (editForm){
        this.editFormVisible = false
      },

      confirmForm(){
          var url = 'order/update2'
          this.$axios.put(url,{
            order_id : this.editForm.order_id,
            store_id : this.editForm.store_id,
            user_id : this.editForm.user_id,
            user_name : this.editForm.user_name,
            user_tel : this.editForm.user_tel,
            user_address : this.editForm.user_address,
            order_price : this.editForm.order_price,
            order_data : this.editForm.order_data,
            state : this.editForm.state,
            state_s : this.editForm.state_s,
            order_reason : this.editForm.order_reason

          }).then(function(response) {
            console.error(response);
          });

        this.editFormVisible = false

      }


      }

  }



</script>

<style scoped>

</style>
