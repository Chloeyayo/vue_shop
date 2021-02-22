<template>
  <div>
    index!!<br />
    <el-button type="primary" @click="toLogin">Login</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin(){
      this.$router.push("/login")
    }
  },
};
</script>

<style lang="less" scoped>
</style>