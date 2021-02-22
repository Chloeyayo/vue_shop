<template>
  <div>
    <el-dialog
      title="settingUser"
      :visible.sync="settingDialogVisible"
      width="50%"
      @close="handleClose"
      :before-close="handleClose"
    >
      <span>{{ settingUserInfo }}</span>
      <span slot="footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submit">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleClose() {
      this.$emit("hideSettingDialog");
    },
    submit() {},
  },
  props: {
    settingDialogVisible: false,
    settingUserInfo: Object,
  },
};
</script>

<style lang="less" scoped>
</style>