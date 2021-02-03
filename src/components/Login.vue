<template>
  <div class="login_container">
    <div class="login_box">
      <div class="logo_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        ref="form"
        class="login_form"
        :model="LoginFrom"
        :rules="LoginFromRules"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont iconicon-user"
            v-model="LoginFrom.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keydown.enter.native="login"
            prefix-icon="iconfont iconpassword"
            v-model="LoginFrom.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="login_button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LoginFrom: {
        username: "admin",
        password: "123456",
      },
      LoginFromRules: {
        username: [
          {
            required: true,
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    async login() {
      const { data: res } = await this.$http.post("login", this.LoginFrom);
      if (res.meta.status !== 200) {
        this.$message.error("登录失败!");
        return;
      }
      this.$message({ message: "登录成功", type: "success" });
      window.sessionStorage.setItem('token',res.data.token)
      this.$router.push('/home')
},
    resetFrom() {
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 3px;
    text-align: center;
    .logo_box {
      display: inline-block;
      transform: translateY(-50%);
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0px 0px 10px #888888;
      img {
        width: 80px;
        height: 80px;
        margin-top: 18px;
      }
    }
    .login_form {
      padding: 0px 30px;
      .login_button {
        button {
          margin: 0px 10px;
        }
      }
    }
  }
}
</style>