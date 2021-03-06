<template>
  <div class="params">
    <breadcrumb :path="['商品管理', '参数列表']"></breadcrumb>
    <el-card class="box-card">
      <el-alert
        show-icon
        :closable="false"
        title="注意:只允许为第三级分类设置相关参数!"
        type="warning"
      >
      </el-alert>
      <div class="select-cate-wrapper">
        <span class="demonstration">hover 触发子菜单</span>
        <el-cascader
          v-model="cateValue"
          :options="categories"
          :props="{
            expandTrigger: 'hover',
            value: 'cat_id',
            label: 'cat_name',
            children: 'children',
          }"
          @change="cateChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeTab" tab-position="top" @tab-click="tabClick">
        <el-tab-pane label="动态参数" name="first">
          <el-row :gutter="10">
            <el-col :span="2" >
              <el-button
                type="primary"
                size="default"
                @click="addParam"
              >添加参数</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
export default {
  data() {
    return {
      categories: [],
      queryInfo: {
        type: 3,
        pagenum: 0,
      },
      cateValue: "",
      activeTab: "first",
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$http.get("/categories", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }

      this.categories = res.data;
      console.log(this.categories);
    },
    cateChange(value) {
      console.log(value, this.cateValue);
      if (this.cateValue.length < 3) {
        this.$message.error("只允许为第三级分类设置相关参数!");
      }
    },
    tabClick() {},
    addParam() {},
  },
  components: {
    breadcrumb,
  },
};
</script>

<style lang="less" scoped>
.select-cate-wrapper {
  text-align: left;
  font-size: 14px;
  margin: 15px 0;
  span {
    margin-right: 15px;
  }
  .el-cascader {
    width: 300px;
  }
}
.add-wrapper {
  text-align: left;
}
</style>