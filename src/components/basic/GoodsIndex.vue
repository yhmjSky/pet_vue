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
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!--列表-->
      <el-table size="small" :data="goodsList"
                highlight-current-row v-loading="loading"
                border element-loading-text="拼命加载中" style="width: 100%;">
<!--        <el-table-column align="center" type="selection" width="60">-->
<!--        </el-table-column>-->
        <el-table-column sortable prop="id" label="" width="48">
        </el-table-column>
        <el-table-column sortable prop="name" label="商品名称" width="121">
        </el-table-column>
        <el-table-column sortable prop="describe" label="商品介绍" width="300">
        </el-table-column>
        <el-table-column sortable prop="price" label="商品价格" width="150">
        </el-table-column>
        <el-table-column sortable prop="stock" label="商品库存" width="150">
        </el-table-column>
<!--        <el-table-column sortable prop="address" label="发货地址" width="200">-->
<!--        </el-table-column>-->
<!--        <el-table-column sortable prop="time" label="发布时间" width="180">-->
<!--          <template slot-scope="scope">-->
<!--            <div>{{scope.row.time}}</div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column align="center" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>



      <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @close="closeDialog">
        <el-form label-width="120px" :model="editGoodsForm" :rules="rules" ref="editGoodsForm">
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

          <el-form-item label="商品号" prop="id">
            <el-input size="small" v-model="editGoodsForm.id" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="商品名称" prop="name">
            <el-input size="small" v-model="editGoodsForm.name" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="店铺号" prop="storecode">
            <el-input size="small" v-model="editGoodsForm.storecode" auto-complete="off" disabled placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="单价" prop="price">
            <el-input size="small" v-model="editGoodsForm.price" auto-complete="off"  placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="库存" prop="stock">
            <el-input size="small" v-model="editGoodsForm.stock" auto-complete="off" placeholder="请输入库存">

            </el-input>
          </el-form-item>


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
  import Goods from './Goods'
  export default {
    name: 'AppGoods',
    components: {Goods},

    data () {
      return {
        goodsList: [],
        responseResult: [],
        listData: [],
        loading: false, //是显示加载
        editFormVisible: false,
        editGoodsForm: {
          id : '',
          name : '',
          storecode : '',
          price : '',
          unit : '',
          stock : '',
          img : '',
          style : '',
          describe : '',
        }
      }
    },
    mounted: function () {
      this.loadGoods()
    },
    methods: {
      loadGoods () {
        var _this = this
        var url = 'goods/list'
        this.$axios.get(url).then(resp => {
          if (resp && resp.data.code === 200) {
            this.goodsList = JSON.parse(resp.data.result)
          }
        })

      },
      deleteItem (index,row){
        var _this = this
        var url = 'goods/delete/' + row.id
        this.$axios.delete(url).then(function(response) {
        })

        this.goodsList.splice(index, 1)
      },
      handleEdit (index,row) {
        this.editFormVisible = true

        this.editGoodsForm.id = row.id
        this.editGoodsForm.name = row.name
        this.editGoodsForm.storecode = row.storecode
        this.editGoodsForm.price = row.price
        this.editGoodsForm.unit = row.unit
        this.editGoodsForm.stock = row.stock
        this.editGoodsForm.img = row.img
        this.editGoodsForm.style = row.style
        this.editGoodsForm.describe = row.describe

      },
      closeDialog (editForm){
        this.editFormVisible = false
      },

      confirmForm(){
        var url = 'goods/update1'
        this.$axios.put(url,{
          id : this.editGoodsForm.id,
          name : this.editGoodsForm.name,
          storecode : this.editGoodsForm.storecode,
          price : this.editGoodsForm.price,
          unit : this.editGoodsForm.unit,
          stock : this.editGoodsForm.stock,
          img : this.editGoodsForm.img,
          style : this.editGoodsForm.style,
          describe : this.editGoodsForm.describe

        }).then(function(response) {
          console.error(response);
        });
        this.editFormVisible = false

      },

    }
  }



</script>

<style scoped>

</style>
