<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in path" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["path"],
};
</script>

<style lang="less" scoped>

.el-breadcrumb {
  margin-bottom: 15px;
}
/deep/.el-breadcrumb__inner {
  font-size: 14px;
}
</style>