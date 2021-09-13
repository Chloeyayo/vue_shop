<template>
  <div class="Categories">
    <breadcrumb :path="['商品管理', '商品分类']"></breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="1" :offset="0">
          <el-button type="primary" size="default" @click="addCat"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <el-table
        :data="categories"
        border
        row-key="cat_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="名称分类"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <i :class="isEnabled(scope.row)" class="enabled-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag size="normal" v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag type="success" size="normal" v-if="scope.row.cat_level == 1"
              >二级</el-tag
            >
            <el-tag type="danger" size="normal" v-if="scope.row.cat_level == 2"
              >三级</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editCat(scope.row)"
              class="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleCat(scope.row)"
              class="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <addCat
        :addCateDialogVisible="addCateDialogVisible"
        :parentCategoryList="parentCategoryList"
        @hiddeAddDialog="hiddeAddDialog"
        @getCategoryList="getCategoryList"
      ></addCat>
      <editCat
        :editCateDialogVisible="editCateDialogVisible"
        :editCateForm="editCateForm"
      >
      </editCat>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import addCat from "./Categories/addCat";
import editCat from "./Categories/editCat";

export default {
  data() {
    return {
      categories: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      addCateDialogVisible: false,
      parentCategoryList: [],
      editCateDialogVisible: false,
      editCateForm: {},
    };
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$http.get("/categories", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.categories = res.data.result;
      this.total = res.data.total;
      console.log(this.categories);
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getCategoryList();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getCategoryList();
    },
    addCat() {
      this.addCateDialogVisible = true;
      this.getparentCategoryList();
    },
    async getparentCategoryList() {
      const { data: res } = await this.$http.get("/categories", {
        params: {
          type: 2,
        },
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.parentCategoryList = res.data;
    },
    hiddeAddDialog() {
      this.addCateDialogVisible = false;
    },
    editCat(row) {
      // this.editCateDialogVisible=true;
      this.editCateForm=row
      console.log(row);
    },
    deleCat(_row) {},
    isEnabled(row) {
      return !row.isEnabled ? "el-icon-success" : "el-icon-error";
    },
  },
  created() {
    this.getCategoryList();
  },
  components: {
    breadcrumb,
    addCat,
    editCat,
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0;
  .enabled-icon {
    color: rgb(84, 214, 44);
    font-size: 18px;
  }
}
/deep/.el-table__row--level-2 {
  background-color: rgb(250, 250, 250);
}
// /deep/ .el-table tbody .el-table__row--level-1:hover>td { background-color:#fff }
</style>