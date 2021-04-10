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
        <span class="demonstration">选择商品分类：</span>
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
        <el-tab-pane label="动态参数" name="many">
          <el-row :gutter="10">
            <el-col :span="1">
              <el-button type="primary" size="small" @click="addParam"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <el-table :data="attrList" style="width: 100%" border>
            <el-table-column type="expand" >
              <template slot-scope="scope">
                
                <el-tag
                  type="primary"
                  size="normal"
                  closable
                  @close="handleTabClose(scope)"
                  v-for="(item, index) in scope.row.valueList"
                  :key="index"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  :ref="'saveTagInput-'+scope.$index"
                  size="small"
                  @blur="handleInputConfirm(scope)"
                  
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope)"
                  >+New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="default"
                  @click="editParam(scope)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="default"
                  @click="deleteParam(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-button type="primary" size="small" @click="addParam"
                >添加属性</el-button
              >
            </el-col>
          </el-row>
          <el-table :data="attrList" style="width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  type="primary"
                  size="normal"
                  closable
                  @close="handleTabClose(scope)"
                  v-for="(item, index) in scope.row.valueList"
                  :key="index"
                >
                  {{ item }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="default"
                  @click="editParam(scope)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="default"
                  @click="deleteParam(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <addParam
      :activeTab="activeTab"
      :addDialogVisible="addDialogVisible"
      :cateId="cateId"
      @closeAddDialog="closeAddDialog"
      @getAttrList="getAttrList"
    ></addParam>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import addParam from "./Params/addParam";
export default {
  data() {
    return {
      categories: [],
      queryInfo: {
        type: 3,
        pagenum: 0,
      },
      cateValue: [1, 3, 6],
      activeTab: "many",
      tableData: [],
      attrList: [],
      addDialogVisible: false,
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
    },
    cateChange() {
      console.log(this.cateValue);
      if (this.cateValue.length < 3) {
        return this.$message.error("只允许为第三级分类设置相关参数!");
      }
      this.getAttrList();
    },
    tabClick() {
      this.getAttrList();
    },
    addParam() {
      this.addDialogVisible = true;
    },
    closeAddDialog() {
      this.addDialogVisible = false;
    },
    async getAttrList() {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeTab },
        }
      );
      this.attrList = res.data;

      this.attrList.forEach((e) => {
        // 控制文本框的显示与隐藏
        this.$set(e,"inputVisible",false)
        this.$set(e,"inputValue","")

        if (e.attr_vals.length !== 0) {
          e.valueList = e.attr_vals.split(" ");
        } else {
          e.valueList = [];
        }
      });

      console.log(this.attrList);
    },
    editParam(scope) {
      console.log(scope);

    },
    deleteParam(scope) {},
    handleTabClose(scope) {
      console.log(scope);
    },
    getAttrValue(scope) {},
    handleInputConfirm(scope) {

        scope.row.inputVisible = false;

    },
    showInput(scope) {
      scope.row.inputVisible=true;
      this.$nextTick(_ => {
        let a="saveTagInput-"+scope.$index
          this.$refs[a].$refs.input.focus();
        });
    },
  },
  mounted() {
    this.getAttrList();
  },
  computed: {
    cateId() {
      if (this.cateValue.length === 3) {
        return this.cateValue[2];
      }
      return null;
    },
  },
  components: {
    breadcrumb,
    addParam,
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
.el-row {
  margin-bottom: 10px;
}
.el-tag,
.button-new-tag {
  margin: 0 15px 15px 0;
}
.input-new-tag {
  width: 100px;
}
</style>