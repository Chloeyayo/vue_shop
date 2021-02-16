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
        <el-table-column type="expand">
          <template v-slot="score">
            <el-row
              :gutter="10"
              v-for="(itemOne, index) in score.row.children"
              :key="index"
              :class="['bdbottom',index==0?'bdtop':'']"
            >
              <el-col :span="4">
                <el-tag closable>{{ itemOne.authName }}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row
                  :gutter="10"
                  v-for="(itemTwo, index) in itemOne.children"
                  :key="index"
                >
                  <el-col :span="4">
                    <el-tag type="warning" closable> {{ itemTwo.authName }}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-row :gutter="10">
                      <el-col
                        :span="6"
                        v-for="(itemThree, index) in itemTwo.children"
                        :key="index"
                      >
                        <el-tag type="success" closable>{{ itemThree.authName }}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
.el-row{
  display: flex;
  align-items: center;
}
.el-tag{
  margin:  10px 0;
}
.bdtop {
  border-top: 1px solid rgb(240, 240, 240);
}
.bdbottom {
  border-bottom: 1px solid rgb(241, 241, 241);
}
</style>