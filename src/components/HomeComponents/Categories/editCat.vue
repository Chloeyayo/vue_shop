<template>
  <div>
    <el-dialog
      title="修改用户"
      :before-close="handleClose"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form ref="editForm" :model="editForm" label-width="80px">

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editUserBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    async editUserBtn() {
      const { data: res } = await this.$http.put(
        `users/${this.editForm.id}`,
        this.editForm
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.$emit("hideEditDialog");
      this.$emit("getUserList")
    },
    handleClose() {
      this.$emit("hideEditDialog");
    },
    onInput() {
      this.$forceUpdate();
    },
  },
  props: {
    editForm: {

    },
    editDialogVisible: false,
  },
};
</script>

<style lang="less" scoped>
</style>