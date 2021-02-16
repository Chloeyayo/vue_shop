<template>
  <div>
    <el-dialog
      title="修改用户"
      :before-close="handleClose"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form ref="editForm" :model="role" label-width="80px">
        <el-form-item label="角色 ID">
          <el-input v-model="role.id" disabled ></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.roleDesc" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editRolesBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    async editRolesBtn() {
      const { data: res } = await this.$http.put(
        `roles/${this.role.id}`,
        this.role
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      console.log(this.role);
      this.$emit("hideEditDialog");
      this.$emit("getRolesList")
    },
    handleClose() {
      this.$emit("hideEditDialog");
    },

  },
  props: {
    role: {
      id: '',
      roleName: "",
      roleDesc: "",
    },
     editDialogVisible: false,
  },
};
</script>

<style lang="less" scoped>
</style>