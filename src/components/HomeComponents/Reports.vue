<template>
<<<<<<< HEAD
  <div class="report">
    <Breadcrumb name1="数据统计" name2="数据报表" />
    <!--  卡片-->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 650px;height:300px;"></div>
=======
  <div>
    <breadcrumb :path="['数据统计', '数据报表']"></breadcrumb>
    <el-card>
      <div id="main"></div>
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
    </el-card>
  </div>
</template>

<script>
<<<<<<< HEAD
// 1. 引入 echarts 按需引入
import * as echarts from 'echarts'
import _ from 'lodash'
import Breadcrumb from "./component/breadcrumb";
export default {
  name: 'Report',
  components: { Breadcrumb },
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  // 此时,页面上的元素,已经被渲染完毕了
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败!')
    }
    // 4. 指定图表的配置项和数据
    const result = _.merge(res.data, this.options)
    // 5. 使用刚指定的配置项和数据显示图表。
    myChart.setOption(result)
  }
}
</script>

<style scoped></style>
=======
import breadcrumb from "./component/breadcrumb";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  methods: {
    async initChart() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      const { data: res } = await this.$http.get(`reports/type/1`);
      console.log(res);
      let options = {};
      Object.assign(this.options, res.data);
      myChart.setOption(this.options);
    },
  },
  mounted() {
    this.initChart();
  },
  components: {
    breadcrumb,
  },
};
</script>

<style lang="less" scoped>
#main {
  height: 500px;
  width: 100%;
}
.el-row {
  margin-bottom: 15px;
}
</style>
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
