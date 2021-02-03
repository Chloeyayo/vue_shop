<template>
  <div>
    <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$message({
        message: "退出成功",
        type: "success",
      });
      this.$router.push('/login')
    },
  },
};
</script>

<style lang="less" scoped>
</style>