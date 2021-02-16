<template>
  <div>
    <breadcrumb :path="['权限管理', '角色列表']"></breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="1">
          <el-button
            type="primary"
            size="default"
            @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="rolesList" style="width: 100%" border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="score">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editRoles(score.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteRoles(score.row)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="editRights(score.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <editRoles
      :role="editRolesList"
      :editDialogVisible="editDialogVisible"
      @hideEditDialog="hideEditDialog"
      @getRolesList="getRolesList"
    ></editRoles>
    <addRoles
      :addDialogVisible="addDialogVisible"
      @getRolesList="getRolesList"
      @hideAddDialog="hideAddDialog"
    >
    </addRoles>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import editRoles from "./Roles/editRoles";
import addRoles from "./Roles/addRoles";

export default {
  data() {
    return {
      rolesList: [],
      editRolesList: {
        id: "",
        roleDesc: "",
        roleName: "",
      },
      editDialogVisible: false,
      addDialogVisible: false,
    };
  },
  components: {
    breadcrumb,
    editRoles,
    addRoles,
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("/roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.rolesList = res.data;
    },
    editRoles(roles) {
      //要一个一个传进去 不然prop会更新父附件
      this.editRolesList.id = roles.id; 
      this.editRolesList.roleDesc = roles.roleDesc;
      this.editRolesList.roleName = roles.roleName;
      this.editDialogVisible = true;
    },
    hideEditDialog() {
      this.editDialogVisible = false;
    },
    async deleteRoles(roles) {
      const { data: res } = await this.$http.delete(`/roles/${roles.id}`);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败！");
      }
      this.getRolesList();
    },
    hideAddDialog() {
      this.addDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>