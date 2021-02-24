<template>
  <div>
    <el-dialog
      title="settingUser"
      :visible.sync="settingDialogVisible"
      width="50%"
      @close="handleClose"
      :before-close="handleClose"
    >
      <div class="info">
        <div>当前的用户:{{ settingUserInfo.username }}</div>
        <div>当前的角色:{{ settingUserInfo.role_name }}</div>
        <el-select v-model="rid" placeholder="请输入">
          <el-option
            v-for="(item, index) in RolesList"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <span slot="footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submit">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rid: "",
    };
  },
  methods: {
    handleClose() {
      this.rid=""
      this.$emit("hideSettingDialog");
    },

    async submit() {
      const { data: res } = await this.$http.put(`/users/${this.settingUserInfo.id}/role`, {
        id: this.settingUserInfo.id,
        rid: this.rid,
      });
      if (res.meta.status !==200){
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.$emit("getUserList")
      this.handleClose()
    },
  },
  props: {
    settingDialogVisible: false,
    settingUserInfo: Object,
    RolesList: Array,
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.info {
  text-align: left;
  div {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>