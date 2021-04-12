<template>
  <div>
    <breadcrumb :path="['商品管理', '商品列表']"></breadcrumb>
    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            size="normal"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              type="primary"
              size="default"
              @click="getGoodsList"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="500">
          
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格">
          
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
          
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160">
          <template v-slot="scope">
            {{scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editGoods(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteGoods(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";

export default {
  data() {
    return {
      
      goodsList: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total:0
    };
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get(`goods`,{params: this.queryInfo})
      console.log(res);
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(size) {
      this.queryInfo.pagesize = size
      this.getGoodsList()
    },
    handleCurrentChange(page){
      this.queryInfo.pagenum=page
      this.getGoodsList()
    }

  },
  mounted(){
    this.getGoodsList();
  },
  components: {
    breadcrumb,
  },
  
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
</style>