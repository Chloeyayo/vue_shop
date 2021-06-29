<template>
  <div>
    <breadcrumb :path="['数据统计', '数据报表']"></breadcrumb>
    <el-card>
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script>
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