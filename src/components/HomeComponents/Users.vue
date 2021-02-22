<template>
  <div id="users">
    <breadcrumb :path="['用户管理', '用户列表']"></breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            
            placeholder="请输入内容"
            @keyup.enter.native="searchUser"
            clearable
            @clear="handleClearEvent"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
              ref="searchBtn"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="userList.users" style="width: 100%">
        <el-table-column type="index" label="#" width="40"> </el-table-column>
        <el-table-column prop="id" label="id" width="80" sortable>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="role_name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column
        >        <el-table-column prop="mobile" label="手机" width="180">
        </el-table-column
        ><el-table-column label="状态" width="100">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUser(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="bottom"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="settingUser(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
      >
      </el-pagination>

      <addUser
        :addDialogVisible="addDialogVisible"
        @getUserList="getUserList"
        @hideAddDialog="hideAddDialog"
      ></addUser>
      <editUser
        :editDialogVisible="editDialogVisible"
        :editForm="editUserList"
        @getUserList="getUserList"
        @hideEditDialog="hideEditDialog"
      >
      </editUser>
      <settingUser
      :settingDialogVisible="settingDialogVisible"
      :settingUserInfo="settingUserInfo"
      @hideSettingDialog="hideSettingDialog"
      >

      </settingUser>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from "./component/breadcrumb";
import addUser from "./Users/addUser";
import editUser from "./Users/editUser";
import settingUser from "./Users/settingUser";
export default {
  name: "users",
  data() {
    return {
      search: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userList: {
        users: [],
        total: 0,
      },
      addDialogVisible: false,
      editDialogVisible: false,
      editUserList: {},
      settingDialogVisible:false,
      settingUserInfo:{}
    };
  },
  components: {
    breadcrumb,
    addUser,
    editUser,
    settingUser,
  },
  created() {
    this.getUserList();
  },

  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.userList.users = res.data.users;
      this.userList.total = res.data.total;
    },
    async changeState(user) {
      const { data: stateRes } = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(stateRes);
      if (stateRes.meta.status !== 200) {
        user.mg_state = !user.mg_state;
      }
      this.$message.success(stateRes.meta.msg);
    },
    handleSizeChange(newPageSize) {
      console.log(newPageSize);
      this.queryInfo.pagesize = newPageSize;
      this.getUserList();
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.queryInfo.pagenum = currentPage;
      this.getUserList();
    },
    searchUser() {
      this.getUserList();
    },
    handleClearEvent() {
      this.getUserList();
    },

    async deleteUser(id) {
      const { data: res } = await this.$http.delete(`users/${id}`);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      let totalPage = Math.ceil(
        (this.userList.total - 1) / this.queryInfo.pagesize
      );
      let currentPage =
        this.queryInfo.pagenum > totalPage ? totalPage : this.queryInfo.pagenum;
      this.queryInfo.pagenum = this.queryInfo.pagenum < 1 ? 1 : currentPage;
      this.getUserList();
    },
    hideAddDialog() {
      this.addDialogVisible = false;
    },
    hideEditDialog() {
      this.editDialogVisible = false;
    },
    editUser(user) {
      this.editDialogVisible = true;
      console.log(user);
      this.editUserList.id = user.id;
      this.editUserList.email = user.email;
      this.editUserList.mobile = user.mobile;
    },
    settingUser(row) {
      this.settingUserInfo=row
      this.settingDialogVisible = true;
    },
    hideSettingDialog(){
      this.settingDialogVisible = false;
    }
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>