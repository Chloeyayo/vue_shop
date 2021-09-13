<template>
<<<<<<< HEAD
  <div class="order">
    <Breadcrumb name1="订单管理" name2="订单列表" />
    <el-card>
      <!--      搜索-->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--      表格-->
      <el-row>
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="order_number" label="订单编号"></el-table-column>
          <el-table-column prop="order_price" label="订单价格" width="250px"></el-table-column>
          <el-table-column label="是否支付" width="250px">
            <template v-slot="scope">
              <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
              <el-tag type="success" v-else>已付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" width="250px"></el-table-column>
          <el-table-column label="下单时间" width="250px">
            <template v-slot="scope">
              {{ scope.row.create_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="">
              <el-tooltip class="item" effect="dark" content="修改地址" placement="top">
                <el-button type="primary" icon="el-icon-edit" circle @click="showBox"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="物流状态" placement="top">
                <el-button type="success" icon="el-icon-location" circle @click="showProgressBox"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--      分页区-->
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 9, 11, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!--    修改地址的对话框-->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" @close="addressDialogClosed" width="50%">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <!--          <el-input v-model="addressForm.address1"></el-input>-->
          <el-cascader :options="cityData" v-model="addressForm.address1" :props="{ expandTrigger: 'hover' }"></el-cascader>
=======
  <div>
    <breadcrumb :path="['订单管理', '订单列表']"></breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            size="normal"
            clearable
            @clear="getOrderList"
          >
            <el-button
              slot="append"
              type="primary"
              size="default"
              @click="getOrderList"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" min-width="200">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template v-slot="scope">
            <el-tag size="danger" v-if="scope.row.order_pay == 0"
              >未付款</el-tag
            >
            <el-tag type="success" v-if="scope.row.order_pay == 1"
              >已付款</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="200">
          <template v-slot="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location"
              @click="showProgressDialog(scope.row)"
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

    <el-dialog
      title="修改地址"
      :visible.sync="addressVisible"
      width="40%"
      @close="addressDialogClose"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="addressForm.address1"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<<<<<<< HEAD
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--    显示物流进度的对话框-->
    <el-dialog title="物流进度" :visible.sync="progressDialogVisible" width="50%">
      <el-timeline :reverse="false">
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.ftime">
=======
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 展示物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressDialogVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import cityData from './Orders/citydata'
import Breadcrumb from "./component/breadcrumb";
export default {
  name: 'Order',
  components: {
    Breadcrumb
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 7
      },
      // 订单列表的数据
      orderList: [],
      // 订单的总数量
      total: 0,
      // 修改地址的对话框
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
      },
      // 地址的选择
      cityData,
      // 显示物流进度的
      progressDialogVisible: false,
      progressInfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表数据
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败!')
      }
      this.$message.success('获取订单列表成功!')
      this.orderList = res.data.goods
      this.total = res.data.total
      console.log(res, this.orderList, this.total)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent
      this.getOrderList()
    },
    // 展示修改对话框
    showBox() {
      this.addressDialogVisible = true
    },
    // 关闭对话框清空表达
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    async showProgressBox() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败！')
      }
      this.progressInfo = res.data

      // this.progressInfo = [
      //   {
      //     time: '2018-05-10 09:39:00',
      //     ftime: '2018-05-10 09:39:00',
      //     context: '已签收,感谢使用顺丰,期待再次为您服务',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-10 08:23:00',
      //     ftime: '2018-05-10 08:23:00',
      //     context: '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-10 07:32:00',
      //     ftime: '2018-05-10 07:32:00',
      //     context: '快件到达 [北京海淀育新小区营业点]',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-10 02:03:00',
      //     ftime: '2018-05-10 02:03:00',
      //     context: '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-09 23:05:00',
      //     ftime: '2018-05-09 23:05:00',
      //     context: '快件到达 [北京顺义集散中心]',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-09 21:21:00',
      //     ftime: '2018-05-09 21:21:00',
      //     context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-09 13:07:00',
      //     ftime: '2018-05-09 13:07:00',
      //     context: '顺丰速运 已收取快件',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-09 12:25:03',
      //     ftime: '2018-05-09 12:25:03',
      //     context: '卖家发货',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-09 12:22:24',
      //     ftime: '2018-05-09 12:22:24',
      //     context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
      //     location: ''
      //   },
      //   {
      //     time: '2018-05-08 21:36:04',
      //     ftime: '2018-05-08 21:36:04',
      //     context: '商品已经下单',
      //     location: ''
      //   }
      // ]
      //
      this.progressDialogVisible = true
      //   console.log(this.progressInfo)
    }
  }
}
</script>

<style scoped>
.el-table {
  margin: 15px 0 5px;
}
.el-cascader {
  width: 100%;
}
</style>
=======
import breadcrumb from "./component/breadcrumb";
import cityData from "../../assets/js/citydata";
import kuaidi from "../../assets/kuaidi.json";
export default {
  data() {
    return {
      orderList: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderList: [],
      // 控制编辑地址的对话框状态
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      cityData,
      // 物流进度对话框
      progressDialogVisible: false,
      // 物流信息
      progressInfo: kuaidi.data,
    };
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get(`orders`, {
        params: this.queryInfo,
      });
      console.log(res);
      this.orderList = res.data.goods;
      this.total = res.data.total;
    },
    handleSizeChange(size) {
      this.queryInfo.pagesize = size;
      this.getOrderList();
    },
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page;
      this.getOrderList();
    },
    showEditDialog() {
      this.addressVisible = true;
    },
    addressDialogClose() {
      this.$refs.addressFormRef.resetFields();
    },
    async showProgressDialog(_row) {
      this.progressDialogVisible = true;

    },
  },
  mounted() {
    this.getOrderList();
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
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
