<template>
  <div class="roles">
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
            <span  v-if="cheackRights(score.row)">无权限</span>

            <el-row
              :gutter="10"
              v-for="(itemOne, index) in score.row.children"
              :key="index"
              :class="['bdbottom', index == 0 ? 'bdtop' : '']"
            >
              <el-col :span="4">
                <el-tag closable @close="removeRightById(score.row, itemOne)">{{
                  itemOne.authName
                }}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row
                  :gutter="10"
                  v-for="(itemTwo, index) in itemOne.children"
                  :key="index"
                  :class="[
                    index !== itemOne.children.length - 1 ? 'bdbottom' : '',
                  ]"
                >
                  <el-col :span="4">
                    <el-tag
                      type="warning"
                      closable
                      @close="removeRightById(score.row, itemTwo)"
                    >
                      {{ itemTwo.authName }}</el-tag
                    >
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      type="success"
                      class="tag-three"
                      closable
                      @close="removeRightById(score.row, itemThree)"
                      v-for="(itemThree, index) in itemTwo.children"
                      :key="index"
                    >
                      {{ itemThree.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="150">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
          <template v-slot="score">
            {{score.row.roleDesc}}

          </template>
           </el-table-column>
        <el-table-column label="操作">
          <template v-slot="score">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editRoles(score.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteRoles(score.row)"
              >删除</el-button
            >

            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="editRights(score.row)"
              >分配权限</el-button
            >
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
    <editRights
      :editRightsDialogVisible="editRightsDialogVisible"
      :rightList="rightList"
      :scoreRights="scoreRights"
      :roleId="currentRoles.id"
      @getRolesList="getRolesList"
      @hideRightsDialog="hideRightsDialog"
    ></editRights>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import editRoles from "./Roles/editRoles";
import addRoles from "./Roles/addRoles";
import editRights from "./Roles/editRights";

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
      editRightsDialogVisible: false,
      rightList: [],
      scoreRights:[],
      currentRoles: [],
    };
  },

  components: {
    breadcrumb,
    editRoles,
    addRoles,
    editRights,
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
        return this.$message.error(res.meta.msg);
      }
      this.$message.success("删除用户成功");
      this.getRolesList();
    },
    hideAddDialog() {
      this.addDialogVisible = false;
    },
    async removeRightById(role, right) {
      console.log(role.id, right.id);
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除");
      }
      const { data: res } = await this.$http.delete(
        `/roles/${role.id}/rights/${right.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success("删除权限成功");
      role.children = res.data;
    },
    async editRights(score) {
      const { data: res } = await this.$http.get("/rights/tree");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.rightList= res.data;
      this.getDefaultRights(score,this.scoreRights)
      this.currentRoles=score
this.editRightsDialogVisible = true;
    },
    hideRightsDialog() {
      this.scoreRights=[]
      this.editRightsDialogVisible = false;
    },
    getDefaultRights(score,arr) {
      if (!score.children) {
        return arr.push(score.id)
      }
      score.children=Array.from(score.children)
      score.children.forEach(element => {
        this.getDefaultRights(element,arr)
      })
    },
    cheackRights(row){
      return row.children == undefined || row.children.length <= 0
    }
  },

};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 10px 0;
}
.bdtop {
  border-top: 1px solid rgb(240, 240, 240);
}
.bdbottom {
  border-bottom: 1px solid rgb(241, 241, 241);
}
.tag-three {
  margin-right: 10px;
}
</style>