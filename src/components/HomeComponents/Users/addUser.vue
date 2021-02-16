<template>
  <div>
    <el-dialog
      title="添加用户"
      :before-close="handleClose"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名称" prop:="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop:="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop:="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" >取 消</el-button>
        <el-button type="primary" @click="addUserBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var cheackEmail = (rule, value, callback) => {
      const mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        email: [
          // { validator: cheackEmail, trigger: "blur" },
          // { required: true, message: "请输入！", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    addDialogVisible: false,
  },
  methods: {
    async addUserBtn() {
      const { data: res } = await this.$http.post("/users", this.addForm);
      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.resetFields();

      this.$emit("getUserList");
      this.$emit("hideAddDialog");
    },
    handleClose() {
      this.resetFields();
      this.$emit("hideAddDialog");
    },
    resetFields() {
      this.addForm.username = "";
      this.addForm.password = "";
      this.addForm.email = "";
      this.addForm.mobile = "";
    },
  },
};
</script>

<style lang="less" scoped>
</style>