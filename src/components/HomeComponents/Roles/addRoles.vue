<template>
  <div>
    <el-dialog
      title="添加角色"
      :before-close="handleClose"
      :visible.sync="addDialogVisible"
      width="60%"
    >
      <el-form ref="addForm" :model="addForm"   label-width="80px">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="addForm.roleName"  size=""></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addUserBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      rules:{
        roleName: [
            { required: true, message: '必须要', trigger: 'blur' }
          ],
      }
    };
  },
  props: {
    addDialogVisible: false,
  },
  methods: {
    async addUserBtn() {
      const { data: res } = await this.$http.post("/roles", this.addForm);
      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.resetFields();

      this.$emit("getRolesList");
      this.$emit("hideAddDialog");
    },
    handleClose() {
      this.resetFields();
      this.$emit("hideAddDialog");
    },
    resetFields() {
      this.addForm.roleName = "";
      this.addForm.roleDesc = "";

    },
  },
};
</script>

<style lang="less" scoped>
</style>