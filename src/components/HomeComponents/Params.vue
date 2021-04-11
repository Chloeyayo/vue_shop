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
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  type="primary"
                  size="normal"
                  closable
                  disable-transitions
                  @click="click(scope)"
                  @close="handleTabClose(index, scope)"
                  v-for="(item, index) in scope.row.valueList"
                  :key="index"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  :ref="'saveTagInput-' + scope.$index"
                  size="small"
                  @blur="handleInputConfirm(scope)"
                  @keyup.enter.native="handleInputConfirm(scope)"
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
                  disable-transitions
                  @close="handleTabClose(index, scope)"
                  v-for="(item, index) in scope.row.valueList"
                  :key="index"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  :ref="'saveTagInput-' + scope.$index"
                  size="small"
                  @blur="handleInputConfirm(scope)"
                  @keyup.enter.native="handleInputConfirm(scope)"
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
            <el-table-column label="属性名称" prop="attr_name">
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
    <editParam
      :activeTab="activeTab"
      :editDialogVisible="editDialogVisible"
      :param="currentParam.row"
      @closeEditDialog="closeEditDialog"
      @getAttrList="getAttrList"
    ></editParam>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import addParam from "./Params/addParam";
import editParam from "./Params/editParam";
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
      editDialogVisible: false,
      currentParam: {},
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
        this.$set(e, "inputVisible", false);
        this.$set(e, "inputValue", "");

        if (e.attr_vals.length !== 0) {
          e.valueList = e.attr_vals.split(" ");
        } else {
          e.valueList = [];
        }
      });

      console.log(this.attrList);
    },
    editParam(scope) {
      this.currentParam = scope;
      this.editDialogVisible = true;
    },
    closeEditDialog() {
      this.editDialogVisible = false;
    },
    async deleteParam(scope) {
      const res = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (res !== "confirm") {
        return;
      }
      const { data: result } = await this.$http.delete(
        `categories/${scope.row.cat_id}/attributes/${scope.row.attr_id}`
      );
      console.log(result);
      this.getAttrList();
      this.$message.success(result.meta.msg);
    },
    async handleTabClose(index, scope) {
      scope.row.valueList.splice(index, 1);
      scope.row.inputVisible=!scope.row.inputVisible
      scope.row.inputVisible=!scope.row.inputVisible
      console.log(scope);

      scope.row.attr_vals = scope.row.valueList.join(" ");
      const { data: res } = await this.$http.put(
        `categories/${scope.row.cat_id}/attributes/${scope.row.attr_id}`,
        {
          attr_name: scope.row.attr_name,
          attr_sel: scope.row.attr_sel,
          attr_vals: scope.row.attr_vals,
        }
      );
      this.$message.success(res.meta.msg);
    },
    async handleInputConfirm(scope) {
      if (scope.row.inputValue.trim().length === 0) return;
      scope.row.valueList.push(scope.row.inputValue);
      scope.row.attr_vals = scope.row.valueList.join(" ");
      console.log(scope.row);
      const res = await this.$http.put(
        `categories/${scope.row.cat_id}/attributes/${scope.row.attr_id}`,
        {
          attr_name: scope.row.attr_name,
          attr_sel: scope.row.attr_sel,
          attr_vals: scope.row.attr_vals,
        }
      );
      console.log(res);
      scope.row.inputVisible = false;
      scope.row.inputValue = "";
    },
    showInput(scope) {
      scope.row.inputVisible = true;
      this.$nextTick((_) => {
        let a = "saveTagInput-" + scope.$index;
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
    editParam,
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