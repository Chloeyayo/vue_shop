<template>
  <div>
    <el-dialog
      :title="'修改' + tabName"
      :visible.sync="editDialogVisible"
      width="500px"
      :before-close="handleClose"
      @open="handleOpen"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        :inline="false"
        size="normal"
      >
        <el-form-item :label="tabName" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        attr_name: "",
      },
      rules: {
        attr_name: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  props: {
    editDialogVisible: false,
    activeTab: "",
    param: {},
  },
  methods: {
    onSubmit() {
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) {
          return valid;
        }
        const { data: result } = await this.$http.put(
          `categories/${this.editForm.cat_id}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.editForm.attr_sel,
            attr_vals:this.editForm.attr_vals
          }
        );
        console.log(result);
        if (result.meta.status !== 200) {
          return this.$message({ message: result.meta.msg, type: "warning" });
        }
        this.$emit("getAttrList");
        this.$message({
          message: result.meta.msg,
          type: "success",
        });
        this.handleClose();
      });
    },
    handleClose() {
      this.$emit("closeEditDialog");
    },
    handleOpen() {
      this.editForm = Object.assign({}, this.param);
      console.log(this.editForm);
    },
  },
  computed: {
    tabName() {
      if (this.activeTab === "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 70%;
}
</style>