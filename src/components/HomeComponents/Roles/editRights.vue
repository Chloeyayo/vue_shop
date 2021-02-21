<template>
  <el-dialog
    title="提示"
    :visible.sync="editRightsDialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <div class="select-all">
      <el-checkbox :value="checked" @change="selectAll" 
        >全选</el-checkbox
      >
    </div>
    <el-tree
      :data="rightList"
      :props="defaultProps"
      show-checkbox
      @check-change="handleCheckChange"
      node-key="id"
      default-expand-all
      :default-checked-keys="scoreRights"
      check-on-click-node
      ref="RightTree"
    >
    </el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "authName",
      },
      defaultCheckedList: [],
      selectedRights: [],
      checked: false,
    };
  },

  methods: {
    handleClose() {
      this.$emit("hideRightsDialog");
    },
    selectAll() {
      this.checked = !this.checked;
      if (this.checked) {
        //全选
        this.$refs.RightTree.setCheckedNodes(this.rightList);
      } else {
        //取消选中
        this.$refs.RightTree.setCheckedKeys([]);
      }
    },
    handleCheckChange() {},
    async submit() {
      this.selectedRights = [
        ...this.$refs["RightTree"].getCheckedKeys(),
        ...this.$refs["RightTree"].getHalfCheckedKeys(),
      ];
      const selectedString = this.selectedRights.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: selectedString }
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.$emit("hideRightsDialog");
      this.$emit("getRolesList");
    },
  },
  props: {
    editRightsDialogVisible: false,
    rightList: Array,
    scoreRights: Array,
    roleId: "",
  },
};
</script>

<style lang="less" scoped>
.select-all {
  text-align: left;
}
</style>